"use client";

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { FadeIn } from "@/components/admin/FadeIn";
import type { ServiceRow } from "@/lib/types/content";
import { ServiceForm } from "./ServiceForm";
import { ServicesTable } from "./ServicesTable";

type DialogTarget = "new" | ServiceRow | null;

export function ServicesManager({ items }: { items: ServiceRow[] }) {
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
            <h1 className="text-2xl font-bold tracking-tight">Services</h1>
            <p className="mt-1 text-sm text-muted-foreground">{items.length} service{items.length === 1 ? "" : "s"}</p>
          </div>
          <Button className="brand-cta" onClick={() => setTarget("new")}>
            <Plus />
            New service
          </Button>
        </div>
      </FadeIn>

      <div className="mt-6">
        <ServicesTable items={items} onEdit={setTarget} />
      </div>

      <Dialog open={target !== null} onOpenChange={(open) => !open && close()}>
        <DialogContent className="max-h-[85vh] max-w-3xl overflow-y-auto sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>{target === "new" ? "New service" : "Edit service"}</DialogTitle>
            <DialogDescription>
              {target === "new" ? "Add a new service page." : "Update this service."}
            </DialogDescription>
          </DialogHeader>
          <ServiceForm
            key={target === "new" ? "new" : (target?.id ?? "closed")}
            service={target && target !== "new" ? target : undefined}
            onSuccess={handleSuccess}
            onCancel={close}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}
