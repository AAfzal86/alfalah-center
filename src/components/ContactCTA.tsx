import { brand } from "@/lib/brand";
import Reveal from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="bg-cream-deep py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="cream-panel rounded-3xl p-8 md:p-10">
            <p className="eyebrow text-emerald">
              Get in Touch
            </p>
            <h2 className="mt-2 font-display text-[clamp(1.6rem,1.25rem+1.3vw,2.3rem)] font-semibold leading-tight tracking-[-0.015em] text-charcoal">
              Interested in our Work?
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Contact Imam
                </p>
                <a
                  href={`mailto:${brand.emails.imam}`}
                  className="mt-1 block text-sm font-medium text-emerald hover:underline"
                >
                  {brand.emails.imam}
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Phone
                </p>
                <a
                  href={brand.phoneHref}
                  className="mt-1 block text-sm font-medium text-emerald hover:underline"
                >
                  {brand.phone} EXT2
                </a>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-muted">
                  Administration
                </p>
                <a
                  href={`mailto:${brand.emails.admin}`}
                  className="mt-1 block text-sm font-medium text-emerald hover:underline"
                >
                  {brand.emails.admin}
                </a>
              </div>
            </div>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href="/contact-us"
                className="btn gold-btn"
              >
                Contact Us
              </a>
              <a
                href={brand.links.donateExpand}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Donate Now
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
