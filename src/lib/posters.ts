/** Current program posters (supplied by Alfalah Center, Oct 2026). */
export type ProgramPoster = {
  id: "madrasah" | "girls" | "mcna";
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
    id: "girls",
    base: "/posters/girls-quran-islamic-studies-saturday",
    width: 1600,
    height: 900,
    eyebrow: "Saturday Classes for Girls",
    title: "Quran & Islamic Studies",
    caption:
      "Nurturing confident Muslim girls through Quran, knowledge and character. Learn from an experienced teacher with over 23 years of teaching experience.",
    facts: [
      "Ages 6 and above",
      "Saturdays · 12:00 PM – 2:00 PM",
      "Quran, Islamic Studies, small class environment",
    ],
    alt:
      "Al Falah Centre South Edmonton poster: Quran and Islamic Studies, Saturday classes for girls. Ages 6 and above, Saturdays 12:00 PM to 2:00 PM. Quran recitation with Tajweed and memorization; Islamic Studies covering Aqeedah, Fiqh, Sirah, Hadith and manners; small class environment with focused and supportive learning; building strong Islamic character based on Quran and Sunnah. A strong foundation today for a brighter tomorrow. Learn from an experienced teacher with over 23 years of teaching experience: Master's Degree in Islamic Studies (International Online University), Higher Diploma in Islamic Education, various online Quran and Hadith courses over two decades, Sahih Bukhari course, Fiqh of Salah course, experienced in teaching Tafseer, Hadith and Fiqh and has delivered several Islamic lectures at events and Masjid. For more information contact 780-988-2239. Al Falah Centre South, 2401 47 Street NW, Edmonton, AB T6L 4P6.",
    primary: {
      label: "Call 780-988-2239",
      href: "tel:+17809882239",
      sr: "(calls Al Falah Centre South)",
    },
    secondary: { label: "Get directions", href: "https://www.google.com/maps/search/?api=1&query=2401+47+Street+NW+Edmonton+AB+T6L+4P6" },
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
