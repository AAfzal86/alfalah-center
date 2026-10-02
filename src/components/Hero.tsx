"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { MapPin, HeartHandshake, Clock } from "lucide-react";
import { brand } from "@/lib/brand";
import { easeOut } from "@/lib/motion";

export default function Hero() {
  const reduce = useReducedMotion();

  return (
    <section className="relative min-h-[88svh] overflow-hidden md:min-h-[94svh]">
      <Image
        src="/gallery/C360_2019-05-11-04-09-14-004.jpg"
        alt=""
        fill
        priority
        className="object-cover object-center"
        aria-hidden
      />
      <div
        className="absolute inset-0 bg-gradient-to-b from-charcoal/55 via-emerald-deep/70 to-emerald-deep/95"
        aria-hidden
      />
      <div className="pattern-geometric-lattice absolute inset-0 opacity-40" aria-hidden />

      <div className="relative z-10 mx-auto flex min-h-[88svh] max-w-5xl flex-col items-center justify-center px-5 pb-16 pt-10 text-center md:min-h-[94svh] md:px-8 md:pb-24">
        <motion.p
          initial={reduce ? false : { opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: easeOut }}
          className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright/90"
        >
          {brand.hero.kicker}
        </motion.p>

        <motion.h1
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.08, ease: easeOut }}
          className="font-display text-4xl font-semibold leading-[1.12] text-white drop-shadow-sm sm:text-5xl md:text-6xl"
        >
          {brand.hero.h1}
        </motion.h1>

        <motion.p
          initial={reduce ? false : { opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.18, ease: easeOut }}
          className="mt-6 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg"
        >
          {brand.hero.sub}
        </motion.p>

        <motion.blockquote
          initial={reduce ? false : { opacity: 0 }}
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
          initial={reduce ? false : { opacity: 0, y: 16 }}
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
            Invest in Your Akhirah
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
          initial={reduce ? false : { opacity: 0 }}
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
