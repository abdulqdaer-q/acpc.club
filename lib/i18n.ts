export const locales = ["en", "ar"] as const;

export type Locale = (typeof locales)[number];

export type PageSlug =
  | "home"
  | "about"
  | "structure"
  | "competition"
  | "achievements"
  | "events"
  | "volunteers"
  | "sponsors";

export const defaultLocale: Locale = "en";

export const routeSegments: Record<Exclude<PageSlug, "home">, string> = {
  about: "about",
  structure: "structure",
  competition: "competition",
  achievements: "achievements",
  events: "events",
  volunteers: "volunteers",
  sponsors: "sponsors"
};

export const pageOrder: PageSlug[] = [
  "home",
  "about",
  "structure",
  "competition",
  "achievements",
  "volunteers",
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
    structure: "Structure",
    competition: "Competition",
    achievements: "Achievements",
    events: "Events",
    volunteers: "Volunteers",
    sponsors: "Partnerships"
  },
  ar: {
    home: "الرئيسية",
    about: "عن النادي",
    structure: "الهيكل",
    competition: "المسابقة",
    achievements: "الإنجازات",
    events: "الفعاليات",
    volunteers: "المتطوعون",
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
