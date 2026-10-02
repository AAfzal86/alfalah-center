import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import PrayerTimes from "@/components/PrayerTimes";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import VideoBed from "@/components/VideoBed";
import { brand } from "@/lib/brand";
import {
  atAlfalah,
  whatWeDoIntro,
  mandates,
  about,
  specialNeeds,
  dialerOptions,
} from "@/lib/content";

export default function HomePage() {
  return (
    <>
      <Hero />
      <PrayerTimes />

      {/* At Alfalah */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <VideoBed
          src="/videos/facilities.mp4"
          poster="/videos/facilities.jpg"
          tone="cream"
          grain
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
                Southeast Edmonton
              </p>
              <h2 className="mt-2 font-display text-3xl font-semibold text-charcoal md:text-4xl">
                At Alfalah Center
              </h2>
              <ul className="mt-6 space-y-3">
                {atAlfalah.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal/85 md:text-base">
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about-us"
                  className="gold-btn inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  Our Mission
                </Link>
                <a
                  href={brand.links.donateExpand}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex rounded-full border border-emerald/30 bg-white/50 px-6 py-2.5 text-sm font-semibold text-emerald backdrop-blur-sm hover:bg-emerald/5"
                >
                  Donate Now
                </a>
              </div>
            </Reveal>
            <Reveal>
              <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
                <Image
                  src="/gallery/WhatsApp-Image-2026-05-18-at-10.04.41-PM.jpeg"
                  alt="Alfalah Center community"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <VideoBed
          src="/videos/statement.mp4"
          poster="/videos/statement.jpg"
          tone="cream"
          grain
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
              What We Do
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-charcoal/80">
              {whatWeDoIntro}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mandates.map((m) => (
              <Reveal key={m.title}>
                <article className="cream-panel flex h-full flex-col rounded-2xl bg-cream/90 p-6 backdrop-blur-sm">
                  <div className="icon-ring mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-gold-bright">
                    ◆
                  </div>
                  <h3 className="font-display text-lg font-semibold text-emerald">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Special Needs teaser */}
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="grid items-center gap-8 rounded-3xl bg-emerald-deep p-8 text-white md:grid-cols-[1fr_auto] md:p-10">
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-gold-bright/90">
                  Special Needs
                </p>
                <p className="mt-3 text-base leading-relaxed text-white/85">{specialNeeds.body}</p>
                <Link
                  href="/special-needs"
                  className="gold-btn mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  Learn more
                </Link>
              </div>
              <Image
                src="/logo/Muhsen-Logo-400x189-1.webp"
                alt="MUHSEN"
                width={200}
                height={95}
                className="mx-auto h-auto w-40 rounded-lg bg-white p-3"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Change a Life + dialer */}
      <section className="relative overflow-hidden py-16 md:py-20">
        <VideoBed
          src="/videos/cta.mp4"
          poster="/videos/cta.jpg"
          tone="ink"
          lattice
          grain
        />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center text-white md:px-8">
          <Reveal>
            <h2 className="font-display text-3xl font-semibold md:text-4xl">Get involved</h2>
            <div className="gold-hairline mx-auto my-5 max-w-xs" />
            <p className="mx-auto max-w-2xl text-base leading-relaxed text-white/85">
              {about.changeALife}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={brand.links.donateExpand}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn inline-flex rounded-full px-7 py-3 text-sm font-semibold"
              >
                Donate Now
              </a>
              <Link
                href="/contact-us"
                className="inline-flex rounded-full border border-white/40 px-7 py-3 text-sm font-semibold text-white hover:border-gold-bright hover:text-gold-bright"
              >
                Volunteer
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
            {dialerOptions.map((d) => (
              <Reveal key={d.label}>
                <div className="rounded-2xl border border-white/15 bg-white/10 p-5 backdrop-blur-sm">
                  <h3 className="font-semibold text-gold-bright">{d.label}</h3>
                  <p className="mt-2 text-sm text-white/75">{d.detail}</p>
                  <a href={brand.phoneHref} className="mt-3 block text-sm font-medium text-white hover:underline">
                    {d.phone}
                  </a>
                  {"email" in d && d.email ? (
                    <a
                      href={`mailto:${d.email}`}
                      className="mt-1 block text-sm text-white/80 hover:underline"
                    >
                      {d.email}
                    </a>
                  ) : null}
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* Fundraising strip */}
      <section className="border-y border-gold/25 bg-cream-deep py-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-4 px-5 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <p className="font-display text-xl font-semibold text-emerald">
              Fundraising for Alfalah South Expansion
            </p>
            <p className="mt-1 text-sm text-muted">
              Support the Southeast campus via DonorChoice / ICNA Edmonton.
            </p>
          </div>
          <a
            href={brand.links.donateExpand}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn shrink-0 rounded-full px-7 py-3 text-sm font-semibold"
          >
            Donate Now
          </a>
        </div>
      </section>

      <ContactCTA />

      {/* Map */}
      <section className="bg-cream pb-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="mb-4 font-display text-2xl font-semibold text-emerald">Our Location</h2>
            <div className="overflow-hidden rounded-3xl border border-gold/30 shadow-lg">
              <iframe
                title="Alfalah Center map"
                src={brand.address.mapsEmbed}
                className="h-[360px] w-full border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
