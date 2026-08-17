import type { MetadataRoute } from "next";

import { locales, localizedPath, pageOrder } from "@/lib/i18n";

// Evaluated once per build rather than per request, so the sitemap stops
// claiming every page changed the moment a crawler asked for it.
const lastModified = new Date();

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleppo.icpc.club";
  const url = (locale: (typeof locales)[number], slug: (typeof pageOrder)[number]) =>
    `${siteUrl}${localizedPath(locale, slug)}`;

  return locales.flatMap((locale) =>
    pageOrder.map((slug) => ({
      url: url(locale, slug),
      changeFrequency: slug === "home" ? ("weekly" as const) : ("monthly" as const),
      priority: slug === "home" ? 1 : 0.7,
      lastModified,
      alternates: {
        languages: {
          en: url("en", slug),
          ar: url("ar", slug),
          "x-default": url("en", slug)
        }
      }
    }))
  );
}
