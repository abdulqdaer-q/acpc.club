"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Locale, swapLocale } from "@/lib/i18n";

export function LanguageSwitcher({ locale }: { locale: Locale }) {
  const pathname = usePathname() ?? `/${locale}`;
  const nextLocale: Locale = locale === "ar" ? "en" : "ar";

  return (
    <Link className="switcher" href={swapLocale(pathname, nextLocale)} hrefLang={nextLocale}>
      {nextLocale.toUpperCase()}
    </Link>
  );
}
