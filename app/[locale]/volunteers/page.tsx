import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticHeroCover } from "@/components/adaptive-hero-video";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import {
  getSiteSettings,
  getVolunteersPageContent
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getVolunteersPageContent(locale);

  return buildMetadata({
    locale,
    slug: "volunteers",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function VolunteersPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content] = await Promise.all([
    getSiteSettings(currentLocale),
    getVolunteersPageContent(currentLocale)
  ]);

  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: content.hero.title,
    description: content.seo.description,
    url: absoluteUrl(localizedPath(currentLocale, "volunteers"))
  };

  return (
    <>
      <StructuredData data={pageSchema} />

      <StaticHeroCover
        hero={content.hero}
        locale={currentLocale}
      />

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "المتطوعون" : "Volunteers"}
          title={
            currentLocale === "ar"
              ? "تعمل فرق صغيرة وواضحة الأدوار معاً لتقديم يوم مسابقة منظم وصورة عامة تليق بالنادي."
              : "Small, clearly defined teams work together to deliver a reliable contest day and a stronger public face for the club."
          }
        />
        <div className="card-grid">
          {content.volunteerTracks.map((item) => (
            <article className="volunteer-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <p className="section-kicker">
            {currentLocale === "ar" ? "كيف تعمل الفرق" : "How the teams work"}
          </p>
          {content.sections.map((section) => (
            <div className="section-stack" key={section.title}>
              <h3>{section.title}</h3>
              {section.body.map((paragraph) => (
                <p className="item-copy" key={paragraph}>
                  {paragraph}
                </p>
              ))}
            </div>
          ))}
        </div>
      </section>

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
