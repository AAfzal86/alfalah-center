import { Fragment } from "react";
import Image from "next/image";
import { MapPin, HeartHandshake, Clock, Phone, ArrowRight } from "lucide-react";
import { brand } from "@/lib/brand";
import BgVideo from "./BgVideo";

/** Scraped exterior from alfalahcenter.ca — the real building, framed in a mihrab arch. */
const HERO_PHOTO = "/gallery/C360_2019-05-11-04-09-14-004.jpg";

/**
 * v2 “Golden Courtyard” hero: prairie-sunrise film, a sun that rises behind a mihrab-arch window
 * holding the real building photo (the arch opens on load), golden rays and a word-by-word headline.
 * Everything is timed on load — nothing follows the scroll position.
 */
export default function Hero() {
  const words = brand.hero.h1.split(" ");
  return (
    <section aria-labelledby="hero-title" className="cg-hero relative isolate overflow-hidden bg-[#2a1d0c] text-white">
      <BgVideo name="c-wheat" eager position="center 55%" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,51,46,0.55)_0%,rgba(42,29,12,0.35)_45%,rgba(22,51,46,0.92)_100%)]" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-r from-[#16332e]/80 via-[#16332e]/30 to-transparent" aria-hidden />
      <div className="cg-rays absolute inset-0 -z-10" aria-hidden />
      <div className="cg-dawn absolute inset-0 -z-10" aria-hidden />

      <div className="mx-auto grid min-h-[calc(100svh-4.5rem)] max-w-7xl items-center gap-10 px-5 pb-28 pt-12 md:px-10 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16 lg:pb-32">
        <div>
          <p className="cg-in eyebrow text-gold-bright" style={{ ["--d" as string]: "200ms" }}>
            {brand.hero.kicker}
          </p>
          <h1 id="hero-title" className="cg-title mt-5 font-display font-semibold">
            {words.map((w, i) => (
              <Fragment key={i}>
                <span className="cg-word" style={{ ["--d" as string]: `${300 + i * 110}ms` }}>
                  {w === "Alfalah" || w === "Center" ? <em className="cg-sun-text not-italic">{w}</em> : w}
                </span>{" "}
              </Fragment>
            ))}
          </h1>
          <p className="cg-in lead mt-6 max-w-xl text-white/85" style={{ ["--d" as string]: "850ms" }}>
            {brand.hero.sub}
          </p>

          <div className="cg-in mt-8 grid grid-cols-2 gap-3 sm:flex sm:flex-wrap sm:items-center" style={{ ["--d" as string]: "1000ms" }}>
            <a href={brand.links.donateExpand} target="_blank" rel="noopener noreferrer" className="btn btn-lg gold-btn col-span-2">
              <HeartHandshake className="h-4 w-4" aria-hidden />
              Support the masjid
              <ArrowRight className="btn-icon-end h-4 w-4" aria-hidden />
            </a>
            <a href="#prayer-times" className="btn btn-lg btn-glass px-4 sm:px-7">
              <Clock className="h-4 w-4" aria-hidden />
              Prayer times
            </a>
            <a href={brand.address.mapsDirections} target="_blank" rel="noopener noreferrer" className="btn btn-lg btn-glass px-4 sm:px-7">
              <MapPin className="h-4 w-4" aria-hidden />
              Directions
            </a>
          </div>
        </div>

        {/* Mihrab-arch window with the real building */}
        <div className="relative mx-auto w-full max-w-[420px] lg:max-w-[460px]">
          <div className="cg-sun pointer-events-none absolute left-1/2 top-[18%] -z-10 aspect-square w-[85%] rounded-full" aria-hidden />
          <figure className="cg-arch relative aspect-[4/5] overflow-hidden">
            <Image
              src={HERO_PHOTO}
              alt="Alfalah Center building exterior in Southeast Edmonton"
              fill
              sizes="(max-width: 1024px) 90vw, 460px"
              className="cg-arch-img object-cover object-center"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[#16332e]/85 via-transparent to-transparent" aria-hidden />
            <figcaption className="absolute inset-x-0 bottom-0 p-6">
              <blockquote className="font-display text-[15px] italic leading-relaxed text-white/90 md:text-base">
                “{brand.hero.hadith}”
                <footer className="mt-2 font-sans text-[11px] not-italic uppercase tracking-[0.2em] text-gold-bright">
                  — {brand.hero.hadithSource}
                </footer>
              </blockquote>
            </figcaption>
          </figure>
          <div className="cg-arch-line pointer-events-none absolute -inset-3 md:-inset-4" aria-hidden />
        </div>
      </div>

      {/* Info rail */}
      <div className="cg-in absolute inset-x-0 bottom-0 z-10 border-t border-gold-bright/25 bg-[#16332e]/90" style={{ ["--d" as string]: "1200ms" }}>
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-5 py-3.5 text-[13px] text-white/80 sm:flex-row md:px-10">
          <span className="inline-flex items-center gap-2">
            <MapPin className="h-3.5 w-3.5 text-gold-bright" aria-hidden />
            {brand.address.line1} · {brand.campus}
          </span>
          <a href={brand.phoneHref} className="inline-flex items-center gap-2 transition-colors hover:text-gold-bright">
            <Phone className="h-3.5 w-3.5 text-gold-bright" aria-hidden />
            {brand.phone}
          </a>
          <span className="hidden font-display italic text-gold-bright md:inline">{brand.tagline}</span>
        </div>
      </div>
    </section>
  );
}
