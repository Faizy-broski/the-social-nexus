import { Skeleton } from "@/components/ui/skeleton";

/** Next.js Suspense fallback for the whole (dashboard) route group —
 *  shown automatically the instant you navigate to any admin page whose
 *  server component is still fetching from Supabase, no client JS needed. */
export default function AdminLoading() {
  return (
    <div className="relative">
      {/* Indeterminate progress bar — brand teal -> gold sweep */}
      <div className="absolute -top-4 sm:-top-6 left-0 right-0 h-0.5 overflow-hidden rounded-full bg-muted">
        <div className="admin-loading-bar h-full w-1/3 rounded-full bg-linear-to-r from-brand-teal via-brand-teal-light to-brand-gold" />
      </div>

      <div className="flex items-center justify-between">
        <div className="space-y-2">
          <Skeleton className="h-7 w-40" />
          <Skeleton className="h-4 w-56" />
        </div>
        <Skeleton className="h-9 w-32 rounded-lg" />
      </div>

      <div className="mt-6 overflow-hidden rounded-lg border">
        <div className="border-b bg-muted/40 p-3">
          <Skeleton className="h-4 w-full max-w-md" />
        </div>
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="flex items-center gap-4 border-b p-3 last:border-b-0">
            <Skeleton className="h-10 w-14 shrink-0 rounded-md" />
            <Skeleton className="h-4 w-40" />
            <Skeleton className="h-4 w-24" />
            <Skeleton className="ml-auto h-6 w-16 rounded-full" />
          </div>
        ))}
      </div>

      <style>{`
        @keyframes admin-loading-sweep {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(300%); }
        }
        .admin-loading-bar {
          animation: admin-loading-sweep 1.1s ease-in-out infinite;
        }
        @media (prefers-reduced-motion: reduce) {
          .admin-loading-bar { animation: none; }
        }
      `}</style>
    </div>
  );
}
