"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FadeIn } from "@/components/admin/FadeIn";
import type { FaqRow } from "@/lib/types/content";
import { FaqForm } from "./FaqForm";
import { FaqTable } from "./FaqTable";

type DialogTarget = "new" | FaqRow | null;

export function FaqsManager({ items }: { items: FaqRow[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [target, setTarget] = useState<DialogTarget>(null);

  useEffect(() => {
    if (searchParams.get("new") === "1") setTarget("new");
  }, [searchParams]);

  function close() {
    setTarget(null);
  }

  function handleSuccess() {
    close();
    router.refresh();
  }

  return (
    <div>
      <FadeIn>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">FAQs</h1>
            <p className="mt-1 text-sm text-muted-foreground">{items.length} question{items.length === 1 ? "" : "s"}</p>
          </div>
          <Button className="brand-cta" onClick={() => setTarget("new")}>
            <Plus />
            New FAQ
          </Button>
        </div>
      </FadeIn>

      <div className="mt-6">
        <FaqTable items={items} onEdit={setTarget} />
      </div>

      <Dialog open={target !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-h-[85vh] max-w-2xl overflow-y-auto sm:max-w-2xl">
          <DialogHeader>
            <DialogTitle>{target === "new" ? "New FAQ" : "Edit FAQ"}</DialogTitle>
            <DialogDescription>
              {target === "new" ? "Add a new question and answer." : "Update this question and answer."}
            </DialogDescription>
          </DialogHeader>
          <FaqForm
            key={target === "new" ? "new" : (target?.id ?? "closed")}
            item={target && target !== "new" ? target : undefined}
            onSuccess={handleSuccess}
            onCancel={close}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
