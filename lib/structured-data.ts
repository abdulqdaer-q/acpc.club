import { type Locale, localizedPath } from "@/lib/i18n";
import { absoluteUrl } from "@/lib/metadata";
import type { SiteSettings } from "@/lib/site-content";

/**
 * The club's entity definition, emitted on every page so search and answer
 * engines resolve one organization rather than a different one per page.
 *
 * `disambiguatingDescription` carries the ICPC affiliation disclaimer. It is the
 * property crawlers use to separate similarly-named entities, which is exactly
 * the confusion we need to prevent between this club and the ICPC organization.
 */
export function buildOrganizationSchema(locale: Locale, settings: SiteSettings) {
  const homeUrl = absoluteUrl(localizedPath(locale, "home"));
  const isArabic = locale === "ar";

  const sameAs = [
    settings.socialLinks.instagram,
    settings.socialLinks.linkedin,
    settings.socialLinks.facebook,
    settings.socialLinks.telegram
  ].filter((link): link is string => Boolean(link));

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": `${absoluteUrl("/")}#organization`,
    name: "Aleppo CPC",
    alternateName: [
      "Aleppo ICPC Club",
      "نادي البرمجة التنافسية في جامعة حلب",
      "مجتمع البرمجة التنافسية في جامعة حلب"
    ],
    url: homeUrl,
    logo: {
      "@type": "ImageObject",
      url: absoluteUrl("/brand/aleppo-icpc-club-avatar.png")
    },
    slogan: "CODE. SOLVE. GROW. IMPACT.",
    description: isArabic
      ? "نادٍ طلابي تطوعي مستقل للبرمجة التنافسية وحل المشكلات في جامعة حلب."
      : "An independent, student-led volunteer club for competitive programming and problem solving at the University of Aleppo.",
    disambiguatingDescription: isArabic
      ? "كيان طلابي جامعي مستقل، وليس فرعًا قانونيًا أو تمثيلًا مؤسسيًا لمنظمة ICPC الدولية."
      : "An independent university student entity. Not a legal chapter of, nor an institutional representative for, the international ICPC organization.",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Aleppo",
      addressCountry: "SY"
    },
    areaServed: {
      "@type": "Country",
      name: "Syria"
    },
    parentOrganization: {
      "@type": "CollegeOrUniversity",
      name: isArabic ? "جامعة حلب" : "University of Aleppo"
    },
    knowsAbout: [
      "Competitive programming",
      "Algorithms",
      "Data structures",
      "Problem solving",
      "International Collegiate Programming Contest"
    ],
    ...(sameAs.length > 0 ? { sameAs } : {}),
    ...(settings.email ? { email: settings.email } : {})
  };
}
