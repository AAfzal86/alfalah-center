export const brand = {
  name: "Alfalah Center",
  fullName: "Alfalah Islamic Centre",
  shortName: "Al Falah Center",
  tagline: "A Center for Peace and Unity",
  city: "Edmonton",
  campus: "Southeast Edmonton",
  phone: "780-988-2239",
  phoneHref: "tel:+17809882239",
  phoneExt: {
    quran: "Ext 1",
    imam: "EXT 2",
    admin: "Ext 3",
  },
  emails: {
    imam: "imam@alfalahcenter.ca",
    admin: "admin@alfalahcenter.ca",
  },
  address: {
    line1: "2401 47 St NW",
    line2: "Edmonton, AB T6L 4P6, Canada",
    mapsQuery: "2401 47 St NW, Edmonton, AB T6L 4P6, Canada",
    mapsEmbed:
      "https://www.google.com/maps?q=2401+47+St+NW,+Edmonton,+AB+T6L+4P6,+Canada&t=m&z=16&output=embed&iwloc=near",
    mapsDirections:
      "https://www.google.com/maps/dir/?api=1&destination=2401+47+St+NW,+Edmonton,+AB+T6L+4P6",
  },
  links: {
    donateExpand: "https://donorchoice.ca/embedded/icnaedmonton/alfalahsouthexpansion",
    donateIcna: "https://donorchoice.ca/icnaedmonton",
    donateIcnaFund: "https://donorchoice.ca/icnaedmonton/2982",
    summerCamp: "https://tinyurl.com/Alfalah-sc2026",
    facebook: "https://www.facebook.com/alfalahcenteredmonton/",
    instagram: "https://www.instagram.com/icnaedmonton/",
    icnaEdmonton: "https://icnaedmonton.com/",
    icnaRelief: "https://www.icnareliefcanada.ca/",
    icnaSisters: "https://icnasisters.org/",
    fiqhCouncil: "http://www.fiqhcouncil.org",
    muhsen: "https://www.muhsen.org",
    muhsenVideo: "https://www.youtube.com/watch?v=C6SwKvoy90w",
    masjidal: "https://mymasjidal.com/",
    sisterCampus: "https://alfalah-north.vercel.app",
    sisterCampusLive: "https://alfalahcenter.ca/", // live SE — this redesign is preview only
    madrasahForm:
      "https://docs.google.com/forms/d/e/1FAIpQLSeQFsN1jjJNb_HgFxQuOCvOnvKvzmkPVFCR2CxIbl2LnkIkdg/viewform",
    padForm: "/docs/Alfalah-pre-authorized_payment_form.pdf",
  },
  announcement: {
    eid:
      "ICNA Canada follows Fiqh Council of North America (FCNA) and we are pleased to announce that the Eid al-Fitr 1447 AH will be celebrated on Friday, March 20, 2026.",
  },
  hero: {
    kicker: "REVIVE. REBUILD. REIMAGINE.",
    h1: "Welcome To Alfalah Center",
    sub: "A blessed sanctuary for worship, community, and spiritual growth in the heart of Edmonton. Join us in prayer, unity, and service to Allah and our community.",
    hadith:
      "Whoever builds a masjid for the sake of Allah... Allah will build for him something like it in Paradise",
    hadithSource: "Sahih Al-Bukhari",
  },
  colors: {
    emerald: "#20413A",
    emeraldDeep: "#16332E",
    emeraldSoft: "#2A564C",
    accent: "#12A880",
    gold: "#C9A84C",
    goldBright: "#FEC96B",
    goldDeep: "#A8893A",
    cream: "#F7F3EA",
    creamDeep: "#EFE8DA",
    ivory: "#FBFAF6",
    charcoal: "#1A1F1C",
    muted: "#5A655F",
    white: "#FFFFFF",
  },
} as const;
