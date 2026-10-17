/**
 * Prayer times source of truth: NizamOS Mosque TV widget for Alfalah Center Edmonton (app.nizamos.ca/w/alfalahyeg).
 * Embed from app.nizamos.ca — emerald theme, full layout.
 */

export const NIZAMOS_WIDGET_ID = "nizamos-prayer-fddfd2d0";

export const NIZAMOS_WIDGET_SRC =
  "https://app.nizamos.ca/tv/widget/fddfd2d0250a1ae3db111e986972aad0064d22856434e287?theme=emerald&layout=full";

export const NIZAMOS_WIDGET_ORIGIN = "https://app.nizamos.ca";

/** Public NizamOS app — open for “Open in NizamOS”. */
export const NIZAMOS_OPEN = "https://app.nizamos.ca/w/alfalahyeg";

export const OFFICIAL_PRAYER_BOARD = "https://alfalahcenter.ca/";

export const prayerMeta = {
  sourceLabel: "NizamOS",
  sourceFull: "NizamOS Mosque TV",
  syncNote:
    "Live Salah & Iqamah times from NizamOS — the same board used for Alfalah Center Edmonton.",
  jummahLabel: "Jumu’ah — Fridays",
  jummahHint:
    "Jumu’ah Salah Iqamah is 30 minutes after the scheduled time. Call (780) 988-2239 to confirm.",
} as const;
