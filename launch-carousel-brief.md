# LinkedIn launch carousel — aleppo.icpc.club

Brief for announcing the site is live. Six slides, portrait **1080 × 1350** (LinkedIn
crops square previews from portrait, so portrait wins more feed height).

## Two rules before anything else

**1. No image generator produces the text.** Numbers come out wrong and Arabic comes
out as scrambled letterforms — the same failure that forced the site's Open Graph card
to go Latin-only. Generate imagery without text, then set type over it in Figma,
Canva, Illustrator, or Keynote.

**2. Use the real photos wherever a real photo exists.** The club's archive is
stronger than anything a model will invent, and inventing team photos for a real
launch misrepresents the club.

| Available | Path |
|---|---|
| Three contestants with regional trophy | `public/images/journey/regional-winners.jpg` |
| Packed university lab, students standing | `public/images/journey/aleppo-meeting.jpg` |
| Contest hall, wide | `public/images/journey/syria-hall.jpg` |
| Contest floor, portrait crop | `public/images/journey/syria-floor.jpg` |
| Winners with medals | `public/images/acpc-photos/achievements-winners.jpg` |
| World Finals teams | `public/images/icpc-teams/{2016,2019,2021,2023}.jpg` |
| Promo video + poster frame | `public/media/acpc-promo/` |

## Brand values to hand your designer

```
background   #0d0d0d      near-black
surface      #16191b
text         #e7e0cf      warm paper
gold         #d4af37      primary accent
teal         #0f5c5c
rust         #c96b2c
motto        CODE. SOLVE. GROW. IMPACT.
```

Type: heavy geometric sans for headlines, monospace for numbers and URLs (it reads
as "engineering" and keeps digits aligned). Cairo for Arabic — it is already in the
repo at `app/fonts/`.

---

## Slide plan

| # | Purpose | Imagery |
|---|---|---|
| 1 | The announcement | AI backdrop A + wordmark + `aleppo.icpc.club` |
| 2 | Why it exists | `aleppo-meeting.jpg`, darkened, text overlaid |
| 3 | The pathway: Aleppo → Syria → Arab & Africa → World | AI backdrop B, four labelled steps |
| 4 | Proof | `regional-winners.jpg` or a World Finals shot + the numbers |
| 5 | What's on the site | AI backdrop C, flat list of the eight pages |
| 6 | Call to action | AI backdrop A reused, darker + URL + QR code |

Keep one idea per slide. Six slides that each say one thing beat three that say three.

---

## AI prompts — imagery only, no text

Written for Midjourney / DALL·E / Firefly / Imagen. Append your platform's aspect
flag (`--ar 4:5` on Midjourney).

### A — Announcement backdrop (slides 1 and 6)

```
Abstract dark editorial backdrop for a technology announcement. Near-black
charcoal field, subtle vertical grain. Thin luminous circuit-trace lines in
antique gold sweeping from lower left toward upper right, meeting at small
glowing nodes, like a printed circuit board drawn by an architect. Faint
geometric silhouette of a medieval citadel wall integrated into the traces at
the lower edge, barely visible, more suggestion than illustration. Deep negative
space across the upper two thirds for text. Cinematic, restrained, matte finish,
no glow bloom. Muted palette: charcoal, antique gold, dark teal.
```

### B — Pathway backdrop (slide 3)

```
Minimal abstract ascent. Four horizontal bands of increasing brightness receding
into darkness, from deep charcoal at the bottom to a faint warm gold horizon at
the top, like altitude layers or contour lines on a dark map. Sparse thin
connecting lines rising between the bands. Vast empty space. Extremely simple,
geometric, no objects, no people, no landscape detail. Matte, unlit, editorial.
```

### C — Content backdrop (slide 5)

```
Overhead flat-lay on a near-black matte surface, softly lit from one side.
Scattered objects of a programming contest: a plain mechanical keyboard partially
in frame, a stack of blank white paper, a stopwatch, three unlabelled coloured
balloons resting on the surface in muted gold, teal and rust. Shot from directly
above, shallow depth, deep shadows, generous empty space on the right for text.
Editorial product photography, natural light, no branding, no writing, no screens.
```

### D — Optional atmosphere slide

```
Close photographic detail of hands on a keyboard in a dim room, lit only by the
cool spill of an off-frame monitor. Warm skin against cold light, shallow focus,
grain. No faces, no screen content visible, no text anywhere. Documentary
photography, natural, unposed.
```

### Negative prompt for all of them

```
text, letters, words, numbers, typography, watermark, signature, logo, brand
marks, UI mockups, code on screens, distorted hands, extra fingers, glossy 3D
render, neon cyberpunk, lens flare, stock-photo smiling, cluttered composition
```

The "no neon cyberpunk" matters — models default to it for anything programming
related, and it would clash badly with the site's restrained palette.

---

## Caption draft

> **Aleppo CPC is online: aleppo.icpc.club**
>
> The competitive programming community at the University of Aleppo now has a home
> — in Arabic and English.
>
> What's on it: the full ICPC pathway from our university contest to the World
> Finals, our training programmes, the club structure and who runs it, our results
> archive, and how to volunteer or partner with us.
>
> This year's university contest: **1–2 September 2026** — 135 registered teams and
> roughly 500 registered contestants, up from 66 teams last year, run by about 100
> student volunteers.
>
> Built and maintained by students. Come look: aleppo.icpc.club
>
> —
>
> **موقع Aleppo CPC متاح الآن: aleppo.icpc.club**
>
> صار لمجتمع البرمجة التنافسية في جامعة حلب موقعه الخاص، بالعربية والإنجليزية:
> مسار ICPC كاملاً من مسابقة الجامعة إلى النهائي العالمي، وبرامج التدريب، وهيكل
> النادي، وسجل النتائج، وطرق التطوع والشراكة.
>
> مسابقة الجامعة هذا العام: **1–2 أيلول 2026** — 135 فريقاً مسجلاً ونحو 500 متسابق
> مسجل، مقارنة بـ66 فريقاً العام الماضي، بجهد نحو 100 متطوع.

Hashtags: `#ICPC #CompetitiveProgramming #UniversityOfAleppo #Syria #Algorithms
#StudentClubs`

## Accuracy notes — do not drift from these

- **135 registered teams**, **~500 registered contestants**, **~100 volunteers**.
  500 does not divide into 135 teams of three; describe it as registrations, not as
  the competing headcount.
- Growth is **~105%** against 66 teams in 2025. Not 98%, not 127% — both appear in
  older drafts.
- Do **not** call the club an ICPC chapter, branch, or official representative.
  "Independent student club" is the accurate phrasing, and it is what the site says.
- Competitive results belong to the contestants, coaches, organisers, alumni, and
  the university collectively — not to the club alone.
