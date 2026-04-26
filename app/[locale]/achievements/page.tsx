import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

import {
  ContactPanel,
  PageHero,
  SectionHead
} from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  getAchievements,
  getAchievementsPageContent,
  getSiteSettings
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getAchievementsPageContent(locale);

  return buildMetadata({
    locale,
    slug: "achievements",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function AchievementsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content, achievements] = await Promise.all([
    getSiteSettings(currentLocale),
    getAchievementsPageContent(currentLocale),
    getAchievements(currentLocale)
  ]);

  const icpcGallery =
    currentLocale === "ar"
      ? [
          {
            year: "2016",
            title: "نهائيات العالم في فوكيت",
            description: "صورة مبكرة تؤكد حضور جامعة حلب على مسار ICPC العالمي.",
            src: "/images/icpc-teams/2016.jpg"
          },
          {
            year: "2019",
            title: "نهائيات العالم في بورتو",
            description: "استمرارية الظهور الخارجي تثبت أن المسار ناضج ومبني على عمل تراكمي.",
            src: "/images/icpc-teams/2019.jpg"
          },
          {
            year: "2021",
            title: "نهائيات العالم في دكا",
            description: "توضح هذه اللقطة أن النادي لا يتوقف عند التدريب المحلي، بل يصل إلى الساحة الدولية.",
            src: "/images/icpc-teams/2021.jpg"
          },
          {
            year: "2023",
            title: "نهائيات العالم في الأقصر",
            description: "الأرشيف البصري المرتب يجعل قصة الإنجاز أوضح وأكثر إقناعاً للطلاب والشركاء.",
            src: "/images/icpc-teams/2023.jpg"
          }
        ]
      : [
          {
            year: "2016",
            title: "World Finals in Phuket",
            description:
              "An early image that confirms the University of Aleppo's place on the global ICPC pathway.",
            src: "/images/icpc-teams/2016.jpg"
          },
          {
            year: "2019",
            title: "World Finals in Porto",
            description:
              "Sustained international presence proves the pathway is mature and built on cumulative work.",
            src: "/images/icpc-teams/2019.jpg"
          },
          {
            year: "2021",
            title: "World Finals in Dhaka",
            description:
              "This record shows that the chapter does not stop at local training. It reaches the international stage.",
            src: "/images/icpc-teams/2021.jpg"
          },
          {
            year: "2023",
            title: "World Finals in Luxor",
            description:
              "A clear visual archive makes the achievement story more convincing to students and partners.",
            src: "/images/icpc-teams/2023.jpg"
          }
        ];

  return (
    <>
      <PageHero
        hero={content.hero}
        locale={currentLocale}
        side={
          <div className="proof-card">
            <p className="section-kicker">{currentLocale === "ar" ? "الأثر" : "Impact"}</p>
            <h3>
              {currentLocale === "ar"
                ? "المؤشرات هنا، وأرشيف الفرق داخل الصفحة."
                : "Metrics stay here. The team archive belongs in the page."}
            </h3>
            <div className="mini-grid">
              {content.impactMetrics.map((item) => (
                <div className="stat-card" key={item.label}>
                  <div className="stat-value mono">{item.value}</div>
                  <div className="stat-label">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        }
      />

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "أرشيف ICPC" : "ICPC Archive"}
          title={
            currentLocale === "ar"
              ? "صور الفرق تقول أكثر من أي وصف عام للإنجاز."
              : "These team images say more than a generic achievements summary ever could."
          }
        />
        <div className="achievement-photo-grid">
          {icpcGallery.map((item) => (
            <article className="achievement-photo-card" key={item.year}>
              <div className="achievement-photo-frame">
                <Image
                  alt={item.title}
                  className="achievement-photo-image"
                  height={1365}
                  src={item.src}
                  width={2048}
                />
              </div>
              <div className="achievement-photo-copy">
                <span className="milestone-year mono">{item.year}</span>
                <h3>{item.title}</h3>
                <p className="item-copy">{item.description}</p>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "الخط الزمني" : "Timeline"}
          title={
            currentLocale === "ar"
              ? "سجل الإنجازات هنا يخدم الطلاب والشركاء وصورة النادي العامة معاً."
              : "This record is ordered to serve students, partners, and the club's public story at once."
          }
        />
        <div className="timeline-grid">
          {achievements.map((item) => (
            <article className="milestone" key={`${item.year}-${item.title}`}>
              <span className="milestone-year mono">{item.year}</span>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
              <div className="milestone-highlight">{item.highlight}</div>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <p className="section-kicker">
            {currentLocale === "ar" ? "لماذا يهم هذا السجل" : "Why the record matters"}
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
