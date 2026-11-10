import type { MetadataRoute } from "next";

// Before this file /robots.txt returned the full 404 page (~40 KB, ~94 times a day).
// Production: allow everything (same effect as before, when the missing file meant "allow all")
// and point crawlers at the sitemap. Previews / other environments: disallow everything.
const SITE = "https://www.alfalahcenter.ca";

export default function robots(): MetadataRoute.Robots {
  if (process.env.VERCEL_ENV && process.env.VERCEL_ENV !== "production") {
    return { rules: { userAgent: "*", disallow: "/" } };
  }
  return { rules: { userAgent: "*", allow: "/" }, sitemap: `${SITE}/sitemap.xml` };
}
