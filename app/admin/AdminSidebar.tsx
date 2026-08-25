"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "motion/react";
import { LayoutDashboard, Images, Wrench, HelpCircle, LogOut, Loader2, Palette, Share2 } from "lucide-react";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard, exact: true },
  { href: "/admin/portfolio", label: "Portfolio", icon: Images },
  { href: "/admin/logo-images", label: "Logo Designs", icon: Palette },
  { href: "/admin/social-images", label: "Social Media Designs", icon: Share2 },
  { href: "/admin/services", label: "Services", icon: Wrench },
  { href: "/admin/faqs", label: "FAQs", icon: HelpCircle },
];

const containerVariants = {
  hidden: {},
  show: {
    transition: { staggerChildren: 0.06, delayChildren: 0.1 },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -12 },
  show: { opacity: 1, x: 0, transition: { duration: 0.35, ease: [0.22, 1, 0.36, 1] } },
};

export function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  async function handleLogout() {
    setIsLoggingOut(true);
    await fetch("/api/admin/logout", { method: "POST" });
    router.push("/admin/login");
    router.refresh();
  }

  return (
    <Sidebar className="border-r-0">
      <SidebarHeader className="gap-0 px-3 py-4">
        <motion.div
          initial={{ opacity: 0, y: -8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex items-center gap-2.5 rounded-lg px-1 py-1"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center overflow-hidden rounded-lg shadow-sm">
            {/* animated conic glow behind the mark */}
            <motion.div
              aria-hidden
              className="absolute inset-0 opacity-60"
              style={{
                background:
                  "conic-gradient(from 0deg, var(--brand-teal), var(--brand-gold), var(--brand-teal))",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 6, repeat: Infinity, ease: "linear" }}
            />
            <div className="absolute inset-[1.5px] rounded-[7px] bg-background" />
            <Image src="/favicon.ico" alt="" width={20} height={20} className="relative object-contain" />
          </div>
          <div className="flex flex-col leading-tight">
            <span className="text-sm font-bold tracking-tight">The Social Nexus</span>
            <span className="text-[11px] font-medium text-muted-foreground">Admin Dashboard</span>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="px-1">
        <SidebarGroup>
          <SidebarGroupLabel>Content</SidebarGroupLabel>
          <SidebarGroupContent>
            <motion.div variants={containerVariants} initial="hidden" animate="show">
              <SidebarMenu>
                {navItems.map((item) => {
                  const isActive = item.exact ? pathname === item.href : pathname?.startsWith(item.href);
                  return (
                    <motion.div key={item.href} >
                      <SidebarMenuItem>
                        <SidebarMenuButton
                          render={<Link href={item.href} />}
                          isActive={isActive}
                          className={cn(
                            "group relative overflow-hidden transition-colors duration-200",
                            isActive
                              ? "hover:text-white"
                              : "hover:bg-brand-teal/10 hover:text-brand-teal-dark",
                          )}
                        >
                          {isActive && (
                            <motion.span
                              layoutId="admin-sidebar-active-pill"
                              className="absolute inset-0 rounded-md bg-linear-to-r from-brand-teal to-brand-teal-dark shadow-sm"
                              transition={{ type: "spring", stiffness: 380, damping: 32 }}
                            />
                          )}
                          <motion.span
                            className="relative z-10 flex items-center gap-2"
                            whileHover={{ x: isActive ? 0 : 2 }}
                            transition={{ type: "spring", stiffness: 400, damping: 25 }}
                          >
                            <item.icon
                              className={cn(
                                "relative z-10 transition-transform duration-200 group-hover:scale-110",
                                isActive && "text-white",
                              )}
                            />
                            <span className="relative z-10">{item.label}</span>
                          </motion.span>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    </motion.div>
                  );
                })}
              </SidebarMenu>
            </motion.div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="gap-2 px-1">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="flex items-center gap-2.5 rounded-lg px-2 py-1.5"
        >
          <Avatar className="h-8 w-8 border border-border">
            <AvatarFallback className="bg-brand-gold/15 text-[11px] font-bold text-brand-navy">A</AvatarFallback>
          </Avatar>
          <div className="flex flex-col leading-tight">
            <span className="text-xs font-semibold">Admin</span>
            <span className="flex items-center gap-1 text-[11px] text-muted-foreground">
              <motion.span
                className="h-1.5 w-1.5 rounded-full bg-emerald-500"
                animate={{ opacity: [1, 0.4, 1] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              />
              Signed in
            </span>
          </div>
        </motion.div>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="group text-muted-foreground transition-colors duration-200 hover:bg-destructive/10 hover:text-destructive"
            >
              <AnimatePresence mode="wait" initial={false}>
                {isLoggingOut ? (
                  <motion.span
                    key="loading"
                    initial={{ opacity: 0, rotate: -90 }}
                    animate={{ opacity: 1, rotate: 0 }}
                    exit={{ opacity: 0 }}
                  >
                    <Loader2 className="animate-spin" />
                  </motion.span>
                ) : (
                  <motion.span
                    key="idle"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="transition-transform duration-200 group-hover:-translate-x-0.5"
                  >
                    <LogOut />
                  </motion.span>
                )}
              </AnimatePresence>
              <span>{isLoggingOut ? "Signing out..." : "Log out"}</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}