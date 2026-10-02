import Reveal from "./Reveal";
import VideoBed from "./VideoBed";

export default function PageHero({
  title,
  subtitle,
  videoSrc = "/videos/mosque-tv.mp4",
  videoPoster = "/videos/mosque-tv.jpg",
}: {
  title: string;
  subtitle?: string;
  videoSrc?: string;
  videoPoster?: string;
}) {
  return (
    <section className="relative overflow-hidden">
      <VideoBed src={videoSrc} poster={videoPoster} tone="emerald" lattice grain />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-16 text-center md:px-8 md:py-20">
        <Reveal>
          <p className="mb-3 text-[11px] font-semibold uppercase tracking-[0.28em] text-gold-bright/90">
            Alfalah Islamic Centre
          </p>
          <h1 className="font-display text-3xl font-semibold text-white sm:text-4xl md:text-5xl">
            {title}
          </h1>
          {subtitle ? (
            <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-white/80 md:text-lg">
              {subtitle}
            </p>
          ) : null}
        </Reveal>
      </div>
      <div className="gold-hairline relative z-10" />
    </section>
  );
}
