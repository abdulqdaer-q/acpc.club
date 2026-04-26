# Supabase-First Backend Plan for `acpc.club`

## 1. Scope and assumptions

This plan is optimized for:

- A bilingual public website (`ar`, `en`) for Aleppo CPC / University of Aleppo.
- Non-technical staff editing content directly in Supabase Studio.
- No redeploy required for routine content changes.
- Public content plus lightweight internal event operations.
- Supabase as the primary backend: Postgres, Auth, Storage, RLS, Studio, optional Edge Functions.

The briefing docs imply these core domains:

- Static club/about content and ICPC history.
- University of Aleppo achievements timeline.
- Events with dates, venue, counts, public updates, and sponsor exposure.
- Internal event operations: volunteers, workstreams, judges, logistics, media, ops, tech.

## 2. Architecture summary

- `Supabase Postgres` is the source of truth for all website content and event operations data.
- `Supabase Auth` manages staff login.
- `Supabase Studio` is the admin UI for staff.
- `Supabase Storage` holds public media and private operational documents.
- The frontend reads only from `published` rows through RLS-safe views/RPCs.
- Optional: one small `revalidate` Edge Function/webhook to refresh the frontend cache after publish actions.

## 3. Localization strategy

For this project, do **not** build a generic translation framework in v1.

Use a strict two-language model with side-by-side columns in the same row:

- `title_ar`, `title_en`
- `summary_ar`, `summary_en`
- `body_ar`, `body_en`
- `label_ar`, `label_en`

Why this is the right choice here:

- Staff can edit rows in Studio without understanding join tables or JSON.
- The site only needs Arabic and English.
- Frontend queries stay simple.
- It is easy to spot missing translations.

Additional rules:

- Keep `slug` locale-neutral and ASCII-only.
- Prefer short structured fields over one giant rich-text blob.
- Store long text as plain `text` columns; render paragraph breaks on the frontend.
- Fallback order: requested locale -> Arabic -> English.

## 4. Base table conventions

Apply these columns to all mutable tables unless there is a reason not to:

- `id uuid primary key default gen_random_uuid()`
- `created_at timestamptz not null default now()`
- `updated_at timestamptz not null default now()`
- `created_by uuid null references public.profiles(id)`
- `updated_by uuid null references public.profiles(id)`

Also add:

- `set_updated_at` trigger on every mutable table.
- `created_by` / `updated_by` trigger from `auth.uid()` where applicable.

## 5. Enums

Create these Postgres enums up front:

- `app_locale`: `ar`, `en`
- `publish_status`: `draft`, `published`, `archived`
- `event_status`: `draft`, `announced`, `registration_open`, `registration_closed`, `live`, `completed`, `cancelled`
- `workstream_code`: `media`, `logistics`, `ops`, `tech`, `volunteers`, `judges`, `organizing`
- `task_status`: `todo`, `in_progress`, `blocked`, `done`, `cancelled`
- `assignment_role`: `volunteer`, `judge`, `organizer`, `coach`, `speaker`, `sponsor_contact`, `photographer`
- `sponsor_tier`: `title`, `platinum`, `gold`, `silver`, `bronze`, `supporter`, `in_kind`
- `support_type`: `cash`, `venue`, `food`, `printing`, `internet`, `swag`, `equipment`, `hospitality`, `other`
- `media_kind`: `image`, `video`, `pdf`, `document`, `logo`

## 6. Proposed schema

### Auth and authorization

#### `public.profiles`

One row per staff user.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK, matches `auth.users.id` |
| `full_name` | `text` | display name |
| `email` | `citext` | unique |
| `phone` | `text` | optional |
| `is_active` | `boolean` | default `true` |

#### `public.user_roles`

Keep roles in a table, not hardcoded in code.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `user_id` | `uuid` | FK -> `profiles.id` |
| `role` | `text` | `admin`, `editor`, `event_manager`, `media_manager` |
| `scope_event_id` | `uuid` | nullable, for event-specific permissions later |
| `is_active` | `boolean` | default `true` |

Recommended helper SQL functions:

