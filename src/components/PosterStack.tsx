"use client";

import { useRef, useState } from "react";
import { ArrowUpRight, Expand, X } from "lucide-react";
import { programPosters, type ProgramPoster } from "@/lib/posters";

/**
 * Program posters as sticky stacking cards (after the Masjid Annoor concept),
 * restyled for the Golden Courtyard: emerald card, sun-gold arch frame.
 * Cards layer purely with CSS `position: sticky`; entry animation is
 * time-based via the shared RevealObserver — nothing is scrubbed.
 */
function PosterPicture({ p, sizes, className, eager = false }: { p: ProgramPoster; sizes: string; className?: string; eager?: boolean }) {
  return (
    <picture>
      <source type="image/webp" srcSet={`${p.base}-640.webp 640w, ${p.base}-full.webp ${p.width}w`} sizes={sizes} />
      <img
        src={`${p.base}-full.jpg`}
        srcSet={`${p.base}-640.jpg 640w, ${p.base}-full.jpg ${p.width}w`}
        sizes={sizes}
        width={p.width}
        height={p.height}
        alt={p.alt}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className={className}
      />
    </picture>
  );
}

export default function PosterStack({ ids }: { ids?: ProgramPoster["id"][] }) {
  const list = ids ? programPosters.filter((p) => ids.includes(p.id)) : programPosters;
  const dialog = useRef<HTMLDialogElement>(null);
  const [open, setOpen] = useState<ProgramPoster | null>(null);

  const show = (p: ProgramPoster) => {
    setOpen(p);
    dialog.current?.showModal();
  };

  return (
    <>
      <div className="cg-stack relative">
        {list.map((p, i) => (
          <div key={p.id} className="cg-stack-slot sticky pb-8 md:pb-12" style={{ top: `calc(5.25rem + ${i * 22}px)` }}>
            <article data-reveal="" className="cg-poster-card relative mx-auto grid max-w-5xl overflow-hidden md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)]" aria-labelledby={`poster-${p.id}`}>
              <div className="pattern-geometric-lattice pointer-events-none absolute inset-0 opacity-[0.16]" aria-hidden />
              <div className="relative flex justify-center px-5 pt-4 sm:pt-5 md:p-8">
                <button
                  type="button"
                  onClick={() => show(p)}
                  className="cg-poster-frame group relative block"
                  aria-label={`View full poster: ${p.eyebrow}, ${p.title}`}
                >
                  <PosterPicture p={p} sizes="(min-width: 768px) 420px, 80vw" className="cg-poster-img block h-auto w-full" />
                  <span className="cg-poster-zoom" aria-hidden>
                    <Expand className="h-4 w-4" />
                  </span>
                </button>
              </div>
              <div className="relative flex flex-col justify-center px-5 pb-5 pt-4 text-white sm:px-6 sm:pb-7 sm:pt-5 md:px-10 md:py-12">
                <p className="flex items-center gap-3 text-[0.72rem] font-semibold uppercase tracking-[0.24em] text-[var(--sun)]">
                  <span className="font-display text-base italic tracking-normal">{String(i + 1).padStart(2, "0")}</span>
                  {p.eyebrow}
                </p>
                <h3 id={`poster-${p.id}`} className="mt-1.5 font-display text-[clamp(1.2rem,1rem+1.6vw,2.25rem)] font-semibold leading-tight">
                  {p.title}
                </h3>
                <p className="mt-2 line-clamp-2 text-[0.8rem] leading-relaxed text-white/80 sm:mt-3 sm:line-clamp-none sm:text-sm md:text-base">{p.caption}</p>
                <ul className="mt-4 hidden space-y-2 sm:block">
                  {p.facts.map((f) => (
                    <li key={f} className="flex items-center gap-3 text-sm text-white/85">
                      <span className="h-1.5 w-1.5 shrink-0 rotate-45 bg-[var(--sun)]" aria-hidden />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="cg-poster-actions mt-4 flex flex-wrap gap-2.5 sm:mt-5 md:mt-7">
                  <a href={p.primary.href} {...(p.primary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn gold-btn">
                    {p.primary.label}
                    <ArrowUpRight className="btn-icon-end h-4 w-4" aria-hidden />
                    <span className="sr-only">{p.primary.sr}</span>
                  </a>
                  <button type="button" onClick={() => show(p)} className="btn btn-glass">
                    View full poster
                  </button>
                  <a href={p.secondary.href} className="btn btn-glass max-sm:hidden">
                    {p.secondary.label}
                  </a>
                </div>
              </div>
            </article>
          </div>
        ))}
      </div>

      <dialog
        ref={dialog}
        className="cg-lightbox"
        aria-label={open ? `${open.eyebrow}: ${open.title} — full poster` : "Full poster"}
        onClose={() => setOpen(null)}
        onClick={(e) => {
          if (e.target === e.currentTarget) dialog.current?.close();
        }}
      >
        {open ? (
          <div className="cg-lightbox-inner">
            <div className="flex items-center justify-between gap-3 pb-3">
              <p className="truncate text-sm font-semibold text-white">{open.eyebrow} · {open.title}</p>
              <button
                type="button"
                autoFocus
                onClick={() => dialog.current?.close()}
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-white ring-1 ring-white/25 transition hover:bg-[var(--sun)] hover:text-[var(--court)]"
                aria-label="Close poster"
              >
                <X className="h-5 w-5" aria-hidden />
              </button>
            </div>
            <PosterPicture p={open} eager sizes="(min-width: 1000px) 960px, 100vw" className="cg-lightbox-img mx-auto block h-auto w-auto" />
            <div className="flex flex-wrap justify-center gap-2.5 pt-4">
              <a href={open.primary.href} {...(open.primary.href.startsWith("http") ? { target: "_blank", rel: "noopener noreferrer" } : {})} className="btn gold-btn">
                {open.primary.label}
                <ArrowUpRight className="btn-icon-end h-4 w-4" aria-hidden />
                <span className="sr-only">{open.primary.sr}</span>
              </a>
              <a href={open.secondary.href} className="btn btn-glass">{open.secondary.label}</a>
            </div>
          </div>
        ) : null}
      </dialog>
    </>
  );
}
