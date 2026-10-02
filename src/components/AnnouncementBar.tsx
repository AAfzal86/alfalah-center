import { brand } from "@/lib/brand";

export default function AnnouncementBar() {
  return (
    <div className="relative z-[60] border-b border-gold/30 bg-emerald-deep text-center text-white">
      <p className="mx-auto max-w-5xl px-4 py-2 text-[11px] leading-relaxed text-white/90 sm:text-xs">
        {brand.announcement.eid}{" "}
        <a
          href={brand.links.fiqhCouncil}
          target="_blank"
          rel="noopener noreferrer"
          className="underline decoration-gold-bright/70 underline-offset-2 hover:text-gold-bright"
        >
          Fiqh Council of North America
        </a>
      </p>
    </div>
  );
}
