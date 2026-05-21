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
  const coverPaths = new Set([
    homePath,
    localizedPath(locale, "about"),
    localizedPath(locale, "structure"),
    localizedPath(locale, "achievements"),
    localizedPath(locale, "volunteers"),
    localizedPath(locale, "sponsors")
  ]);
  const isHome = pathname === homePath;
  const isCoverRoute = coverPaths.has(pathname);
  const [isOverlay, setIsOverlay] = useState(isCoverRoute);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    setIsMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!isCoverRoute) {
      setIsOverlay(false);
      return;
    }

    const updateOverlayState = () => {
      if (isHome && document.documentElement.hasAttribute("data-home-deck")) {
        return;
      }

      const threshold = Math.max(window.innerHeight * 0.55, 320);
      setIsOverlay(window.scrollY < threshold);
    };

    const onHomeDeckState = (event: Event) => {
      if (!isHome) {
        return;
      }

      const detail = (event as CustomEvent<{ activeIndex: number; isEnabled: boolean }>).detail;

      if (!detail?.isEnabled) {
        updateOverlayState();
        return;
      }

      setIsOverlay(detail.activeIndex === 0);
    };

    updateOverlayState();
    window.addEventListener("scroll", updateOverlayState, { passive: true });
    window.addEventListener("acpc:home-deck-state", onHomeDeckState as EventListener);

    return () => {
      window.removeEventListener("scroll", updateOverlayState);
      window.removeEventListener("acpc:home-deck-state", onHomeDeckState as EventListener);
    };
  }, [isCoverRoute, isHome]);

  return (
    <header
      className="header"
      data-cover={isCoverRoute}
      data-home={isHome}
      data-overlay={isOverlay}
    >
      <div className="shell header-inner">
        <Link
          aria-label={settings.organizationName}
          className="brand"
          href={localizedPath(locale, "home")}
        >
          <AcpcLogo className="brand-lockup" size="sm" />
        </Link>

        <div className="header-actions">
          <button
            aria-controls="site-navigation"
            aria-expanded={isMenuOpen}
            className="nav-toggle"
            onClick={() => setIsMenuOpen((isOpen) => !isOpen)}
            type="button"
          >
            <span className="nav-toggle-bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
            <span>{locale === "ar" ? "القائمة" : "Menu"}</span>
          </button>

          <nav
            className="nav"
            id="site-navigation"
            aria-label={locale === "ar" ? "التنقل الرئيسي" : "Primary"}
            data-open={isMenuOpen}
          >
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
