"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { AcpcLogo } from "@/components/acpc-logo";
import { Locale } from "@/lib/i18n";
import { HeroBlock } from "@/lib/site-content";

type AdaptiveHeroCoverProps = {
  hero: HeroBlock;
  locale: Locale;
};

type StaticHeroCoverProps = {
  hero: HeroBlock;
  locale: Locale;
  posterSrc?: string;
  alt?: string;
  className?: string;
};

const HERO_VIDEO_SRC = "/media/acpc-promo/hero-club-safe.mp4";
const HERO_VIDEO_POSTER = "/media/acpc-promo/hero-club-safe-poster.jpg";

function HeroActions({ hero }: { hero: HeroBlock }) {
  return (
    <div className="cta-row">
      <Link className="button button-primary" href={hero.primaryCta.href}>
        {hero.primaryCta.label}
      </Link>
      <Link className="button button-secondary" href={hero.secondaryCta.href}>
        {hero.secondaryCta.label}
      </Link>
    </div>
  );
}

function BrandCircuitBackdrop({ locale }: { locale: Locale }) {
  return (
    <div className="hero-brand-visual" aria-hidden="true">
      <div className="hero-brand-castle">
        <AcpcLogo size="lg" />
      </div>

      <svg className="hero-circuit-svg" viewBox="0 0 1200 760">
        <path
          className="hero-circuit-line hero-circuit-line-primary"
          d="M104 612 H238 V520 H354 V430 H468 V332 H594"
          pathLength="100"
        />
        <path
          className="hero-circuit-line hero-circuit-line-secondary"
          d="M1096 142 H952 V226 H830 V318 H708 V424 H606"
          pathLength="100"
        />
        <path
          className="hero-circuit-line hero-circuit-line-accent"
          d="M206 156 H356 V246 H474 V344 H594 V488 H740 V600 H1002"
          pathLength="100"
        />
        <path
          className="hero-circuit-line hero-circuit-line-soft"
          d="M128 414 H274 V344 H396 V258 H514"
          pathLength="100"
        />
        <path
          className="hero-circuit-line hero-circuit-line-soft"
          d="M1088 502 H916 V430 H798 V342 H682"
          pathLength="100"
        />

        {[
          [104, 612],
          [238, 520],
          [354, 430],
          [594, 332],
          [1096, 142],
          [952, 226],
          [830, 318],
          [606, 424],
          [206, 156],
          [474, 344],
          [740, 600],
          [1002, 600]
        ].map(([cx, cy]) => (
          <circle className="hero-circuit-node" cx={cx} cy={cy} key={`${cx}-${cy}`} r="9" />
        ))}
      </svg>

      <div className="hero-brand-label">
        {locale === "ar" ? "CODE. SOLVE. GROW. IMPACT." : "CODE. SOLVE. GROW. IMPACT."}
      </div>
    </div>
  );
}

type NetworkInformation = {
  saveData?: boolean;
  effectiveType?: string;
};

const SLOW_CONNECTIONS = ["slow-2g", "2g", "3g"];

/**
 * The hero video is decorative: the poster frame says the same thing for a
 * tenth of the bytes. So we hold the video back until the client tells us the
 * connection can carry it, and never fetch it at all under Data Saver.
 *
 * Browsers without the Network Information API (Safari, Firefox) fall through
 * to loading it — refusing everywhere we cannot measure would strip the video
 * from a large share of visitors who can comfortably afford it.
 */
function useAllowsHeavyMedia() {
  const [allowed, setAllowed] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;

    if (!connection) {
      setAllowed(true);
      return;
    }

    if (connection.saveData) {
      return;
    }

    setAllowed(!SLOW_CONNECTIONS.includes(connection.effectiveType ?? ""));
  }, []);

  return allowed;
}

export function AdaptiveHeroCover({ hero, locale }: AdaptiveHeroCoverProps) {
  const allowsHeavyMedia = useAllowsHeavyMedia();

  return (
    <section className="hero-cover hero-cover-video-shell">
      <div className="hero-cover-media">
        <video
          autoPlay
          className="hero-cover-video"
          loop
          muted
          playsInline
          poster={HERO_VIDEO_POSTER}
          preload={allowsHeavyMedia ? "auto" : "none"}
          src={allowsHeavyMedia ? HERO_VIDEO_SRC : undefined}
        />
        <BrandCircuitBackdrop locale={locale} />
      </div>

      <div className="hero-cover-overlay" />

      <div className="hero-cover-inner">
        <div className="hero-cover-panel">
          <h1>{hero.title}</h1>
          <p className="hero-text hero-cover-text">{hero.description}</p>
          <HeroActions hero={hero} />
        </div>
      </div>
    </section>
  );
}

export function StaticHeroCover({
  hero,
  locale,
  posterSrc,
  alt,
  className
}: StaticHeroCoverProps) {
  const coverClassName = [
    "hero-cover",
    posterSrc ? "hero-cover-static" : "hero-cover-brand",
    className
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <section className={coverClassName}>
      <div className="hero-cover-media">
        {posterSrc ? (
          <Image
            alt={alt ?? hero.title}
            className="hero-cover-poster"
            fill
            priority
            sizes="100vw"
            src={posterSrc}
          />
        ) : (
          <BrandCircuitBackdrop locale={locale} />
        )}
      </div>

      <div className="hero-cover-overlay" />

      <div className="hero-cover-inner">
        <div className="hero-cover-panel">
          <h1>{hero.title}</h1>
          <p className="hero-text hero-cover-text">{hero.description}</p>
          <HeroActions hero={hero} />
        </div>
      </div>
    </section>
  );
}
