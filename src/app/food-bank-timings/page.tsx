import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { foodBank } from "@/lib/content";

export const metadata: Metadata = { title: "Food Bank Timings" };

export default function FoodBankPage() {
  return (
    <>
      <PageHero title={foodBank.title} />
      <section className="bg-cream py-16">
        <div className="mx-auto max-w-lg px-5 md:px-8">
          <Reveal>
            <div className="cream-panel rounded-3xl p-10 text-center">
              <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-emerald">
                Open
              </p>
              <p className="mt-3 font-display text-3xl font-semibold text-charcoal">
                {foodBank.days}
              </p>
              <p className="mt-2 text-xl text-accent">{foodBank.hours}</p>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
