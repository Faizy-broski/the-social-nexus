import type { Metadata } from "next";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { Separator } from "@/components/ui/separator";
import { AdminSidebar } from "../AdminSidebar";
import { AdminMotionProvider } from "../AdminMotionProvider";

export const metadata: Metadata = { title: "Admin — The Social Nexus", robots: { index: false, follow: false } };

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <AdminMotionProvider>
      <SidebarProvider>
        <AdminSidebar />
        <SidebarInset className="bg-muted/20">
          <header className="sticky top-0 z-30 flex h-14 shrink-0 items-center gap-3 border-b bg-background/80 px-4 backdrop-blur-sm sm:px-6">
            <SidebarTrigger className="-ml-1" />
            <Separator orientation="vertical" className="h-5" />
            <span className="text-sm font-medium text-muted-foreground">Admin Dashboard</span>
          </header>
          <div className="flex-1 space-y-6 p-4 sm:p-6 lg:p-8">{children}</div>
        </SidebarInset>
      </SidebarProvider>
    </AdminMotionProvider>
  );
}