- `public.has_role(p_role text) returns boolean`
- `public.is_admin() returns boolean`

### Global site configuration

#### `public.site_settings`

Single-row table for settings that should not require code changes.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | singleton row |
| `club_name_ar` | `text` | |
| `club_name_en` | `text` | |
| `tagline_ar` | `text` | |
| `tagline_en` | `text` | |
| `contact_email` | `text` | |
| `contact_phone` | `text` | |
| `whatsapp_number` | `text` | optional |
| `location_ar` | `text` | |
| `location_en` | `text` | |
| `facebook_url` | `text` | optional |
| `instagram_url` | `text` | optional |
| `linkedin_url` | `text` | optional |
| `youtube_url` | `text` | optional |
| `default_og_asset_id` | `uuid` | FK -> `media_assets.id` |
| `footer_note_ar` | `text` | |
| `footer_note_en` | `text` | |

#### `public.nav_items`

Editable navigation and footer links.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `label_ar` | `text` | |
| `label_en` | `text` | |
| `href` | `text` | route or absolute URL |
| `location` | `text` | `header`, `footer` |
| `sort_order` | `int` | |
| `is_active` | `boolean` | |
| `opens_new_tab` | `boolean` | default `false` |

### Editable public content

#### `public.site_copy`

This is the simplest Studio-friendly table for fixed page content.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `group_key` | `text` | e.g. `home`, `about`, `sponsors`, `contact` |
| `item_key` | `text` | e.g. `hero_title`, `hero_body`, `cta_label` |
| `value_ar` | `text` | |
| `value_en` | `text` | |
| `content_type` | `text` | `plain_text`, `multiline`, `url`, `number` |
| `sort_order` | `int` | for repeated items |
| `is_public` | `boolean` | default `true` |

Constraints:

- `unique(group_key, item_key)`

Use this table for:

- Home hero copy
- About section text
- “What is ICPC?” explainer
- Contact page copy
- Sponsor benefit bullets if they are site-wide

#### `public.achievements`

Structured historical timeline for University of Aleppo results.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `season_year` | `int` | indexed |
| `achievement_date` | `date` | nullable when only year is known |
| `stage` | `text` | `local`, `national`, `regional`, `world_finals` |
| `medal` | `text` | nullable: `gold`, `silver`, `bronze` |
| `title_ar` | `text` | short card title |
| `title_en` | `text` | short card title |
| `summary_ar` | `text` | |
| `summary_en` | `text` | |
| `location_ar` | `text` | optional |
| `location_en` | `text` | optional |
| `is_featured` | `boolean` | default `false` |
| `sort_order` | `int` | |
| `status` | `publish_status` | default `published` |

Seed this table immediately from the brief:

- `2016` gold medal + world finals in Thailand
- `2018` silver medal
- `2019` world finals in Portugal
- `2021` bronze + world finals in Bangladesh
- `2023` bronze + world finals in Egypt
- `2024` Syria champion and runner-up
- `2025` four of ten Syrian medals
- `2025` regional gold + bronze + world finals qualification in Dubai

#### `public.events`

Main public and operational event record.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `slug` | `text` | unique, indexed |
| `event_type` | `text` | `competition`, `training`, `announcement`, `workshop` |
| `status` | `event_status` | indexed |
| `title_ar` | `text` | |
| `title_en` | `text` | |
| `summary_ar` | `text` | card copy |
| `summary_en` | `text` | card copy |
| `body_ar` | `text` | long-form description |
| `body_en` | `text` | long-form description |
| `start_at` | `timestamptz` | indexed |
| `end_at` | `timestamptz` | |
| `venue_name_ar` | `text` | |
| `venue_name_en` | `text` | |
| `venue_details_ar` | `text` | |
| `venue_details_en` | `text` | |
| `contestant_count` | `int` | nullable |
| `team_count` | `int` | nullable |
| `coach_count` | `int` | nullable |
| `judge_count` | `int` | nullable |
| `volunteer_count` | `int` | nullable |
| `published_at` | `timestamptz` | nullable |
| `registration_url` | `text` | optional |
| `results_url` | `text` | optional |
| `livestream_url` | `text` | optional |
| `cover_asset_id` | `uuid` | FK -> `media_assets.id` |
| `is_featured` | `boolean` | default `false` |

