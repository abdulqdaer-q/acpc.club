# Project handoff — aleppo.icpc.club & icpc.club

Context for anyone (human or AI) picking this up cold. Written 17 Aug 2026.
Everything below is either non-obvious from the code or expensive to rediscover.

---

## 1. What this repo is

One repo, two deployed sites:

| Site | Stack | Lives in |
|---|---|---|
| **aleppo.icpc.club** | Next 15 App Router, bilingual en/ar, deployed as a standalone Node bundle to Namecheap cPanel | repo root |
| **icpc.club** (apex) | Three static files, no build step | `apex/` |

The repo directory, git remote, and npm package are all still named `acpc.club`
from the previous domain. **That is deliberate — do not "fix" it.** Only URLs
moved to `aleppo.icpc.club`.

Owner: **AbdulQader Qassab**, General Supervisor of the club. Club President is
Bassam Suleiman. Working language is Arabic for club and university-facing
material, English for technical work.

---

## 2. Architecture decisions that look wrong but aren't

Each of these was a deliberate trade. Reverting one silently breaks something.

**`app/[locale]/layout.tsx` is the root layout. There is no `app/layout.tsx`.**
Next requires the root layout to own `<html>`, and the locale is only known inside
`[locale]`. Previously `<html lang="en">` was hardcoded and `lang`/`dir` were set on
a `div`, so every Arabic page told Google it was English. Do not add
`app/layout.tsx` back.

**`dynamicParams = false`** on that layout. Unknown locales 404 at the router with
no render and no cache entry — important on a public site, where bots probe
`/wp-admin`, `/.env` and so on. Side effect: those requests log
`NoFallbackError`. The response is still a correct 404 with the branded page.
Filter the log line; don't "fix" it by enabling dynamic params, which would let bot
probes trigger renders and cache writes.

**`revalidate = false`** — fully static, rendered once at build. There is no
database to poll, so timed revalidation would regenerate identical HTML and burn
CPU on shared hosting. If a CMS is ever added, set this to a number of seconds.

**`output: "standalone"`, not a static export.** The export would drop the
`/llms.txt` and robots/sitemap route handlers, the `/` → `/en` redirect, and
on-demand `next/image` optimization. This means **the hosting plan must support
Node.js apps** (Namecheap Stellar Business or higher).

**CSP keeps `'unsafe-inline'` on `script-src` and `style-src`.** Next inlines its
hydration payload and `next/image` sets inline style attributes. The strict
alternative is a per-request nonce, which needs middleware and turns every page
dynamic — undoing the static build. Host restrictions are still `'self'` throughout,
because the site loads no third-party scripts, fonts, or images.

**No HSTS in code.** It belongs on Apache, which terminates TLS. Setting it before
AutoSSL is confirmed would lock visitors out of a site the browser then refuses to
load over http.

**`app/not-found.tsx` carries its own `<html>`/`<body>`.** Unmatched paths never
enter the `[locale]` segment, so there is no chrome to inherit. A
`app/[locale]/not-found.tsx` is unreachable — a segment not-found only catches
`notFound()` thrown *inside* that segment, and `dynamicParams = false` means
nothing there ever throws it.

**`outputFileTracingExcludes`** drops `typescript`, `caniuse-lite`, and `@types`
from the bundle. Next traces them in despite nothing needing them at runtime;
together they were ~11 MB of the upload.

---

## 3. Where content comes from

**All content is in `lib/site-content.ts`**, both locales, and the accessors at the
bottom of that file return it directly. No CMS, no runtime fetch.

Supabase was **removed** in Aug 2026 — client, schema, and seed are in git history.
It had never actually been provisioned; the site always ran on these defaults. The
accessors are the single seam a CMS would slot into; no page or component reads
data directly.

**Editing content means editing that file and redeploying.** There is no admin UI.

Journey-stage copy is separate, in `lib/journey-content.ts`.

---

## 4. Deploying

```bash
# .env.production must exist FIRST — see below
npm run build-namecheap        # → dist/namecheap-deploy.zip (~22.6 MB)
```

`.env.production` (gitignored) needs only:

```
NEXT_PUBLIC_SITE_URL=https://aleppo.icpc.club
```

**It must exist before the build, not just on the server.** `NEXT_PUBLIC_*` values
are inlined at build time and every page is pre-rendered, so a build without it
ships the hardcoded fallback.

Upload and extract the zip into the app root, then cPanel → **Setup Node.js App**:
Node 20+, Application mode Production, startup file `server.js`. Full procedure
including the `.htaccess` proxy is in `NAMECHEAP-DEPLOYMENT.md`.

The apex site is separate: copy `apex/`'s three files into the `icpc.club` document
root. No build.

---

## 5. Club facts — authoritative values

- **Public brand:** Aleppo CPC. **Formal name:** Aleppo ICPC Club. Both are correct;
  the split is deliberate (trading name vs. registered name).
- **The club is NOT an ICPC chapter, branch, or representative.** An independence
  disclaimer appears in the site footer, in `llms.txt`, in the Organization schema's
  `disambiguatingDescription`, and prominently on the apex page. Keep it everywhere.
- **2026 university contest:** 1–2 September 2026 · **135 registered teams** ·
  **~500 registered contestants** · **~100 volunteers** · **~105% growth** from 66
  teams in 2025.
- **500 does not divide into 135 teams of three** (135 × 3 = 405). It is total
  individual registrations. Public copy says "registered contestants" for that
  reason. Never present it as the competing headcount.
- **Superseded numbers still circulating:** 131 teams and ≈98% growth (Profile v1.0),
  and 150 teams / 127% (a mid-session draft). Neither is current.
