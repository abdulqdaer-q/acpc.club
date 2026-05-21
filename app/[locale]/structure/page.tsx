import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { StaticHeroCover } from "@/components/adaptive-hero-video";
import { ClubStructure } from "@/components/club-structure";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { getSiteSettings, getStructureContent } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getStructureContent(locale);

  return buildMetadata({
    locale,
    slug: "structure",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function StructurePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content] = await Promise.all([
    getSiteSettings(currentLocale),
    getStructureContent(currentLocale)
  ]);

  return (
    <>
      <StaticHeroCover hero={content.hero} locale={currentLocale} />

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "الخريطة التنظيمية" : "Operating Map"}
          title={content.sections[0]?.title ?? content.hero.title}
          description={content.sections[0]?.body.join(" ")}
        />
        <ClubStructure content={content} />
      </section>

      <section className="section">
        <div className="panel panel-minimal org-principles">
          <h2>
            {currentLocale === "ar"
              ? "الهيكل موجود ليجعل المسؤولية مرئية."
              : "The structure exists to make responsibility visible."}
          </h2>
          <p className="section-copy">
            {currentLocale === "ar"
              ? "عندما يعرف كل مسار صاحبه وحدوده، يصبح التدريب أوضح، والفعالية أهدأ، والتواصل مع الطلاب والشركاء أكثر مهنية."
              : "When every track has an owner and a clear boundary, training becomes clearer, events run calmer, and communication with students and partners becomes more professional."}
          </p>
        </div>
      </section>

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
