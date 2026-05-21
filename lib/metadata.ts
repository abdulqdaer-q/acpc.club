import type { Metadata } from "next";

import { Locale, localizedPath } from "@/lib/i18n";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://acpc.club";

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

  const alternates =
    slug === "home"
      ? {
          en: absoluteUrl(localizedPath("en", "home")),
          ar: absoluteUrl(localizedPath("ar", "home"))
        }
      : {
          en: absoluteUrl(localizedPath("en", slug)),
          ar: absoluteUrl(localizedPath("ar", slug))
        };

  return {
    metadataBase: new URL(siteUrl),
    title,
    description,
    keywords,
    alternates: {
      canonical,
      languages: alternates
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
