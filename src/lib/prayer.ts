/** Live SE campus prayer times come from Masjidal (WordPress plugin on alfalahcenter.ca). */
export const MASJIDAL_URL = "https://mymasjidal.com/";
export const LIVE_SITE = "https://alfalahcenter.ca/";

export const prayerMeta = {
  sourceLabel: "Masjidal",
  sourceFull: "Masjidal.com (live site board)",
  syncNote:
    "Prayer timings on the live Alfalah Center site are powered by Masjidal. This preview syncs Athan/Iqamah from alfalahcenter.ca when available.",
  jummahNote:
    "Please note that Jumu’ah Salah Iqamah is 30 minutes after the scheduled time.",
} as const;

export type PrayerRow = {
  name: string;
  athan: string;
  iqamah: string;
};

export type PrayerPayload = {
  hijri?: string;
  rows: PrayerRow[];
  jummah?: string;
  jummah2?: string;
  source: string;
  fetchedAt: string;
  note?: string;
};
