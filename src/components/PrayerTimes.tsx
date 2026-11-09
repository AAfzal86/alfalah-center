"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ExternalLink, Moon, Sunrise, Sunset } from "lucide-react";
import { brand } from "@/lib/brand";
import {
  NIZAMOS_OPEN,
  PRAYER_SOURCE_URL,
  TZ,
  prayerMeta,
  type Prayer,
  type PrayerResult,
} from "@/lib/prayer";
import Reveal from "./Reveal";

const POLL_MS = 10 * 60 * 1000;

const NAMES: Record<string, { en: string; ar: string }> = {
  fajr: { en: "Fajr", ar: "الفجر" },
  sunrise: { en: "Sunrise", ar: "الشروق" },
  dhuhr: { en: "Dhuhr", ar: "الظهر" },
  asr: { en: "Asr", ar: "العصر" },
  maghrib: { en: "Maghrib", ar: "المغرب" },
  isha: { en: "Isha", ar: "العشاء" },
};

function formatBoardDates(now = new Date()) {
  const gregorian = new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  }).format(now);
  let hijri = "";
  try {
    hijri = new Intl.DateTimeFormat("en-CA-u-ca-islamic-umalqura", {
      timeZone: TZ,
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(now);
  } catch {
    try {
      hijri = new Intl.DateTimeFormat("en-CA-u-ca-islamic", {
        timeZone: TZ,
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

function edmontonDate(d: Date) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function to12(t: string | null | undefined) {
  if (!t) return "—";
  const [h, m] = t.split(":").map(Number);
  return `${((h + 11) % 12) + 1}:${String(m).padStart(2, "0")}`;
}

function ampm(t: string | null | undefined) {
  if (!t) return "";
  return Number(t.split(":")[0]) >= 12 ? "PM" : "AM";
}

function hms(ms: number) {
  const s = Math.max(0, Math.floor(ms / 1000));
  const h = Math.floor(s / 3600);
  const m = Math.floor((s % 3600) / 60);
  const x = s % 60;
  return `${h}:${String(m).padStart(2, "0")}:${String(x).padStart(2, "0")}`;
}

function longDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

function midDate(iso: string) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "UTC",
    weekday: "short",
    month: "short",
    day: "numeric",
  }).format(new Date(`${iso}T12:00:00Z`));
}

type Row =
  | { kind: "prayer"; p: Prayer }
  | { kind: "sunrise"; time: string };

type View = {
  date: string;
  list: Prayer[];
  next: Prayer[] | null;
  sunrise: string | null;
  sunset: string | null;
} | null;

export default function PrayerTimes({ initial }: { initial: PrayerResult }) {
  const localDates = useBoardDates();
  const [data, setData] = useState<PrayerResult>(initial);
  const [now, setNow] = useState<Date | null>(null);

  const refresh = useCallback(async () => {
    try {
      const r = await fetch("/api/prayer", { cache: "no-store" });
      if (r.ok) setData(await r.json());
    } catch {
      /* keep last good data */
    }
  }, []);

  const lastDay = useRef<string | null>(null);
  useEffect(() => {
    const step = () => {
      const d = new Date();
      setNow(d);
      const day = edmontonDate(d);
      if (lastDay.current && lastDay.current !== day) refresh();
      lastDay.current = day;
    };
    const first = window.setTimeout(step, 0);
    const tick = window.setInterval(step, 1000);
    const poll = window.setInterval(refresh, POLL_MS);
    const vis = () => {
      if (document.visibilityState === "visible") refresh();
    };
    document.addEventListener("visibilitychange", vis);
    return () => {
      window.clearTimeout(first);
      window.clearInterval(tick);
      window.clearInterval(poll);
      document.removeEventListener("visibilitychange", vis);
    };
  }, [refresh]);

  const dateLine = useMemo(() => {
    const g = localDates.gregorian;
    const h = localDates.hijri;
    if (g && h) return `${g} · ${h}`;
    return g || h || "";
  }, [localDates]);

  const today = now ? edmontonDate(now) : data.ok ? data.date : null;

  const view: View = (() => {
    if (!data.ok || !today) return null;
    if (data.date === today) {
      return {
        date: data.date,
        list: data.today,
        next: data.tomorrow,
        sunrise: data.sunrise,
        sunset: data.sunset,
      };
    }
    if (data.tomorrowDate === today && data.tomorrow) {
      return {
        date: today,
        list: data.tomorrow,
        next: null,
        sunrise: data.tomorrowSunrise,
        sunset: data.tomorrowSunset,
      };
    }
    return null;
  })();

  const upcoming = (() => {
    if (!view || !now) return null;
    const t = now.getTime();
    for (const p of view.list) {
      const a = Date.parse(p.adhanAt);
      const i = p.iqamahAt ? Date.parse(p.iqamahAt) : null;
      if (a > t) return { p, kind: "Adhan" as const, at: a, tomorrow: false };
      if (i && i > t) return { p, kind: "Iqamah" as const, at: i, tomorrow: false };
    }
    if (view.next?.[0]) {
      return {
        p: view.next[0],
        kind: "Adhan" as const,
        at: Date.parse(view.next[0].adhanAt),
        tomorrow: true,
      };
    }
    return null;
  })();

  const rows: Row[] = view
    ? (() => {
        const out: Row[] = [];
        for (const p of view.list) {
          out.push({ kind: "prayer", p });
          if (p.prayer === "fajr" && view.sunrise) {
            out.push({ kind: "sunrise", time: view.sunrise });
          }
        }
        return out;
      })()
    : [];

  const clock = now
    ? new Intl.DateTimeFormat("en-CA", {
        timeZone: TZ,
        hour: "numeric",
        minute: "2-digit",
      })
        .format(now)
        .replace(/\s?([ap])\.?m\.?/i, (_, x) => ` ${x.toUpperCase()}M`)
    : "";

  const nextName = upcoming ? NAMES[upcoming.p.prayer] : null;
  const fetched =
    data.ok
      ? new Intl.DateTimeFormat("en-CA", {
          timeZone: TZ,
          hour: "numeric",
          minute: "2-digit",
        }).format(new Date(data.fetchedAt))
      : "";

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

      <div className="relative z-10 mx-auto max-w-7xl px-3 sm:px-5 md:px-8">
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

        <div className="mx-auto mt-8 max-w-3xl sm:mt-10">
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
                  {/* Cream header — unchanged brand framing */}
                  <div className="border-b border-gold/30 bg-gradient-to-br from-cream via-ivory to-cream-deep px-3 py-3 sm:px-5 sm:py-3.5">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <div className="min-w-0">
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

                  {/* Native board — mobile-safe, no iframe truncation */}
                  <div className="bg-[#0C221C] text-[#F3EBDA]">
                    {!view ? (
                      <div className="px-4 py-10 text-center sm:px-6" role="status">
                        <p className="font-display text-2xl font-bold text-white sm:text-3xl">
                          Prayer times are unavailable right now
                        </p>
                        <p className="mx-auto mt-3 max-w-md text-sm text-white/70">
                          We couldn&apos;t load today&apos;s times from the centre&apos;s
                          prayer display, so we&apos;re not showing old ones.
                        </p>
                        <a
                          href={NIZAMOS_OPEN}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-emerald px-4 py-2 text-sm font-semibold text-cream"
                        >
                          Open live display
                          <ExternalLink className="h-3.5 w-3.5" aria-hidden />
                        </a>
                      </div>
                    ) : (
                      <>
                        {/* Date + local clock */}
                        <div className="flex items-center justify-between gap-3 border-b border-white/10 px-3 py-3 min-[380px]:px-4 sm:px-5">
                          <div className="min-w-0">
                            <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-[#7fd6b0] sm:text-xs">
                              Today · Edmonton
                            </p>
                            <p className="mt-0.5 font-display text-[1.05rem] font-bold leading-tight min-[380px]:text-[1.2rem] sm:text-[1.35rem]">
                              <span className="sm:hidden">{midDate(view.date)}</span>
                              <span className="hidden sm:inline">
                                {longDate(view.date)}
                              </span>
                            </p>
                          </div>
                          <div className="shrink-0 text-right" aria-live="off">
                            <p
                              className="font-display text-[1.55rem] leading-none tabular-nums min-[380px]:text-[1.85rem] sm:text-[2.1rem]"
                              suppressHydrationWarning
                            >
                              {clock || "\u00a0"}
                            </p>
                            <p className="mt-1 text-[0.58rem] font-bold uppercase tracking-[0.18em] text-white/50">
                              Local time
                            </p>
                          </div>
                        </div>

                        {/* Next prayer strip */}
                        {upcoming && nextName ? (
                          <div className="flex items-center justify-between gap-3 bg-gradient-to-r from-[#1f6b52] to-[#14523f] px-3 py-2.5 min-[380px]:px-4 sm:px-5 sm:py-3.5">
                            <div className="min-w-0">
                              <p className="text-[0.62rem] font-bold uppercase tracking-[0.18em] text-white/75 sm:text-xs">
                                Next {upcoming.kind.toLowerCase()}
                                {upcoming.tomorrow ? " · tomorrow" : ""}
                              </p>
                              <p className="mt-0.5 flex flex-wrap items-baseline gap-x-2 font-display text-[1.45rem] font-extrabold leading-none min-[380px]:text-[1.7rem] sm:text-[1.9rem]">
                                {nextName.en}
                                <span
                                  className="text-[1.1rem] font-normal text-gold min-[380px]:text-[1.25rem]"
                                  lang="ar"
                                  dir="rtl"
                                >
                                  {nextName.ar}
                                </span>
                              </p>
                            </div>
                            <div className="shrink-0 text-right">
                              <p
                                className="font-display text-[1.45rem] leading-none tabular-nums text-gold min-[380px]:text-[1.75rem] sm:text-[2rem]"
                                aria-label="Time remaining"
                              >
                                {now ? hms(upcoming.at - now.getTime()) : "\u00a0"}
                              </p>
                              <p className="mt-1 text-[0.68rem] font-semibold text-white/80">
                                {upcoming.kind}{" "}
                                {to12(
                                  upcoming.kind === "Adhan"
                                    ? upcoming.p.adhanTime
                                    : upcoming.p.iqamahTime,
                                )}{" "}
                                {ampm(
                                  upcoming.kind === "Adhan"
                                    ? upcoming.p.adhanTime
                                    : upcoming.p.iqamahTime,
                                )}
                              </p>
                            </div>
                          </div>
                        ) : null}

                        {/* Timetable — fixed columns so names never ellipsis */}
                        <table className="w-full table-fixed text-left">
                          <caption className="sr-only">
                            Prayer times for {longDate(view.date)}
                          </caption>
                          <thead>
                            <tr className="text-[0.65rem] font-extrabold uppercase tracking-[0.14em] text-white/55 min-[380px]:tracking-[0.2em]">
                              <th
                                scope="col"
                                className="w-[42%] px-3 pb-1.5 pt-3 min-[380px]:w-[40%] min-[380px]:px-4 sm:px-5"
                              >
                                Prayer
                              </th>
                              <th
                                scope="col"
                                className="w-[29%] px-1.5 pb-1.5 pt-3 text-right min-[380px]:w-[30%] sm:px-3"
                              >
                                Adhan
                              </th>
                              <th
                                scope="col"
                                className="w-[29%] px-3 pb-1.5 pt-3 text-right text-gold min-[380px]:w-[30%] min-[380px]:px-4 sm:px-5"
                              >
                                Iqamah
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {rows.map((row) => {
                              if (row.kind === "sunrise") {
                                return (
                                  <tr
                                    key="sunrise"
                                    className="border-t border-white/10 text-white/70"
                                  >
                                    <th
                                      scope="row"
                                      className="px-3 py-2.5 min-[380px]:px-4 sm:px-5 sm:py-3"
                                    >
                                      <span className="font-display text-[1.05rem] font-semibold leading-none min-[360px]:text-[1.15rem] min-[390px]:text-[1.25rem] sm:text-[1.4rem]">
                                        Sunrise
                                      </span>
                                    </th>
                                    <td className="px-1.5 py-2.5 text-right sm:px-3 sm:py-3" />
                                    <td className="px-3 py-2.5 text-right min-[380px]:px-4 sm:px-5 sm:py-3">
                                      <span className="font-display text-[1.05rem] font-semibold tabular-nums min-[360px]:text-[1.15rem] min-[390px]:text-[1.25rem] sm:text-[1.35rem]">
                                        {to12(row.time)}
                                      </span>
                                      <span className="ml-0.5 text-[0.6rem] font-bold text-white/45 sm:text-[0.7rem]">
                                        {ampm(row.time)}
                                      </span>
                                    </td>
                                  </tr>
                                );
                              }

                              const p = row.p;
                              const isNext =
                                upcoming &&
                                !upcoming.tomorrow &&
                                upcoming.p.prayer === p.prayer;
                              const done =
                                now &&
                                !isNext &&
                                Date.parse(p.iqamahAt ?? p.adhanAt) < now.getTime();
                              const n = NAMES[p.prayer];
                              return (
                                <tr
                                  key={p.prayer}
                                  className={`border-t border-white/10 ${
                                    isNext ? "bg-white/[.08]" : ""
                                  } ${done ? "opacity-55" : ""}`}
                                  aria-current={isNext ? "true" : undefined}
                                >
                                  <th
                                    scope="row"
                                    className="px-3 py-2.5 min-[380px]:px-4 sm:px-5 sm:py-3.5"
                                  >
                                    <span className="flex min-w-0 items-baseline gap-1.5 min-[380px]:gap-2">
                                      {isNext ? (
                                        <span
                                          className="mt-[0.15em] h-2 w-2 shrink-0 rounded-full bg-[#4fd06e]"
                                          aria-hidden
                                        />
                                      ) : null}
                                      <span className="font-display text-[1.05rem] font-extrabold leading-none min-[360px]:text-[1.15rem] min-[390px]:text-[1.3rem] sm:text-[1.5rem]">
                                        {n.en}
                                      </span>
                                      <span
                                        className="hidden text-[0.95rem] text-gold/85 sm:inline sm:text-[1.15rem]"
                                        lang="ar"
                                        dir="rtl"
                                      >
                                        {n.ar}
                                      </span>
                                    </span>
                                  </th>
                                  <td className="px-1.5 py-2.5 text-right sm:px-3 sm:py-3.5">
                                    <span className="font-display text-[1.05rem] font-semibold tabular-nums text-white/85 min-[360px]:text-[1.15rem] min-[390px]:text-[1.25rem] sm:text-[1.4rem]">
                                      {to12(p.adhanTime)}
                                    </span>
                                    <span className="ml-0.5 text-[0.6rem] font-bold text-white/45 sm:text-[0.7rem]">
                                      {ampm(p.adhanTime)}
                                    </span>
                                  </td>
                                  <td className="px-3 py-2.5 text-right min-[380px]:px-4 sm:px-5 sm:py-3.5">
                                    <span className="font-display text-[1.1rem] font-bold tabular-nums text-gold min-[360px]:text-[1.2rem] min-[390px]:text-[1.35rem] sm:text-[1.55rem]">
                                      {to12(p.iqamahTime)}
                                    </span>
                                    <span className="ml-0.5 text-[0.6rem] font-bold text-gold/70 sm:text-[0.7rem]">
                                      {ampm(p.iqamahTime)}
                                    </span>
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>

                        {/* Sunrise / Sunset / Jumu'ah footer */}
                        <div className="grid grid-cols-2 gap-px border-t border-white/10 bg-white/10 sm:grid-cols-[1fr_1fr_1.5fr]">
                          <div className="flex items-center gap-2.5 bg-[#08150e] px-3 py-3.5 min-[380px]:px-4 sm:px-5">
                            <Sunrise
                              className="h-5 w-5 shrink-0 text-gold sm:h-6 sm:w-6"
                              aria-hidden
                            />
                            <div className="min-w-0">
                              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/55">
                                Sunrise
                              </p>
                              <p className="font-display text-[1.15rem] font-semibold tabular-nums sm:text-xl">
                                {to12(view.sunrise)}{" "}
                                <span className="text-[0.65rem] text-white/50">
                                  {ampm(view.sunrise)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="flex items-center gap-2.5 bg-[#08150e] px-3 py-3.5 min-[380px]:px-4 sm:px-5">
                            <Sunset
                              className="h-5 w-5 shrink-0 text-[#f28c6b] sm:h-6 sm:w-6"
                              aria-hidden
                            />
                            <div className="min-w-0">
                              <p className="text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/55">
                                Sunset
                              </p>
                              <p className="font-display text-[1.15rem] font-semibold tabular-nums sm:text-xl">
                                {to12(view.sunset)}{" "}
                                <span className="text-[0.65rem] text-white/50">
                                  {ampm(view.sunset)}
                                </span>
                              </p>
                            </div>
                          </div>
                          <div className="col-span-2 bg-[#08150e] px-3 py-3.5 min-[380px]:px-4 sm:col-span-1 sm:px-5">
                            <p className="flex items-center gap-1.5 text-[0.6rem] font-bold uppercase tracking-[0.16em] text-white/55">
                              <Moon className="h-3.5 w-3.5" aria-hidden />
                              Jumu&apos;ah
                              {data.ok && data.jumuahDate
                                ? ` · ${new Intl.DateTimeFormat("en-CA", {
                                    timeZone: "UTC",
                                    month: "short",
                                    day: "numeric",
                                  }).format(new Date(`${data.jumuahDate}T12:00:00Z`))}`
                                : ""}
                            </p>
                            {data.ok && data.jumuah.length ? (
                              <ul className="mt-2 space-y-1.5">
                                {data.jumuah.map((j) => (
                                  <li
                                    key={j.label}
                                    className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-0.5"
                                  >
                                    <span className="text-sm font-bold text-white/75">
                                      {j.label}
                                    </span>
                                    <span className="text-right text-[0.7rem] text-white/60">
                                      {j.khutbahTime ? (
                                        <>
                                          Khutbah{" "}
                                          <span className="font-display text-base font-semibold text-white/85">
                                            {to12(j.khutbahTime)}
                                          </span>{" "}
                                          {ampm(j.khutbahTime)}
                                          {" · "}
                                        </>
                                      ) : null}
                                      Iqamah{" "}
                                      <span className="font-display text-base font-bold text-gold sm:text-lg">
                                        {to12(j.iqamahTime)}
                                      </span>{" "}
                                      {ampm(j.iqamahTime)}
                                    </span>
                                  </li>
                                ))}
                              </ul>
                            ) : (
                              <p className="mt-2 text-sm text-white/70">
                                Not published on the display
                              </p>
                            )}
                          </div>
                        </div>

                        <div className="flex flex-wrap items-center justify-between gap-2 border-t border-white/10 px-3 py-3 text-[11px] text-white/55 min-[380px]:px-4 sm:px-5">
                          <p>
                            Live from NizamOS
                            {fetched ? ` · checked ${fetched}` : ""} · refreshes
                            every 10 min
                          </p>
                          <a
                            href={PRAYER_SOURCE_URL}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 font-bold text-white/80 underline-offset-2 hover:underline"
                          >
                            Source display
                            <ExternalLink className="h-3 w-3" aria-hidden />
                          </a>
                        </div>
                      </>
                    )}
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
