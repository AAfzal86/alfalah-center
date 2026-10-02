import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { brand } from "@/lib/brand";
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
import AnnouncementBar from "@/components/AnnouncementBar";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.fullName} – ${brand.tagline}`,
    template: `%s · ${brand.name}`,
  },
  description:
    "Alfalah Islamic Centre in Southeast Edmonton — daily prayers, Jumu’ah, madrasah, programs, and community service.",
  keywords: [
    "Alfalah Center",
    "Alfalah Islamic Centre",
    "mosque Edmonton",
    "Southeast Edmonton mosque",
    "ICNA Edmonton",
    "prayer times Edmonton",
    "madrasah Edmonton",
  ],
  openGraph: {
    title: `${brand.fullName} – ${brand.tagline}`,
    description:
      "Worship, learning, and community in Southeast Edmonton. Prayer times, programs, madrasah, donate, and visit.",
    type: "website",
    locale: "en_CA",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${playfair.variable}`}>
      <body className="min-h-screen antialiased">
        <AnnouncementBar />
        <Nav />
        <main id="main">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
