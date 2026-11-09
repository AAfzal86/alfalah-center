/**
 * Live prayer times for Alfalah Center Edmonton.
 * Read from the centre's public NizamOS Mosque TV / widget HTML payload
 * (no private API, no keys). Times are never recalculated.
 */

export const NIZAMOS_TOKEN = "fddfd2d0250a1ae3db111e986972aad0064d22856434e287";

/** Public widget page — same source the old iframe used. */
export const PRAYER_SOURCE_URL =
  `https://app.nizamos.ca/tv/widget/${NIZAMOS_TOKEN}?theme=emerald&layout=full`;

export const NIZAMOS_OPEN = "https://app.nizamos.ca/w/alfalahyeg";

export const OFFICIAL_PRAYER_BOARD = "https://www.alfalahcenter.ca/";

export const TZ = "America/Edmonton";
export const REVALIDATE_SECONDS = 600; // 10 minutes

export const prayerMeta = {
  sourceLabel: "NizamOS",
  sourceFull: "NizamOS Mosque TV",
  syncNote:
    "Live Salah & Iqamah times from NizamOS — the same board used for Alfalah Center Edmonton.",
  jummahLabel: "Jumu’ah — Fridays",
  jummahHint:
    "Jumu’ah Salah Iqamah is 30 minutes after the scheduled time. Call (780) 988-2239 to confirm.",
} as const;

export type Prayer = {
  prayer: string;
  adhanTime: string;
  iqamahTime: string | null;
  adhanAt: string;
  iqamahAt: string | null;
};

export type Jumuah = {
  label: string;
  khutbahTime: string | null;
  iqamahTime: string | null;
  khutbahAt: string | null;
  iqamahAt: string | null;
};

export type PrayerData = {
  ok: true;
  name: string;
  date: string; // YYYY-MM-DD in Edmonton
  today: Prayer[];
  tomorrow: Prayer[] | null;
  tomorrowDate: string | null;
  sunrise: string | null;
  sunset: string | null;
  tomorrowSunrise: string | null;
  tomorrowSunset: string | null;
  jumuahDate: string | null;
  jumuah: Jumuah[];
  fetchedAt: string;
};

export type PrayerResult =
  | PrayerData
  | { ok: false; reason: string; fetchedAt: string };

