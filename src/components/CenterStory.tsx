"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { about } from "@/lib/content";
import BgVideo from "./BgVideo";

const chapters = [
  { k: "Who we are", body: about.whoWeAreLong },
  { k: "Our mission", body: about.mission },
  { k: "Our vision", body: about.vision },
] as const;

const STEP = 7500;
const R = 26;
const C = 2 * Math.PI * R;

/** Golden story band: chapters advance on a timer (pause on hover / focus / tab away), never scroll-driven. */
export default function CenterStory() {
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [still, setStill] = useState(false);
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const raf = requestAnimationFrame(() => setStill(window.matchMedia("(prefers-reduced-motion: reduce)").matches));
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }, []);

  const running = inView && !paused && !still;
  useEffect(() => {
    if (!running) return;
    const t = window.setTimeout(() => setI((x) => (x + 1) % chapters.length), STEP);
    return () => window.clearTimeout(t);
  }, [running, i]);

  return (
    <section
      ref={ref}
      aria-labelledby="story-title"
      data-stage=""
      className="cg-section relative isolate overflow-hidden bg-[#2a1d0c] py-24 text-white md:py-36"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <BgVideo name="c-autumn" />
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_center,rgba(42,29,12,0.55),rgba(22,51,46,0.92)_75%)]" aria-hidden />
      <div className="cg-wipe" aria-hidden />

      <div className="relative mx-auto max-w-4xl px-5 text-center md:px-8">
        <h2 id="story-title" className="eyebrow eyebrow-center text-gold-bright">
          Our story
        </h2>

        <div className="relative mx-auto mt-8 h-20 w-20" aria-hidden>
          <svg viewBox="0 0 60 60" className="h-full w-full -rotate-90">
            <circle cx="30" cy="30" r={R} fill="none" stroke="rgba(255,255,255,0.18)" strokeWidth="1.5" />
            <circle
              key={`${i}-${running}`}
              cx="30"
              cy="30"
              r={R}
              fill="none"
              stroke="#fec96b"
              strokeWidth="2"
              strokeLinecap="round"
              strokeDasharray={C}
              className={running ? "cg-dial-run" : ""}
              style={{ ["--c" as string]: C, ["--step" as string]: `${STEP}ms`, strokeDashoffset: running ? C : 0 }}
            />
          </svg>
          <span className="absolute inset-0 flex items-center justify-center font-display text-xl italic text-gold-bright">
            {String(i + 1).padStart(2, "0")}
          </span>
        </div>

        <div className="mt-8 grid">
          {chapters.map((c, n) => (
            <div key={c.k} className={`cg-chapter [grid-area:1/1] ${n === i ? "" : "invisible"}`} data-on={n === i ? "" : undefined} aria-hidden={n !== i ? true : undefined}>
              <h3 className="font-display text-sm uppercase tracking-[0.3em] text-white/60">{c.k}</h3>
              <p className="cg-quote mt-5 font-display">{c.body}</p>
            </div>
          ))}
        </div>

        <div role="tablist" aria-label="Story chapters" className="mt-6 flex flex-wrap justify-center gap-2">
          {chapters.map((c, n) => (
            <button
              key={c.k}
              type="button"
              role="tab"
              aria-selected={n === i}
              onClick={() => setI(n)}
              className="cg-pill"
              data-on={n === i ? "" : undefined}
            >
              {c.k}
            </button>
          ))}
        </div>

        <Link href="/about-us" className="btn btn-glass mt-10">
          More about us
        </Link>
      </div>
    </section>
  );
}
