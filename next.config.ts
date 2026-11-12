import type { NextConfig } from "next";

// Report-Only first: observe violations in the browser console, then switch the
// header key to "Content-Security-Policy" once nothing legitimate is flagged.
const csp = [
  "default-src 'self'",
  "script-src 'self' 'unsafe-inline' 'unsafe-eval' https://www.googletagmanager.com https://www.google-analytics.com",
  "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
  "img-src 'self' data: blob: https://*.supabase.co https://thesocialnexus.co.uk https://www.google-analytics.com https://www.googletagmanager.com",
  "font-src 'self' data: https://fonts.gstatic.com",
  "media-src 'self' blob:",
  "connect-src 'self' https://*.supabase.co https://www.google-analytics.com https://*.google-analytics.com https://*.analytics.google.com https://www.googletagmanager.com",
  "frame-src https://www.googletagmanager.com https://www.google.com",
  "frame-ancestors 'none'",
  "base-uri 'self'",
  "form-action 'self'",
].join("; ");

const nextConfig: NextConfig = {
  poweredByHeader: false,
  // Serve metadata (title, description, canonical) in <head> for every client,
  // including SEO crawlers that are not in Next's default bot list.
  htmlLimitedBots: /.*/,
  images: {
    // Default quality is 75; LogoCarousel explicitly requests 60 for its
    // smaller tech-stack icons, so both values need to be allow-listed.
    qualities: [60, 75],
    remotePatterns: [
      // Supabase Storage public URLs (admin-uploaded portfolio/service images)
      { protocol: "https", hostname: "*.supabase.co", pathname: "/storage/v1/object/public/**" },
      // Legacy WordPress media library, still referenced by a few pages (e.g. About Us office photos)
      { protocol: "https", hostname: "thesocialnexus.co.uk", pathname: "/wp-content/uploads/**" },
    ],
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "Content-Security-Policy-Report-Only", value: csp },
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
