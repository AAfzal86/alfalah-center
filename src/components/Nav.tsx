"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Logo from "./Logo";
import { brand } from "@/lib/brand";

const links = [
  { href: "/", label: "Home" },
  { href: "/about-us", label: "About Us" },
  { href: "/madrasah", label: "Madrasah" },
  { href: "/ongoing-programs", label: "Ongoing Programs" },
  { href: "/gallery", label: "Gallery" },
  { href: "/contact-us", label: "Contact Us" },
];

export default function Nav() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const isHome = pathname === "/";

  // Sticky nav sits in document flow above the hero (cream body behind), not
  // overlaid on the dark hero image. Always use cream + dark emerald/charcoal
  // link contrast. (Transparent white links only work with a fixed-over-hero nav.)
  const elevated = scrolled || !isHome || open;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <header
      className={`sticky top-0 z-50 transition-all duration-500 ${
        elevated
          ? "border-b border-gold/25 bg-cream/95 shadow-sm backdrop-blur-md"
          : "border-b border-gold/15 bg-cream/95 backdrop-blur-md"
      }`}
    >
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-2.5 md:px-8 md:py-3">
        <Logo variant="dark" />

        <nav className="hidden items-center gap-6 xl:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`text-sm font-medium tracking-wide transition-colors ${
                  active
                    ? "text-emerald"
                    : "text-charcoal/80 hover:text-emerald"
                }`}
              >
                {l.label}
              </Link>
            );
          })}
          <a
            href={brand.links.donateExpand}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn rounded-full px-5 py-2 text-sm font-semibold"
          >
            Donate Now
          </a>
        </nav>

        <button
          type="button"
          className="rounded-md px-2 py-1 text-sm font-medium text-charcoal xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div
          id="mobile-nav"
          className="border-t border-gold/20 bg-cream/98 px-5 py-4 backdrop-blur-md xl:hidden"
        >
          <div className="flex flex-col gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="py-1 text-base font-medium text-charcoal/90"
              >
                {l.label}
              </Link>
            ))}
            <a
              href={brand.links.donateExpand}
              target="_blank"
              rel="noopener noreferrer"
              className="gold-btn mt-1 inline-flex justify-center rounded-full px-5 py-2.5 text-sm font-semibold"
            >
              Donate Now
            </a>
          </div>
        </div>
      )}
    </header>
  );
}
