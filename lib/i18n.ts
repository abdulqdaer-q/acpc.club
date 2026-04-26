export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export type PageSlug =
  | "home"
  | "about"
  | "competition"
  | "achievements"
  | "events"
  | "sponsors";

export const defaultLocale: Locale = "en";

export const routeSegments: Record<Exclude<PageSlug, "home">, string> = {
  about: "about",
  competition: "competition",
  achievements: "achievements",
  events: "events",
  sponsors: "sponsors"
};

export const pageOrder: PageSlug[] = [
  "home",
  "about",
  "competition",
  "achievements",
  "events",
  "sponsors"
];

export function isLocale(value: string): value is Locale {
  return locales.includes(value as Locale);
}

export function isRtl(locale: Locale) {
  return locale === "ar";
}

export function localizedPath(locale: Locale, slug: PageSlug) {
  if (slug === "home") {
    return `/${locale}`;
  }

  return `/${locale}/${routeSegments[slug]}`;
}

export function swapLocale(pathname: string, nextLocale: Locale) {
  const parts = pathname.split("/").filter(Boolean);

  if (parts.length === 0) {
    return `/${nextLocale}`;
  }

  if (isLocale(parts[0])) {
    parts[0] = nextLocale;
    return `/${parts.join("/")}`;
  }

  return `/${nextLocale}/${parts.join("/")}`;
}

export type NavItem = {
  slug: PageSlug;
  label: string;
  href: string;
};

export const navigationLabels: Record<Locale, Record<PageSlug, string>> = {
  en: {
    home: "Home",
    about: "About",
    competition: "Competition",
    achievements: "Achievements",
    events: "Events",
    sponsors: "Partnerships"
  },
  ar: {
    home: "الرئيسية",
    about: "عن النادي",
    competition: "المسابقة",
    achievements: "الإنجازات",
    events: "الفعاليات",
    sponsors: "الشراكات"
  }
};

export function buildNavigation(locale: Locale): NavItem[] {
  return pageOrder.map((slug) => ({
    slug,
    label: navigationLabels[locale][slug],
    href: localizedPath(locale, slug)
  }));
}