Seed example from the brief:

- `slug`: `uoa-competition-2025`
- dates: `2025-07-16` to `2025-07-17`
- venue: Central Library, Citizen Service Hall, University of Aleppo
- counts: `210` contestants, `20` coaches/supervisors, around `100` volunteers

#### `public.event_agenda_items`

Visible agenda for opening, contest day, closing, technical session, etc.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK -> `events.id`, indexed |
| `starts_at` | `timestamptz` | |
| `ends_at` | `timestamptz` | |
| `title_ar` | `text` | |
| `title_en` | `text` | |
| `description_ar` | `text` | optional |
| `description_en` | `text` | optional |
| `location_ar` | `text` | optional |
| `location_en` | `text` | optional |
| `sort_order` | `int` | |
| `is_public` | `boolean` | default `true` |

#### `public.news_posts`

Public updates, sponsor announcements, results, recap posts.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `slug` | `text` | unique, indexed |
| `status` | `publish_status` | indexed |
| `category` | `text` | `update`, `result`, `sponsor`, `training`, `announcement` |
| `title_ar` | `text` | |
| `title_en` | `text` | |
| `excerpt_ar` | `text` | |
| `excerpt_en` | `text` | |
| `body_ar` | `text` | |
| `body_en` | `text` | |
| `published_at` | `timestamptz` | indexed |
| `event_id` | `uuid` | nullable FK -> `events.id` |
| `cover_asset_id` | `uuid` | nullable FK -> `media_assets.id` |
| `author_profile_id` | `uuid` | nullable FK -> `profiles.id` |
| `is_featured` | `boolean` | default `false` |

#### `public.sponsors`

Sponsor catalog for public display.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `slug` | `text` | unique |
| `name_ar` | `text` | |
| `name_en` | `text` | |
| `tier` | `sponsor_tier` | indexed |
| `description_ar` | `text` | optional |
| `description_en` | `text` | optional |
| `website_url` | `text` | optional |
| `logo_asset_id` | `uuid` | nullable FK -> `media_assets.id` |
| `benefits_ar` | `text` | optional |
| `benefits_en` | `text` | optional |
| `is_active` | `boolean` | default `true` |
| `sort_order` | `int` | |

### Internal event operations

#### `public.contacts`

Use for sponsor contacts, judges, organizers, or service providers.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `full_name` | `text` | |
| `phone` | `text` | optional |
| `email` | `text` | optional |
| `organization` | `text` | optional |
| `notes` | `text` | optional |

#### `public.event_workstreams`

Top-level operational lanes per event.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK -> `events.id`, indexed |
| `code` | `workstream_code` | |
| `label_ar` | `text` | |
| `label_en` | `text` | |
| `lead_contact_id` | `uuid` | nullable FK -> `contacts.id` |
| `status` | `task_status` | |
| `notes_ar` | `text` | optional |
| `notes_en` | `text` | optional |

Create one row per event for:

- media
- logistics
- ops
- tech
- volunteers
- judges
- organizing

#### `public.event_tasks`

Simple Studio-friendly task tracker. Avoid Kanban tooling in v1.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK -> `events.id`, indexed |
| `workstream_id` | `uuid` | FK -> `event_workstreams.id`, indexed |
| `title` | `text` | |
| `description` | `text` | optional |
| `status` | `task_status` | indexed |
| `priority` | `smallint` | `1` high, `2` medium, `3` low |
| `due_at` | `timestamptz` | nullable |
| `assignee_contact_id` | `uuid` | nullable FK -> `contacts.id` |
| `is_public` | `boolean` | default `false` |

Use this for concrete items from the brief, for example:

- print badges and team numbers
- reserve hall
- secure backup power / UPS
- publish social updates
- arrange judges accommodation
- check-in desk
- balloon distribution
- upload closing ceremony media

#### `public.event_assignments`

