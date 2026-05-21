import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { HomeSlideDeck } from "@/components/home-slide-deck";
import {
  JourneyChapterSlide,
  JourneyProgressRail,
  JourneyStoryIntro
} from "@/components/journey-section";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import { getJourneyContent } from "@/lib/journey-content";
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
  const journeyContent = getJourneyContent(currentLocale);

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
              "A healthy club gives students a visible path from easier problems to more demanding competitive material."
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
      <HomeSlideDeck
        overlay={
          <JourneyProgressRail
            items={journeyContent.levels.map((level, index) => ({
              label: level.levelLabel,
              slideIndex: index + 1
            }))}
          />
        }
        slides={[
          {
            id: "competition-journey-intro",
            content: (
              <section className="home-slide-panel home-slide-panel-journey">
                <div className="shell">
                  <JourneyStoryIntro
                    intro={journeyContent.intro}
                    levels={journeyContent.levels}
                    title={journeyContent.title}
                  />
                </div>
              </section>
            )
          },
          ...journeyContent.levels.map((level, index) => ({
            id: `competition-journey-${level.id}`,
            content: (
              <section className="home-slide-panel home-slide-panel-journey" key={level.id}>
                <div className="shell">
                  <JourneyChapterSlide
                    index={index}
                    level={level}
                    total={journeyContent.levels.length}
                  />
                </div>
              </section>
            )
          })),
          {
            id: "competition-event-flow",
            content: (
              <section className="home-slide-panel">
                <div className="shell">
                  <section className="section section-compact">
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
                            <span className="timeline-index mono">
                              {String(index + 1).padStart(2, "0")}
                            </span>
                            <div>
                              <h3>{item.title}</h3>
                              <p className="item-copy">{item.description}</p>
                            </div>
                          </article>
                        ))}
                      </div>
                    </div>
                  </section>
                </div>
              </section>
            )
          },
          {
            id: "competition-preparation",
            content: (
              <section className="home-slide-panel">
                <div className="shell">
                  <section className="section section-compact">
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
                </div>
              </section>
            )
          },
          {
            id: "competition-contact",
            content: (
              <section className="home-slide-panel home-slide-panel-contact">
                <div className="shell">
                  <ContactPanel locale={currentLocale} settings={settings} />
                </div>
              </section>
            )
          }
        ]}
      />
    </>
  );
}
