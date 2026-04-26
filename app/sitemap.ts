import type { MetadataRoute } from "next";

import { locales, localizedPath, pageOrder } from "@/lib/i18n";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acpc.club";

  return locales.flatMap((locale) =>
    pageOrder.map((slug) => ({
      url: `${siteUrl}${localizedPath(locale, slug)}`,
      changeFrequency: slug === "home" ? "weekly" : "monthly",
      priority: slug === "home" ? 1 : 0.7,
      lastModified: new Date()
    }))
  );
}
