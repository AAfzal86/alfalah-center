import Link from "next/link";
import Image from "next/image";
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
    <footer className="pattern-geometric border-t border-gold/20 text-white">
      <div className="mx-auto grid max-w-6xl gap-10 px-5 py-14 md:grid-cols-2 md:px-8 lg:grid-cols-4">
        <div>
          <Image
            src="/logo/Al-Falah-Center-White-Green-Logo-1.svg"
            alt="Alfalah Center"
            width={160}
            height={50}
            className="mb-4 h-12 w-auto"
          />
          <p className="text-sm leading-relaxed text-white/75">
            {brand.fullName} — {brand.tagline}. Serving the Southeast Edmonton
            Muslim community.
          </p>
          <div className="mt-4 flex gap-3 text-sm">
            <a
              href={brand.links.facebook}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-bright hover:underline"
            >
              Facebook
            </a>
            <a
              href={brand.links.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="text-gold-bright hover:underline"
            >
              Instagram
            </a>
          </div>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
            Quick Links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {quick.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
            Other Links
          </h3>
          <ul className="space-y-2 text-sm text-white/80">
            {other.map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-gold-bright">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-gold-bright">
            Our Location
          </h3>
          <p className="text-sm leading-relaxed text-white/80">
            {brand.address.line1}
            <br />
            {brand.address.line2}
          </p>
          <p className="mt-3 text-sm text-white/80">
            <a href={brand.phoneHref} className="hover:text-gold-bright">
              {brand.phone}
            </a>
          </p>
          <p className="mt-1 text-sm text-white/80">
            <a
              href={`mailto:${brand.emails.admin}`}
              className="hover:text-gold-bright"
            >
              {brand.emails.admin}
            </a>
          </p>
          <a
            href={brand.address.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-flex text-sm font-semibold text-gold-bright hover:underline"
          >
            Get directions
          </a>
        </div>
      </div>

      <div className="gold-hairline" />
      <div className="mx-auto flex max-w-6xl flex-col gap-2 px-5 py-5 text-xs text-white/55 md:flex-row md:items-center md:justify-between md:px-8">
        <p>
          © Copyright – {new Date().getFullYear()} Al Falah Center, Edmonton |
          All Rights Reserved
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
      </div>
    </footer>
  );
}
