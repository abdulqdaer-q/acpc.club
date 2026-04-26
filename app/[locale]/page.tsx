import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdaptiveHeroCover } from "@/components/adaptive-hero-video";
import { HomeSlideDeck } from "@/components/home-slide-deck";
import {
  JourneyChapterSlide,
  type JourneyLevelData,
  JourneyProgressRail,
  JourneySponsorSlide,
  JourneyStoryIntro
} from "@/components/journey-section";
import { ContactPanel, SectionHead } from "@/components/site-primitives";
import { StructuredData } from "@/components/structured-data";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
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
  const journeyContent =
    currentLocale === "ar"
      ? {
          title: "من حلب إلى العالم",
          intro:
            "يبدأ هذا المسار من قاعات التدريب والفعاليات في حلب، ثم يتوسع إلى المنافسة السورية، فالإقليمية، ثم إلى الطموح العالمي. كل خطوة هنا تبني طالباً أقوى وتمثيلاً أوسع للنادي.",
          sponsor: {
            title: "ساعد الفريق القادم على الوصول إلى المسرح العالمي",
            description:
              "رعايتك تدعم التدريب، والمسابقات، والسفر، والإرشاد، ومستقبل المواهب في البرمجة التنافسية القادمة من حلب.",
            primary: {
              label: "كن شريكاً راعياً",
              href: localizedPath(currentLocale, "sponsors")
            },
            secondary: {
              label: "اطّلع على أثرنا",
              href: localizedPath(currentLocale, "achievements")
            }
          },
          levels: [
            {
              id: "aleppo",
              levelLabel: "مستوى حلب",
              title: "هنا تبدأ الحكاية",
              description:
                "كل رحلة تبدأ من هنا، في حلب، حيث يلتقي الطلاب، ويتدرّبون، ويتنافسون، ويكتشفون قوة التفكير الخوارزمي والعمل الجماعي.",
              proof: [
                { value: "230", label: "مشاركاً في خطة فعالية 2025" },
                { value: "60-70", label: "فريقاً في المسابقة المحلية" },
                { value: "100+", label: "متطوع ومساهم في التشغيل" }
              ],
              side: "start",
              map: {
                routePath: "M212 418 C292 372 350 334 420 286",
                markers: [{ x: 420, y: 286, label: "حلب" }],
                pin: { x: 420, y: 286, halo: 92 }
              }
            },
            {
              id: "syria",
              levelLabel: "المستوى السوري",
              title: "من المدينة إلى الساحة الوطنية",
              description:
                "من المسابقات المحلية إلى المستوى الوطني، تحمل فرقنا روح حلب إلى المنظومة السورية للبرمجة التنافسية بثقة وتنظيم وطموح أعلى.",
              proof: [
                { value: "4", label: "ميداليات في المسابقة السورية 2025" },
                { value: "1+1", label: "بطل ووصيف على مستوى سوريا في 2024" },
                { value: "3", label: "طلاب في كل فريق ICPC" }
              ],
              side: "end",
              map: {
                routePath: "M308 224 C362 216 428 232 506 288",
                markers: [
                  { x: 308, y: 224, label: "حلب" },
                  { x: 506, y: 288, label: "سوريا", tone: "muted" }
                ],
                pin: { x: 308, y: 224, halo: 86 }
              }
            },
            {
              id: "region",
              levelLabel: "العرب وأفريقيا",
              title: "هناك يتغير حجم المنافسة",
              description:
                "خارج الحدود، يتنافس طلابنا ويتعاونون وينمون مع أبرز العقول في المنطقة العربية والأفريقية، وتتحول النتائج إلى حضور إقليمي حقيقي.",
              proof: [
                { value: "2", label: "ميداليتان إقليميتان موثقتان في 2025" },
                { value: "ذهب + برونز", label: "نتيجة موثقة في ACPC" },
                { value: "ACPC", label: "بوابة العبور الإقليمية" }
              ],
              side: "start",
              map: {
                routePath: "M586 244 C524 250 462 286 374 334",
                markers: [
                  { x: 586, y: 244, label: "سوريا" },
                  { x: 374, y: 334, label: "العرب وأفريقيا" }
                ],
                pin: { x: 586, y: 244, halo: 82 }
              }
            },
            {
              id: "world",
              levelLabel: "المستوى الدولي",
              title: "والوجهة هي المسرح العالمي",
              description:
                "وجهتنا هي العالم: بناء فرق قادرة على تمثيل حلب وسوريا والمنطقة في الساحات الدولية بثقة واستعداد ومعايير تنافسية عالية.",
              proof: [
                { value: "3", label: "ظهورات موثقة في نهائيات العالم" },
                { value: "ICPC", label: "حضور على المسرح الدولي" },
                { value: "World Finals", label: "الوجهة التي يبني لها هذا المسار" }
              ],
              side: "end",
              map: {
                routePath: "M494 292 C572 246 656 236 732 254",
                markers: [
                  { x: 494, y: 292, label: "العرب وأفريقيا" },
                  { x: 732, y: 254, label: "العالم" }
                ],
                pin: { x: 494, y: 292, halo: 96 }
              }
            }
          ] satisfies JourneyLevelData[]
        }
      : {
          title: "From Aleppo to the World",
          intro:
            "The journey starts in Aleppo's training rooms and contest halls, then expands into Syria, the Arab and Africa region, and the wider world stage. Each step turns local preparation into broader representation.",
          sponsor: {
            title: "Help the next team reach the world stage",
            description:
              "Your sponsorship supports training, contests, travel, mentorship, and the future of competitive programming talent from Aleppo.",
            primary: {
              label: "Become a Sponsor",
              href: localizedPath(currentLocale, "sponsors")
            },
            secondary: {
              label: "See Our Impact",
              href: localizedPath(currentLocale, "achievements")
            }
          },
          levels: [
            {
              id: "aleppo",
              levelLabel: "Aleppo Level",
              title: "This is where the journey begins",
              description:
                "Every journey begins here, in Aleppo, where students meet, train, compete, and discover the power of problem solving together.",
              proof: [
                { value: "230", label: "participants in the 2025 event plan" },
                { value: "60-70", label: "teams in the local contest plan" },
                { value: "100+", label: "volunteers and contributors" }
              ],
              side: "start",
              map: {
                routePath: "M212 418 C292 372 350 334 420 286",
                markers: [{ x: 420, y: 286, label: "Aleppo" }],
                pin: { x: 420, y: 286, halo: 92 }
              }
            },
            {
              id: "syria",
              levelLabel: "Syrian Level",
              title: "Local teams move onto the national stage",
              description:
                "From local contests to the national stage, our teams carry Aleppo's spirit into Syria's competitive programming ecosystem.",
              proof: [
                { value: "4", label: "medals in the Syrian contest in 2025" },
                { value: "1+1", label: "champion and runner-up season in 2024" },
                { value: "3", label: "students in each ICPC team" }
              ],
              side: "end",
              map: {
                routePath: "M308 224 C362 216 428 232 506 288",
                markers: [
                  { x: 308, y: 224, label: "Aleppo" },
                  { x: 506, y: 288, label: "Syria", tone: "muted" }
                ],
                pin: { x: 308, y: 224, halo: 86 }
              }
            },
            {
              id: "region",
              levelLabel: "Arab & Africa Level",
              title: "Regional competition raises the scale",
              description:
                "Beyond borders, our students compete, collaborate, and grow with the brightest minds across the Arab and African region.",
              proof: [
                { value: "2", label: "documented regional medals in 2025" },
                { value: "Gold + Bronze", label: "recorded ACPC result" },
                { value: "ACPC", label: "the regional gateway for the journey" }
              ],
              side: "start",
              map: {
                routePath: "M586 244 C524 250 462 286 374 334",
                markers: [
                  { x: 586, y: 244, label: "Syria" },
                  { x: 374, y: 334, label: "Arab & Africa" }
                ],
                pin: { x: 586, y: 244, halo: 82 }
              }
            },
            {
              id: "world",
              levelLabel: "International Level",
              title: "The destination is the world stage",
              description:
                "Our destination is the world stage, building teams capable of representing Aleppo, Syria, and the region internationally.",
              proof: [
                { value: "3", label: "documented World Finals appearances" },
                { value: "ICPC", label: "global competition platform" },
                { value: "World Finals", label: "the ambition this pathway serves" }
              ],
              side: "end",
              map: {
                routePath: "M494 292 C572 246 656 236 732 254",
                markers: [
                  { x: 494, y: 292, label: "Arab & Africa" },
                  { x: 732, y: 254, label: "World" }
                ],
                pin: { x: 494, y: 292, halo: 96 }
              }
            }
          ] satisfies JourneyLevelData[]
        };
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
                        <Link className="section-link" href={localizedPath(currentLocale, "events")}>
                          {currentLocale === "ar" ? "تفاصيل الفعالية" : "Event details"}
                        </Link>
                      </article>
                    ) : null}

                    <article className="snapshot-card">
                      <p className="section-kicker">{currentLocale === "ar" ? "للشركاء" : "For Partners"}</p>
                      <h3>
                        {currentLocale === "ar"
                          ? "منصة جامعية علنية تمنح الشركاء حضوراً واضحاً."
                          : "A public university platform that gives partners visible presence."}
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
