"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import { MapPin, HeartHandshake, Clock } from "lucide-react";
import { brand } from "@/lib/brand";
import { easeOut } from "@/lib/motion";

/** Scraped exterior from alfalahcenter.ca — original building hero (not stock video). */
const HERO_PHOTO = "/gallery/C360_2019-05-11-04-09-14-004.jpg";

/** Same ink overlay as VideoBed — keeps white hero type readable over the photo. */
const INK_OVERLAY =
  "bg-[linear-gradient(180deg,rgba(26,31,28,0.78)_0%,rgba(22,51,46,0.82)_50%,rgba(22,51,46,0.92)_100%),radial-gradient(ellipse_at_30%_20%,rgba(32,65,58,0.40),transparent_55%),radial-gradient(ellipse_at_90%_80%,rgba(201,168,76,0.10),transparent_40%)]";

export default function Hero() {
  const reduce = useReducedMotion();
  const [live, setLive] = useState(false);

  useEffect(() => {
    setLive(true);
  }, []);

  const motionOn = live && !reduce;

  return (
    <section className="relative min-h-[88svh] overflow-hidden md:min-h-[94svh]">
      <div aria-hidden className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={`absolute inset-0 ${motionOn ? "ken-burns" : ""}`}>
          <Image
            src={HERO_PHOTO}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover object-center"
          />
        </div>
        <div className={`absolute inset-0 ${INK_OVERLAY}`} />
        <div className="pattern-geometric-lattice absolute inset-0 opacity-50" />
        <div className="video-grain absolute inset-0" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-10 text-center md:min-h-[94svh] md:px-8 md:pb-24">
        <motion.p
          initial={motionOn ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright/90"
        >
          {brand.hero.kicker}
        </motion.p>

        <motion.h1
          initial={motionOn ? { opacity: 0, y: 28 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: easeOut }}
          className="font-display text-4xl font-semibold leading-[1.12] text-white drop-shadow-sm sm:text-5xl md:text-6xl"
        >
          {brand.hero.h1}
        </motion.h1>

        <motion.p
          initial={motionOn ? { opacity: 0, y: 24 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: easeOut }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          {brand.hero.sub}
        </motion.p>

        <motion.blockquote
          initial={motionOn ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.28 }}
          className="mt-8 max-w-xl border-l-2 border-gold/60 pl-4 text-left text-sm italic text-white/75 md:text-base"
        >
          “{brand.hero.hadith}”
          <footer className="mt-2 not-italic text-xs uppercase tracking-wider text-gold-bright/80">
            — {brand.hero.hadithSource}
          </footer>
        </motion.blockquote>

        <motion.div
          initial={motionOn ? { opacity: 0, y: 16 } : false}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.35, ease: easeOut }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3 sm:gap-4"
        >
          <a
            href={brand.links.donateExpand}
            target="_blank"
            rel="noopener noreferrer"
            className="gold-btn inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-semibold tracking-wide"
          >
            <HeartHandshake className="h-4 w-4" aria-hidden />
            Support the masjid
          </a>
          <a
            href="#prayer-times"
            className="inline-flex items-center gap-2 rounded-full border border-white/45 bg-white/10 px-7 py-3.5 text-base font-semibold text-white backdrop-blur-sm transition hover:border-gold-bright hover:bg-white/15"
          >
            <Clock className="h-4 w-4" aria-hidden />
            Prayer times
          </a>
          <a
            href={brand.address.mapsDirections}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-white/35 px-6 py-3.5 text-sm font-semibold text-white/90 transition hover:border-gold-bright hover:text-gold-bright"
          >
            <MapPin className="h-4 w-4" aria-hidden />
            Directions
          </a>
        </motion.div>

        <motion.p
          initial={motionOn ? { opacity: 0 } : false}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 0.45 }}
          className="mt-8 text-sm text-white/65"
        >
          {brand.address.line1} · {brand.campus}
        </motion.p>
      </div>
    </section>
  );
}
