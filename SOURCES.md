# Alfalah Center (Southeast) — content & asset provenance

Premium Next.js redesign of **https://alfalahcenter.ca** (Alfalah Islamic Centre / Southeast campus).  
**Content and photos are taken from the live site.** Visual system elevated only (typography, spacing, emerald/gold matching live brand greens `#20413A` / `#12A880` + gold `#FEC96B` / `#C9A84C`).

**Do not confuse with** `/workspace/alfalah-north-site` (Alfalah Center North).

Scraped HTML snapshots: `scraped/*.html` (fetched 2026-10-01 MT).

---

## Pages rebuilt (App Router)

| Route | Live source | Notes |
|-------|-------------|-------|
| `/` | https://alfalahcenter.ca/ | Hero, hadith, prayer, At Alfalah list, What We Do, Special Needs, Change a Life, dialer CTAs, fundraising, map |
| `/about-us` | https://alfalahcenter.ca/about-us/ | Who We Are, Mission & Vision, mandates |
| `/program-and-services` | https://alfalahcenter.ca/program-and-services/ | All 12 program cards, verbatim copy |
| `/madrasah` | https://alfalahcenter.ca/madrasah/ | Copy + Google Form + PAD PDF |
| `/madrassah-policies` | https://alfalahcenter.ca/madrassah-policies/ | Links to Weather / Code of Conduct / Disciplinary PDFs |
| `/gallery` | https://alfalahcenter.ca/gallery/ | Live gallery images downloaded to `public/gallery/` |
| `/special-needs` | https://alfalahcenter.ca/special-needs/ | MUHSEN copy + YouTube embed `C6SwKvoy90w` |
| `/contact-us` | https://alfalahcenter.ca/contact-us/ | Imam/admin phones & emails; mailto form (Elementor form not ported) |
| `/donate` | https://alfalahcenter.ca/donate/ | Points to same DonorChoice / ICNA URLs (no payment backend reinvented) |
| `/privacy-policy` | https://alfalahcenter.ca/privacy-policy/ | Policy sections preserved |
| `/terms-conditions` | https://alfalahcenter.ca/terms-conditions/ | Terms sections preserved |
| `/food-bank-timings` | https://alfalahcenter.ca/food-bank-timings/ | Sat–Sun 12:00 pm–5:00 pm |

Skipped (utility / empty / spammy on live): `/test`, `/test-2`, `/payment-confirmation`, `/payment-failed`, `/madrassah-registration` (empty), `/ramadan-calender` (empty), `/mission` (legacy Avada shortcodes — content folded into About), `/friday-announcement` (old PDF only — file in `public/docs/`).

---

## Contact & location (verbatim)

- **Address:** 2401 47 St NW, Edmonton, AB T6L 4P6, Canada  
- **Phone:** 780-988-2239 (Ext 1 Quran translation · EXT 2 Imam · Ext 3 Admin)  
- **Emails:** imam@alfalahcenter.ca · admin@alfalahcenter.ca  
- **Map embed:** Google Maps query for the address above  

---

## Prayer times (NizamOS)

- Redesign embeds the **NizamOS Mosque TV** widget (same pattern as Alfalah Center North).  
- Widget id `nizamos-prayer-12ca9fe6`, theme `emerald`, `layout=full`:  
  `https://app.nizamos.ca/tv/widget/12ca9fe6d69ff4dd4148939499c42a71c7c891526fd8e7d8?theme=emerald&layout=full`  
- React iframe + `postMessage` height resize (`nizamos-prayer-widget:height`).  
- Emerald/gold rails frame the board. Jumu’ah note: Iqamah is 30 minutes after the scheduled time.  
- Obsolete Masjidal scrape `/api/prayer-times` removed.

---

## External links preserved

- https://donorchoice.ca/embedded/icnaedmonton/alfalahsouthexpansion  
- https://donorchoice.ca/icnaedmonton · https://donorchoice.ca/icnaedmonton/2982  
- https://tinyurl.com/Alfalah-sc2026 (summer camp)  
- https://docs.google.com/forms/d/e/1FAIpQLSeQFsN1jjJNb_HgFxQuOCvOnvKvzmkPVFCR2CxIbl2LnkIkdg/viewform (madrasah application)  
- https://www.facebook.com/alfalahcenteredmonton/ · https://www.instagram.com/icnaedmonton/  
- https://icnaedmonton.com/ · https://www.icnareliefcanada.ca/ · https://icnasisters.org/  
- http://www.fiqhcouncil.org  
- https://www.muhsen.org · YouTube `https://www.youtube.com/watch?v=C6SwKvoy90w`  

---

## Images downloaded → `public/`

### Logos (`public/logo/`)
- `Al-Falah-Center-Black-Green-Logo-1.svg`  
- `Al-Falah-Center-White-Green-Logo-1.svg`  
- `masjid_logo2-1-1-2.png`  
- `Muhsen-Logo-400x189-1.webp`  

### Gallery / page photos (`public/gallery/`)
- Elementor gallery `Image-38.webp` … `Image-56.webp`  
- WhatsApp community/event JPEGs (2026-02 … 2026-09)  
- `upcoming-events.jpeg`, `Madarasah.jfif_.jpeg`, `Weekend-Islamic-School.jfif_.png`  
- `C360_2019-05-11-04-09-14-004.jpg` (hero)  
- `what-is-contained-in-quran-1.webp`, `Gemini_Generated_Image_…webp`  

### Other (`public/images/`)
- Mask-group / Vector ornaments, `home-footer.jpg`, `avada-charity-journal-banner5.jpg`, `masjid-White.png`, etc.

### Docs (`public/docs/`)
- `Weather-Policy.pdf`, `Code-of-Conduct.pdf`, `Disciplinary-Policy.pdf`  
- `Alfalah-pre-authorized_payment_form.pdf`  
- `ALFALAH-CENTER-ANNOUNCEMENTS-JUN-18-2021.pdf`  

---

## Design direction

- Emerald/forest from live (`#20413A`, accent `#12A880`) + gold (`#C9A84C` / `#FEC96B`) — family match with Alfalah North, not NizamOS teal.  
- Playfair Display + Inter, cream ivory surfaces, geometric lattice, gold CTAs, soft framer-motion reveals.  
- Mobile-first, sticky nav, shared footer with live quick/other links.

---

## Content gaps / parent notes

1. **Contact form:** Live uses Elementor Pro form — preview uses `mailto:admin@alfalahcenter.ca` with the same fields. Wire Formspree/ICNA backend later if desired.  
2. **Donate forms:** Live Fusion/Avada payment UI — preview deep-links DonorChoice (same URLs as live).  
3. **Masjidal board:** Prefer official NizamOS SE widget from Abdullah when available; until then scrape + Masjidal attribution.  
4. **No production deploy / DNS change** for alfalahcenter.ca in this task.  

---

## Preview

```bash
cd /workspace/alfalah-center-site
npm run build
npm run dev   # 0.0.0.0:3010
```

Local URL pattern: `http://127.0.0.1:3010` (or host-mapped box URL if the environment exposes port 3010).