export function edmontonDate(d = new Date()) {
  return new Intl.DateTimeFormat("en-CA", {
    timeZone: TZ,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(d);
}

function addDays(iso: string, n: number) {
  const d = new Date(`${iso}T12:00:00Z`);
  d.setUTCDate(d.getUTCDate() + n);
  return d.toISOString().slice(0, 10);
}

/** Pull `initialPayload` or `payload` from the public Next.js flight HTML. */
function extractPayload(html: string): Record<string, unknown> | null {
  const chunks = [...html.matchAll(/self\.__next_f\.push\(\[1,"((?:[^"\\]|\\.)*)"\]\)/g)].map(
    (m) => {
      try {
        return JSON.parse(`"${m[1]}"`) as string;
      } catch {
        return "";
      }
    },
  );
  const flight = chunks.join("");
  for (const key of ['"initialPayload":', '"payload":']) {
    const i = flight.indexOf(key);
    if (i < 0) continue;
    const start = i + key.length;
    if (flight[start] !== "{") continue;
    let depth = 0;
    let inStr = false;
    let esc = false;
    for (let j = start; j < flight.length; j++) {
      const c = flight[j];
      if (inStr) {
        if (esc) esc = false;
        else if (c === "\\") esc = true;
        else if (c === '"') inStr = false;
        continue;
      }
      if (c === '"') inStr = true;
      else if (c === "{") depth++;
      else if (c === "}") {
        depth--;
        if (depth === 0) {
          try {
            return JSON.parse(flight.slice(start, j + 1));
          } catch {
            return null;
          }
        }
      }
    }
  }
  return null;
}

const ORDER = ["fajr", "dhuhr", "asr", "maghrib", "isha"];

function cleanList(v: unknown): Prayer[] | null {
  if (!Array.isArray(v)) return null;
  const out = v
    .filter((p): p is Record<string, unknown> => !!p && typeof p === "object")
    .map((p) => ({
      prayer: String(p.prayer ?? "").toLowerCase(),
      adhanTime: String(p.adhanTime ?? ""),
      iqamahTime: p.iqamahTime ? String(p.iqamahTime) : null,
      adhanAt: String(p.adhanAt ?? ""),
      iqamahAt: p.iqamahAt ? String(p.iqamahAt) : null,
    }))
    .filter(
      (p) =>
        ORDER.includes(p.prayer) &&
        /^\d{1,2}:\d{2}$/.test(p.adhanTime) &&
        !Number.isNaN(Date.parse(p.adhanAt)),
    );
  out.sort((a, b) => ORDER.indexOf(a.prayer) - ORDER.indexOf(b.prayer));
  return out.length === 5 ? out : null;
}

function cleanJumuah(v: unknown): Jumuah[] {
  if (!Array.isArray(v)) return [];
  return v
    .filter((j): j is Record<string, unknown> => !!j && typeof j === "object")
    .map((j) => {
      const iqamahTime = j.iqamahTime
        ? String(j.iqamahTime)
        : j.jumuahTime
          ? String(j.jumuahTime)
          : null;
      const khutbahTime = j.khutbahTime ? String(j.khutbahTime) : null;
      return {
        label: String(j.label ?? "Jumu'ah"),
        khutbahTime:
          khutbahTime && /^\d{1,2}:\d{2}$/.test(khutbahTime) ? khutbahTime : null,
        iqamahTime:
          iqamahTime && /^\d{1,2}:\d{2}$/.test(iqamahTime) ? iqamahTime : null,
        khutbahAt: j.khutbahAt ? String(j.khutbahAt) : null,
        iqamahAt: j.iqamahAt
          ? String(j.iqamahAt)
          : j.jumuahAt
            ? String(j.jumuahAt)
            : null,
      };
    })
    .filter((j) => j.iqamahTime || j.khutbahTime);
}

export async function getPrayerData(): Promise<PrayerResult> {
  const fetchedAt = new Date().toISOString();
  try {
    const res = await fetch(PRAYER_SOURCE_URL, {
      next: { revalidate: REVALIDATE_SECONDS },
      headers: {
        "User-Agent": "AlfalahCenter-website/1.0 (+prayer card)",
      },
    });
    if (!res.ok) {
      return { ok: false, reason: `Source returned ${res.status}`, fetchedAt };
    }
    const p = extractPayload(await res.text());
    if (!p) {
      return {
        ok: false,
        reason: "Prayer data not found on the display page",
        fetchedAt,
      };
    }
    if (p.timezone && p.timezone !== TZ) {
      return { ok: false, reason: "Unexpected timezone", fetchedAt };
    }
    const srcDate = String(p.localDate ?? "");
    const today = cleanList(p.today);
    const tomorrow = cleanList(p.tomorrow);
    const ss = (p.sunriseSunset ?? {}) as {
      today?: { sunriseTime?: string; sunsetTime?: string };
      tomorrow?: { sunriseTime?: string; sunsetTime?: string };
    };
    const now = edmontonDate();
    const jumuah = cleanJumuah(p.jumuah);
    const base = {
      ok: true as const,
      name: String(p.organizationName ?? "Alfalah Center Edmonton"),
      jumuahDate: p.jumuahDate ? String(p.jumuahDate) : null,
      jumuah,
      fetchedAt,
    };
    let data: PrayerData | null = null;
    if (srcDate === now && today) {
      data = {
        ...base,
        date: srcDate,
        today,
        tomorrow,
        tomorrowDate: tomorrow ? addDays(srcDate, 1) : null,
        sunrise: ss.today?.sunriseTime ?? null,
        sunset: ss.today?.sunsetTime ?? null,
        tomorrowSunrise: ss.tomorrow?.sunriseTime ?? null,
        tomorrowSunset: ss.tomorrow?.sunsetTime ?? null,
      };
    } else if (addDays(srcDate, 1) === now && tomorrow) {
      data = {
        ...base,
        date: now,
        today: tomorrow,
        tomorrow: null,
        tomorrowDate: null,
        sunrise: ss.tomorrow?.sunriseTime ?? null,
        sunset: ss.tomorrow?.sunsetTime ?? null,
        tomorrowSunrise: null,
        tomorrowSunset: null,
      };
    }
    if (!data) {
      return {
        ok: false,
        reason: `Source date ${srcDate || "unknown"} does not match today (${now})`,
        fetchedAt,
      };
    }
    return data;
  } catch {
    return { ok: false, reason: "Could not reach the prayer display", fetchedAt };
  }
}
