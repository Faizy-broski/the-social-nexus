-- Admin dashboard schema: portfolio items, services (+ features), FAQs.
-- Run this once in the Supabase project's SQL Editor (Project -> SQL Editor -> New query),
-- or via `supabase db push` if you're using the Supabase CLI locally.

create extension if not exists "pgcrypto";

-- Shared trigger: keeps `updated_at` current on every row update.
create or replace function set_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- =========================================================
-- Portfolio
-- =========================================================
create table if not exists portfolio_items (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  categories text[] not null default '{}',
  stack text[] not null default '{}',
  preview_href text,
  image_path text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger portfolio_items_set_updated_at
  before update on portfolio_items
  for each row execute function set_updated_at();

-- =========================================================
-- Services (+ per-service feature list)
-- =========================================================
create table if not exists services (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  number text not null,
  title text[] not null,
  hero_description text not null,
  image_path text not null,
  overview_focus text not null,
  overview_team text not null,
  overview_heading jsonb,
  overview_paragraph text,
  cards_heading jsonb,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger services_set_updated_at
  before update on services
  for each row execute function set_updated_at();

create table if not exists service_features (
  id uuid primary key default gen_random_uuid(),
  service_id uuid not null references services(id) on delete cascade,
  icon text not null,
  title text not null,
  description text not null,
  sort_order integer not null default 0
);

create index if not exists service_features_service_id_idx on service_features(service_id);

-- =========================================================
-- FAQs
-- =========================================================
create table if not exists faqs (
  id uuid primary key default gen_random_uuid(),
  question text not null,
  answer text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger faqs_set_updated_at
  before update on faqs
  for each row execute function set_updated_at();

-- =========================================================
-- Row Level Security
-- The admin dashboard talks to these tables exclusively through the
-- Supabase service-role key (server-only, bypasses RLS entirely), so no
-- write policies are defined here on purpose. The public "anon" read
-- policies below are for a future step -- pointing the public site's
-- Portfolio/Services/FAQ sections at these tables instead of the
-- hardcoded arrays -- and are harmless to leave in place until then.
-- =========================================================
alter table portfolio_items enable row level security;
alter table services enable row level security;
alter table service_features enable row level security;
alter table faqs enable row level security;

create policy "Public can read published portfolio items"
  on portfolio_items for select
  using (published = true);

create policy "Public can read published services"
  on services for select
  using (published = true);

create policy "Public can read features of published services"
  on service_features for select
  using (exists (
    select 1 from services
    where services.id = service_features.service_id
    and services.published = true
  ));

create policy "Public can read published faqs"
  on faqs for select
  using (published = true);

-- =========================================================
-- Storage: a public bucket for admin-uploaded images
-- (portfolio project shots, service hero images)
-- =========================================================
insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "Public can read media bucket"
  on storage.objects for select
  using (bucket_id = 'media');
