import type { NextConfig } from "next";

// Browser caching for static files in /public. Without these headers Vercel sends
// "max-age=0, must-revalidate", so every page view re-checks every logo, video, poster
// and gallery image (one request each). Files here are only replaced together with a
// new deployment and new names are used for new content (e.g. seasonal posters), so a
// browser cache is safe. Posters change most often (announcements), so they get 1 day.
// Dynamic content (prayer times via /api/prayer, HTML pages) is NOT affected.
const longStatic = "public, max-age=1209600, stale-while-revalidate=86400"; // 14 days

const nextConfig: NextConfig = {
  images: {
    formats: ["image/avif", "image/webp"],
    // CDN cache for optimised /_next/image output (7 days, below the 14-day browser cache).
    minimumCacheTTL: 604800,
  },
  async headers() {
    return [
      { source: "/v2/:file*", headers: [{ key: "Cache-Control", value: longStatic }] },
      { source: "/videos/:file*", headers: [{ key: "Cache-Control", value: longStatic }] },
      { source: "/logo/:file*", headers: [{ key: "Cache-Control", value: longStatic }] },
      { source: "/gallery/:file*", headers: [{ key: "Cache-Control", value: longStatic }] },
      { source: "/images/:file*", headers: [{ key: "Cache-Control", value: longStatic }] },
      {
        source: "/posters/:file*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400, stale-while-revalidate=86400" }],
      },
    ];
  },
};

export default nextConfig;
