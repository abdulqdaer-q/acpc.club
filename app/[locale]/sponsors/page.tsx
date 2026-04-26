import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import {
  ContactPanel,
  EditorialPhoto,
  PageHero,
  SectionHead
} from "@/components/site-primitives";
import { buildMetadata } from "@/lib/metadata";
import { isLocale, type Locale } from "@/lib/i18n";
import {
  getSiteSettings,
  getSponsors,
  getSponsorsPageContent
} from "@/lib/site-content";

type PageProps = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { locale } = await params;

  if (!isLocale(locale)) {
    return {};
  }

  const content = await getSponsorsPageContent(locale);

  return buildMetadata({
    locale,
    slug: "sponsors",
    title: content.seo.title,
    description: content.seo.description,
    keywords: content.seo.keywords
  });
}

export default async function SponsorsPage({ params }: PageProps) {
  const { locale } = await params;

  if (!isLocale(locale)) {
    notFound();
  }

  const currentLocale = locale as Locale;
  const [settings, content, sponsors] = await Promise.all([
    getSiteSettings(currentLocale),
    getSponsorsPageContent(currentLocale),
    getSponsors(currentLocale)
  ]);

  const sponsorProof =
    currentLocale === "ar"
      ? [
          { value: "230", label: "مشاركاً وردوا في مواد تخطيط فعالية 2025" },
          { value: "60-70", label: "فريقاً ذُكروا في مواد التخطيط الداخلية" },
          { value: "100+", label: "متطوع ومساهم تشغيلي في الوثائق المرجعية" },
          { value: "4", label: "قنوات ظهور موثقة في مواد الشراكة" }
        ]
      : [
          { value: "230", label: "participants referenced in the 2025 planning materials" },
          { value: "60-70", label: "teams mentioned in the internal planning materials" },
          { value: "100+", label: "volunteers and contributors documented in the reference files" },
          { value: "4", label: "documented sponsor-visibility channels in the partnership materials" }
        ];

  const sponsorDeliverables =
    currentLocale === "ar"
      ? [
          "إدراج شعار الجهة الشريكة على الملصقات والمطبوعات الخاصة بالفعالية.",
          "ذكر الجهة الداعمة في كلمات الافتتاح والختام والتغطية الرسمية.",
          "إظهار الشريك على الموقع الرسمي والقنوات الرقمية المرتبطة بالنادي.",
          "تقديم شهادة شكر رسمية باسم الجامعة تقديراً للمساهمة."
        ]
      : [
          "Logo placement across posters and printed event collateral.",
          "Partner acknowledgement during opening, closing, and official coverage.",
          "Partner listing on the official website and relevant digital channels.",
          "A formal university thank-you certificate recognizing the contribution."
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
                  ? "فريق Aleppo CPC على منصة إقليمية ضمن مشهد تكريم رسمي"
                  : "Aleppo CPC on a regional stage during an official recognition moment"
              }
              description={
                currentLocale === "ar"
                  ? "الشراكات الأقوى ترتبط بمجتمع يملك حضوراً عاماً ونتائج يمكن عرضها بثقة."
                  : "The strongest partnerships attach to communities with visible public presence and results that can be presented with confidence."
              }
              priority
              src="/images/acpc-photos/sponsors-stage.jpg"
              title={
                currentLocale === "ar"
                  ? "حضور يمكن للشريك أن يرتبط به."
                  : "Visibility a partner can stand behind."
              }
            />
            <p className="section-kicker">
              {currentLocale === "ar" ? "تواصل الشراكة" : "Partnership Contact"}
            </p>
            <h3>
              {currentLocale === "ar"
                ? "استخدموا قناة التواصل الرسمية لبحث نطاق الرعاية والظهور وأهداف الشراكة."
                : "Use the official contact channel to discuss sponsorship scope, visibility, and partnership goals."}
            </h3>
            <div className="section-actions">
              <Link
                className="button button-secondary button-compact"
                href="https://wa.me/971547001658"
              >
                {currentLocale === "ar" ? "راسل الفريق عبر واتساب" : "WhatsApp the Team"}
              </Link>
              <Link
                className="button button-secondary button-compact"
                href={`mailto:${settings.email}`}
              >
                {currentLocale === "ar" ? "راسل النادي عبر البريد" : "Email the Club"}
              </Link>
            </div>
          </div>
        }
      />

      <section className="section">
        <div className="panel panel-soft">
          <SectionHead
            kicker={currentLocale === "ar" ? "لماذا الشراكة" : "Why Partner"}
            title={
              currentLocale === "ar"
                ? "يجب أن تُفهم قيمة الشراكة بسرعة: مواهب، وظهور، وأثر تعليمي."
                : "The case for partnership should read quickly: talent, visibility, and educational impact."
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
          <div className="mini-grid section-compact">
            {sponsorProof.map((item) => (
              <div className="stat-card" key={item.label}>
                <div className="stat-value mono">{item.value}</div>
                <div className="stat-label">{item.label}</div>
              </div>
            ))}
          </div>
          <div className="archive-note">
            <strong>{currentLocale === "ar" ? "ملاحظة:" : "Source note:"}</strong>{" "}
            {currentLocale === "ar"
              ? "هذه الأرقام مبنية على مواد التخطيط والدعم المتاحة حالياً، ويجب تحديثها عند نشر أرقام الموسم الفعلية."
              : "These metrics are based on current planning and support materials and should be refreshed when live season figures are published."}
          </div>
        </div>
      </section>

      <section className="section">
          <SectionHead
            kicker={currentLocale === "ar" ? "الظهور" : "Visibility"}
            title={
              currentLocale === "ar"
                ? "تنجح الشراكة حين تقوم على مخرجات واضحة لا على وعود عامة."
                : "Strong sponsorship is defined by concrete deliverables, not vague promises."
            }
          />
          <div className="card-grid card-grid-4">
            {sponsorDeliverables.map((item) => (
              <article className="feature-card" key={item}>
                <h3>{currentLocale === "ar" ? "قناة ظهور" : "Visibility deliverable"}</h3>
                <p className="item-copy">{item}</p>
              </article>
            ))}
          </div>
      </section>

      <section className="section">
          <SectionHead
            kicker={currentLocale === "ar" ? "الحزم" : "Packages"}
            title={
              currentLocale === "ar"
                ? "حزم مرنة يمكن تكييفها مع أهداف الشريك دون تعقيد الواجهة العامة."
                : "Flexible packages can adapt to partner goals without complicating the public structure."
            }
          />
        <div className="tiers-grid">
          {content.tiers.map((tier) => (
            <article className="tier-card" key={tier.name}>
              <span className="tier-badge">{tier.name}</span>
              <p className="tier-audience">{tier.audience}</p>
              <ul className="bullets bullets-compact">
                {tier.benefits.map((benefit) => (
                  <li key={benefit}>{benefit}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>

      {sponsors.length > 0 ? (
        <section className="section">
          <SectionHead
            kicker={currentLocale === "ar" ? "شركاء منشورون" : "Published Partners"}
            title={
              currentLocale === "ar"
                ? "الجهات المنشورة حالياً ضمن طبقة المحتوى."
                : "Current partner entries published through the content layer."
            }
          />
          <div className="card-grid">
            {sponsors.map((sponsor) => (
              <article className="feature-card" key={sponsor.name}>
                <h3>{sponsor.name}</h3>
                <p className="muted mono">{sponsor.tier}</p>
                <p className="item-copy">{sponsor.summary}</p>
                {sponsor.websiteUrl ? (
                  <Link className="section-link" href={sponsor.websiteUrl}>
                    {currentLocale === "ar" ? "زيارة الموقع" : "Visit website"}
                  </Link>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      ) : null}

      <ContactPanel locale={currentLocale} settings={settings} />
    </>
  );
}
