"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Heart, Phone } from "lucide-react";
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
  const [openPath, setOpenPath] = useState<string | null>(null);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const sheetRef = useRef<HTMLDivElement>(null);

  // The sheet is "open" only for the route it was opened on, so any
  // navigation closes it without a setState-in-effect.
  const open = openPath === pathname;
  const close = () => setOpenPath(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    sheetRef.current?.querySelector<HTMLElement>("a")?.focus();
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpenPath(null);
        toggleRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <header
      className={`sticky top-0 z-50 border-b bg-cream/90 backdrop-blur-xl transition-[box-shadow,border-color,background-color] duration-500 ${
        scrolled || open
          ? "border-gold/25 shadow-[0_8px_30px_-12px_rgba(26,31,28,0.18)]"
          : "border-gold/15"
      }`}
    >
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-3 focus:z-[60] focus:rounded-full focus:bg-emerald focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-cream"
      >
        Skip to content
      </a>
      <div
        className={`mx-auto flex max-w-6xl items-center justify-between px-5 transition-[padding] duration-500 md:px-8 ${
          scrolled ? "py-2" : "py-2.5 md:py-3"
        }`}
      >
        <Logo variant="dark" />

        <nav className="hidden items-center gap-7 xl:flex" aria-label="Primary">
          {links.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={`nav-link text-[13.5px] font-medium tracking-wide transition-colors ${
                  active ? "text-emerald" : "text-charcoal/75 hover:text-emerald"
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
            className="btn btn-sm gold-btn ml-1"
          >
            Donate Now
          </a>
        </nav>

        <button
          ref={toggleRef}
          type="button"
          className="inline-flex h-11 items-center gap-2.5 rounded-full px-3.5 text-sm font-semibold text-charcoal transition-colors hover:bg-emerald/5 xl:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close menu" : "Open menu"}
          onClick={() => setOpenPath(open ? null : pathname)}
        >
          <span className="burger" aria-hidden>
            <span />
            <span />
            <span />
          </span>
          <span aria-hidden>{open ? "Close" : "Menu"}</span>
        </button>
      </div>

      <div
        id="mobile-nav"
        ref={sheetRef}
        data-open={open ? "true" : "false"}
        className="mobile-sheet absolute inset-x-0 top-full h-[calc(100svh-100%)] overflow-y-auto border-t border-gold/20 bg-cream xl:hidden"
        inert={!open}
      >
        <div className="pattern-geometric-lattice pointer-events-none absolute inset-0 opacity-[0.12]" aria-hidden />
        <nav className="relative mx-auto flex max-w-md flex-col px-6 pb-10 pt-6" aria-label="Mobile">
          {links.map((l, i) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={close}
                aria-current={active ? "page" : undefined}
                style={{ ["--i" as string]: i }}
                className={`sheet-item group flex items-center justify-between border-b border-gold/20 py-4 font-display text-2xl font-semibold ${
                  active ? "text-emerald" : "text-charcoal"
                }`}
              >
                {l.label}
                <ArrowUpRight
                  className="h-5 w-5 text-gold-deep transition-transform duration-500 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                  aria-hidden
                />
              </Link>
            );
          })}
          <div className="sheet-item mt-8 grid gap-3" style={{ ["--i" as string]: links.length }}>
            <a
              href={brand.links.donateExpand}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="btn btn-lg gold-btn w-full"
            >
              <Heart className="h-4 w-4" aria-hidden />
              Donate Now
            </a>
            <a href={brand.phoneHref} className="btn btn-lg btn-outline w-full">
              <Phone className="h-4 w-4" aria-hidden />
              {brand.phone}
            </a>
          </div>
          <p
            className="sheet-item mt-8 text-center text-sm text-muted"
            style={{ ["--i" as string]: links.length + 1 }}
          >
            {brand.address.line1} · {brand.campus}
          </p>
        </nav>
      </div>
    </header>
  );
}
