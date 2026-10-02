import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { specialNeeds } from "@/lib/content";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Special Needs" };

export default function SpecialNeedsPage() {
  return (
    <>
      <PageHero title="Special Needs" subtitle={specialNeeds.lead} videoSrc="/videos/mosque-tv.mp4" videoPoster="/videos/mosque-tv.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto max-w-3xl px-5 md:px-8">
          <Reveal>
            <Image
              src="/logo/Muhsen-Logo-400x189-1.webp"
              alt="MUHSEN"
              width={280}
              height={132}
              className="mb-8 h-auto w-48"
            />
            <p className="text-base leading-relaxed text-charcoal/85">{specialNeeds.body}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{specialNeeds.cta}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={brand.links.muhsenVideo}
                target="_blank"
                rel="noopener noreferrer"
                className="gold-btn inline-flex rounded-full px-6 py-2.5 text-sm font-semibold"
              >
                Watch Sheikh Omar Suleiman video
              </a>
              <a
                href={brand.links.muhsen}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex rounded-full border border-emerald/30 px-6 py-2.5 text-sm font-semibold text-emerald hover:bg-emerald/5"
              >
                www.muhsen.org
              </a>
            </div>
            <div className="mt-10 aspect-video overflow-hidden rounded-2xl border border-gold/30 shadow-lg">
              <iframe
                title="MUHSEN — Sheikh Omar Suleiman"
                src="https://www.youtube.com/embed/C6SwKvoy90w"
                className="h-full w-full"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              />
            </div>
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