Tracks who is helping in which capacity.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK -> `events.id`, indexed |
| `contact_id` | `uuid` | FK -> `contacts.id`, indexed |
| `role` | `assignment_role` | indexed |
| `workstream_id` | `uuid` | nullable FK -> `event_workstreams.id` |
| `shift_start` | `timestamptz` | nullable |
| `shift_end` | `timestamptz` | nullable |
| `check_in_status` | `text` | `pending`, `checked_in`, `absent` |
| `notes` | `text` | optional |

#### `public.sponsor_commitments`

Operational sponsor tracking, separate from public sponsor cards.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `event_id` | `uuid` | FK -> `events.id`, indexed |
| `sponsor_id` | `uuid` | FK -> `sponsors.id`, indexed |
| `contact_id` | `uuid` | nullable FK -> `contacts.id` |
| `support_type` | `support_type` | indexed |
| `amount_usd` | `numeric(12,2)` | nullable |
| `status` | `text` | `prospecting`, `contacted`, `committed`, `received`, `closed` |
| `notes` | `text` | optional |

This table covers the briefed sponsor model:

- hall/equipment support
- food and hospitality
- printing/promotional materials
- awards and certificates

### Media and documents

#### `public.media_assets`

Metadata table for all Storage objects used by the website.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `bucket_name` | `text` | `site-public` or `site-private` |
| `object_path` | `text` | unique within bucket |
| `kind` | `media_kind` | |
| `mime_type` | `text` | |
| `file_size_bytes` | `bigint` | |
| `width` | `int` | nullable |
| `height` | `int` | nullable |
| `title_ar` | `text` | optional |
| `title_en` | `text` | optional |
| `alt_ar` | `text` | optional |
| `alt_en` | `text` | optional |
| `caption_ar` | `text` | optional |
| `caption_en` | `text` | optional |
| `credit` | `text` | optional |
| `is_public` | `boolean` | default `true` |

#### `public.media_usage`

Links assets to rows without duplicating files.

| column | type | notes |
|---|---|---|
| `id` | `uuid` | PK |
| `asset_id` | `uuid` | FK -> `media_assets.id`, indexed |
| `entity_type` | `text` | `event`, `post`, `sponsor`, `site_setting` |
| `entity_id` | `uuid` | indexed |
| `usage_type` | `text` | `cover`, `gallery`, `logo`, `attachment`, `og` |
| `sort_order` | `int` | |

## 7. Storage strategy

Use only two buckets in v1:

- `site-public`
- `site-private`

Folder convention inside `site-public`:

- `branding/`
- `pages/`
- `achievements/`
- `events/{event_slug}/`
- `posts/{post_slug}/`
- `sponsors/{sponsor_slug}/`
- `docs/public/`

Folder convention inside `site-private`:

- `events/{event_slug}/runbooks/`
- `events/{event_slug}/judges/`
- `events/{event_slug}/procurement/`
- `sponsors/contracts/`

Rules:

- Public website images and downloadable public PDFs go in `site-public`.
- Sponsor letters, operational files, judge docs, and procurement docs go in `site-private`.
- Every uploaded file that is referenced by the website gets a `media_assets` row.
- Use Supabase image transformation URLs for frontend sizes instead of storing separate thumbnails in v1.

## 8. RLS and auth model

### Roles

Use these app roles:

- `admin`: full access, including role assignment
- `editor`: can manage public content tables
- `event_manager`: can manage event ops tables and event public pages
- `media_manager`: can manage media metadata and related content

### Public read policies

Allow `anon` and `authenticated` to `select` only:

- `site_settings`
- `nav_items where is_active = true`
- `site_copy where is_public = true`
- `achievements where status = 'published'`
- `events where status in ('announced', 'registration_open', 'registration_closed', 'live', 'completed')`
- `event_agenda_items where is_public = true` and parent event is public
- `news_posts where status = 'published' and published_at <= now()`
- `sponsors where is_active = true`
- `media_assets where is_public = true`

### Staff write policies

