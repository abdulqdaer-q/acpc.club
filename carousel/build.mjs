/**
 * Builds the Arabic LinkedIn launch carousel as six 1080×1350 PNGs.
 *
 * Text is rendered by a real browser, not an image model. Arabic needs the
 * Unicode bidi algorithm and proper glyph shaping; image generators produce
 * scrambled letterforms, and Satori (which powers the site's Open Graph card)
 * reverses word order. Chrome gets it right, so the slides are HTML.
 *
 * Usage:  node carousel/build.mjs
 * Output: carousel/out/slide-1..6.html and .png
 *
 * Edit SLIDES below to change copy, then re-run.
 */

import { spawn, spawnSync } from "node:child_process";
import { mkdirSync, writeFileSync, existsSync, rmSync, statSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const here = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(here, "..");
const outDir = path.join(here, "out");

const W = 1080;
const H = 1350;
const PORT = 4321;

const CHROME = [
  "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
  "/Applications/Chromium.app/Contents/MacOS/Chromium",
  "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge"
].find((p) => existsSync(p));

if (!CHROME) {
  console.error("No Chrome/Chromium/Edge found. Install one, or open the generated HTML and screenshot manually.");
  process.exit(1);
}

// ---------------------------------------------------------------------------
// Content. Western digits are used inside Arabic on purpose — it matches the
// website and is standard in Arabic technical writing.
// ---------------------------------------------------------------------------

const SLIDES = [
  {
    eyebrow: "الموقع الرسمي",
    kind: "hero",
    title: "موقعنا الجديد<br><em>متاح الآن</em>",
    body: "مجتمع البرمجة التنافسية في جامعة حلب صار له موقعه الخاص، بالعربية والإنجليزية.",
    url: "aleppo.icpc.club"
  },
  {
    eyebrow: "من نحن",
    kind: "photo",
    photo: "/public/images/journey/aleppo-meeting.jpg",
    focus: "50% 30%",
    title: "نادٍ طلابي تطوعي مستقل",
    body: "نجمع الطلبة والمتسابقين والخريجين والمدربين في منظومة تدريب ومنافسة مستمرة: جلسات أسبوعية، مسارات تعلم، مسابقات تجريبية، وإشراف فردي."
  },
  {
    eyebrow: "المسار",
    kind: "steps",
    title: "من قاعة الجامعة<br>إلى النهائي العالمي",
    steps: [
      { n: "01", ar: "مستوى الجامعة", en: "University" },
      { n: "02", ar: "المستوى السوري", en: "Syria — SCPC" },
      { n: "03", ar: "العرب وأفريقيا", en: "Arab & Africa — ACPC" },
      { n: "04", ar: "النهائي العالمي", en: "ICPC World Finals" }
    ]
  },
  {
    eyebrow: "مسابقة الجامعة 2026",
    kind: "stats",
    title: "1 – 2 أيلول 2026",
    stats: [
      { v: "135", l: "فريقاً مسجلاً" },
      { v: "500", l: "متسابق مسجل" },
      { v: "100", l: "متطوع ومنظّم" }
    ],
    note: "مقارنة بـ66 فريقاً في 2025 — نمو يقارب 105%"
  },
  {
    eyebrow: "على الموقع",
    kind: "list",
    title: "ماذا ستجد؟",
    items: [
      "المسار التنافسي كاملاً بمراحله الأربع",
      "برامج التدريب والمسارات التعليمية",
      "الهيكل التنظيمي ومن يقف خلف النادي",
      "أرشيف الإنجازات والنتائج الموثقة",
      "طرق التطوع والانضمام إلى الفرق",
      "ملف الشراكات والرعاية"
    ]
  },
  {
    eyebrow: "تفضلوا بالزيارة",
    kind: "cta",
    title: "aleppo.icpc.club",
    body: "متاح بالعربية والإنجليزية.",
    disclaimer:
      "نادٍ طلابي جامعي مستقل. يشير استخدام ICPC إلى مجال المسابقة البرمجية الجامعية، ولا يعني تمثيل المنظمة الدولية أو التحدث باسمها."
  }
];

// ---------------------------------------------------------------------------
// Template
// ---------------------------------------------------------------------------

const css = `
@font-face { font-family: Cairo; src: url('/app/fonts/Cairo-Regular.ttf') format('truetype'); font-weight: 400; font-display: block; }
@font-face { font-family: Cairo; src: url('/app/fonts/Cairo-SemiBold.ttf') format('truetype'); font-weight: 600; font-display: block; }
@font-face { font-family: Cairo; src: url('/app/fonts/Cairo-Bold.ttf') format('truetype'); font-weight: 700; font-display: block; }

:root {
  --bg: #0d0d0d;
  --paper: #e7e0cf;
  --muted: rgba(231,224,207,0.66);
  --faint: rgba(231,224,207,0.40);
  --line: rgba(231,224,207,0.16);
  --gold: #d4af37;
  --teal: #4a9a9a;
  --rust: #c96b2c;
  --mono: "SF Mono", Menlo, Consolas, monospace;
}

* { margin: 0; padding: 0; box-sizing: border-box; }

html, body { width: ${W}px; height: ${H}px; }

body {
  background: var(--bg);
  color: var(--paper);
  font-family: Cairo, sans-serif;
  direction: rtl;
  overflow: hidden;
  position: relative;
}

.bleed { position: absolute; inset: 0; z-index: 0; }
.bleed img { width: 100%; height: 100%; object-fit: cover; }
.bleed::after {
  content: ""; position: absolute; inset: 0;
  background: linear-gradient(to top,
    rgba(13,13,13,0.985) 30%,
    rgba(13,13,13,0.90) 44%,
    rgba(13,13,13,0.40) 74%,
    rgba(13,13,13,0.20) 100%);
}
body[data-photo="1"] .mid { justify-content: flex-end; padding-bottom: 12px; }

.frame {
  position: relative; z-index: 1;
  height: 100%; padding: 88px;
  display: flex; flex-direction: column;
}

/* header */
.top { display: flex; align-items: center; gap: 20px; }
.dots { display: flex; gap: 9px; }
.dots i { width: 13px; height: 13px; border-radius: 999px; }
.eyebrow {
  /* No letter-spacing: it severs the cursive joins between Arabic letters. */
  font-size: 24px; color: var(--faint); font-weight: 400;
}
.count { margin-inline-start: auto; font-family: var(--mono); font-size: 22px; color: var(--faint); letter-spacing: 2px; direction: ltr; }

/* body */
.mid { flex: 1; display: flex; flex-direction: column; justify-content: center; gap: 34px; }

h1 { font-size: 96px; line-height: 1.12; font-weight: 700; letter-spacing: -1px; }
h1 em { font-style: normal; color: var(--gold); }
h1.small { font-size: 76px; }
h1.url { font-family: var(--mono); font-size: 72px; color: var(--gold); direction: ltr; text-align: right; letter-spacing: -2px; }

.body { font-size: 34px; line-height: 1.6; color: var(--muted); max-width: 22ch; }
.body.wide { max-width: none; }

/* steps */
.steps { display: flex; flex-direction: column; gap: 0; }
.step { display: flex; align-items: baseline; gap: 26px; padding: 26px 0; border-top: 1px solid var(--line); }
.step:last-child { border-bottom: 1px solid var(--line); }
.step .n { font-family: var(--mono); font-size: 26px; color: var(--gold); }
.step .ar { font-size: 44px; font-weight: 600; }
.step .en { margin-inline-start: auto; font-family: var(--mono); font-size: 24px; color: var(--faint); direction: ltr; }

/* stats */
.stats { display: flex; gap: 0; border-top: 1px solid var(--line); border-bottom: 1px solid var(--line); }
.stat { flex: 1; padding: 34px 0; text-align: center; border-inline-start: 1px solid var(--line); }
.stat:first-child { border-inline-start: 0; }
.stat .v { font-family: var(--mono); font-size: 82px; font-weight: 700; color: var(--gold); line-height: 1; }
.stat .l { margin-top: 12px; font-size: 25px; color: var(--muted); }

/* list */
.items { display: flex; flex-direction: column; gap: 22px; }
.item { display: flex; align-items: baseline; gap: 20px; font-size: 36px; line-height: 1.45; }
.item::before { content: ""; width: 11px; height: 11px; background: var(--gold); flex: none; transform: translateY(-6px); }

.note { font-size: 26px; color: var(--faint); }

/* footer */
.bot { display: flex; align-items: flex-end; gap: 24px; padding-top: 30px; border-top: 1px solid var(--line); }
.wordmark { font-family: var(--mono); font-size: 26px; color: var(--muted); direction: ltr; }
.motto { margin-inline-start: auto; font-family: var(--mono); font-size: 19px; letter-spacing: 3px; color: var(--gold); direction: ltr; }
.disclaimer { font-size: 21px; line-height: 1.5; color: var(--faint); max-width: 46ch; }
`;

function frameTop(slide, i) {
  return `<div class="top">
      <div class="dots"><i style="background:#c96b2c"></i><i style="background:#d4af37"></i><i style="background:#4a9a9a"></i></div>
      <div class="eyebrow">${slide.eyebrow}</div>
      <div class="count">0${i + 1} / 0${SLIDES.length}</div>
    </div>`;
}

function frameBottom(slide) {
  if (slide.kind === "cta") {
    return `<div class="bot"><p class="disclaimer">${slide.disclaimer}</p></div>`;
  }
  if (slide.kind === "hero") {
    return `<div class="bot"><div class="motto" style="margin-inline-start:0">CODE. SOLVE. GROW. IMPACT.</div></div>`;
  }
  return `<div class="bot">
      <div class="wordmark">aleppo.icpc.club</div>
      <div class="motto">CODE. SOLVE. GROW. IMPACT.</div>
    </div>`;
}

function middle(slide) {
  switch (slide.kind) {
    case "hero":
      return `<h1>${slide.title}</h1>
        <p class="body wide">${slide.body}</p>
        <p class="h1 url" style="font-family:var(--mono);font-size:56px;color:var(--gold);direction:ltr;text-align:right">${slide.url}</p>`;
    case "photo":
      return `<h1 class="small">${slide.title}</h1><p class="body wide">${slide.body}</p>`;
    case "steps":
      return `<h1 class="small">${slide.title}</h1>
        <div class="steps">${slide.steps
          .map(
            (s) =>
              `<div class="step"><span class="n">${s.n}</span><span class="ar">${s.ar}</span><span class="en">${s.en}</span></div>`
          )
          .join("")}</div>`;
    case "stats":
      return `<h1 class="small">${slide.title}</h1>
        <div class="stats">${slide.stats
          .map((s) => `<div class="stat"><div class="v">${s.v}</div><div class="l">${s.l}</div></div>`)
          .join("")}</div>
        <p class="note">${slide.note}</p>`;
    case "list":
      return `<h1 class="small">${slide.title}</h1>
        <div class="items">${slide.items.map((t) => `<div class="item"><span>${t}</span></div>`).join("")}</div>`;
    case "cta":
      return `<h1 class="url">${slide.title}</h1><p class="body wide">${slide.body}</p>`;
    default:
      return "";
  }
}

function render(slide, i) {
  const bleed = slide.photo
    ? `<div class="bleed"><img src="${slide.photo}" style="object-position:${slide.focus || "50% 50%"}" alt=""></div>`
    : "";
  return `<!doctype html>
<html lang="ar" dir="rtl">
<head><meta charset="utf-8"><title>slide ${i + 1}</title><style>${css}</style></head>
<body${slide.photo ? ' data-photo="1"' : ""}>
${bleed}
<div class="frame">
  ${frameTop(slide, i)}
  <div class="mid">${middle(slide)}</div>
  ${frameBottom(slide)}
</div>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Build
// ---------------------------------------------------------------------------

rmSync(outDir, { recursive: true, force: true });
mkdirSync(outDir, { recursive: true });

SLIDES.forEach((slide, i) => {
  writeFileSync(path.join(outDir, `slide-${i + 1}.html`), render(slide, i));
});
console.log(`wrote ${SLIDES.length} html slides to carousel/out/`);

// Serve the repo root so /public/... and /app/fonts/... resolve.
const server = spawnSync("bash", [
  "-c",
  `cd ${JSON.stringify(repoRoot)} && (python3 -m http.server ${PORT} --bind 127.0.0.1 >/dev/null 2>&1 & echo $!)`
], { encoding: "utf8" });
const pid = server.stdout.trim();

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

/**
 * Chrome writes the screenshot and then does not exit — verified across both
 * --headless=old and --headless=new. So rather than waiting on the process, poll
 * for the PNG to appear and settle, then kill it.
 */
async function shoot(n) {
  const out = path.join(outDir, `slide-${n}.png`);
  const child = spawn(CHROME, [
    "--headless=old",
    "--disable-gpu",
    "--no-sandbox",
    "--hide-scrollbars",
    "--no-first-run",
    "--no-default-browser-check",
    "--disable-extensions",
    "--force-device-scale-factor=1",
    // Fonts must be loaded before the shot; this also makes Chrome deterministic.
    "--virtual-time-budget=4000",
    // Chrome refuses to start headless without a writable profile directory.
    `--user-data-dir=${path.join(outDir, ".chrome-profile", String(n))}`,
    `--window-size=${W},${H}`,
    `--screenshot=${out}`,
    `http://127.0.0.1:${PORT}/carousel/out/slide-${n}.html`
  ], { stdio: "ignore", detached: true });

  const deadline = Date.now() + 30000;
  let size = 0;
  let stable = 0;
  while (Date.now() < deadline) {
    await sleep(250);
    let current = 0;
    try { current = statSync(out).size; } catch { /* not written yet */ }
    if (current > 2000 && current === size) {
      if (++stable >= 2) break;
    } else {
      stable = 0;
    }
    size = current;
  }

  try { process.kill(-child.pid, "SIGKILL"); } catch { try { child.kill("SIGKILL"); } catch { /* gone */ } }
  return size > 2000;
}

try {
  spawnSync("bash", ["-c", `for i in $(seq 1 40); do sleep 0.3; curl -sf -o /dev/null http://127.0.0.1:${PORT}/ && break; done`]);

  for (let i = 0; i < SLIDES.length; i++) {
    const n = i + 1;
    const ok = await shoot(n);
    console.log(ok ? `rendered slide-${n}.png` : `slide-${n}.png FAILED`);
  }
} finally {
  if (pid) spawnSync("bash", ["-c", `kill ${pid} 2>/dev/null || true`]);
  rmSync(path.join(outDir, ".chrome-profile"), { recursive: true, force: true });
}
