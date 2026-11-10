import type { MetadataRoute } from "next";

// Lists the site's public pages (before this file /sitemap.xml was a 404).
const SITE = "https://www.alfalahcenter.ca";
const PAGES = [
  "",
  "/about-us",
  "/program-and-services",
  "/ongoing-programs",
  "/madrasah",
  "/madrassah-policies",
  "/special-needs",
  "/food-bank-timings",
  "/gallery",
  "/donate",
  "/contact-us",
  "/privacy-policy",
  "/terms-conditions",
];

export default function sitemap(): MetadataRoute.Sitemap {
  return PAGES.map((p) => ({ url: `${SITE}${p}` }));
}
