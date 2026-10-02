"use client";

import { useEffect, useMemo, useState, type ReactNode } from "react";
import {
  ExternalLink,
  Phone,
  CalendarHeart,
  Navigation,
  Sparkles,
  Moon,
} from "lucide-react";
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

const SALAH_QUOTE = {
  text: "Guard strictly your prayers, especially the middle prayer, and stand before Allah in devotion.",
  source: "Qur’an 2:238",
} as const;

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

function RailCard({
  children,
  className = "",
  glow = false,
}: {
  children: ReactNode;
  className?: string;
  glow?: boolean;
}) {
  return (
    <div
      className={`prayer-rail-card relative overflow-hidden rounded-2xl border border-gold/40 bg-gradient-to-br from-emerald/55 via-emerald-deep/70 to-emerald-deep/90 p-4 shadow-[0_12px_40px_rgba(0,0,0,0.28)] backdrop-blur-md ${
        glow ? "prayer-rail-glow" : ""
      } ${className}`}
    >
      <div
        className="pointer-events-none absolute inset-x-4 top-0 h-px bg-gradient-to-r from-transparent via-gold-bright/80 to-transparent"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-gold/10 blur-2xl"
        aria-hidden
      />
      <div
        className="prayer-rail-ornament pointer-events-none absolute inset-0 opacity-40"
        aria-hidden
      />
      <div className="relative z-10">{children}</div>
    </div>
  );
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

  const { gregorian, hijri } = localDates;

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

        <div className="mt-10 grid grid-cols-1 items-start gap-6 lg:grid-cols-[minmax(0,0.22fr)_minmax(0,0.56fr)_minmax(0,0.22fr)] lg:gap-5 xl:gap-6">
          <Reveal delay={0.06} className="order-2 space-y-4 lg:order-1">
            <RailCard glow className="bg-gradient-to-br from-gold/20 via-emerald/50 to-emerald-deep/95">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-bright">
                <span
                  className="h-1.5 w-1.5 animate-pulse rounded-full bg-gold-bright shadow-[0_0_8px_rgba(212,184,106,0.8)]"
                  aria-hidden
                />
                Live board
              </div>
              <div className="mt-3 font-display text-2xl font-semibold text-cream">
                NizamOS
              </div>
              <p className="mt-2 text-sm leading-relaxed text-white/70">
                Salah and iqamah update live from the ICNA Edmonton / Alfalah
                Center NizamOS board in the center panel.
              </p>
            </RailCard>

            <RailCard>
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-bright/90">
                <Moon className="h-3.5 w-3.5" aria-hidden />
                Today’s date
              </div>
              {hijri ? (
                <p className="mt-3 font-display text-xl font-semibold leading-snug text-gold-bright sm:text-2xl">
                  {hijri}
                </p>
              ) : (
                <p className="mt-3 font-display text-xl font-semibold text-cream">
                  Hijri calendar
                </p>
              )}
              {gregorian ? (
                <p className="mt-2 text-sm leading-relaxed text-white/75">
                  {gregorian}
                </p>
              ) : null}
              <div className="gold-hairline mt-4 opacity-70" aria-hidden />
              <p className="mt-3 text-[11px] text-white/55">
                America/Edmonton · MT
              </p>
            </RailCard>

            <RailCard className="hidden sm:block">
              <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-[0.22em] text-gold-bright/90">
                <Sparkles className="h-3.5 w-3.5" aria-hidden />
                Reminder
              </div>
              <blockquote className="mt-3 font-display text-[15px] leading-relaxed text-gold-bright/95 italic sm:text-base">
                “{SALAH_QUOTE.text}”
              </blockquote>
              <cite className="mt-3 block text-xs not-italic text-white/60">
                — {SALAH_QUOTE.source}
              </cite>
            </RailCard>
          </Reveal>

          <Reveal delay={0.1} className="order-1 lg:order-2">
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
                        title="ICNA Edmonton prayer times"
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

          <Reveal delay={0.14} className="order-3 space-y-4">
            <RailCard glow>
              <div className="flex items-start gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/50 bg-gold/15 text-gold-bright">
                  <CalendarHeart className="h-5 w-5" aria-hidden />
                </div>
                <div>
                  <div className="font-display text-lg font-semibold text-gold-bright">
                    {prayerMeta.jummahLabel}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-white/75">
                    {prayerMeta.jummahHint}
                  </p>
                  <p className="mt-2 text-xs text-white/55">
                    Fridays · please call to confirm
                  </p>
                </div>
              </div>
              <a
                href={brand.phoneHref}
                className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-full border border-gold/45 bg-gold/10 px-4 py-2.5 text-sm font-semibold text-gold-bright transition hover:bg-gold/20"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden />
                {brand.phone}
              </a>
            </RailCard>

            <RailCard>
              <p className="text-[10px] font-bold uppercase tracking-[0.22em] text-gold-bright/90">
                Quick actions
              </p>
              <div className="mt-3 space-y-2">
                <a
                  href={brand.address.mapsDirections}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-3 py-2.5 text-sm font-medium text-cream transition hover:border-gold/50 hover:bg-gold/10"
                >
                  <Navigation className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden />
                  Get directions
                </a>
                <a
                  href={brand.phoneHref}
                  className="flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-3 py-2.5 text-sm font-medium text-cream transition hover:border-gold/50 hover:bg-gold/10"
                >
                  <Phone className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden />
                  Call masjid
                </a>
                <a
                  href={NIZAMOS_OPEN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-3 rounded-xl border border-gold/25 bg-white/5 px-3 py-2.5 text-sm font-medium text-cream transition hover:border-gold/50 hover:bg-gold/10"
                >
                  <ExternalLink className="h-4 w-4 shrink-0 text-gold-bright" aria-hidden />
                  Open NizamOS
                </a>
              </div>
            </RailCard>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
