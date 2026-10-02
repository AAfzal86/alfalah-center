import { NextResponse } from "next/server";
import type { PrayerPayload, PrayerRow } from "@/lib/prayer";

export const revalidate = 300; // 5 minutes

function strip(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, " ")
    .replace(/<style[\s\S]*?<\/style>/gi, " ")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/g, " ")
    .replace(/&#8217;/g, "'")
    .replace(/&amp;/g, "&")
    .replace(/\s+/g, " ")
    .trim();
}

function parseTimes(html: string): PrayerPayload {
  const text = strip(html);
  const names = ["Fajr", "Duhr", "Dhuhr", "Asr", "Maghrib", "Isha"] as const;
  const rows: PrayerRow[] = [];

  // Prefer structured pairs around prayer names near أذان / الإقامة
  for (const name of ["Fajr", "Duhr", "Asr", "Maghrib", "Isha"]) {
    const re = new RegExp(
      `${name}[^0-9]{0,40}(\\d{1,2}:\\d{2}\\s*[AP]M)[^0-9]{0,80}(\\d{1,2}:\\d{2}\\s*[AP]M)`,
      "i",
    );
    const m = text.match(re);
    if (m) {
      rows.push({ name: name === "Duhr" ? "Dhuhr" : name, athan: m[1], iqamah: m[2] });
    }
  }

  // Fallback: look for Arabic labels sequence in original HTML chunk
  if (rows.length < 5) {
    const chunkMatch = html.match(/prayer-time-section[\s\S]{0,25000}/i);
    const chunk = chunkMatch ? strip(chunkMatch[0]) : text;
    const timeRe = /(\d{1,2}:\d{2}\s*[AP]M)/gi;
    const times = [...chunk.matchAll(timeRe)].map((m) => m[1]);
    // Heuristic from live layout: pairs of athan/iqamah for 5 prayers
    const labels = ["Fajr", "Dhuhr", "Asr", "Maghrib", "Isha"];
    for (let i = 0; i < labels.length; i++) {
      const a = times[i * 2];
      const q = times[i * 2 + 1];
      if (a && q) rows.push({ name: labels[i], athan: a, iqamah: q });
    }
  }

  const hijriMatch = text.match(/(\d{1,2}\s+[A-Za-z']+\s+(?:al-[A-Za-z']+\s+)?\d{4})/);
  const jummahMatch = text.match(/Jumu['’]?ah(?:\s+II)?[^0-9]{0,20}(\d{1,2}:\d{2}\s*[AP]M)/i);
  const jummah2Match = text.match(/Jumu['’]?ah\s+II[^0-9]{0,20}(\d{1,2}:\d{2}\s*[AP]M)/i);

  // Deduplicate by name
  const seen = new Set<string>();
  const unique = rows.filter((r) => {
    if (seen.has(r.name)) return false;
    seen.add(r.name);
    return true;
  });

  return {
    hijri: hijriMatch?.[1],
    rows: unique,
    jummah: jummahMatch?.[1],
    jummah2: jummah2Match?.[1],
    source: "https://alfalahcenter.ca/ (Masjidal)",
    fetchedAt: new Date().toISOString(),
    note:
      unique.length === 0
        ? "Could not parse live board — open alfalahcenter.ca or Masjidal for official times."
        : undefined,
  };
}

export async function GET() {
  try {
    const res = await fetch("https://alfalahcenter.ca/", {
      next: { revalidate: 300 },
      headers: { "User-Agent": "AlfalahCenterPreview/1.0" },
    });
    if (!res.ok) throw new Error(`Upstream ${res.status}`);
    const html = await res.text();
    const payload = parseTimes(html);
    return NextResponse.json(payload);
  } catch (e) {
    const message = e instanceof Error ? e.message : "fetch failed";
    return NextResponse.json(
      {
        rows: [],
        source: "https://alfalahcenter.ca/ (Masjidal)",
        fetchedAt: new Date().toISOString(),
        note: `Prayer sync unavailable (${message}). Use the live site or Masjidal.`,
      } satisfies PrayerPayload,
      { status: 200 },
    );
  }
}
