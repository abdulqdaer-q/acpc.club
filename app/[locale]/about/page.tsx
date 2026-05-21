import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { StaticHeroCover } from "@/components/adaptive-hero-video";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
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

  const clubTracks =
    currentLocale === "ar"
      ? [
          {
            title: "التدريب",
            description:
              "جلسات منتظمة ومجموعات مسائل ومسارات تعلم تمنح الطالب بداية واضحة وقابلة للتطور في البرمجة التنافسية."
          },
          {
            title: "المسابقة",
            description: "الاستعداد للمسابقات المحلية ودعم الانتقال إلى المستوى السوري ثم الإقليمي بخطوات مفهومة."
          },
          {
            title: "الإعلام والتوثيق",
            description: "إدارة الهوية البصرية والنشر وأرشفة النشاط والإنجازات بلغة عامة واضحة ومستمرة."
          },
          {
            title: "العمليات واللوجستيك",
            description: "تنسيق القاعات والتسجيل والدعم الميداني والتجهيزات التقنية حتى يبقى الموسم قابلاً للتنفيذ."
          }
        ]
      : [
          {
            title: "Training",
            description:
              "Regular sessions, problem sets, and learning tracks give students a clear way into competitive programming."
          },
          {
            title: "Competition",
            description:
              "The club prepares local contests and supports progression toward Syrian and regional stages."
          },
          {
            title: "Media and documentation",
            description:
              "Visual identity, publishing, and achievement archiving are treated as part of the club's public infrastructure."
          },
          {
            title: "Operations and logistics",
            description:
              "Venue setup, registration, on-ground coordination, and technical support keep the season executable."
          }
        ];

  const valuePoints =
    currentLocale === "ar"
      ? [
          "يجب أن يرى الطالب المسار بوضوح، لا أن يكتشفه بالصدفة.",
          "يحتاج الشريك والجامعة إلى مرجع رسمي ثابت، لا إلى ملفات ورسائل متفرقة.",
          "الأرشيف الواضح يجعل كل موسم يبدأ من نقطة أقوى من السابق."
        ]
      : [
          "Students should be able to see the pathway clearly, not discover it by accident.",
          "Partners and the university need a stable official reference, not scattered files and messages.",
          "A visible archive helps each season begin from a stronger point than the last."
        ];

  return (
    <>
      <StaticHeroCover
        className="hero-cover-about"
        hero={content.hero}
        locale={currentLocale}
      />

      <section className="section">
        <div className="panel panel-soft">
          <SectionHead
            kicker={currentLocale === "ar" ? "الرسالة والرؤية" : "Mission & Vision"}
            title={
              currentLocale === "ar"
                ? "تبدأ صورة النادي الجيدة من وضوح الغاية، لا من كثرة الشرح."
                : "A strong club starts with a clear purpose, not a long explanation."
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
          kicker={currentLocale === "ar" ? "كيف يعمل النادي" : "How the Club Works"}
          title={
            currentLocale === "ar"
              ? "يتحرّك النادي عبر مسارات عمل واضحة، لا عبر جهد عشوائي."
              : "The club moves through clear working tracks, not scattered effort."
          }
        />
        <div className="flow-grid">
          {clubTracks.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel panel-minimal">
          <p className="section-kicker">{currentLocale === "ar" ? "الذاكرة المؤسسية" : "Institutional Memory"}</p>
          <h3>
            {currentLocale === "ar"
              ? "الموقع جزء من بنية النادي، وليس مجرد صفحة تعريفية."
              : "The website is part of the club's infrastructure, not just a profile page."}
          </h3>
          <p className="section-copy">
            {currentLocale === "ar"
              ? "كلما كان المرجع الرسمي أوضح، أصبح انضمام الطلاب أسهل، وتقييم الشركاء أدق، وانتقال المعرفة بين المواسم أكثر استقراراً."
              : "The clearer the official reference becomes, the easier it is for students to join, for partners to evaluate the club, and for each season to inherit the work of the last."}
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
