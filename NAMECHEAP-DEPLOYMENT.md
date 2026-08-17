# Namecheap Deployment — aleppo.icpc.club

The site builds to a **standalone Node bundle**, not a static export. That choice
keeps the `/llms.txt` and `robots`/`sitemap` route handlers, the `/` → `/en`
redirect, and on-demand `next/image` optimization all working.

**This means the hosting plan must support Node.js applications** (Namecheap
Stellar Business or higher — look for "Setup Node.js App" in cPanel). A plan that
only serves static files cannot run this build.

---

## Where the content comes from

**There is no database.** All bilingual content — pages, roles, events,
achievements, settings — lives in [`lib/site-content.ts`](lib/site-content.ts),
and the accessors in that file return it directly.

Consequences:

- Nothing to provision, no credentials, no runtime fetch on any request.
- Pages are rendered once at build and served as static HTML (`revalidate = false`).
- **Editing content means editing that file and redeploying.** There is no admin UI.

If you ever want a CMS, the accessors at the bottom of `lib/site-content.ts` are
the single seam to change — no page or component touches data directly. The
previous Supabase client, schema, and seed are recoverable from git history.

---

## Before you build

### Create `.env.production` in the project root

```bash
NEXT_PUBLIC_SITE_URL=https://aleppo.icpc.club
```

That is the whole file. **It must exist before you build, not just on the
server** — `NEXT_PUBLIC_*` values are inlined into the bundle at build time, so a
build without it falls back to the hardcoded default in the source.

The packaging script warns if the file is missing. It is gitignored — never commit it.

---

## Build and package

```bash
npm install
npm run build-namecheap
```

This produces `dist/namecheap-deploy.zip` (~25 MB) and leaves the unzipped
bundle at `dist/namecheap-deploy/` so you can inspect it.

To re-package without rebuilding:

```bash
npm run zip-namecheap
```

The bundle contains:

```
server.js              generated Next server entry — cPanel's startup file
package.json
node_modules/          traced runtime deps, including sharp for image optimization
.next/                 server output + static assets
public/                images, video, brand assets
.env.production        if present locally
```

---

## Deploy

1. Upload `dist/namecheap-deploy.zip` via cPanel File Manager and **extract it in
   your application root** (e.g. `/home/username/aleppo-icpc-club`). Do not
   extract into `public_html` unless that is the app root you register below.

2. In cPanel → **Setup Node.js App** → Create Application:

   | Field | Value |
   |---|---|
   | Node.js version | 20.x or newer |
   | Application mode | Production |
   | Application root | the folder you extracted into |
   | Application URL | `aleppo.icpc.club` |
   | Application startup file | `server.js` |

3. Add `NEXT_PUBLIC_SITE_URL=https://aleppo.icpc.club` as an **Environment
   Variable** in the cPanel panel too. It is already baked into the build; setting
   it here keeps the server and the build in agreement if you ever rebuild
   without the env file.

4. Click **Create**, then **Restart**.

5. If the app runs behind Apache, add `.htaccess` in the application root:

   ```apache
   RewriteEngine On
   RewriteCond %{REQUEST_FILENAME} !-f
   RewriteCond %{REQUEST_FILENAME} !-d
   RewriteRule ^(.*)$ http://localhost:3000/$1 [P,L]
   ```

   Match the port to the one cPanel assigned the app.

---

## Verify after deploy

```bash
curl -sI https://aleppo.icpc.club/            # expect 307 -> /en
curl -s https://aleppo.icpc.club/robots.txt
curl -s https://aleppo.icpc.club/llms.txt
curl -s https://aleppo.icpc.club/sitemap.xml | head -20
```

Then check:

- `<html lang="ar" dir="rtl">` on `https://aleppo.icpc.club/ar` (view source)
- Every URL in `sitemap.xml` uses `aleppo.icpc.club`, not `acpc.club`
- The org chart on `/en/structure` shows **Head of Operations — Mohammad Rasoul
  Daryas** and **Operations Coordinator — Mohammad Bitar**
- The home page "Latest Event" card shows **1-2 September 2026**
- Footer shows `hello@aleppo.icpc.club` and the ICPC affiliation disclaimer
- An optimized image returns a reduced size:
  `curl -sI 'https://aleppo.icpc.club/_next/image?url=%2Fbrand%2Faleppo-icpc-club-avatar.png&w=256&q=75'`

Locally verified against the standalone bundle: all routes 200, `/` redirects,
image optimizer reduced the avatar from 75.7 KB to 13.8 KB, and AVIF/WebP content
negotiation works.

---

## Notes and limits

**No revalidation.** `revalidate = false`, so pages are rendered once at build
and never re-rendered at runtime. That is deliberate: with no database to poll,
timed revalidation would burn CPU regenerating identical HTML. The Node server is
serving prerendered files plus handling image optimization.

**Resources.** Shared Node hosting is CPU and RAM limited. With revalidation off,
the image optimizer is the only real work the server does; it caches to disk after
first use, so the cost is per unique image size, not per request.

**Redeploying.** Re-run `npm run build-namecheap`, upload, extract over the app
root, then Restart in cPanel. Static asset filenames are content-hashed, so stale
browser caches are not a concern. If an old page persists after a restart, delete
`.next/cache` on the server — that is the image optimizer's cache, not content.
