import { AlertTriangle } from "lucide-react";
import { FadeIn } from "@/components/admin/FadeIn";

export function SupabaseErrorBanner() {
  return (
    <FadeIn delay={0.05}>
      <div className="mt-4 flex items-start gap-2.5 rounded-lg border border-destructive/30 bg-destructive/10 p-4 text-sm text-destructive">
        <AlertTriangle className="mt-0.5 h-4 w-4 shrink-0" />
        <span>Couldn&apos;t reach Supabase — check SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY in .env.</span>
      </div>
    </FadeIn>
  );
}
