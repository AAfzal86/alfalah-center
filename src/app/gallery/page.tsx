import type { Metadata } from "next";
import Image from "next/image";
import PageHero from "@/components/PageHero";
import ContactCTA from "@/components/ContactCTA";
import Reveal from "@/components/Reveal";
import { galleryImages, galleryLead } from "@/lib/content";

export const metadata: Metadata = { title: "Gallery" };

export default function GalleryPage() {
  return (
    <>
      <PageHero title="Gallery" subtitle={galleryLead} videoSrc="/videos/cta.mp4" videoPoster="/videos/cta.jpg" />
      <section className="bg-cream py-16 md:py-20">
        <div className="mx-auto columns-1 gap-4 px-5 sm:columns-2 md:px-8 lg:columns-3 lg:max-w-6xl">
          {galleryImages.map((img) => (
            <Reveal key={img.src} className="mb-4 break-inside-avoid">
              <div className="relative overflow-hidden rounded-2xl border border-gold/20 shadow-md">
                <Image
                  src={img.src}
                  alt={img.alt}
                  width={800}
                  height={600}
                  className="h-auto w-full object-cover transition duration-500 hover:scale-[1.02]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              </div>
            </Reveal>
          ))}
        </div>
      </section>
      <ContactCTA />
    </>
  );
}
