import type { Metadata } from "next";
import { notFound } from "next/navigation";

import {
  ContactPanel,
  EditorialPhoto,
  PageHero,
  SectionHead
} from "@/components/site-primitives";
import { StructuredData } from "@/components/structured-data";
import { absoluteUrl, buildMetadata } from "@/lib/metadata";
import { isLocale, localizedPath, type Locale } from "@/lib/i18n";
import {
  getEvents,
  getEventsPageContent,
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

  const content = await getEventsPageContent(locale);

  return buildMetadata({
    locale,
    slug: "events",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function EventsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content, events] = await Promise.all([
    getSiteSettings(currentLocale),
    getEventsPageContent(currentLocale),
    getEvents(currentLocale)
  ]);

  const eventSchema =
    events.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "Event",
          name: events[0].title,
          description: events[0].summary,
          eventStatus: "https://schema.org/EventScheduled",
          location: {
            "@type": "Place",
            name: events[0].location
          },
          url: absoluteUrl(localizedPath(currentLocale, "events"))
        }
      : null;

  return (
    <>
      {eventSchema ? <StructuredData data={eventSchema} /> : null}

      <PageHero
        hero={content.hero}
        locale={currentLocale}
        side={
          <div className="proof-card">
            <EditorialPhoto
              alt={
                currentLocale === "ar"
                  ? "قاعة فعالية من فعاليات Aleppo CPC أثناء المسابقة"
                  : "An Aleppo CPC event hall during live contest activity"
              }
              description={
                currentLocale === "ar"
                  ? "الفعالية ليست مجرد يوم مسابقة؛ بل مساحة تدريب وتنظيم وتفاعل حي داخل الجامعة."
                  : "An ACPC event is more than a contest day. It combines training, coordination, and live community energy inside the university."
              }
              priority
              src="/images/acpc-photos/events-hall.jpg"
              title={
                currentLocale === "ar"
                  ? "فعالية تعمل بكامل إيقاعها."
                  : "A live event in full motion."
              }
            />
          </div>
        }
      />

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "الفعاليات" : "Events"}
          title={
            currentLocale === "ar"
              ? "صفحة واحدة تجمع الأرشيف والتحديثات وسياق كل فعالية."
              : "One page should hold archive entries, future updates, and the context around each event."
          }
        />
        <div className="events-grid">
          {events.map((event) => (
            <article className="event-card" key={event.slug}>
              <span className="event-status">{event.status}</span>
              <h3>{event.title}</h3>
              <p className="event-meta">
                <strong>{event.dateLabel}</strong>
                <br />
                {event.location}
              </p>
              <p className="item-copy">{event.summary}</p>
              <ul className="bullets">
                {event.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      <section className="section">
        <SectionHead
          kicker={currentLocale === "ar" ? "التشغيل" : "Operations"}
          title={
            currentLocale === "ar"
              ? "الوضوح التشغيلي جزء من القيمة العامة للنادي، وليس مجرد تفصيل داخلي."
              : "Operational clarity is part of the club's public value, not only an internal detail."
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
            {currentLocale === "ar" ? "لماذا يهم ذلك" : "Why it matters"}
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
