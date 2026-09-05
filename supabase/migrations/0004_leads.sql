-- Stores every lead-gen form submission (contact, quick enquiry, web brief,
-- logo brief) so the admin dashboard can list them, instead of the previous
-- email-only flow. Run after 0003_seed_content.sql.

create table if not exists leads (
  id uuid primary key default gen_random_uuid(),
  source text not null,
  name text not null,
  email text not null,
  phone text,
  company text,
  message text,
  payload jsonb not null default '{}'::jsonb,
  status text not null default 'new',
  created_at timestamptz not null default now()
);

create index if not exists leads_created_at_idx on leads (created_at desc);

-- Writes and reads both go through the service-role key from admin/API
-- routes only — no public policies are defined, so RLS blocks anon access
-- entirely (same pattern as the rest of the schema).
alter table leads enable row level security;
