import type { Metadata } from "next";
import PageHero from "@/components/PageHero";
import Reveal from "@/components/Reveal";
import { brand } from "@/lib/brand";
import { donateCopy } from "@/lib/content";

export const metadata: Metadata = { title: "Donate" };

export default function DonatePage() {
  return (
    <>
      <PageHero title="Donate" subtitle={donateCopy.headline} videoSrc="/videos/trust.mp4" videoPoster="/videos/trust.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-4xl px-5 md:px-8">
          <Reveal>
            <p className="text-base leading-relaxed text-charcoal/85">{donateCopy.note}</p>
            <div className="mt-8 grid gap-5 sm:grid-cols-2">
              <div className="cream-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-semibold text-emerald">
                  {donateCopy.recurringLabel}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  Options on the live form include recurring gifts (e.g. $100 / month) for:{" "}
                  {donateCopy.funds.join(", ")}.
                </p>
                <a
                  href={brand.links.donateIcna}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  Donate via ICNA Edmonton
                </a>
              </div>
              <div className="cream-panel rounded-2xl p-6">
                <h2 className="font-display text-xl font-semibold text-emerald">
                  {donateCopy.oneTimeLabel}
                </h2>
                <p className="mt-2 text-sm text-muted">
                  One-time gifts for Food Bank, Alfalah Center North (New), Alfalah Center South
                  (Existing), Zakaat, Fitra ($15 / person), General Donation, Iftar.
                </p>
                <a
                  href={brand.links.donateIcnaFund}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="gold-btn mt-6 inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
                >
                  One-time donation
                </a>
              </div>
            </div>
            <div className="mt-8 rounded-2xl bg-emerald-deep p-6 text-center text-white md:p-8">
              <h3 className="font-display text-2xl font-semibold">
                Fundraising for Alfalah South Expansion
              </h3>
              <a
                href={brand.links.donateExpand}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn mt-5 inline-flex rounded-full px-8 py-3 text-sm font-semibold"
              >
                Donate Now
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    </>
  );
}
