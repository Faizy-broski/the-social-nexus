import { getSupabaseAdmin } from "@/lib/supabase/admin";

type LeadSource = "contact" | "contact_hero" | "web_brief" | "logo_brief";

type SaveLeadInput = {
  source: LeadSource;
  name: string;
  email: string;
  phone?: string | null;
  company?: string | null;
  message?: string | null;
  payload: Record<string, unknown>;
};

// Persists the submission for the admin dashboard. This is now the only
// side effect of a form submission, so a failure here must be surfaced to
// the caller rather than swallowed.
export async function saveLead(input: SaveLeadInput) {
  const supabase = getSupabaseAdmin();
  const { error } = await supabase.from("leads").insert({
    source: input.source,
    name: input.name,
    email: input.email,
    phone: input.phone ?? null,
    company: input.company ?? null,
    message: input.message ?? null,
    payload: input.payload,
  });

  if (error) {
    console.error(`[leads] failed to save ${input.source} lead:`, error);
    throw error;
  }
}
