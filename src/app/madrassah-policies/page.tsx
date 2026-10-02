import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { madrassahPolicies } from "@/lib/content";

export const metadata: Metadata = { title: "Madrassah Policies" };

export default function PoliciesPage() {
  return (
    <>
      <PageHero
        title="Madrassah Policies"
        subtitle="Weather Policy, Code Of Conduct, and Disciplinary Policy documents from the live site."
      />
      <section className="bg-cream py-16">
        <div className="mx-auto grid max-w-3xl gap-4 px-5 md:px-8">
          {madrassahPolicies.map((p) => (
            <Reveal key={p.title}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="cream-panel flex items-center justify-between rounded-2xl px-6 py-5 transition hover:-translate-y-0.5"
              >
                <span className="font-display text-lg font-semibold text-emerald">{p.title}</span>
                <span className="text-sm font-semibold text-accent">Download PDF</span>
              </a>
            </Reveal>
          ))}
        </div>
      </section>
    </>
  );
}
