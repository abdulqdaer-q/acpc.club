# acpc.club

Bilingual, SEO-first website for Aleppo CPC built with Next.js and a Supabase-ready content layer.

## Stack

- Next.js App Router
- TypeScript
- Supabase for editable content, events, achievements, sponsors, and media

## Local Development

Use Node `20.19.5` or newer.

```bash
source ~/.nvm/nvm.sh
nvm use 20.19.5
/Users/aqassab/.nvm/versions/node/v20.19.5/bin/node /Users/aqassab/.nvm/versions/node/v20.19.5/lib/node_modules/npm/bin/npm-cli.js install
npm run dev
```

## Environment

Copy `.env.example` to `.env.local` and set:

- `NEXT_PUBLIC_SITE_URL`
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`

If Supabase is not configured, the site renders seeded bilingual fallback content from the local codebase.

## Supabase

Apply the SQL files in [`supabase/schema.sql`](/Users/aqassab/personal/acpc.club/supabase/schema.sql) and [`supabase/seed.sql`](/Users/aqassab/personal/acpc.club/supabase/seed.sql) to provision the editable content model.
