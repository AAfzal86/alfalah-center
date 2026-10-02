import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { about, whatWeDoIntro, mandates, specialNeeds } from "@/lib/content";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <>
      <PageHero title="About Us" subtitle="Who we are and what guides our work" videoSrc="/videos/facilities.mp4" videoPoster="/videos/facilities.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-emerald">Who We Are</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{about.whoWeAre}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{about.whoWeAreLong}</p>
          </Reveal>
          <div id="mission" className="mt-12"><Reveal>
            <h2 className="font-display text-2xl font-semibold text-emerald">
              Alfalah Mission & Vision
            </h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{about.mission}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{about.vision}</p>
          </Reveal></div>
        </div>
      </section>

      <section className="bg-ivory py-16">
        <div className="mx-auto max-w-6xl px-5 md:px-8">
          <Reveal>
            <h2 className="text-center font-display text-2xl font-semibold text-emerald md:text-3xl">
              What We Do
            </h2>
            <p className="mx-auto mt-4 max-w-3xl text-center text-base leading-relaxed text-muted">
              {whatWeDoIntro}
            </p>
          </Reveal>
          <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {mandates.map((m) => (
              <Reveal key={m.title}>
                <article className="cream-panel h-full rounded-2xl p-6">
                  <h3 className="font-display text-lg font-semibold text-emerald">{m.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-muted">{m.body}</p>
                </article>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <h2 className="font-display text-2xl font-semibold text-emerald">Special Needs</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{specialNeeds.body}</p>
          </Reveal>
          <Reveal className="mt-12">
            <h2 className="font-display text-2xl font-semibold text-emerald">Get involved</h2>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{about.changeALife}</p>
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
