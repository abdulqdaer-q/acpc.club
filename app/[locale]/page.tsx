import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdaptiveHeroCover } from "@/components/adaptive-hero-video";
import { HomeSlideDeck } from "@/components/home-slide-deck";
import {
  JourneyChapterSlide,
  JourneyProgressRail,
  JourneySponsorSlide,
  JourneyStoryIntro
} from "@/components/journey-section";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
import { StructuredData } from "@/components/structured-data";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import { getJourneyContent } from "@/lib/journey-content";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import {
  getAchievements,
  getEvents,
  getHomeContent,
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

  const home = await getHomeContent(locale);

  return buildMetadata({
    locale,
    slug: "home",
    title: home.seo.title,
    description: home.seo.description,
    keywords: home.seo.keywords
  });
}

export default async function HomePage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, home, achievements, events] = await Promise.all([
    getSiteSettings(currentLocale),
    getHomeContent(currentLocale),
    getAchievements(currentLocale),
    getEvents(currentLocale)
  ]);

  const featuredAchievement = [...achievements].reverse()[0];
  const featuredEvent = events[0];
  const sponsorSignals =
    currentLocale === "ar"
      ? [
          "حضور واضح عبر الفعالية والموقع الرسمي والقنوات الرقمية.",
          "وصول مباشر إلى طلاب يسيرون ضمن مسار تدريبي وتنافسي جاد."
        ]
      : [
          "Visible placement across the event, the website, and official digital channels.",
          "Direct access to students already progressing through serious ICPC-oriented training."
        ];
  const journeyContent = getJourneyContent(currentLocale);
  const snapshotSection =
    currentLocale === "ar"
      ? {
          kicker: "المشهد الحالي",
          title: "لمحة سريعة عن الإنجاز والفعالية والشراكة.",
          description:
            "الصفحة الرئيسية يجب أن تعطي الزائر صورة سريعة عمّا ينجزه النادي الآن وما الذي يجعله جديراً بالدعم."
        }
      : {
          kicker: "Current Snapshot",
          title: "A quick view of achievement, activity, and partnership value.",
          description:
            "The homepage should show what the club is doing now and why it is worth backing."
        };
  const structuredData = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Aleppo CPC",
      url: absoluteUrl(localizedPath(currentLocale, "home")),
      description: home.seo.description,
      areaServed: "Syria",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Aleppo",
        addressCountry: "SY"
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "EducationalOrganization",
      name: "Aleppo CPC",
      parentOrganization: "University of Aleppo",
      url: absoluteUrl(localizedPath(currentLocale, "home"))
    }
  ];

  return (
    <>
      <StructuredData data={structuredData} />

      <HomeSlideDeck
        overlay={
          <JourneyProgressRail
            items={journeyContent.levels.map((level, index) => ({
              label: level.levelLabel,
              slideIndex: index + 2
            }))}
          />
        }
        slides={[
          {
            id: "home-hero",
            content: <AdaptiveHeroCover hero={home.hero} locale={currentLocale} />
          },
          {
            id: "home-journey-intro",
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
            id: `home-journey-${level.id}`,
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
            id: "home-journey-sponsor",
            content: (
              <section className="home-slide-panel home-slide-panel-journey">
                <div className="shell">
                  <JourneySponsorSlide
                    description={journeyContent.sponsor.description}
                    primary={journeyContent.sponsor.primary}
                    secondary={journeyContent.sponsor.secondary}
                    title={journeyContent.sponsor.title}
                  />
                </div>
              </section>
            )
          },
          {
            id: "home-snapshot",
            content: (
              <section className="home-slide-panel">
                <div className="shell">
                  <SectionHead
                    description={snapshotSection.description}
                    kicker={snapshotSection.kicker}
                    title={snapshotSection.title}
                  />
                  <div className="snapshot-grid">
                    {featuredAchievement ? (
                      <article className="snapshot-card">
                        <p className="section-kicker">
                          {currentLocale === "ar" ? "الإنجاز" : "Achievement"}
                        </p>
                        <span className="snapshot-meta mono">{featuredAchievement.year}</span>
                        <h3>{featuredAchievement.title}</h3>
                        <p className="item-copy">{featuredAchievement.description}</p>
                        <p className="snapshot-note">{featuredAchievement.highlight}</p>
                        <Link className="section-link" href={localizedPath(currentLocale, "achievements")}>
                          {currentLocale === "ar" ? "سجل الإنجازات الكامل" : "Full achievement record"}
                        </Link>
                      </article>
                    ) : null}

                    {featuredEvent ? (
                      <article className="snapshot-card">
                        <p className="section-kicker">
                          {currentLocale === "ar" ? "آخر فعالية" : "Latest Event"}
                        </p>
                        <span className="snapshot-meta mono">{featuredEvent.dateLabel}</span>
                        <h3>{featuredEvent.title}</h3>
                        <p className="item-copy">{featuredEvent.summary}</p>
                        <p className="snapshot-note">{featuredEvent.location}</p>
                        <Link className="section-link" href={localizedPath(currentLocale, "volunteers")}>
                          {currentLocale === "ar" ? "التطوع والتشغيل" : "Volunteers and operations"}
                        </Link>
                      </article>
                    ) : null}

                    <article className="snapshot-card">
                      <p className="section-kicker">{currentLocale === "ar" ? "للشركاء" : "For Partners"}</p>
                      <h3>
                        {currentLocale === "ar"
                          ? "نادٍ جامعي علني يمنح الشركاء حضوراً واضحاً."
                          : "A public university club that gives partners visible presence."}
                      </h3>
                      <div className="doc-list">
                        {sponsorSignals.map((item) => (
                          <div className="doc-link" key={item}>
                            <span>{item}</span>
                          </div>
                        ))}
                      </div>
                      <Link className="section-link" href={localizedPath(currentLocale, "sponsors")}>
                        {currentLocale === "ar" ? "صفحة الشراكات" : "Partnerships page"}
                      </Link>
                    </article>
                  </div>
                </div>
              </section>
            )
          },
          {
            id: "home-contact",
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
