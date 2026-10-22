-- Pricing page: packages (cards) + feature comparison table, both editable
-- from /admin/pricing. Run after 0004_leads.sql.

-- =========================================================
-- Packages
-- `category` groups packages into tabs on /pricing (e.g. "Websites", "SEO");
-- a null `price` renders as "Custom quote" instead of a number.
-- =========================================================
create table if not exists pricing_plans (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Websites',
  name text not null,
  tagline text not null default '',
  badge text,
  highlighted boolean not null default false,
  currency text not null default 'GBP',
  price numeric(10, 2),
  original_price numeric(10, 2),
  price_period text,
  price_note text,
  features text[] not null default '{}',
  cta_label text not null default 'Get started',
  cta_href text not null default '/contact-us',
  sort_order integer not null default 0,
  published boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger pricing_plans_set_updated_at
  before update on pricing_plans
  for each row execute function set_updated_at();

-- =========================================================
-- Comparison table rows
-- `values` maps a pricing_plans.id to true (included), false (not
-- included) or a short string (e.g. "Up to 10 pages"). Rows belong to a
-- category so each tab on /pricing gets its own comparison table.
-- =========================================================
create table if not exists pricing_comparison_rows (
  id uuid primary key default gen_random_uuid(),
  category text not null default 'Websites',
  group_name text not null,
  label text not null,
  values jsonb not null default '{}'::jsonb,
  sort_order integer not null default 0,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger pricing_comparison_rows_set_updated_at
  before update on pricing_comparison_rows
  for each row execute function set_updated_at();

alter table pricing_plans enable row level security;
alter table pricing_comparison_rows enable row level security;

create policy "Public can read published pricing plans"
  on pricing_plans for select
  using (published = true);

create policy "Public can read pricing comparison rows"
  on pricing_comparison_rows for select
  using (true);

-- =========================================================
-- Starter content — seeded as DRAFTS (published = false) with placeholder
-- prices, so nothing goes live until real prices are set and each package
-- is published from /admin/pricing. Guarded so re-running is a no-op.
-- =========================================================
do $$
declare
  starter_id uuid;
  business_id uuid;
  ecommerce_id uuid;
begin
  if exists (select 1 from pricing_plans) then
    return;
  end if;

  insert into pricing_plans (category, name, tagline, badge, highlighted, price, original_price, price_period, price_note, features, cta_label, sort_order, published)
  values ('Websites', 'Starter', 'For new businesses getting online', null, false, 499, null, 'one-off', 'Placeholder price — edit in admin',
          array['Up to 5 pages', 'Mobile-responsive design', 'Contact form', 'Basic on-page SEO', '1 month of support'],
          'Get started', 0, false)
  returning id into starter_id;

  insert into pricing_plans (category, name, tagline, badge, highlighted, price, original_price, price_period, price_note, features, cta_label, sort_order, published)
  values ('Websites', 'Business', 'For growing businesses', 'Most popular', true, 999, 1299, 'one-off', 'Placeholder price — edit in admin',
          array['Up to 15 pages', 'Custom design', 'Blog / news section', 'Advanced on-page SEO', 'Google Analytics setup', '3 months of support'],
          'Get started', 1, false)
  returning id into business_id;

  insert into pricing_plans (category, name, tagline, badge, highlighted, price, original_price, price_period, price_note, features, cta_label, sort_order, published)
  values ('Websites', 'E-commerce', 'For selling online', null, false, null, null, null, 'Tailored to your catalogue',
          array['Unlimited pages', 'Online store', 'Payment gateway integration', 'Product & order management', '6 months of support'],
          'Request a quote', 2, false)
  returning id into ecommerce_id;

  insert into pricing_comparison_rows (category, group_name, label, values, sort_order) values
    ('Websites', 'Design & build', 'Pages', jsonb_build_object(starter_id, 'Up to 5', business_id, 'Up to 15', ecommerce_id, 'Unlimited'), 0),
    ('Websites', 'Design & build', 'Mobile-responsive design', jsonb_build_object(starter_id, true, business_id, true, ecommerce_id, true), 1),
    ('Websites', 'Design & build', 'Custom design', jsonb_build_object(starter_id, false, business_id, true, ecommerce_id, true), 2),
    ('Websites', 'Design & build', 'Online store', jsonb_build_object(starter_id, false, business_id, false, ecommerce_id, true), 3),
    ('Websites', 'Marketing', 'On-page SEO', jsonb_build_object(starter_id, 'Basic', business_id, 'Advanced', ecommerce_id, 'Advanced'), 4),
    ('Websites', 'Marketing', 'Google Analytics setup', jsonb_build_object(starter_id, false, business_id, true, ecommerce_id, true), 5),
    ('Websites', 'Support', 'Post-launch support', jsonb_build_object(starter_id, '1 month', business_id, '3 months', ecommerce_id, '6 months'), 6);
end $$;
