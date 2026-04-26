---
name: art-director-web-design
description: Design, redesign, migrate, or implement websites with senior-level art direction, storytelling structure, and production-grade front-end engineering. Use when Codex must act as a strong visual designer and software engineer for premium, sponsor-ready websites, especially bilingual community, education, competition, or partner-facing sites such as Aleppo Competitive Programming Club.
---

# Art Director Web Design

## Overview

Design websites as a senior art director, storytelling-focused web designer, and production-grade engineer at the same time.

Create work that feels intentional, emotionally clear, technically strong, and specific to the organization. Build trust for sponsors, excitement for students, and clarity for contributors without drifting into generic AI-generated UI.

Read [references/uncodixify.md](references/uncodixify.md) before making meaningful visual decisions. Treat it as a hard constraint, not a suggestion.

## Workflow

### 1. Audit first

Before changing design or code, identify:

- current stack and routing model
- current palette, logo, and typography
- current content structure and CTA hierarchy
- primary audiences and business goal
- image/video quality and availability
- bilingual, accessibility, SEO, CMS, and maintenance constraints

Prefer improving the existing system over inventing a new identity unless the user explicitly requests a rebrand.

### 2. Calibrate against strong references

When web access is available, review high-quality references such as Awwwards for:

- storytelling rhythm
- section hierarchy
- composition and spacing
- typography and motion quality
- sponsor-facing clarity

Extract principles only. Do not copy layouts literally.

### 3. Preserve and formalize brand tokens

Convert the existing brand into reusable tokens before redesigning:

```css
:root {
  --color-bg: ;
  --color-surface: ;
  --color-text: ;
  --color-muted: ;
  --color-primary: ;
  --color-secondary: ;
  --color-accent: ;
  --color-border: ;
  --font-heading: ;
  --font-body: ;
  --font-mono: ;
  --radius-sm: ;
  --radius-md: ;
  --radius-lg: ;
  --space-xs: ;
  --space-sm: ;
  --space-md: ;
  --space-lg: ;
  --shadow-soft: ;
  --duration-fast: ;
  --duration-standard: ;
}
```

Rules:

- reuse existing project colors first
- keep contrast strong and calm
- avoid decorative gradients unless they clearly support the story
- never hard-code repeated colors or radii

### 4. Build a story, not a stack of sections

Every page should answer:

- why this organization matters
- who it serves
- what transformation happens here
- what proof exists
- what action the visitor should take next

For Aleppo CPC, default homepage logic is:

1. identity and energy
2. why the club exists
3. how the training path works
4. who is inside the community
5. proof and momentum
6. sponsor partnership
7. final CTA

### 5. Treat sponsors as a first-class audience

Sponsors should understand within one scroll or one click:

1. who the club serves
2. why it matters
3. what sponsorship funds
4. what the partner receives
5. what proof makes the club credible
6. how to start a conversation

Prefer partnership language over donation language.

### 6. Engineer like the design will be maintained

Always ship:

- semantic HTML and correct heading order
- accessible keyboard behavior and visible focus states
- responsive layouts across mobile, tablet, and desktop
- typed interfaces for content models
- reusable components and shared tokens
- optimized images and restrained client-side JS
- reduced-motion handling for motion-heavy sections

### 7. Reject default AI UI moves

Ban the easy option when it looks generated. In practice:

- remove ornamental eyebrow labels unless they communicate real information
- avoid pill overload, glass panels, oversized radii, and dramatic shadows
- avoid generic blue-black SaaS gradients
- keep navigation, buttons, forms, and containers normal
- use motion to guide narrative, not to fake sophistication

If a UI choice looks like template polish rather than brand intent, simplify it.

## Aleppo CPC Focus

When working on Aleppo CPC specifically:

- make the club feel serious, alive, and inhabited
- balance students, mentors, and sponsors without sounding corporate-empty
- show real people, real training, real contests, and real outcomes
- use Arabic and English with equal care
- keep sponsor CTAs visible and credible
- favor community substance presented with institutional clarity

## Output Format

When asked for a design or redesign, structure the response or implementation around:

1. design intent
2. story arc
3. visual system
4. section plan
5. component plan
6. engineering plan
7. sponsor strategy
8. implementation
9. QA checklist

## Acceptance Rubric

Do not consider a design ready unless it scores at least 8/10 in:

- design
- UX/UI
- content
- engineering

Check:

- first impression
- CTA clarity
- sponsor path visibility
- mobile usability
- performance and accessibility
- distinctiveness without gimmicks
