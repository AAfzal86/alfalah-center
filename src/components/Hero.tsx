import Image from "next/image";
import { MapPin, HeartHandshake, Clock, Phone, ArrowRight } from "lucide-react";
import { brand } from "@/lib/brand";

/** Scraped exterior from alfalahcenter.ca — original building hero (not stock video). */
const HERO_PHOTO = "/gallery/C360_2019-05-11-04-09-14-004.jpg";

/** Same ink overlay as VideoBed — keeps white hero type readable over the photo. */
const INK_OVERLAY =
  "bg-[linear-gradient(180deg,rgba(26,31,28,0.78)_0%,rgba(22,51,46,0.82)_50%,rgba(22,51,46,0.92)_100%),radial-gradient(ellipse_at_30%_20%,rgba(32,65,58,0.40),transparent_55%),radial-gradient(ellipse_at_90%_80%,rgba(201,168,76,0.10),transparent_40%)]";

/**
 * Server-rendered hero: Ken Burns + entrance are pure CSS (reduced-motion safe),
 * so the headline paints immediately and no animation JS ships.
 */
export default function Hero() {
  return (
    <section className="relative isolate min-h-[88svh] overflow-hidden bg-emerald-deep md:min-h-[94svh]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="ken-burns absolute inset-0">
          <Image
            src={HERO_PHOTO}
            alt=""
            fill
            priority
            fetchPriority="high"
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className={`absolute inset-0 ${INK_OVERLAY}`} />
        <div className="pattern-geometric-lattice absolute inset-0 opacity-50" />
        <div className="video-grain absolute inset-0" />
      </div>
      <div className="frame-corners hidden md:block" style={{ inset: "1.75rem 2rem 5rem" }} aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 pb-32 pt-14 text-center md:min-h-[94svh] md:px-8 md:pb-36">
        <p className="hero-rise eyebrow eyebrow-center text-gold-bright/90">{brand.hero.kicker}</p>

        <h1 className="hero-settle display-hero mt-6 max-w-4xl text-white drop-shadow-sm">
          {brand.hero.h1}
        </h1>

        <div
          className="hero-rise gold-hairline mx-auto mt-7 w-28"
          style={{ ["--d" as string]: "120ms" }}
          aria-hidden
        />

        <p className="hero-rise lead mt-7 max-w-2xl text-white/85" style={{ ["--d" as string]: "180ms" }}>
          {brand.hero.sub}
        </p>

        <blockquote
          className="hero-rise mt-8 max-w-xl border-l-2 border-gold/60 pl-4 text-left font-display text-[15px] italic leading-relaxed text-white/80 md:text-lg"
          style={{ ["--d" as string]: "240ms" }}
        >
          “{brand.hero.hadith}”
          <footer className="mt-2 font-sans text-xs not-italic uppercase tracking-[0.2em] text-gold-bright/85">
            — {brand.hero.hadithSource}
          </footer>
        </blockquote>

        <div
          className="hero-rise mt-10 grid w-full grid-cols-2 gap-3 sm:flex sm:w-auto sm:flex-row sm:flex-wrap sm:items-center sm:justify-center sm:gap-4"
          style={{ ["--d" as string]: "320ms" }}
        >
          <a
            href={brand.links.donateExpand}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg gold-btn col-span-2"
          >
            <HeartHandshake className="h-4 w-4" aria-hidden />
            Support the masjid
            <ArrowRight className="btn-icon-end h-4 w-4" aria-hidden />
          </a>
          <a href="#prayer-times" className="btn btn-lg btn-glass px-4 sm:px-7">
            <Clock className="h-4 w-4" aria-hidden />
            Prayer times
          </a>
          <a
            href={brand.address.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-lg btn-glass px-4 sm:px-7"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Directions
          </a>
        </div>
      </div>

      {/* Info rail */}
      <div className="absolute inset-x-0 bottom-0 z-10 border-t border-white/10 bg-emerald-deep/80">
        <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-2 px-5 py-3.5 text-[13px] text-white/75 sm:flex-row md:px-8">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold-bright" aria-hidden />
            {brand.address.line1} · {brand.campus}
          </span>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold-bright">
            <Phone className="h-3.5 w-3.5 text-gold-bright" aria-hidden />
            {brand.phone}
          </a>
          <a
            href="#prayer-times"
            className="hidden items-center gap-3 text-[11px] font-semibold uppercase tracking-[0.24em] text-white/60 transition-colors hover:text-gold-bright md:inline-flex"
          >
            Scroll
            <span className="relative block h-6 w-px overflow-hidden bg-white/15" aria-hidden>
              <span className="scroll-cue-line absolute inset-0 bg-gold-bright" />
            </span>
          </a>
        </div>
      </div>
    </section>
  );
}
