import { brand } from "@/lib/brand";
import Reveal from "./Reveal";

export default function ContactCTA() {
  return (
    <section className="bg-cream-deep py-16 md:py-20">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <div className="cream-panel rounded-3xl p-8 md:p-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
              Get in Touch
            </p>
            <h2 className="mt-2 font-display text-2xl font-semibold text-charcoal md:text-3xl">
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
                className="gold-btn inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Contact Us
              </a>
              <a
                href={brand.links.donateExpand}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-emerald/30 px-6 py-2.5 text-sm font-semibold text-emerald hover:bg-emerald/5"
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
