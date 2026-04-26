import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";

import { Locale } from "@/lib/i18n";
import { HeroBlock, SiteSettings } from "@/lib/site-content";

export function PageHero({
  hero,
  side,
  locale
}: {
  hero: HeroBlock;
  side?: ReactNode;
  locale: Locale;
}) {
  return (
    <section
      aria-label={locale === "ar" ? "مقدمة الصفحة" : "Page introduction"}
      className="page-hero"
    >
      <div className="shell page-hero-inner">
        <div className="hero">
          <div className="hero-main">
            <div className="page-hero-meta">
              {hero.eyebrow ? <span className="eyebrow">{hero.eyebrow}</span> : null}
            </div>
            <h1>{hero.title}</h1>
            <p className="hero-text">{hero.description}</p>
            <div className="cta-row">
              <Link className="button button-primary" href={hero.primaryCta.href}>
                {hero.primaryCta.label}
              </Link>
              <Link className="button button-secondary" href={hero.secondaryCta.href}>
                {hero.secondaryCta.label}
              </Link>
            </div>
          </div>
          {side ? <aside className="hero-side">{side}</aside> : null}
        </div>
      </div>
    </section>
  );
}

export function SectionHead({
  kicker,
  title,
  description
}: {
  kicker: string;
  title: string;
  description?: string;
}) {
  return (
    <div className="section-head">
      <div>
        <p className="section-kicker">{kicker}</p>
        <h2>{title}</h2>
      </div>
      {description ? <p className="section-copy section-head-copy">{description}</p> : null}
    </div>
  );
}

export function EditorialPhoto({
  src,
  alt,
  title,
  description,
  priority
}: {
  src: string;
  alt: string;
  title?: string;
  description?: string;
  priority?: boolean;
}) {
  return (
    <figure className="editorial-photo">
      <div className="editorial-photo-frame">
        <Image
          alt={alt}
          className="editorial-photo-image"
          height={960}
          priority={priority}
          src={src}
          width={1280}
        />
      </div>
      {title || description ? (
        <figcaption className="editorial-photo-caption">
          {title ? <strong>{title}</strong> : null}
          {description ? <p className="item-copy">{description}</p> : null}
        </figcaption>
      ) : null}
    </figure>
  );
}

export function ContactPanel({
  locale,
  settings
}: {
  locale: Locale;
  settings: SiteSettings;
}) {
  const emailSubject =
    locale === "ar"
      ? "استفسار رسمي - Aleppo CPC"
      : "Official Inquiry - Aleppo CPC";
  const emailHref = `mailto:${settings.email}?subject=${encodeURIComponent(emailSubject)}`;

  return (
    <section className="section">
      <div className="contact-panel">
        <div className="contact-copy-block">
          <p className="section-kicker">{locale === "ar" ? "التواصل" : "Contact"}</p>
          <h2>
            {locale === "ar"
              ? "للتواصل الرسمي والشراكات."
              : "Official contact for partnerships and inquiries."}
          </h2>
          <p className="section-copy">
            {locale === "ar"
              ? "للاستفسارات المتعلقة بالرعاية والتنسيق الجامعي والتغطية الإعلامية والتواصل الرسمي مع Aleppo CPC، استخدموا القنوات التالية."
              : "For sponsorships, university coordination, media requests, and official communication with Aleppo CPC, use the channels below."}
          </p>
        </div>
        <div className="contact-actions">
          <Link className="button button-primary" href={emailHref}>
            {locale === "ar" ? "راسل النادي عبر البريد" : "Email the Club"}
          </Link>
          <Link className="button button-secondary" href="https://wa.me/971547001658">
            {locale === "ar" ? "راسل الفريق عبر واتساب" : "WhatsApp the Team"}
          </Link>
        </div>

        <div className="contact-meta">
          <article className="contact-card">
            <p className="contact-card-label">
              {locale === "ar" ? "البريد الرسمي" : "Official email"}
            </p>
            <h3>{settings.email}</h3>
            <p className="item-copy">
              {locale === "ar"
                ? "للمراسلات الرسمية والشراكات والطلبات الإعلامية."
                : "For formal communication, sponsorships, and media requests."}
            </p>
          </article>

          <article className="contact-card">
            <p className="contact-card-label">{locale === "ar" ? "الموقع" : "Location"}</p>
            <h3>{settings.location}</h3>
            <p className="item-copy">
              {locale === "ar"
                ? "جامعة حلب والمجتمع التقني المحيط بها."
                : "University of Aleppo and the surrounding technical community."}
            </p>
          </article>
        </div>
      </div>
    </section>
  );
}
