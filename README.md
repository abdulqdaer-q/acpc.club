# aleppo.icpc.club

Bilingual, SEO-first website for Aleppo CPC built with Next.js. Content is committed to the repo; no database required.

## Stack

- Next.js App Router
- TypeScript

## Local Development

Use Node `20.19.5` or newer.

```bash
source ~/.nvm/nvm.sh
nvm use 20.19.5
npm install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set `NEXT_PUBLIC_SITE_URL`. That is the
only variable the site uses.

## Deployment

The site builds to a standalone Node bundle (`output: "standalone"`), which keeps
the route handlers, the `/` → `/en` redirect, and `next/image` optimization
working — a static export would drop the image optimizer.

```bash
npm run build-namecheap
```

Produces `dist/namecheap-deploy.zip`. See
[`NAMECHEAP-DEPLOYMENT.md`](NAMECHEAP-DEPLOYMENT.md) for the full procedure —
including the `.env.production` file, which must exist **before** building because
pages are pre-rendered and `NEXT_PUBLIC_*` values are inlined at build time.

## Content

There is no CMS. All bilingual content lives in
[`lib/site-content.ts`](lib/site-content.ts) and is returned directly by the
accessors at the bottom of that file, so every page is fully static. Editing
content means editing that file and redeploying.

Those accessors are the single seam a CMS would slot into — no page or component
reads data directly. A previous Supabase integration (client, schema, seed) was
removed in August 2026 and is recoverable from git history.
