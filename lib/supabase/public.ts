import "server-only";
import { createClient } from "@supabase/supabase-js";

/**
 * Anon-key Supabase client for public-facing pages. Reads go through RLS
 * (see supabase/migrations/0001_init.sql's "published = true" policies)
 * instead of bypassing it like the service-role admin client does — so
 * even a query that forgets to filter on `published` can't leak drafts.
 * Server-only: every caller is a Server Component or route data-fetcher.
 */
export function getSupabasePublic() {
  const url = process.env.SUPABASE_URL;
  const anonKey = process.env.SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    throw new Error("Supabase is not configured — set SUPABASE_URL and SUPABASE_ANON_KEY in .env");
  }

  return createClient(url, anonKey, {
    auth: { persistSession: false },
  });
}
