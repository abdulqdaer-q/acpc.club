import type { Metadata } from "next";

import { Locale, localizedPath } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://aleppo.icpc.club";

export function absoluteUrl(path: string) {
  return new URL(path, siteUrl).toString();
}

export function buildMetadata(input: {
  locale: Locale;
  slug:
    | "home"
    | "about"
    | "structure"
    | "competition"
    | "achievements"
    | "events"
    | "volunteers"
    | "sponsors";
  title: string;
  description: string;
  keywords?: string[];
}) {
  const { locale, slug, title, description, keywords = [] } = input;
  const pagePath = localizedPath(locale, slug);
  const canonical = absoluteUrl(pagePath);

  const englishUrl = absoluteUrl(localizedPath("en", slug));

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: {
        en: englishUrl,
        ar: absoluteUrl(localizedPath("ar", slug)),
        // Tells crawlers which version to serve when no language matches,
        // instead of letting them pick one at random.
        "x-default": englishUrl
      }
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1
      }
    },
    openGraph: {
      type: "website",
      locale: locale === "ar" ? "ar_SY" : "en_US",
      url: canonical,
      title,
      description,
      siteName: "Aleppo CPC"
    },
    twitter: {
      card: "summary_large_image",
      title,
      description
    }
  } satisfies Metadata;
}
