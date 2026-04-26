"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { AcpcLogo } from "@/components/acpc-logo";
import { LanguageSwitcher } from "@/components/language-switcher";
import { Locale, buildNavigation, localizedPath } from "@/lib/i18n";
import { SiteSettings } from "@/lib/site-content";

type SiteHeaderProps = {
  locale: Locale;
  settings: SiteSettings;
};

export function SiteHeader({ locale, settings }: SiteHeaderProps) {
  const pathname = usePathname() ?? localizedPath(locale, "home");
  const navigation = buildNavigation(locale);
  const homePath = localizedPath(locale, "home");
  const isHome = pathname === homePath;
  const [isOverlay, setIsOverlay] = useState(isHome);

  useEffect(() => {
    if (!isHome) {
      setIsOverlay(false);
      return;
    }

    const updateOverlayState = () => {
      const threshold = Math.max(window.innerHeight * 0.55, 320);
      setIsOverlay(window.scrollY < threshold);
    };

    updateOverlayState();
    window.addEventListener("scroll", updateOverlayState, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateOverlayState);
    };
  }, [isHome]);

  return (
    <header className="header" data-overlay={isOverlay} data-home={isHome}>
      <div className="shell header-inner">
        <Link
          aria-label={settings.organizationName}
          className="brand"
          href={localizedPath(locale, "home")}
        >
          <AcpcLogo className="brand-lockup" size="sm" />
        </Link>

        <div className="header-actions">
          <nav className="nav" aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}>
            {navigation.map((item) => (
              <Link
                key={item.slug}
                className="nav-link"
                href={item.href}
                data-active={
                  pathname === item.href ||
                  (item.slug !== "home" && pathname.startsWith(`${item.href}/`))
                }
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-cta">
            <Link className="header-link" href={localizedPath(locale, "sponsors")}>
              {locale === "ar" ? "كن راعياً" : "Become a Sponsor"}
            </Link>
            <LanguageSwitcher locale={locale} />
          </div>
        </div>
      </div>
    </header>
  );
}