- **SCPC 2024:** Aleppo teams took 1st and 2nd place.
- **World Finals:** five seasons. Year labels are disputed — see §7.
- Achievements belong collectively to contestants, coaches, organisers, alumni, and
  the university, not to the club alone. Preserve that framing.

### Contact addresses — they differ per site
- `hello@aleppo.icpc.club` — the club site (footer, contact card, all `mailto:`,
  schema.org). Driven by `settings.email` in `lib/site-content.ts`, both locales.
- `hello@icpc.club` — the apex page only.

### Org roles (9)
General Supervisor AbdulQader Qassab · Club President Bassam Suleiman · Vice
President AbdulKarim Jammal · Head of Scientific Committee Mohammad Ward Kayali ·
Head of Operations Mohammad Rasoul Daryas · Operations Coordinator Mohammad Bitar ·
Head of Development Mohammad Bitar · Technical Systems Manager Mohammad Mortakli ·
Media Manager Baraa Nayyal.

Mohammad Bitar holds **two** roles — that is intentional, not a duplication. Titles
were reconciled against the club profile document in Aug 2026; the site previously
used "Operations Coordinator" for Daryas, which collided.

---

## 6. Gotchas that cost real time

**Satori does not implement Unicode bidi.** `next/og`'s `ImageResponse` shapes
Arabic glyphs correctly but reverses word order — `جامعة حلب` renders as
`حلبجامعة`. The Open Graph card at `app/[locale]/opengraph-image.tsx` is therefore
Latin-only by necessity. An Arabic share card needs a pre-rendered PNG.

**Image generators cannot render Arabic at all.** Any Arabic social asset must be
rendered by a browser. See `carousel/build.mjs`, which drives headless Chrome.

**`next/image` emits `width`/`height` attributes that beat CSS `aspect-ratio`**
unless the element also has `height: auto`. This bit twice: the achievements gallery
and the journey scenes, where images stretched to 1440 px tall and `object-fit:
cover` cropped photos to a vertical sliver. If a photo looks bizarrely cropped,
check for a missing `height: auto`.

**Always give `next/image` a `sizes` prop.** Without it Next assumes `100vw`; the
achievements gallery was serving 1920 px images into a 575 px box — 686 KB where
51 KB would do.

**`letter-spacing` severs Arabic cursive joins.** Never apply it to Arabic text.

**Digit groups inside RTL text need `direction: ltr`**, or bidi reorders them —
a slide counter rendered `06 / 01` instead of `01 / 06`.

**Headless Chrome writes a screenshot and then never exits** (both `--headless=old`
and `--headless=new`), and needs a unique `--user-data-dir` per invocation or the
second render blocks on a profile lock. `carousel/build.mjs` polls for the file then
kills the process.

**Aggressively recompressed JPEGs make AVIF *larger* than JPEG.** `2021.jpg` was
re-encoded at quality 62; AVIF then came out ~3% bigger, because modern codecs
handle already-artifacted input poorly.

---

## 7. Open items

- **First World Finals year: 2015 or 2016?** The site (achievements timeline, photo
  gallery, and the file `2016.jpg`) says 2016, Phuket/Thailand. The club profile
  document says 2015. These may describe the same event: ICPC names a season for its
  regional year while the finals run the following calendar year. The site is already
  inconsistent — it labels the Dhaka finals 2021 although the club's own photo of
  that event is banded "6–11 November 2022". Pick one convention, apply it to all
  five seasons. **Unresolved.**
- **Does `hello@aleppo.icpc.club` receive mail?** Never confirmed. It is advertised
  in four places on the club site.
- **The profile document and its published artifact still carry 131 teams / ≈98%.**
  The site carries 135 / ≈105%. Reconcile the documents.
- **Google Search Console and Bing Webmaster are not set up.** Highest-value
  remaining SEO action; needs the owner's accounts.
- **No analytics.** Recommendation: cPanel's AWStats/Webalizer — zero bytes to the
  visitor, no consent banner. Avoid GA4 (heavy, needs a banner, and Google service
  availability for Syria needs verifying). Adding a tracker would partly undo the
  performance work.
- **AutoSSL unverified**, so HSTS is not enabled yet.
- **`icpc.club` as a multi-club host:** the owner controls the apex. Before inviting
  other universities, worth confirming with the ICPC regional contact — a hub
  implies more authority than a single club's site, and hosting others' subdomains
  inherits some responsibility for their content.
- **~4 MB of unreferenced assets** in `public/` (`maps/real-world.svg` at 1.2 MB,
  `acpc-photos/achievements-winners.jpg`, `journey/syria-floor.jpg`,
  `acpc-photos/about-meeting.jpg`, `acpc-doc/*`). They cost nothing at runtime since
  nothing requests them.

---

## 8. Map of the less obvious files

| Path | What it is |
|---|---|
| `lib/site-content.ts` | All bilingual content + the accessors. The big one. |
| `lib/journey-content.ts` | Journey-stage copy for the home slide deck |
| `lib/structured-data.ts` | Sitewide Organization schema, incl. the ICPC disclaimer |
| `app/llms.txt/route.ts` | Plain-text brief for answer engines (GEO) |
| `app/robots.ts` | Explicitly allows GPTBot, ClaudeBot, PerplexityBot etc. |
| `app/[locale]/opengraph-image.tsx` | Generated share card — Latin-only, see §6 |
| `scripts/zip-namecheap-deploy.mjs` | Packages the deploy bundle; warns on missing env |
| `carousel/build.mjs` | Generates Arabic social slides via headless Chrome |
| `launch-carousel-brief.md` | Launch post caption + numeric guardrails |
| `apex/` | The `icpc.club` static site |
| `website-content-messaging-brief.md` | Older marketing brief; predates the domain move |
