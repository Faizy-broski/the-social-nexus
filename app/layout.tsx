import type { Metadata } from "next";
import Script from "next/script";
import { Geist } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { SiteChrome } from "@/components/shared/SiteChrome";
import { Toaster } from "@/components/ui/sonner";

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "Social Nexus – Where Ideas Transform Into Digital Power.",
  description:
    "Social Nexus is a premium digital agency crafting cutting-edge websites, apps, and digital solutions. With 8+ years experience and 1500+ projects delivered across Pakistan, UK, and USA.",
  keywords:
    "web development, mobile app, digital agency, SEO, UK, Pakistan, USA",
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
    <html
      lang="en"
      className={cn("font-sans", geist.variable)}
      data-scroll-behavior="smooth"
    >
      <body>
        <SiteChrome>{children}</SiteChrome>
        <Toaster />

        {/* Google Analytics */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-MS0S1WH6YM"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){window.dataLayer.push(arguments);}
            window.gtag = gtag;
            window.gtag('js', new Date());
            window.gtag('config', 'G-MS0S1WH6YM');
          `}
        </Script>
      </body>
    </html>
  );
}
