create extension if not exists pgcrypto;
create extension if not exists citext;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  full_name text not null,
  email citext unique not null,
  phone text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.user_roles (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references public.profiles (id) on delete cascade,
  role text not null check (role in ('admin', 'editor', 'event_manager', 'media_manager')),
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, role)
);

create or replace function public.has_role(p_role text)
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select exists (
    select 1
    from public.user_roles
    where user_id = auth.uid()
      and role = p_role
      and is_active = true
  );
$$;

create or replace function public.can_manage_site()
returns boolean
language sql
stable
security definer
set search_path = public
as $$
  select
    public.has_role('admin')
    or public.has_role('editor')
    or public.has_role('event_manager')
    or public.has_role('media_manager');
$$;

create table if not exists public.site_settings (
  id uuid primary key default gen_random_uuid(),
  organization_name_en text not null,
  organization_name_ar text not null,
  tagline_en text not null,
  tagline_ar text not null,
  location_en text not null,
  location_ar text not null,
  contact_label_en text not null,
  contact_label_ar text not null,
  contact_value text not null,
  whatsapp_label_en text not null,
  whatsapp_label_ar text not null,
  whatsapp_value text not null,
  email text not null,
  instagram_url text,
  linkedin_url text,
  facebook_url text,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.site_copy (
  id uuid primary key default gen_random_uuid(),
  group_key text not null,
  item_key text not null,
  value_en text,
  value_ar text,
  content_type text not null default 'plain_text',
  sort_order integer not null default 0,
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (group_key, item_key, sort_order)
);

create table if not exists public.site_pages (
  id uuid primary key default gen_random_uuid(),
  slug text not null,
  locale text not null check (locale in ('en', 'ar')),
  seo_title text,
  seo_description text,
  seo_keywords text[] not null default '{}',
  payload jsonb not null default '{}'::jsonb,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (slug, locale)
);

create table if not exists public.achievements (
  id uuid primary key default gen_random_uuid(),
  year integer not null,
  stage text not null,
  medal text,
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  highlight_en text not null,
  highlight_ar text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists achievements_year_idx on public.achievements (year desc, sort_order asc);

create table if not exists public.events (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  status text not null,
  starts_at date,
  ends_at date,
  venue_en text,
  venue_ar text,
  city_en text,
  city_ar text,
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  details_en text[] not null default '{}',
  details_ar text[] not null default '{}',
  contestant_count integer,
  team_count integer,
  coach_count integer,
  judge_count integer,
  volunteer_count integer,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists events_starts_at_idx on public.events (starts_at desc);

create table if not exists public.event_workstreams (
  id uuid primary key default gen_random_uuid(),
  event_id uuid references public.events (id) on delete cascade,
  code text not null check (code in ('media', 'logistics', 'ops', 'tech', 'volunteers', 'judges', 'organizing')),
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.sponsors (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  tier text not null,
  website_url text,
  summary_en text not null,
  summary_ar text not null,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.news_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_en text not null,
  title_ar text not null,
  summary_en text not null,
  summary_ar text not null,
  body_en text,
  body_ar text,
  published boolean not null default false,
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.media_assets (
  id uuid primary key default gen_random_uuid(),
  bucket_name text not null default 'site-public',
  storage_path text not null,
  alt_en text,
  alt_ar text,
  media_kind text not null default 'image',
  is_public boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger set_profiles_updated_at
before update on public.profiles
for each row execute function public.set_updated_at();

create trigger set_user_roles_updated_at
before update on public.user_roles
for each row execute function public.set_updated_at();

create trigger set_site_settings_updated_at
before update on public.site_settings
for each row execute function public.set_updated_at();

create trigger set_site_copy_updated_at
before update on public.site_copy
for each row execute function public.set_updated_at();

create trigger set_site_pages_updated_at
before update on public.site_pages
for each row execute function public.set_updated_at();

create trigger set_achievements_updated_at
before update on public.achievements
for each row execute function public.set_updated_at();

create trigger set_events_updated_at
before update on public.events
for each row execute function public.set_updated_at();

create trigger set_event_workstreams_updated_at
before update on public.event_workstreams
for each row execute function public.set_updated_at();

create trigger set_sponsors_updated_at
before update on public.sponsors
for each row execute function public.set_updated_at();

create trigger set_news_posts_updated_at
before update on public.news_posts
for each row execute function public.set_updated_at();

create trigger set_media_assets_updated_at
before update on public.media_assets
for each row execute function public.set_updated_at();

alter table public.profiles enable row level security;
alter table public.user_roles enable row level security;
alter table public.site_settings enable row level security;
alter table public.site_copy enable row level security;
alter table public.site_pages enable row level security;
alter table public.achievements enable row level security;
alter table public.events enable row level security;
alter table public.event_workstreams enable row level security;
alter table public.sponsors enable row level security;
alter table public.news_posts enable row level security;
alter table public.media_assets enable row level security;

create policy "public can read active site settings"
on public.site_settings
for select
using (is_active = true);

create policy "public can read public site copy"
on public.site_copy
for select
using (is_public = true);

create policy "public can read published site pages"
on public.site_pages
for select
using (published = true);

create policy "public can read published achievements"
on public.achievements
for select
using (published = true);

create policy "public can read published events"
on public.events
for select
using (published = true);

create policy "public can read event workstreams"
on public.event_workstreams
for select
using (true);

create policy "public can read published sponsors"
on public.sponsors
for select
using (published = true);

create policy "public can read published news"
on public.news_posts
for select
using (published = true);

create policy "public can read public media records"
on public.media_assets
for select
using (is_public = true);

create policy "admins manage profiles"
on public.profiles
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy "admins manage user roles"
on public.user_roles
for all
using (public.has_role('admin'))
with check (public.has_role('admin'));

create policy "site managers edit site settings"
on public.site_settings
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit site copy"
on public.site_copy
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit site pages"
on public.site_pages
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit achievements"
on public.achievements
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit events"
on public.events
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit workstreams"
on public.event_workstreams
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit sponsors"
on public.sponsors
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit news"
on public.news_posts
for all
using (public.can_manage_site())
with check (public.can_manage_site());

create policy "site managers edit media records"
on public.media_assets
for all
using (public.can_manage_site())
with check (public.can_manage_site());

insert into storage.buckets (id, name, public)
values
  ('site-public', 'site-public', true),
  ('site-private', 'site-private', false)
on conflict (id) do nothing;
