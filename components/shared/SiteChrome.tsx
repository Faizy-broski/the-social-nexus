"use client";

import { usePathname } from "next/navigation";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import LetsMake from "@/components/home/LetsMake";
import WhatsappButton from "@/components/home/WhatsappButton";
import { HeaderThemeProvider } from "@/contexts/header-theme-contexts";

/** The marketing site's header/footer/CTA chrome, skipped entirely on
 *  /admin routes — the dashboard has its own shell (see app/admin/layout.tsx)
 *  and shouldn't render the public site's nav, footer, or WhatsApp bubble. */
export function SiteChrome({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) return <>{children}</>;

  return (
    <HeaderThemeProvider>
      <Header />
      {children}
      <LetsMake />
      <Footer />
      <WhatsappButton />
    </HeaderThemeProvider>
  );
}
