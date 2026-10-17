import Image from "next/image";
import Link from "next/link";
import Hero from "@/components/Hero";
import PrayerTimes from "@/components/PrayerTimes";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import VideoBed from "@/components/VideoBed";
import { HandHeart, BookOpen, Landmark, Megaphone, ArrowRight, Phone, Mail } from "lucide-react";
import { brand } from "@/lib/brand";
import {
  atAlfalah,
  whatWeDoIntro,
  mandates,
  about,
  specialNeeds,
  dialerOptions,
} from "@/lib/content";

const mandateIcons = [Megaphone, Landmark, BookOpen, HandHeart];

export default function HomePage() {
  return (
    <>
      <Hero />
      <PrayerTimes />

      {/* At Alfalah */}
      <section className="section-y relative overflow-hidden">
        <VideoBed
          src="/videos/facilities.mp4"
          poster="/videos/facilities.jpg"
          tone="cream"
          grain
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <Reveal>
              <p className="eyebrow text-emerald">
                Southeast Edmonton
              </p>
              <h2 className="display-section mt-4 text-charcoal">At Alfalah Center</h2>
              <div className="gold-hairline my-6 w-24" aria-hidden />
              <ul className="space-y-3.5">
                {atAlfalah.map((item) => (
                  <li key={item} className="flex gap-3 text-sm leading-relaxed text-charcoal/85 md:text-base">
                    <span className="mt-2.5 h-1.5 w-1.5 shrink-0 rotate-45 bg-gold" aria-hidden />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/about-us"
                  className="btn gold-btn"
                >
                  Our Mission
                </Link>
                <a
                  href={brand.links.donateExpand}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-outline"
                >
                  Donate Now
                </a>
              </div>
            </Reveal>
            <Reveal delay={0.1}>
              <div className="photo-frame group relative aspect-[4/3]">
                <div className="frame-corners" aria-hidden />
                <Image
                  src="/gallery/C360_2019-05-11-04-09-14-004.jpg"
                  alt="Alfalah Center building exterior"
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
      <section className="section-y relative overflow-hidden">
        <VideoBed
          src="/videos/statement.mp4"
          poster="/videos/statement.jpg"
          tone="cream"
          grain
        />
        <div className="relative z-10 mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow eyebrow-center flex justify-center text-emerald">
              What We Do
            </p>
            <div className="gold-hairline mx-auto my-6 w-24" aria-hidden />
            <p className="lead mx-auto max-w-3xl text-center text-charcoal/80">
              {whatWeDoIntro}
            </p>
          </Reveal>
          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mandates.map((m, i) => {
              const Icon = mandateIcons[i % mandateIcons.length];
              return (
              <Reveal key={m.title} delay={0.06 * i}>
                <article className="card-premium flex h-full flex-col p-6">
                  <div className="mb-6 flex items-start justify-between">
                    <div className="icon-ring flex h-11 w-11 items-center justify-center rounded-full text-gold-bright">
                      <Icon className="h-5 w-5" aria-hidden />
                    </div>
                    <span className="card-index" aria-hidden>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="font-display text-xl font-semibold leading-snug text-emerald">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
                </article>
              </Reveal>
              );
            })}
          </div>
        </div>
      </section>

      {/* Special Needs teaser */}
      <section className="section-y bg-cream">
        <div className="mx-auto max-w-5xl px-5 md:px-8">
          <Reveal>
            <div className="relative isolate grid items-center gap-8 overflow-hidden rounded-[1.75rem] bg-emerald-deep p-8 text-white shadow-[0_30px_60px_-30px_rgba(22,51,46,0.6)] ring-1 ring-gold/30 md:grid-cols-[1fr_auto] md:p-12">
              <div className="pattern-geometric-lattice absolute inset-0 -z-10 opacity-40" aria-hidden />
              <div>
                <p className="eyebrow text-gold-bright/90">
                  Special Needs
                </p>
                <p className="lead mt-4 text-white/85">{specialNeeds.body}</p>
                <Link
                  href="/special-needs"
                  className="btn gold-btn mt-6"
                >
                  Learn more
                </Link>
              </div>
              <Image
                src="/logo/Muhsen-Logo-400x189-1.webp"
                alt="MUHSEN"
                width={200}
                height={95}
                className="mx-auto h-auto w-44 rounded-2xl bg-white p-4 shadow-lg ring-1 ring-gold/40"
              />
            </div>
          </Reveal>
        </div>
      </section>

      {/* Change a Life + dialer */}
      <section className="section-y relative overflow-hidden">
        <VideoBed
          src="/videos/cta.mp4"
          poster="/videos/cta.jpg"
          tone="ink"
          lattice
          grain
        />
        <div className="relative z-10 mx-auto max-w-5xl px-5 text-center text-white md:px-8">
          <Reveal>
            <h2 className="display-section">Get involved</h2>
            <div className="gold-hairline mx-auto my-6 w-24" aria-hidden />
            <p className="lead mx-auto max-w-2xl text-white/85">
              {about.changeALife}
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <a
                href={brand.links.donateExpand}
                target="_blank"
                rel="noopener noreferrer"
                className="btn gold-btn"
              >
                Donate Now
              </a>
              <Link
                href="/contact-us"
                className="btn btn-glass"
              >
                Volunteer
              </Link>
            </div>
          </Reveal>

          <div className="mt-12 grid gap-4 text-left sm:grid-cols-3">
            {dialerOptions.map((d) => (
              <Reveal key={d.label}>
                <div className="card-glass h-full p-6">
                  <h3 className="font-display text-lg font-semibold text-gold-bright">{d.label}</h3>
                  <p className="mt-2 text-sm text-white/75">{d.detail}</p>
                  <a href={brand.phoneHref} className="mt-4 inline-flex items-center gap-2 text-sm font-medium text-white transition-colors hover:text-gold-bright">
                    <Phone className="h-3.5 w-3.5 text-gold-bright" aria-hidden />
                    {d.phone}
                  </a>
                  {"email" in d && d.email ? (
                    <a
                      href={`mailto:${d.email}`}
                      className="mt-1.5 flex items-center gap-2 break-all text-sm text-white/80 transition-colors hover:text-gold-bright"
                    >
                      <Mail className="h-3.5 w-3.5 shrink-0 text-gold-bright" aria-hidden />
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
      <section className="relative overflow-hidden border-y border-gold/25 bg-cream-deep py-12 md:py-14">
        <div className="pattern-geometric-lattice pointer-events-none absolute inset-0 opacity-[0.08]" aria-hidden />
        <div className="relative mx-auto flex max-w-5xl flex-col items-center justify-between gap-5 px-5 text-center md:flex-row md:px-8 md:text-left">
          <div>
            <p className="font-display text-2xl font-semibold text-emerald md:text-[1.75rem]">
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
            className="btn btn-lg gold-btn shrink-0"
          >
            Donate Now
            <ArrowRight className="btn-icon-end h-4 w-4" aria-hidden />
          </a>
        </div>
      </section>

      <ContactCTA />

      {/* Map */}
      <section className="bg-cream pb-20 md:pb-28">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="eyebrow text-emerald">Visit</p>
            <h2 className="display-section mb-8 mt-3 text-emerald">Our Location</h2>
            <div className="photo-frame p-1.5">
              <iframe
                title="Alfalah Center map"
                src={brand.address.mapsEmbed}
                className="h-[360px] w-full rounded-[1rem] border-0 md:h-[420px]"
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
