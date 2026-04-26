import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { AdaptiveHeroCover } from "@/components/adaptive-hero-video";
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

  const proofStats = home.stats.slice(0, 3);
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
  const journeySection =
    currentLocale === "ar"
      ? {
          kicker: "المسار",
          title: "هنا يتحول التدريب إلى فرق، والفرق إلى نتائج.",
          description:
            "هذه هي الحلقة الأساسية في النادي: تدريب منضبط، منافسة محلية، ثم انتقال فعلي إلى مراحل أعلى."
        }
      : {
          kicker: "The Journey",
          title: "This is where training becomes teams, and teams become results.",
          description:
            "This is the club's core loop: disciplined preparation, local competition, and real movement toward higher stages."
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
  const journeySteps =
    currentLocale === "ar"
      ? [
          {
            title: "تدرّب",
            description:
              "حل مسائل منتظم، وبناء فرق، واستعداد منضبط لدخول المنافسة."
          },
          {
            title: "تأهّل",
            description:
              "تحوّل مسابقات الجامعة وسوريا التدريب إلى نتائج، وترتيب، وتقدّم واضح."
          },
          {
            title: "مثّل",
            description:
              "تحمل الفرق القوية اسم حلب إلى المراحل الإقليمية، وتمنح الشركاء قصة تستحق الدعم."
          }
        ]
      : [
          {
            title: "Train",
            description:
              "Regular problem solving, team practice, and disciplined preparation."
          },
          {
            title: "Qualify",
            description:
              "University and Syrian contests turn training into ranking and progression."
          },
          {
            title: "Represent",
            description:
              "Strong teams carry Aleppo to the regional stage and give partners a story worth backing."
          }
        ];

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

      <AdaptiveHeroCover hero={home.hero} locale={currentLocale} />
      <section className="section">
        <div className="shell">
          <div className="panel panel-soft home-journey-panel">
            <div className="home-journey-head">
              <p className="section-kicker">{journeySection.kicker}</p>
              <h2>{journeySection.title}</h2>
              <p className="section-copy home-journey-copy">{journeySection.description}</p>
            </div>
            <div className="home-journey-grid">
              {journeySteps.map((item, index) => (
                <article className="home-journey-step" key={item.title}>
                  <span className="home-journey-index mono">{String(index + 1).padStart(2, "0")}</span>
                  <h3>{item.title}</h3>
                  <p className="item-copy">{item.description}</p>
                </article>
              ))}
            </div>
            <div className="quiet-strip">
              {proofStats.map((item) => (
                <div className="quiet-pill" key={item.label}>
                  <strong className="home-proof-value mono">{item.value}</strong>
                  <span className="stat-label">{item.label}</span>
                </div>
              ))}
            </div>
            <div className="section-actions">
              <Link className="button button-primary" href={home.hero.primaryCta.href}>
                {home.hero.primaryCta.label}
              </Link>
              <Link className="button button-secondary" href={home.hero.secondaryCta.href}>
                {home.hero.secondaryCta.label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="shell">
          <SectionHead
            description={snapshotSection.description}
            kicker={snapshotSection.kicker}
            title={snapshotSection.title}
          />
          <div className="snapshot-grid">
            {featuredAchievement ? (
              <article className="snapshot-card">
                <p className="section-kicker">{currentLocale === "ar" ? "الإنجاز" : "Achievement"}</p>
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
                <p className="section-kicker">{currentLocale === "ar" ? "آخر فعالية" : "Latest Event"}</p>
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

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
