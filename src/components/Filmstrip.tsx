import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { galleryImages } from "@/lib/content";

const picks = [38, 40, 43, 47, 50, 52, 44, 56].map((n) => galleryImages.find((g) => g.src.includes(`Image-${n}.`))!).filter(Boolean);

/** Real community photos gliding past in arch frames (CSS marquee, starts after load, pauses on hover). */
export default function Filmstrip() {
  const list = [...picks, ...picks];
  return (
    <div className="mt-20 md:mt-28">
      <div className="mx-auto flex max-w-7xl flex-wrap items-end justify-between gap-4 px-5 md:px-10">
        <h3 className="font-display text-2xl font-semibold text-emerald md:text-3xl">Community moments</h3>
        <Link href="/gallery" className="btn btn-sm btn-outline">
          View the gallery
          <ArrowRight className="btn-icon-end h-4 w-4" aria-hidden />
        </Link>
      </div>
      <div className="cg-film mt-8">
        <ul className="cg-film-track">
          {list.map((g, i) => (
            <li key={i} className="cg-film-item" aria-hidden={i >= picks.length ? true : undefined}>
              <Image src={g.src} alt={i >= picks.length ? "" : "Community gathering at Alfalah Center"} fill sizes="260px" className="object-cover" />
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
