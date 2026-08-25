-- Extends the admin dashboard to cover the Logo Design and Social Media
-- Design tabs on /portfolio, which previously had no admin-managed source.
-- Run after 0001_init.sql (SQL Editor -> New query, paste, run).

-- =========================================================
-- Logo design gallery
-- =========================================================
create table if not exists logo_images (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger logo_images_set_updated_at
  before update on logo_images
  for each row execute function set_updated_at();

-- =========================================================
-- Social media design gallery
-- =========================================================
create table if not exists social_media_images (
  id uuid primary key default gen_random_uuid(),
  image_path text not null,
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger social_media_images_set_updated_at
  before update on social_media_images
  for each row execute function set_updated_at();

-- =========================================================
-- Row Level Security — same pattern as 0001_init.sql: writes go through
-- the service-role key only, public reads are limited to published rows.
-- =========================================================
alter table logo_images enable row level security;
alter table social_media_images enable row level security;

create policy "Public can read published logo images"
  on logo_images for select
  using (published = true);

create policy "Public can read published social media images"
  on social_media_images for select
  using (published = true);
