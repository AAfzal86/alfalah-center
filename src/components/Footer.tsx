import Link from "next/link";
import Image from "next/image";
import { ArrowUp, ArrowUpRight, Heart, Mail, MapPin, Navigation, Phone } from "lucide-react";
import { brand } from "@/lib/brand";

const quick = [
  { href: "/about-us", label: "About Us" },
  { href: "/ongoing-programs", label: "Ongoing Programs" },
  { href: "/program-and-services", label: "Programs & Services" },
  { href: "/contact-us", label: "Contact Us" },
  { href: "/terms-conditions", label: "Terms & Conditions" },
  { href: "/privacy-policy", label: "Privacy Policy" },
];

const other = [
  { href: "/about-us#mission", label: "Our Mission" },
  { href: "/gallery", label: "Gallery" },
  { href: "/madrasah", label: "Madrassah Registration" },
  { href: "/madrassah-policies", label: "Madrassah Policies" },
  { href: "/special-needs", label: "Special Needs" },
  { href: "/food-bank-timings", label: "Food Bank Timings" },
  { href: "/donate", label: "Donate" },
];

export default function Footer() {
  return (
    <footer className="relative isolate overflow-hidden border-t border-gold/20 bg-emerald-deep text-white">
      <div className="pattern-geometric absolute inset-0 -z-10" aria-hidden />
      <div
        className="absolute inset-x-0 top-0 -z-10 h-72 bg-[radial-gradient(ellipse_at_top,rgba(254,201,107,0.12),transparent_65%)]"
        aria-hidden
      />

      {/* CTA band */}
      <div className="mx-auto max-w-6xl px-5 pt-16 md:px-8 md:pt-20">
        <div className="card-glass flex flex-col items-start justify-between gap-6 p-7 md:flex-row md:items-center md:p-10">
          <div>
            <p className="eyebrow text-gold-bright/90">{brand.fullName}</p>
            <p className="mt-3 font-display text-2xl font-semibold leading-tight text-white md:text-[2rem]">
              {brand.tagline}
            </p>
          </div>
          <div className="flex w-full flex-col gap-3 sm:w-auto sm:flex-row">
            <a
              href={brand.links.donateExpand}
              target="_blank"
              rel="noopener noreferrer"
              className="btn gold-btn"
            >
              <Heart className="h-4 w-4" aria-hidden />
              Donate Now
            </a>
            <a
              href={brand.address.mapsDirections}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-glass"
            >
              <Navigation className="h-4 w-4" aria-hidden />
              Get directions
            </a>
          </div>
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-12 px-5 py-14 sm:grid-cols-2 md:px-8 md:py-16 lg:grid-cols-[1.3fr_1fr_1fr_1.3fr]">
        <div>
          <Image
            src="/logo/Al-Falah-Center-White-Green-Logo-1.svg"
            alt="Alfalah Center"
            width={160}
            height={50}
            className="mb-5 h-12 w-auto"
          />
          <p className="max-w-xs text-sm leading-relaxed text-white/70">
            {brand.fullName} — {brand.tagline}. Serving the Southeast Edmonton Muslim community.
          </p>
          <div className="mt-6 flex flex-wrap gap-2.5 text-sm">
            <a
              href={brand.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-white/80 transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              Facebook
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
            <a
              href={brand.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 rounded-full border border-white/15 px-4 py-2 text-white/80 transition-colors hover:border-gold-bright hover:text-gold-bright"
            >
              Instagram
              <ArrowUpRight className="h-3.5 w-3.5 opacity-70" aria-hidden />
            </a>
          </div>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-bright">
            Quick Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link hover:text-gold-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-bright">
            Other Links
          </h3>
          <ul className="mt-5 space-y-3 text-sm text-white/75">
            {other.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="footer-link hover:text-gold-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-bright">
            Our Location
          </h3>
          <ul className="mt-5 space-y-4 text-sm text-white/75">
            <li className="flex gap-3">
              <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <span>
                {brand.address.line1}
                <br />
                {brand.address.line2}
              </span>
            </li>
            <li className="flex gap-3">
              <Phone className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <a href={brand.phoneHref} className="transition-colors hover:text-gold-bright">
                {brand.phone}
              </a>
            </li>
            <li className="flex gap-3">
              <Mail className="mt-0.5 h-4 w-4 shrink-0 text-gold" aria-hidden />
              <a
                href={`mailto:${brand.emails.admin}`}
                className="break-all transition-colors hover:text-gold-bright"
              >
                {brand.emails.admin}
              </a>
            </li>
          </ul>
          <a
            href={brand.address.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="footer-link mt-5 text-sm font-semibold text-gold-bright"
          >
            Get directions
            <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
          </a>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-5 md:px-8">
        <div className="gold-hairline opacity-70" aria-hidden />
      </div>
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-4 px-5 py-6 text-center text-xs text-white/55 md:flex-row md:justify-between md:px-8 md:text-left">
        <p>
          © Copyright – {new Date().getFullYear()} Al Falah Center, Edmonton | All Rights Reserved
        </p>
        <p>
          Sister campus:{" "}
          <a
            href={brand.links.sisterCampus}
            className="text-gold-bright/90 hover:underline"
            target="_blank"
            rel="noopener noreferrer"
          >
            Alfalah Center North
          </a>
        </p>
        <a
          href="#main"
          className="inline-flex items-center gap-2 rounded-full border border-white/15 px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.2em] text-white/70 transition-colors hover:border-gold hover:text-gold-bright"
        >
          Back to top
          <ArrowUp className="h-3.5 w-3.5" aria-hidden />
        </a>
      </div>

      <div className="footer-watermark -mb-[0.12em] text-center text-[22vw] md:text-[13rem]" aria-hidden>
        Alfalah
      </div>
    </footer>
  );
}
