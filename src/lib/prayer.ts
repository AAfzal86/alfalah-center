/**
 * Prayer times source of truth: NizamOS Mosque TV widget (ICNA Edmonton / Alfalah Center SE).
 * Embed from app.nizamos.ca — emerald theme, full layout.
 */

export const NIZAMOS_WIDGET_ID = "nizamos-prayer-12ca9fe6";

export const NIZAMOS_WIDGET_SRC =
  "https://app.nizamos.ca/tv/widget/12ca9fe6d69ff4dd4148939499c42a71c7c891526fd8e7d8?theme=emerald&layout=full";

export const NIZAMOS_WIDGET_ORIGIN = "https://app.nizamos.ca";

/** Public NizamOS app — open for “Open in NizamOS”. */
export const NIZAMOS_OPEN = NIZAMOS_WIDGET_SRC;

export const OFFICIAL_PRAYER_BOARD = "https://alfalahcenter.ca/";

export const prayerMeta = {
  sourceLabel: "NizamOS",
  sourceFull: "NizamOS Mosque TV",
  syncNote:
    "Live Salah & Iqamah times from NizamOS — the same board used for ICNA Edmonton / Alfalah Center.",
  jummahLabel: "Jumu’ah — Fridays",
  jummahHint:
    "Jumu’ah Salah Iqamah is 30 minutes after the scheduled time. Call (780) 988-2239 to confirm.",
} as const;
