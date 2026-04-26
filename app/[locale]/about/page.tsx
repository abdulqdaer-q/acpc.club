import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ContactPanel,
  EditorialPhoto,
  PageHero,
  SectionHead
} from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { getAboutContent, getSiteSettings } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getAboutContent(locale);

  return buildMetadata({
    locale,
    slug: "about",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function AboutPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content] = await Promise.all([
    getSiteSettings(currentLocale),
    getAboutContent(currentLocale)
  ]);

  const chapterTracks =
    currentLocale === "ar"
      ? [
          {
            title: "التدريب",
            description:
              "جلسات تدريبية ومجموعات مسائل ومسارات تعلم تمنح الطلاب بداية عملية منتظمة في البرمجة التنافسية."
          },
          {
            title: "المسابقة",
            description: "الاستعداد للمسابقات المحلية ودعم التقدم إلى المراحل السورية ثم الإقليمية."
          },
          {
            title: "الإعلام والتوثيق",
            description: "إدارة الهوية البصرية والنشر وأرشفة النشاط والإنجازات بصيغة مؤسسية واضحة."
          },
          {
            title: "العمليات واللوجستيك",
            description: "تنسيق القاعات والتسجيل والدعم الميداني والتجهيزات التشغيلية والتقنية."
          }
        ]
      : [
          {
            title: "Training",
            description:
              "Training sessions, topic notes, and problem sets create a dependable entry path into competitive programming."
          },
          {
            title: "Competition",
            description:
              "The club prepares local contests and supports progress toward Syrian and regional stages."
          },
          {
            title: "Media and documentation",
            description:
              "Visual identity, publishing, and achievement archiving are treated as part of the club's public infrastructure."
          },
          {
            title: "Operations and logistics",
            description:
              "Venue setup, registration, on-ground coordination, and technical support keep the season moving."
          }
        ];

  const valuePoints =
    currentLocale === "ar"
      ? [
          "ترتبط المهارة التقنية هنا بالانضباط والعمل الجماعي والتواصل تحت الضغط.",
          "يساعد الأرشيف الواضح الطلاب الجدد على فهم المسار بصورة واقعية ومقنعة.",
          "تقلل المنصة الرسمية الاعتماد على الرسائل المتفرقة والملفات غير المنظمة."
        ]
      : [
          "Technical skill is paired here with discipline, teamwork, and communication under pressure.",
          "A visible archive helps new students understand the pathway in concrete terms.",
          "An official platform reduces dependence on scattered messages and disconnected files."
        ];

  return (
    <>
      <PageHero
        hero={content.hero}
        locale={currentLocale}
        side={
          <div className="proof-card">
            <EditorialPhoto
              alt={
                currentLocale === "ar"
                  ? "طلاب ومتطوعون في لقاء داخل مختبرات جامعة حلب"
                  : "Students and volunteers gathered inside University of Aleppo labs"
              }
              description={
                currentLocale === "ar"
                  ? "ينطلق النادي من البيئة الجامعية نفسها: مختبرات، لقاءات تعريفية، وتدريب منظم يفتح الطريق نحو ICPC."
                  : "The chapter grows inside the university itself through labs, orientation sessions, and structured preparation for ICPC."
              }
              priority
              src="/images/acpc-photos/about-meeting.jpg"
              title={
                currentLocale === "ar"
                  ? "مجتمع يبدأ من المختبرات."
                  : "A community built in the labs."
              }
            />
            <p className="section-kicker">{currentLocale === "ar" ? "الهوية" : "Identity"}</p>
            <div className="seal-pill">
              <div className="seal-pill-image-wrap">
                <Image
                  alt={
                    currentLocale === "ar"
                      ? "شعار جامعة حلب"
                      : "University of Aleppo seal"
                  }
                  className="seal-pill-image"
                  height={111}
                  src="/images/acpc-doc/image2.png"
                  width={112}
                />
              </div>
              <div>
                <strong>
                  {currentLocale === "ar" ? "جامعة حلب" : "University of Aleppo"}
                </strong>
                <p className="item-copy">
                  {currentLocale === "ar"
                    ? "المنصة الجامعية الرسمية لنادٍ يملك خطاباً أوضح وحضوراً عاماً أكثر نضجاً."
                    : "The official university platform for a club with a clearer public voice and a more durable public presence."}
                </p>
              </div>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="panel panel-soft">
          <SectionHead
            kicker={currentLocale === "ar" ? "الرسالة والرؤية" : "Mission & Vision"}
            title={
              currentLocale === "ar"
                ? "قبل شرح الهيكل، يجب أن تكون غاية النادي واضحة."
                : "The club's purpose should be clear before its structure is explained."
            }
          />
          <div className="stack-list">
            {content.sections.map((section) => (
              <article className="stack-row" key={section.title}>
                <h3>{section.title}</h3>
                <div className="section-body">
                  {section.body.map((paragraph) => (
                    <p className="item-copy" key={paragraph}>
                      {paragraph}
                    </p>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "كيف يعمل النادي" : "How the Chapter Works"}
          title={
            currentLocale === "ar"
              ? "أربعة مسارات عمل تكفي لفهم طريقة حركة النادي."
              : "Four working tracks are enough to understand how the club moves."
          }
        />
        <div className="flow-grid">
          {chapterTracks.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel panel-minimal">
          <p className="section-kicker">{currentLocale === "ar" ? "الاستمرارية" : "Continuity"}</p>
          <h3>
            {currentLocale === "ar"
              ? "يحفظ الموقع الذاكرة المؤسسية مع تغيّر الفرق والدفعات والأدوار."
              : "The website preserves institutional memory as teams, student cohorts, and leadership roles change."}
          </h3>
          <p className="section-copy">
            {currentLocale === "ar"
              ? "وهذا مهم للنادي نفسه، كما يهم الشركاء والجامعة والطلاب الجدد الذين يحتاجون إلى مرجع رسمي موثوق."
              : "That continuity matters to the club itself, and also to partners, the university, and new students who need a reliable official reference."}
            </p>
          <ul className="bullets bullets-compact">
            {valuePoints.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="section-actions">
            <Link
              className="button button-secondary button-compact"
              href={localizedPath(currentLocale, "competition")}
            >
              {currentLocale === "ar" ? "مسار ICPC" : "ICPC pathway"}
            </Link>
          </div>
        </div>
      </section>

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
