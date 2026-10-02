"use client";

import { useEffect, useState } from "react";
import { ExternalLink } from "lucide-react";
import Reveal from "./Reveal";
import { MASJIDAL_URL, LIVE_SITE, prayerMeta, type PrayerPayload } from "@/lib/prayer";
import { jummahNote } from "@/lib/content";

export default function PrayerTimes() {
  const [data, setData] = useState<PrayerPayload | null>(null);

  useEffect(() => {
    let cancelled = false;
    fetch("/api/prayer-times")
      .then((r) => r.json())
      .then((j: PrayerPayload) => {
        if (!cancelled) setData(j);
      })
      .catch(() => {
        if (!cancelled)
          setData({
            rows: [],
            source: LIVE_SITE,
            fetchedAt: new Date().toISOString(),
            note: "Unable to load prayer times. Please check the live site.",
          });
      });
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      id="prayer-times"
      className="relative overflow-hidden bg-emerald-deep py-16 text-white md:py-20"
    >
      <div className="pattern-geometric-lattice absolute inset-0 opacity-50" aria-hidden />
      <div className="relative mx-auto max-w-5xl px-5 md:px-8">
        <Reveal>
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright/90">
            Prayer timings
          </p>
          <h2 className="mt-2 text-center font-display text-3xl font-semibold md:text-4xl">
            Today at Alfalah Center
          </h2>
          {data?.hijri ? (
            <p className="mt-2 text-center text-sm text-white/70">{data.hijri}</p>
          ) : null}
        </Reveal>

        <Reveal className="mt-10">
          <div className="prayer-frame overflow-hidden rounded-3xl bg-cream p-4 text-charcoal sm:p-6">
            <div className="mb-4 flex flex-wrap items-center justify-between gap-2 text-xs text-muted">
              <span>
                Powered by{" "}
                <a
                  href={MASJIDAL_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-semibold text-emerald underline-offset-2 hover:underline"
                >
                  MASJIDAL.COM
                </a>
              </span>
              <a
                href={LIVE_SITE}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1 font-medium text-emerald hover:underline"
              >
                Live board <ExternalLink className="h-3 w-3" aria-hidden />
              </a>
            </div>

            {data?.rows?.length ? (
              <div className="overflow-x-auto">
                <table className="w-full min-w-[320px] text-left text-sm">
                  <thead>
                    <tr className="border-b border-gold/30 text-xs uppercase tracking-wider text-muted">
                      <th className="py-3 pr-3 font-semibold">Salah</th>
                      <th className="py-3 pr-3 font-semibold">أذان / Athan</th>
                      <th className="py-3 font-semibold">الإقامة / Iqamah</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.rows.map((row) => (
                      <tr
                        key={row.name}
                        className="border-b border-emerald/10 transition hover:bg-accent/10"
                      >
                        <td className="py-3.5 pr-3 font-semibold text-emerald">{row.name}</td>
                        <td className="py-3.5 pr-3 tabular-nums">{row.athan}</td>
                        <td className="py-3.5 tabular-nums font-medium">{row.iqamah}</td>
                      </tr>
                    ))}
                    {data.jummah ? (
                      <tr className="border-b border-emerald/10">
                        <td className="py-3.5 pr-3 font-semibold text-emerald">Jumu’ah</td>
                        <td className="py-3.5 pr-3" colSpan={2}>
                          {data.jummah}
                          {data.jummah2 ? ` · Jumu’ah II ${data.jummah2}` : ""}
                        </td>
                      </tr>
                    ) : null}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="rounded-2xl bg-cream-deep px-4 py-8 text-center text-sm text-muted">
                {data?.note ?? "Loading prayer timings…"}
              </p>
            )}

            <p className="mt-5 text-sm leading-relaxed text-muted">{jummahNote}</p>
            <p className="mt-2 text-xs text-muted/80">{prayerMeta.syncNote}</p>

            <p className="mt-4 text-sm">
              <strong className="text-emerald">Monthly Prayer Timetable</strong> — Powered by{" "}
              <a
                href={MASJIDAL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="font-semibold text-accent underline-offset-2 hover:underline"
              >
                MASJIDAL.COM
              </a>
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
