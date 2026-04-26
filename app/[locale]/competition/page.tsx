import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { ContactPanel, PageHero, SectionHead } from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { getCompetitionContent, getSiteSettings } from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getCompetitionContent(locale);

  return buildMetadata({
    locale,
    slug: "competition",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function CompetitionPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content] = await Promise.all([
    getSiteSettings(currentLocale),
    getCompetitionContent(currentLocale)
  ]);

  const trainingRoadmap =
    currentLocale === "ar"
      ? [
          {
            title: "الأساسيات والخوارزميات",
            description:
              "تبدأ الرحلة عادة مع حل المشكلات، والخوارزميات، وهياكل البيانات، وبناء عادة التحليل المنهجي."
          },
          {
            title: "مجموعات مسائل منتظمة",
            description:
              "يحتاج الطالب إلى مسار واضح من مسائل سهلة إلى متوسطة ثم أعلى تعقيداً، مع متابعة وتكرار."
          },
          {
            title: "مسابقات تجريبية ومحاكاة",
            description:
              "السرعة وإدارة الوقت والعمل على جهاز واحد لا تُكتسب إلا عبر تجارب تحاكي يوم المسابقة الحقيقي."
          },
          {
            title: "اختيار الفرق والتأهل",
            description:
              "بعد بناء المستوى، تأتي مرحلة التقييم وتشكيل الفرق الأنسب للمشاركة الرسمية."
          }
        ]
      : [
          {
            title: "Fundamentals and algorithms",
            description:
              "Students typically start with problem solving, algorithms, data structures, and disciplined analysis."
          },
          {
            title: "Regular problem sets",
            description:
              "A healthy chapter gives students a visible path from easier problems to more demanding competitive material."
          },
          {
            title: "Mock contests and rehearsal",
            description:
              "Speed, time management, and one-machine teamwork only become real through rehearsal under contest-like constraints."
          },
          {
            title: "Team selection and qualification",
            description:
              "Once the training base is in place, tryouts and team formation can serve official contest participation."
          }
        ];

  return (
    <>
      <PageHero
        hero={content.hero}
        locale={currentLocale}
        side={
          <div className="proof-card">
            <p className="section-kicker">{currentLocale === "ar" ? "الصيغة" : "Format"}</p>
            <h3>
              {currentLocale === "ar"
                ? "ثلاثة طلاب، جهاز واحد، خمس ساعات، ومجموعة مسائل تقيس العمق والسرعة والعمل الجماعي."
                : "Three students, one machine, five hours, and a problem set that rewards depth, speed, and teamwork."}
            </h3>
            <div className="mini-grid">
              <div className="stat-card">
                <div className="stat-value mono">3</div>
                <div className="stat-label">
                  {currentLocale === "ar" ? "طلاب في كل فريق" : "students per team"}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value mono">5h</div>
                <div className="stat-label">
                  {currentLocale === "ar" ? "مدة الجولة الرسمية" : "official contest duration"}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value mono">1</div>
                <div className="stat-label">
                  {currentLocale === "ar" ? "جهاز لكل فريق" : "machine per team"}
                </div>
              </div>
              <div className="stat-card">
                <div className="stat-value mono">8-12</div>
                <div className="stat-label">
                  {currentLocale === "ar" ? "مسائل تقريباً" : "problems typically"}
                </div>
              </div>
            </div>
          </div>
        }
      />

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "مراحل المسابقة" : "Structure"}
          title={
            currentLocale === "ar"
              ? "يجب أن يكون المسار واضحاً لكل طالب ومدرب."
              : "The pathway should be clear to every student and coach."
          }
        />
        <div className="flow-grid">
          {content.structure.map((item, index) => (
            <article className="timeline-item" key={item.title}>
              <span className="timeline-index mono">{String(index + 1).padStart(2, "0")}</span>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <div className="panel">
          <p className="section-kicker">
            {currentLocale === "ar" ? "لماذا ينجح هذا النموذج" : "Why this format works"}
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

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "آلية اليومين" : "Event Flow"}
          title={
            currentLocale === "ar"
              ? "يساعد هذا التسلسل المختصر الفرق والمدربين على فهم يوم المسابقة بسرعة."
              : "A readable contest-day sequence helps teams and coaches prepare well."
          }
        />
        <div className="panel">
          <div className="timeline-stack">
            {content.eventFlow.map((item, index) => (
              <article className="timeline-inline" key={item.title}>
                <span className="timeline-index mono">{String(index + 1).padStart(2, "0")}</span>
                <div>
                  <h3>{item.title}</h3>
                  <p className="item-copy">{item.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "التحضير" : "Preparation"}
          title={
            currentLocale === "ar"
              ? "يبدأ التحضير الحقيقي قبل التأهل وقبل تشكيل الفرق النهائية."
              : "Serious preparation begins well before qualification and final team selection."
          }
        />
        <div className="card-grid card-grid-4">
          {trainingRoadmap.map((item) => (
            <article className="feature-card" key={item.title}>
              <h3>{item.title}</h3>
              <p className="item-copy">{item.description}</p>
            </article>
          ))}
        </div>
      </section>

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
