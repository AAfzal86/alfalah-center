import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { programs, programsIntro } from "@/lib/content";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Programs & Services" };

export default function ProgramsPage() {
  return (
    <>
      <PageHero title="Programs & Services" subtitle={programsIntro} />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl gap-5 px-5 sm:grid-cols-2 md:px-8 lg:grid-cols-3">
          {programs.map((p) => (
            <Reveal key={p.title}>
              <article className="cream-panel flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                <h2 className="font-display text-lg font-semibold text-emerald">{p.title}</h2>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">{p.body}</p>
                {p.title.includes("Summer Camps") ? (
                  <a
                    href={brand.links.summerCamp}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 text-sm font-semibold text-accent hover:underline"
                  >
                    Summer camp link (tinyurl.com/Alfalah-sc2026)
                  </a>
                ) : null}
                {p.title === "Food Bank" ? (
                  <a
                    href="/food-bank-timings"
                    className="mt-4 text-sm font-semibold text-accent hover:underline"
                  >
                    Food Bank Timings
                  </a>
                ) : null}
              </article>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
