import BgVideo from "./BgVideo";
import Counter from "./Counter";
import Reveal from "./Reveal";
import type { CSSProperties } from "react";

/** Figures taken from the site copy (about.whoWeAreLong + atAlfalah). */
const stats = [
  { n: 15, suffix: "", unit: "years", label: "serving the Muslim community and the wider public" },
  { n: 400, suffix: "+", unit: "students", label: "in evening madrasah and weekend classes" },
  { n: 1000, suffix: "+", unit: "clients", label: "supported by our food bank" },
  { n: 5, suffix: "", unit: "daily prayers", label: "plus Jumu’ah, every week" },
];

export default function Numbers() {
  return (
    <section aria-labelledby="numbers-title" data-stage="" className="cg-section relative isolate overflow-hidden bg-[#16332e] py-24 text-white md:py-32">
      <BgVideo name="c-river" position="center 60%" />
      <div className="absolute inset-0 -z-10 bg-[linear-gradient(180deg,rgba(22,51,46,0.92),rgba(22,51,46,0.62)_45%,rgba(22,51,46,0.95))]" aria-hidden />
      <div className="cg-wipe" aria-hidden />
      <div className="relative mx-auto max-w-7xl px-5 md:px-10">
        <Reveal className="mx-auto max-w-2xl text-center">
          <p className="eyebrow eyebrow-center text-gold-bright">Southeast Edmonton</p>
          <h2 id="numbers-title" className="cg-h2 mt-4">
            Alfalah <span className="cg-sun-text">in numbers</span>
          </h2>
        </Reveal>
        <ul className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((s, i) => (
            <li
              key={s.unit}
              data-reveal=""
              className="cg-stat flex h-full flex-col"
              style={{ "--reveal-delay": `${i * 100}ms` } as CSSProperties}
            >
              <span className="font-display text-[clamp(3rem,6vw,4.75rem)] leading-none text-white">
                <Counter to={s.n} suffix={s.suffix} />
              </span>
              <span className="mt-3 text-sm leading-relaxed text-white/70">
                <span className="block text-xs font-semibold uppercase tracking-[0.22em] text-gold-bright">{s.unit}</span>
                {s.label}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
