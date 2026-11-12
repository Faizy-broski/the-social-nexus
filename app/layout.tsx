
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
  metadataBase: new URL("https://thesocialnexus.co.uk"),
  title: {
    default: "Social Nexus | Web, App & Digital Marketing Agency",
    template: "%s | The Social Nexus",
  },
  description:
    "Social Nexus is a digital agency building websites, apps and marketing campaigns. 12+ years experience and 1500+ projects delivered across the UK, USA and Pakistan.",
  alternates: { canonical: "./" },

  verification: {
    google: "_8tyFuBVTuBWbw2e8oFdbt4qtPeYIz-t8jLmxi4S26g",
  },

  openGraph: {
    title: "Social Nexus | Web, App & Digital Marketing Agency",
    description:
      "Premium digital experiences that define the future. Where creativity meets cutting-edge technology.",
    url: "https://thesocialnexus.co.uk",
    siteName: "Social Nexus",
    locale: "en_GB",
    type: "website",
  },
  twitter: { card: "summary_large_image" },
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
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-W7RCND5R"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
            title="Google Tag Manager"
          />
        </noscript>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              name: "Social Nexus",
              url: "https://thesocialnexus.co.uk",
              logo: "https://thesocialnexus.co.uk/TSN-Black-Logo.webp",
            }),
          }}
        />
        {/* Google Tag Manager */}
        <Script id="google-tag-manager" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            window.dataLayer.push({
              'gtm.start': new Date().getTime(),
              event: 'gtm.js'
            });
          `}
        </Script>

        <Script
          src="https://www.googletagmanager.com/gtm.js?id=GTM-W7RCND5R"
          strategy="afterInteractive"
        />

        {/* Google Analytics GA4 */}
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

        <SiteChrome>{children}</SiteChrome>
        <Toaster />
      </body>
    </html>
  );
}