- `editor` can `insert/update/select` on `site_settings`, `nav_items`, `site_copy`, `achievements`, `news_posts`, `sponsors`.
- `event_manager` can also manage `events`, `event_agenda_items`, `event_workstreams`, `event_tasks`, `event_assignments`, `sponsor_commitments`, `contacts`.
- `media_manager` can manage `media_assets` and `media_usage`.
- Only `admin` can manage `user_roles`.

### Storage policies

- `site-public`: public read; writes limited to `editor`, `event_manager`, `media_manager`, `admin`.
- `site-private`: no public read; writes limited to staff roles; reads only for staff roles or signed URLs created server-side.

## 9. Admin editing workflow in Supabase Studio

### Daily editing flow

1. Admin invites staff through Supabase Auth.
2. Admin inserts a role row in `user_roles`.
3. Staff sign into Supabase Studio.
4. Staff edit rows directly in a small number of flat tables:
   - `site_settings`
   - `nav_items`
   - `site_copy`
   - `achievements`
   - `events`
   - `news_posts`
   - `sponsors`
5. Staff upload files in Storage, then attach metadata in `media_assets`.
6. Publishing is just a row update:
   - `status = 'published'`
   - or `is_active = true`
   - or `published_at = now()`

### Why this works for non-technical staff

- No JSON block editor.
- No nested translation tables.
- No redeploy.
- Each table corresponds to a real business concept.

### Recommended Studio views to document for staff

- “Global settings”
- “Homepage copy”
- “Achievements timeline”
- “Upcoming events”
- “Event operations”
- “Sponsors”
- “Media library”

## 10. Minimal frontend data contract

Do not let the frontend know table-level publishing rules. Put that in SQL.

Implement these read-oriented RPCs or SQL views:

### `rpc_public_bootstrap(p_locale text)`

Returns:

- site settings
- header nav
- footer nav
- social/contact fields

### `rpc_public_home(p_locale text)`

Returns:

- hero and about copy from `site_copy`
- featured achievements
- next featured event
- sponsor logos
- latest news cards

### `rpc_public_achievements(p_locale text)`

Returns timeline cards ordered by `season_year desc, sort_order asc`.

### `rpc_public_events(p_locale text, p_include_past boolean, p_limit int)`

Returns public event cards with localized title, summary, dates, venue, counts, cover image.

### `rpc_public_event_detail(p_slug text, p_locale text)`

Returns:

- event core data
- agenda items
- attached gallery/media
- sponsors linked to that event
- related news posts

### `rpc_public_news(p_locale text, p_limit int)`

Returns post cards for the news/update listing.

### `rpc_public_news_detail(p_slug text, p_locale text)`

Returns full post body and related event/cover data.

## 11. Query and indexing notes

Add these indexes at minimum:

- `events(slug)`
- `events(status, start_at desc)`
- `events(is_featured, start_at desc)`
- `news_posts(slug)`
- `news_posts(status, published_at desc)`
- `achievements(season_year desc, sort_order asc)`
- `event_agenda_items(event_id, starts_at asc)`
- `event_tasks(event_id, status, due_at)`
- `event_assignments(event_id, role)`
- `sponsor_commitments(event_id, status)`
- `media_usage(entity_type, entity_id, usage_type)`

## 12. Recommended implementation order

1. Create auth helpers: `profiles`, `user_roles`, role-check SQL functions.
2. Create public content tables: `site_settings`, `nav_items`, `site_copy`, `achievements`, `events`, `news_posts`, `sponsors`.
3. Create ops tables: `contacts`, `event_workstreams`, `event_tasks`, `event_assignments`, `sponsor_commitments`.
4. Create `media_assets` and Storage buckets.
5. Add RLS policies.
6. Build RPCs/views for public reads.
7. Seed data from the current briefing docs.
8. Add optional webhook-driven cache revalidation.

## 13. Explicit v1 boundary

Do **not** build these in v1 unless the club explicitly needs them now:

- full contestant registration portal
- payment flows
- judge problem management system
- volunteer self-service portal
- generic page-builder CMS
- multilingual slugs

For this club website, the right first release is a strong content-and-operations backend, not a full contest platform.
