# Supabase setup for the /admin dashboard + public site

## 1. Run the schema, then the seed data
Open your Supabase project -> **SQL Editor** -> New query, and run these three
files **in order**, pasting each one's contents and running it before moving
to the next:

1. `supabase/migrations/0001_init.sql` — creates `portfolio_items`, `services`,
   `service_features`, `faqs`, RLS policies, and a public `media` storage
   bucket for uploaded images.
2. `supabase/migrations/0002_gallery_tables.sql` — adds `logo_images` and
   `social_media_images`, which power the Logo Design and Social Media Design
   tabs on `/portfolio`.
3. `supabase/migrations/0003_seed_content.sql` — seeds all of the above with
   the content the public site used to render from hardcoded arrays. Safe to
   re-run; every insert is guarded against duplicates.

## 2. Fill in `.env`
From **Project Settings -> API**:

```
SUPABASE_URL=https://xxxxx.supabase.co
SUPABASE_SERVICE_ROLE_KEY=<service_role secret>
SUPABASE_ANON_KEY=<anon/public key>
```

`SUPABASE_SERVICE_ROLE_KEY` is used only by the admin dashboard (bypasses
RLS). `SUPABASE_ANON_KEY` is used by the public site's Portfolio, Services,
and FAQ pages, which read through RLS (published rows only) instead of
bypassing it — even a query that forgets to filter on `published` can't leak
a draft.

## 3. Run it
```
npm run dev
```
Visit `/admin/login`. The login is hardcoded in `lib/auth/credentials.ts`
(no `.env` setup needed):

```
email:    admin@thesocialnexus.co.uk
password: GBf1fGtPf
```

To change it, generate a new bcrypt hash and swap the two constants at the
top of that file:
```
node -e "console.log(require('bcryptjs').hashSync('new-password', 10))"
```

Once signed in you can manage Portfolio, Logo Designs, Social Media Designs,
Services, and FAQs — all writes go through the service-role key server-side;
RLS keeps the tables read-only from the browser. `/admin/*` and `/api/admin/*`
are gated by `proxy.ts` (session cookie required) plus a per-route check in
every handler — logging in is required before any of this works.

## The public site is wired to this data
`components/home/Portfolio.tsx`, `app/portfolio/page.tsx`,
`components/home/Services.tsx`, `app/services/page.tsx`,
`app/services/[slug]/page.tsx`, and `app/faqs/page.tsx` all fetch from these
tables (via the anon key, published rows only) instead of rendering
hardcoded arrays. Edit content in `/admin` and it shows up on the public
pages — immediately for Portfolio/FAQ/home-Services (fetched per request),
within 5 minutes for `/services/[slug]` (ISR-revalidated).
