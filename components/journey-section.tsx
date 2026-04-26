"use client";

import Link from "next/link";
import type { CSSProperties } from "react";

import { useHomeSlideDeck } from "@/components/home-slide-deck";

type JourneyMetric = {
  value: string;
  label: string;
};

type JourneyMapMarker = {
  x: number;
  y: number;
  label: string;
  tone?: "muted" | "strong";
};

type JourneyMap = {
  routePath: string;
  markers: JourneyMapMarker[];
  pin: { x: number; y: number; halo: number };
};

export type JourneyLevelData = {
  id: string;
  levelLabel: string;
  title: string;
  description: string;
  proof: JourneyMetric[];
  side: "start" | "end";
  map: JourneyMap;
};

type JourneyIntroSlideProps = {
  title: string;
  intro: string;
  levels: JourneyLevelData[];
};

type JourneyChapterSlideProps = {
  level: JourneyLevelData;
  index: number;
  total: number;
};

type JourneySponsorSlideProps = {
  title: string;
  description: string;
  primary: { label: string; href: string };
  secondary: { label: string; href: string };
};

type JourneyProgressRailProps = {
  items: Array<{ label: string; slideIndex: number }>;
};

export function JourneyStoryIntro({ title, intro, levels }: JourneyIntroSlideProps) {
  return (
    <section className="journey-story-slide journey-story-slide-intro">
      <div className="journey-story-shell">
        <div className="journey-story-copy journey-story-copy-intro">
          <h2>{title}</h2>
          <p className="section-copy">{intro}</p>
        </div>

        <div className="journey-overview-visual" aria-hidden="true">
          <svg className="journey-overview-route" viewBox="0 0 1200 520">
            <path
              className="journey-overview-track"
              d="M86 401 C204 338 312 274 430 240 C552 204 676 206 794 160 C904 118 1000 102 1112 110"
              pathLength="100"
            />
            <path
              className="journey-overview-fill"
              d="M86 401 C204 338 312 274 430 240 C552 204 676 206 794 160 C904 118 1000 102 1112 110"
              pathLength="100"
            />
          </svg>

          <div className="journey-overview-stops">
            {levels.map((level, index) => (
              <div className="journey-overview-stop" key={level.id} style={{ "--stop-index": index } as CSSProperties}>
                <span className="journey-overview-dot" />
                <div className="journey-overview-card">
                  <span className="mono journey-overview-index">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <strong>{level.levelLabel}</strong>
                  <span>{level.title}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export function JourneyChapterSlide({ level, index, total }: JourneyChapterSlideProps) {
  return (
    <section className="journey-story-slide journey-story-slide-stage" data-side={level.side} data-stage={level.id}>
      <div className="journey-story-shell journey-story-shell-stage">
        <div className="journey-chapter-copy">
          <div className="journey-chapter-meta">
            <span className="mono journey-chapter-index">{String(index + 1).padStart(2, "0")}</span>
            <span>{level.levelLabel}</span>
          </div>
          <h2>{level.title}</h2>
          <p className="section-copy">{level.description}</p>

          <div className="journey-proof-grid" role="list">
            {level.proof.map((item) => (
              <div className="journey-proof-box" key={item.label} role="listitem">
                <strong className="mono">{item.value}</strong>
                <span>{item.label}</span>
              </div>
            ))}
          </div>

          <div className="journey-chapter-counter">
            <span className="journey-counter-line" />
            <span>
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          </div>
        </div>

        <div className="journey-chapter-visual">
          <MapScene level={level} />
        </div>
      </div>
    </section>
  );
}

export function JourneySponsorSlide({
  title,
  description,
  primary,
  secondary
}: JourneySponsorSlideProps) {
  return (
    <section className="journey-story-slide journey-story-slide-sponsor">
      <div className="journey-story-shell">
        <div className="journey-sponsor-panel">
          <div className="journey-sponsor-panel-copy">
            <h2>{title}</h2>
            <p className="section-copy">{description}</p>
          </div>

          <div className="journey-sponsor-panel-actions">
            <Link className="button button-primary" href={primary.href}>
              {primary.label}
            </Link>
            <Link className="button button-secondary" href={secondary.href}>
              {secondary.label}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}

export function JourneyProgressRail({ items }: JourneyProgressRailProps) {
  const { activeIndex, goTo, isEnabled } = useHomeSlideDeck();
  const firstIndex = items[0]?.slideIndex ?? 0;
  const lastIndex = items[items.length - 1]?.slideIndex ?? 0;
  const visible = isEnabled && activeIndex >= firstIndex && activeIndex <= lastIndex;

  return (
    <aside aria-hidden={!visible} className="journey-progress-rail" data-visible={visible}>
      <nav aria-label="Journey stages" className="journey-progress-nav">
        {items.map((item) => (
          <button
            aria-current={activeIndex === item.slideIndex ? "step" : undefined}
            className="journey-progress-link"
            data-active={activeIndex === item.slideIndex}
            key={item.label}
            onClick={() => goTo(item.slideIndex)}
            type="button"
          >
            <span className="journey-progress-link-dot" />
            <span>{item.label}</span>
          </button>
        ))}
      </nav>
    </aside>
  );
}

function MapScene({ level }: { level: JourneyLevelData }) {
  return (
    <figure aria-hidden="true" className="journey-stage-map" data-stage={level.id}>
      <StageMedia level={level} />
      <MapUiOverlay stageId={level.id} />
      <svg className="journey-stage-map-svg" viewBox="0 0 860 620">
        <path className="journey-stage-map-route" d={level.map.routePath} />
        {level.map.markers.map((marker) => (
          <g key={`${level.id}-${marker.label}`}>
            <circle className="journey-stage-map-ring" cx={marker.x} cy={marker.y} r="22" />
            <circle
              className="journey-stage-map-marker"
              cx={marker.x}
              cy={marker.y}
              data-tone={marker.tone ?? "strong"}
              r="7"
            />
          </g>
        ))}
        <circle className="journey-stage-map-halo" cx={level.map.pin.x} cy={level.map.pin.y} r={level.map.pin.halo} />
      </svg>
    </figure>
  );
}

const STAGE_MEDIA = {
  aleppo: {
    image:
      "https://lh3.googleusercontent.com/aida-public/AB6AXuDMWfWqwc6s2khvTTZfGjboAMygRfIsh-Hrn1408vB2p9Zgox7UzXkjcvJ5VE8ezrfIHP2WvYb4PNc3HE5PdsyAFwm14-MPo84zKbbN8HJWJqvSiisYg6yN8s9tm4c5iT4tGCeLjWfyhuQl-jWUS45XnXspScFYgmft4qYYJ9HM3fmGJ6qjhkwblBqD0UwJO5-A1NKvfYiYwztNKbwPII9ywAgr0DkEBjNhUMWBY4BFzWCtdBaLUsu8qND6J3PPHS3XBseOeOk2biM"
  },
  syria: {
    image: "/images/journey/syria-scpc-2025.jpg"
  },
  region: {
    primary: "/images/journey/acpc-group-2025.jpg"
  },
  world: {
    background:
      "https://images.unsplash.com/photo-1451187580459-43490279c0fa?ixlib=rb-4.0.3&auto=format&fit=crop&w=1600&q=80"
  }
} as const;

function StageMedia({ level }: { level: JourneyLevelData }) {
  if (level.id === "aleppo") {
    return (
      <div className="journey-scene-media journey-scene-media-aleppo">
        <div className="journey-scene-orbit-ring journey-scene-orbit-ring-outer" />
        <div className="journey-scene-orbit-ring journey-scene-orbit-ring-inner" />
        <img
          alt=""
          className="journey-scene-image journey-scene-image-round"
          draggable="false"
          src={STAGE_MEDIA.aleppo.image}
        />
        <div className="journey-scene-chip journey-scene-chip-floating">{level.levelLabel}</div>
      </div>
    );
  }

  if (level.id === "syria") {
    return (
      <div className="journey-scene-media journey-scene-media-syria">
        <div className="journey-scene-bridge">
          <img
            alt=""
            className="journey-scene-image journey-scene-image-bridge"
            draggable="false"
            src={STAGE_MEDIA.syria.image}
          />
          <div className="journey-scene-bridge-icon">
            <span className="journey-scene-bridge-pulse" />
            <span className="journey-scene-bridge-core" />
          </div>
          <div className="journey-scene-caption">
            <span>{level.levelLabel}</span>
            <strong>{level.title}</strong>
          </div>
        </div>
      </div>
    );
  }

  if (level.id === "region") {
    return (
      <div className="journey-scene-media journey-scene-media-region">
        <div className="journey-scene-single">
          <img
            alt=""
            className="journey-scene-image journey-scene-image-card journey-scene-image-card-wide"
            draggable="false"
            src={STAGE_MEDIA.region.primary}
          />
        </div>
        <div className="journey-scene-chip-row">
          {level.proof.slice(0, 3).map((item) => (
            <span className="journey-scene-chip" key={item.value + item.label}>
              {item.value}
            </span>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="journey-scene-media journey-scene-media-world">
      <div
        className="journey-scene-world"
        style={{ backgroundImage: `linear-gradient(rgba(8, 14, 24, 0.52), rgba(8, 14, 24, 0.72)), url(${STAGE_MEDIA.world.background})` }}
      >
        <div className="journey-scene-world-nodes">
          {level.proof.slice(0, 2).map((item) => (
            <div className="journey-scene-world-node" key={item.value + item.label}>
              <div className="journey-scene-world-node-badge">{item.value}</div>
              <span>{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

type OverlayShape =
  | { kind: "polygon"; points: string; tone?: "soft" | "strong" | "outline" }
  | { kind: "path"; d: string; tone?: "soft" | "strong" | "outline" };

const MAP_UI_SHAPES: Record<string, OverlayShape[]> = {
  aleppo: [
    { kind: "polygon", tone: "soft", points: "48,64 272,64 334,126 304,210 48,210" },
    { kind: "polygon", tone: "outline", points: "560,404 790,404 816,446 816,560 626,560 560,500" },
    { kind: "path", tone: "strong", d: "M94 478 L220 430 L300 430" }
  ],
  syria: [
    { kind: "polygon", tone: "outline", points: "514,64 790,64 816,112 816,220 604,220 546,170" },
    { kind: "polygon", tone: "soft", points: "48,390 246,390 300,444 300,560 48,560" },
    { kind: "path", tone: "strong", d: "M566 252 L640 252 L712 286" }
  ],
  region: [
    { kind: "polygon", tone: "soft", points: "54,82 304,82 360,132 338,204 54,204" },
    { kind: "polygon", tone: "outline", points: "488,356 816,356 816,560 598,560 542,490 488,490" },
    { kind: "path", tone: "strong", d: "M332 280 L456 324 L548 324" }
  ],
  world: [
    { kind: "polygon", tone: "outline", points: "56,90 284,90 346,144 326,210 56,210" },
    { kind: "polygon", tone: "soft", points: "516,362 816,362 816,552 628,552 566,484 516,484" },
    { kind: "path", tone: "strong", d: "M370 278 L514 248 L670 248" }
  ]
};

function MapUiOverlay({ stageId }: { stageId: string }) {
  const shapes = MAP_UI_SHAPES[stageId] ?? [];

  return (
    <svg aria-hidden="true" className="journey-stage-map-ui" viewBox="0 0 860 620">
      <path className="journey-stage-map-frame" d="M28 28 H216 M28 28 V152 M832 28 H646 M832 28 V152 M28 592 H214 M28 592 V468 M832 592 H646 M832 592 V468" />
      {shapes.map((shape, index) =>
        shape.kind === "polygon" ? (
          <polygon
            className="journey-stage-map-ui-shape"
            data-tone={shape.tone ?? "soft"}
            key={`${stageId}-polygon-${index}`}
            points={shape.points}
          />
        ) : (
          <path
            className="journey-stage-map-ui-shape"
            d={shape.d}
            data-tone={shape.tone ?? "soft"}
            key={`${stageId}-path-${index}`}
          />
        )
      )}
      <g className="journey-stage-map-anchors">
        <circle cx="86" cy="86" r="4" />
        <circle cx="774" cy="86" r="4" />
        <circle cx="86" cy="534" r="4" />
        <circle cx="774" cy="534" r="4" />
      </g>
    </svg>
  );
}
