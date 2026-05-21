import type { ReactNode } from "react";
import { notFound } from "next/navigation";

import { RouteTransitionProvider } from "@/components/route-transition-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { isLocale, isRtl, locales } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/site-content";

export const dynamic = "force-dynamic";

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params
}: Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const settings = await getSiteSettings(locale);

  return (
    <div className="locale-root" lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} data-dir={isRtl(locale) ? "rtl" : "ltr"}>
      <div className="site-frame">
        <RouteTransitionProvider />
        <SiteHeader locale={locale} settings={settings} />
        <main className="shell page">{children}</main>
        <SiteFooter locale={locale} settings={settings} />
      </div>
    </div>
  );
}
