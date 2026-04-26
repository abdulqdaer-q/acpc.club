"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

import { Locale } from "@/lib/i18n";
import { HeroBlock } from "@/lib/site-content";

type NetworkInformationLike = {
  effectiveType?: string;
  saveData?: boolean;
};

type AdaptiveHeroCoverProps = {
  hero: HeroBlock;
  locale: Locale;
};

export function AdaptiveHeroCover({
  hero,
  locale
}: AdaptiveHeroCoverProps) {
  const posterSrc = "/media/acpc-promo/poster-31-1080.jpg";
  const videoSrc = "/media/acpc-promo/hero-preview-31-36-55-75-1080.mp4";
  const [shouldAutoplay, setShouldAutoplay] = useState(false);
  const [canLoadOnDemand, setCanLoadOnDemand] = useState(false);
  const [isLoadedOnDemand, setIsLoadedOnDemand] = useState(false);

  useEffect(() => {
    const connection = (navigator as Navigator & { connection?: NetworkInformationLike })
      .connection;
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isSlowConnection =
      connection?.saveData === true ||
      connection?.effectiveType === "slow-2g" ||
      connection?.effectiveType === "2g" ||
      connection?.effectiveType === "3g";

    if (connection && !prefersReducedMotion && !isSlowConnection) {
      setShouldAutoplay(true);
      return;
    }

    setCanLoadOnDemand(true);
  }, []);

  const shouldLoadVideo = shouldAutoplay || isLoadedOnDemand;

  return (
    <section className="hero-cover">
      <div className="hero-cover-media">
        <Image
          alt={locale === "ar" ? "لقطة من فيديو Aleppo CPC" : "Frame from the Aleppo CPC promo"}
          className="hero-cover-poster"
          fill
          priority
          sizes="100vw"
          src={posterSrc}
        />

        {shouldLoadVideo ? (
          <video
            autoPlay
            className="hero-cover-video"
            loop
            muted
            playsInline
            poster={posterSrc}
            preload={shouldAutoplay ? "metadata" : "none"}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>

      <div className="hero-cover-overlay" />

      <div className="hero-cover-inner">
        <div className="hero-cover-panel">
          <h1>{hero.title}</h1>
          <p className="hero-text hero-cover-text">{hero.description}</p>

          <div className="cta-row">
            <Link className="button button-primary" href={hero.primaryCta.href}>
              {hero.primaryCta.label}
            </Link>
            <Link className="button button-secondary" href={hero.secondaryCta.href}>
              {hero.secondaryCta.label}
            </Link>
            {canLoadOnDemand && !isLoadedOnDemand ? (
              <button
                className="button button-secondary hero-cover-play"
                onClick={() => setIsLoadedOnDemand(true)}
                type="button"
              >
                {locale === "ar" ? "شاهد الفيديو" : "Watch the video"}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
