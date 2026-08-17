import type { Metadata } from "next";
import localFont from "next/font/local";
import { notFound } from "next/navigation";
import type { ReactNode } from "react";

import "../globals.css";

import { RouteTransitionProvider } from "@/components/route-transition-provider";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { StructuredData } from "@/components/structured-data";
import { isLocale, isRtl, locales, type Locale } from "@/lib/i18n";
import { getSiteSettings } from "@/lib/site-content";
import { buildOrganizationSchema } from "@/lib/structured-data";

const cairo = localFont({
  src: [
    {
      path: "../fonts/Cairo-Regular.ttf",
      style: "normal",
      weight: "400"
    },
    {
      path: "../fonts/Cairo-SemiBold.ttf",
      style: "normal",
      weight: "600"
    },
    {
      path: "../fonts/Cairo-Bold.ttf",
      style: "normal",
      weight: "700"
    }
  ],
  display: "swap",
  variable: "--font-cairo"
});

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleppo.icpc.club";

// Content comes from lib/site-content.ts, so there is nothing to poll for and
// pages are cached indefinitely: rendered once at build, then served as static
// HTML. Timed revalidation here would re-render identical output on a schedule
// and spend CPU we do not have on shared hosting.
//
// If Supabase is ever configured, change this to a number of seconds (300 is a
// sensible start) so database edits reach the site without a redeploy.
export const revalidate = false;

// Anything outside the known locales 404s without rendering this layout.
export const dynamicParams = false;

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

type LocaleLayoutProps = Readonly<{
  children: ReactNode;
  params: Promise<{ locale: string }>;
}>;

export async function generateMetadata({
  params
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const isArabic = locale === "ar";

  return {
    metadataBase: new URL(siteUrl),
    title: isArabic ? "Aleppo CPC | نادي البرمجة التنافسية" : "Aleppo CPC",
    description: isArabic
      ? "الموقع الرسمي لـ Aleppo CPC، مجتمع البرمجة التنافسية في جامعة حلب."
      : "Official website of Aleppo CPC, the competitive programming club at the University of Aleppo."
  };
}

export default async function LocaleLayout({ children, params }: LocaleLayoutProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const dir = isRtl(currentLocale) ? "rtl" : "ltr";
  const settings = await getSiteSettings(currentLocale);

  return (
    <html lang={currentLocale} dir={dir}>
      <body className={`${cairo.className} ${cairo.variable}`}>
        <StructuredData data={buildOrganizationSchema(currentLocale, settings)} />
        <div className="locale-root" data-dir={dir}>
          <div className="site-frame">
            <RouteTransitionProvider />
            <SiteHeader locale={currentLocale} settings={settings} />
            <main className="shell page">{children}</main>
            <SiteFooter locale={currentLocale} settings={settings} />
          </div>
        </div>
      </body>
    </html>
  );
}
