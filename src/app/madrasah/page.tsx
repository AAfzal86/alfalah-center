import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { madrasah } from "@/lib/content";
import { brand } from "@/lib/brand";

export const metadata: Metadata = { title: "Madrasah" };

export default function MadrasahPage() {
  return (
    <>
      <PageHero title="Madrasah" subtitle={madrasah.lead} videoSrc="/videos/madrasa.mp4" videoPoster="/videos/madrasa.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto grid max-w-6xl items-center gap-10 px-5 md:grid-cols-2 md:px-8">
          <Reveal>
            <p className="text-base leading-relaxed text-charcoal/85">{madrasah.body}</p>
            <p className="mt-4 text-base leading-relaxed text-charcoal/85">{madrasah.register}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a
                href={brand.links.madrasahForm}
                target="_blank"
                rel="noopener noreferrer"
                className="btn gold-btn"
              >
                Application Form
              </a>
              <a
                href={brand.links.padForm}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-outline"
              >
                Pad Form
              </a>
              <a
                href="/madrassah-policies"
                className="btn btn-outline"
              >
                Madrassah Policies
              </a>
            </div>
          </Reveal>
          <Reveal>
            <div className="photo-frame group relative aspect-[4/3]">
              <Image
                src="/gallery/Image-41.webp"
                alt="Learning session at Alfalah Center"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
            </div>
          </Reveal>
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
