import type { Metadata } from "next";
import Link from "next/link";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import {
  programs,
  programsIntro,
  whatWeDoIntro,
  mandates,
  atAlfalah,
} from "@/lib/content";
import { brand } from "@/lib/brand";

export const metadata: Metadata = {
  title: "Ongoing Programs",
  description:
    "Ongoing spiritual, educational, and community programs at Alfalah Islamic Centre in Southeast Edmonton.",
};

function programHref(title: string): string | null {
  if (title.includes("Madrasah") || title.includes("Kids Weekend")) {
    return "/madrasah";
  }
  if (title === "Food Bank") return "/food-bank-timings";
  if (title.includes("Summer Camps")) return brand.links.summerCamp;
  return null;
}

function programLinkLabel(title: string): string | null {
  if (title.includes("Madrasah") || title.includes("Kids Weekend")) {
    return "Madrasah & registration";
  }
  if (title === "Food Bank") return "Food Bank Timings";
  if (title.includes("Summer Camps")) {
    return "Summer camp link (tinyurl.com/Alfalah-sc2026)";
  }
  return null;
}

export default function OngoingProgramsPage() {
  return (
    <>
      <PageHero
        title="Ongoing Programs"
        subtitle={programsIntro}
        videoSrc="/videos/statement.mp4"
        videoPoster="/videos/statement.jpg"
      />

      <section className="bg-ivory py-14 md:py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
              What We Do
            </p>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-muted">
              {whatWeDoIntro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mandates.map((m) => (
              <Reveal key={m.title}>
                <article className="cream-panel h-full rounded-2xl p-6">
                  <div className="icon-ring mb-4 flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold text-gold-bright">
                    ◆
                  </div>
                  <h2 className="font-display text-lg font-semibold text-emerald">
                    {m.title}
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <p className="text-center text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
              At Alfalah
            </p>
            <h2 className="mt-2 text-center font-display text-2xl font-semibold text-charcoal md:text-3xl">
              Programs that continue year-round
            </h2>
            <ul className="mx-auto mt-6 max-w-3xl space-y-2">
              {atAlfalah.slice(1).map((item) => (
                <li
                  key={item}
                  className="flex gap-3 text-sm leading-relaxed text-charcoal/85 md:text-base"
                >
                  <span
                    className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-gold"
                    aria-hidden
                  />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => {
              const href = programHref(p.title);
              const label = programLinkLabel(p.title);
              const external = href?.startsWith("http");
              return (
                <Reveal key={p.title}>
                  <article className="cream-panel flex h-full flex-col rounded-2xl p-6 transition hover:-translate-y-0.5 hover:shadow-lg">
                    <h3 className="font-display text-lg font-semibold text-emerald">
                      {p.title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-muted">
                      {p.body}
                    </p>
                    {href && label ? (
                      external ? (
                        <a
                          href={href}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="mt-4 text-sm font-semibold text-accent hover:underline"
                        >
                          {label}
                        </a>
                      ) : (
                        <Link
                          href={href}
                          className="mt-4 text-sm font-semibold text-accent hover:underline"
                        >
                          {label}
                        </Link>
                      )
                    ) : null}
                  </article>
                </Reveal>
              );
            })}
          </div>

          <Reveal>
            <p className="mt-10 text-center text-sm text-muted">
              Looking for the full services overview?{" "}
              <Link
                href="/program-and-services"
                className="font-semibold text-emerald hover:underline"
              >
                Programs &amp; Services
              </Link>
            </p>
          </Reveal>
        </div>
      </section>

      <ContactCTA />
    </>
  );
}
