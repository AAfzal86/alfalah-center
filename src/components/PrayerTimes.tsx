"use client";

import { useEffect, useMemo, useState } from "react";
import { ExternalLink } from "lucide-react";
import { brand } from "@/lib/brand";
import {
  NIZAMOS_WIDGET_ID,
  NIZAMOS_WIDGET_SRC,
  NIZAMOS_WIDGET_ORIGIN,
  NIZAMOS_OPEN,
  OFFICIAL_PRAYER_BOARD,
  prayerMeta,
} from "@/lib/prayer";
import Reveal from "./Reveal";

function formatBoardDates(now = new Date()) {
  const gregorian = new Intl.DateTimeFormat("en-CA", {
    timeZone: "America/Edmonton",
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("en-CA-u-ca-islamic-umalqura", {
      timeZone: "America/Edmonton",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    try {
      hijri = new Intl.DateTimeFormat("en-CA-u-ca-islamic", {
        timeZone: "America/Edmonton",
        day: "numeric",
        month: "long",
        year: "numeric",
      }).format(now);
    } catch {
      hijri = "";
    }
  }
  return { gregorian, hijri };
}

function useBoardDates() {
  const [dates, setDates] = useState({ gregorian: "", hijri: "" });

  useEffect(() => {
    const id = window.setTimeout(() => setDates(formatBoardDates()), 0);
    return () => window.clearTimeout(id);
  }, []);

  return dates;
}


export default function PrayerTimes() {
  const localDates = useBoardDates();

  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const f = document.getElementById(
        NIZAMOS_WIDGET_ID,
      ) as HTMLIFrameElement | null;
      if (
        !f ||
        e.origin !== NIZAMOS_WIDGET_ORIGIN ||
        e.source !== f.contentWindow
      ) {
        return;
      }
      const d = e.data as { type?: string; height?: number } | null;
      if (!d || d.type !== "nizamos-prayer-widget:height") return;
      const h = Number(d.height);
      if (h >= 120 && h <= 2400) {
        f.style.height = `${Math.ceil(h)}px`;
      }
    };
    window.addEventListener("message", onMessage);
    return () => window.removeEventListener("message", onMessage);
  }, []);

  const dateLine = useMemo(() => {
    const g = localDates.gregorian;
    const h = localDates.hijri;
    if (g && h) return `${g} · ${h}`;
    return g || h || "";
  }, [localDates]);


  return (
    <section
      id="prayer-times"
      className="relative scroll-mt-24 overflow-hidden bg-emerald-deep py-16 md:py-24"
    >
      <div className="pattern-geometric absolute inset-0 opacity-90" aria-hidden />
      <div
        className="absolute inset-0 bg-gradient-to-b from-emerald-deep/40 via-transparent to-emerald-deep/80"
        aria-hidden
      />

      <div className="relative z-10 mx-auto max-w-7xl px-4 sm:px-5 md:px-8">
        <Reveal className="text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright/90">
            Today’s Salah & Iqamah
          </p>
          <h2 className="mt-3 font-display text-3xl font-semibold text-white md:text-4xl lg:text-[2.75rem]">
            Prayer Times
          </h2>
          {dateLine ? (
            <p className="mt-3 text-sm font-medium tracking-wide text-gold-bright/85 md:text-base">
              {dateLine}
            </p>
          ) : null}
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/75">
            {prayerMeta.syncNote}
          </p>
        </Reveal>

        <div className="mx-auto mt-10 max-w-3xl">
          <Reveal delay={0.1}>
            <div className="prayer-frame relative">
              <div
                className="prayer-geo-border absolute inset-0 rounded-[1.35rem] md:rounded-[1.5rem]"
                aria-hidden
              />

              <div className="relative overflow-hidden rounded-[1.2rem] border border-gold/50 bg-gradient-to-b from-emerald to-emerald-deep p-[2px] shadow-[0_28px_70px_rgba(0,0,0,0.4)] md:rounded-[1.4rem] md:p-[3px]">
                <div className="pointer-events-none absolute inset-x-5 top-0 z-20 h-px bg-gradient-to-r from-transparent via-gold-bright to-transparent opacity-80" />
                <div className="pointer-events-none absolute inset-x-5 bottom-0 z-20 h-px bg-gradient-to-r from-transparent via-gold/70 to-transparent" />

                <div className="relative overflow-hidden rounded-[1.05rem] bg-cream md:rounded-[1.25rem]">
                  <div className="border-b border-gold/30 bg-gradient-to-br from-cream via-ivory to-cream-deep px-3.5 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div>
                        <h3 className="font-display text-lg font-semibold text-emerald-deep sm:text-xl">
                          Live Salah & Iqamah
                        </h3>
                        <p className="mt-0.5 text-[11px] text-muted sm:text-xs">
                          {brand.shortName}
                          {dateLine ? (
                            <span className="mt-0.5 block text-[10px] text-muted/90 sm:mt-0 sm:inline sm:before:content-['·_']">
                              {dateLine}
                            </span>
                          ) : null}
                        </p>
                      </div>
                      <div className="flex flex-wrap items-center gap-1.5">
                        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald/10 px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald">
                          <span
                            className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald"
                            aria-hidden
                          />
                          Live
                        </span>
                        <span className="inline-flex items-center rounded-full border border-gold/40 bg-gold/10 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-gold-deep">
                          {prayerMeta.sourceLabel}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="prayer-iframe-shell bg-cream-deep/40 p-1.5 sm:p-2.5 md:p-3">
                    <div className="overflow-hidden rounded-xl bg-white ring-1 ring-emerald/15 sm:rounded-2xl">
                      <iframe
                        id={NIZAMOS_WIDGET_ID}
                        title="Alfalah Center Edmonton prayer times"
                        src={NIZAMOS_WIDGET_SRC}
                        className="prayer-iframe block w-full max-w-full border-0"
                        loading="lazy"
                        allowTransparency
                        style={{
                          width: "100%",
                          maxWidth: "100%",
                          height: "860px",
                          border: 0,
                          display: "block",
                          colorScheme: "normal",
                        }}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5 border-t border-gold/25 bg-cream px-3.5 py-3 sm:flex-row sm:flex-wrap sm:items-center sm:justify-between sm:px-5">
                    <p className="text-[11px] leading-relaxed text-muted">
                      Powered by NizamOS Mosque TV.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      <a
                        href={NIZAMOS_OPEN}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full border border-emerald/30 bg-emerald/5 px-3.5 py-1.5 text-[11px] font-semibold text-emerald transition hover:bg-emerald/10"
                      >
                        Open NizamOS
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                      <a
                        href={OFFICIAL_PRAYER_BOARD}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 rounded-full bg-emerald px-3.5 py-1.5 text-[11px] font-semibold text-cream transition hover:bg-emerald-soft"
                      >
                        Official board
                        <ExternalLink className="h-3 w-3" aria-hidden />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Reveal>

        </div>
      </div>
    </section>
  );
}
