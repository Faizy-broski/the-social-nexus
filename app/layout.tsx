import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import Header from "@/components/home/Header";
import Footer from "@/components/home/Footer";
import LetsTalkBadge from "@/components/home/LetsTalkBadge";
import {HeaderThemeProvider} from "@/contexts/header-theme-contexts";
import WhatsappButton from "@/components/home/WhatsappButton";
import LetsMake from "@/components/home/LetsMake";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

export const metadata: Metadata = {
  title: "Social Nexus – Where Ideas Transform Into Digital Power.",
  description:
    "Social Nexus is a premium digital agency crafting cutting-edge websites, apps, and digital solutions. With 8+ years experience and 1500+ projects delivered across Pakistan, UK, and USA.",
  keywords: "web development, mobile app, digital agency, SEO, UK, Pakistan, USA",
  openGraph: {
    title: "Social Nexus – Where Ideas Transform Into Digital Power.",
    description:
      "Premium digital experiences that define the future. Where creativity meets cutting-edge technology.",
    url: "https://thesocialnexus.co.uk",
    siteName: "Social Nexus",
    locale: "en_GB",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)} data-scroll-behavior="smooth">
      <body>
        <HeaderThemeProvider>
        <Header />
        {/* <LetsTalkBadge/> */}
        {children}
        <LetsMake />
        <Footer />
        <WhatsappButton />
        </HeaderThemeProvider>
        </body>
    </html>
  );
}
