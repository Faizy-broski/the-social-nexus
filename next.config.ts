import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
          { key: "Permissions-Policy", value: "camera=(), microphone=(), geolocation=()" },
        ],
      },
    ];
  },
};

export default nextConfig;
