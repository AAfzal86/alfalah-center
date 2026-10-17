/** Current program posters (supplied by Alfalah Center, Oct 2026). */
export type ProgramPoster = {
  id: "madrasah" | "mcna";
  base: string; // /posters/<base>-640|full.(webp|jpg)
  width: number;
  height: number;
  eyebrow: string;
  title: string;
  caption: string;
  facts: string[];
  alt: string;
  primary: { label: string; href: string; sr: string };
  secondary: { label: string; href: string };
};

export const programPosters: ProgramPoster[] = [
  {
    id: "madrasah",
    base: "/posters/alfalah-madrasah-fall-2026",
    width: 960,
    height: 1437,
    eyebrow: "Alfalah Madrasah",
    title: "Fall Semester 2026 Registration",
    caption:
      "Quran with Tajweed, Seerah, Aqidah, Islamic Fiqh and Islamic Duas. Registration is open now.",
    facts: [
      "Weekday classes · $70/child · Mon–Thu",
      "Saturday classes · $50/child",
      "Ages 8–14 · sibling discount $10",
    ],
    alt:
      "Alfalah Madrasah Fall Semester 2026 Registration poster. What we teach: 1 Quran with Tajweed, 2 Seerah, 3 Aqidah, 4 Islamic Fiqh, 5 Islamic Duas. Weekday classes $70 per child, Quran and Islamic Studies, boys 8 to 14, Monday to Thursday 4:45 to 6:15 pm and 6:15 to 7:45 pm. Saturday classes $50 per child, Islamic Studies, boys 8 to 14 10 am to 12 pm and 12 to 2 pm, girls 8 to 14 12 to 2 pm. Sibling discount $10; study materials provided. Registration open now: evening school September 2nd 2026 to June 25th 2026, Saturday school September 6th 2026 to June 20th 2026. 2401 47 St NW, Edmonton, AB T6L 4P6. For more information call 780.988.2239 or visit alfalahcenter.ca/madrasah.",
    primary: {
      label: "Register",
      href: "https://alfalahcenter.ca/madrasah",
      sr: "(opens Alfalah Madrasah registration in a new tab)",
    },
    secondary: { label: "Call 780.988.2239", href: "tel:+17809882239" },
  },
  {
    id: "mcna",
    base: "/posters/mcna-weekend-islamic-school-2026-27",
    width: 952,
    height: 1282,
    eyebrow: "MCNA Weekend Islamic School",
    title: "KG to Grade 8 · Sept 2026 – Jun 2027",
    caption:
      "Every Sunday at Alfalah Center (South), 11:30 AM to 1:30 PM. Islamic Studies, Surahs & Duas, Asma ul Husna, Salah & Hadith, Seerah, quizzes and field trips.",
    facts: [
      "$70/semester · sibling discount",
      "Every Sunday · 11:30 AM – 1:30 PM",
      "A project of ICNA Sisters Canada",
    ],
    alt:
      "MCNA Weekend Islamic School poster by ICNA Sisters Canada: KG to Grade 8, September 2026 to June 2027. Let's learn together: Islamic Studies, memorization of Surahs and Duas with explanation, Asma ul Husna, Salah and Hadith, Seerah of the Prophet, quizzes and fun field trips. Every Sunday: AlFalah Center (South) 11:30 AM to 1:30 PM, AlFalah Center (North) 11:30 AM to 1:30 PM, Leduc Islamic Centre 4 PM to 6 PM. $70 per semester, sibling discount offered. Special events include Welcome Ramadan and food drive, Eid celebrations, parents workshops and student workshops. Website mcna.icnasistersca.org, Instagram mcna.edmonton, Facebook MCNA Edmonton, email mcna.edmonton@icnasisters.com.",
    primary: {
      label: "Learn more",
      href: "https://mcna.icnasistersca.org",
      sr: "(opens the MCNA Weekend Schools website in a new tab)",
    },
    secondary: { label: "Email MCNA", href: "mailto:mcna.edmonton@icnasisters.com" },
  },
];
