import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { locales } from "@/lib/i18n";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Aleppo CPC — competitive programming at the University of Aleppo";

// Without this the image is generated per request instead of at build time.
export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

const BG = "#0d0d0d";
const PAPER = "#e7e0cf";
const GOLD = "#d4af37";
const TEAL = "#0f5c5c";
const RUST = "#c96b2c";

/**
 * The card is deliberately Latin-only in both locales.
 *
 * Satori, the renderer behind ImageResponse, does not implement the Unicode
 * bidi algorithm: Arabic glyphs shape correctly but word order comes out
 * scrambled ("جامعة حلب" renders as "حلبجامعة"). Since "Aleppo CPC" is the
 * brand in both languages, a Latin card is correct rather than a compromise.
 * An Arabic card needs a pre-rendered PNG, not this route.
 */
export default async function OpengraphImage() {
  const fontsDir = join(process.cwd(), "app", "fonts");
  const [regular, bold] = await Promise.all([
    readFile(join(fontsDir, "Cairo-Regular.ttf")),
    readFile(join(fontsDir, "Cairo-Bold.ttf"))
  ]);

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: BG,
          padding: "72px 80px",
          fontFamily: "Cairo",
          direction: "ltr"
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div style={{ width: 14, height: 14, borderRadius: 999, background: RUST }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: GOLD }} />
          <div style={{ width: 14, height: 14, borderRadius: 999, background: TEAL }} />
          <div
            style={{
              marginInlineStart: 18,
              fontSize: 24,
              letterSpacing: 6,
              color: PAPER,
              opacity: 0.66,
              fontWeight: 400
            }}
          >
            {"UNIVERSITY OF ALEPPO"}
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 22 }}>
          <div
            style={{
              fontSize: 112,
              fontWeight: 700,
              color: PAPER,
              lineHeight: 1.02,
              letterSpacing: -3
            }}
          >
            Aleppo CPC
          </div>
          <div style={{ fontSize: 34, color: PAPER, opacity: 0.78, lineHeight: 1.35, maxWidth: 940 }}>
            Competitive programming and problem solving at the University of Aleppo
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 26 }}>
          <div style={{ width: "100%", height: 2, background: GOLD, opacity: 0.5 }} />
          <div
            style={{
              fontSize: 27,
              letterSpacing: 8,
              color: GOLD,
              fontWeight: 700
            }}
          >
            CODE. SOLVE. GROW. IMPACT.
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        { name: "Cairo", data: regular, weight: 400, style: "normal" },
        { name: "Cairo", data: bold, weight: 700, style: "normal" }
      ]
    }
  );
}
