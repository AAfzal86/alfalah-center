import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { privacySections } from "@/lib/content";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <>
      <PageHero title="Privacy Policy" />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-3xl space-y-8 px-5 md:px-8">
          {privacySections.map((s) => (
            <Reveal key={s.title}>
              <h2 className="font-display text-xl font-semibold text-emerald">{s.title}</h2>
              <p className="mt-2 text-base leading-relaxed text-charcoal/85">{s.body}</p>
            </Reveal>
          ))}
          <Reveal>
            <p className="text-sm text-muted">
              Contact: {brand.address.line1}, {brand.address.line2} ·{" "}
              <a href={`mailto:${brand.emails.admin}`} className="text-accent hover:underline">
                {brand.emails.admin}
              </a>
            </p>
          </Reveal>
        </div>
      </section>
    </>
  );
}
