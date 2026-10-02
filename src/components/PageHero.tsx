import Reveal from "./Reveal";

export default function PageHero({
  title,
  subtitle,
}: {
  title: string;
  subtitle?: string;
}) {
  return (
    <section className="relative overflow-hidden bg-emerald-deep pattern-geometric">
      <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-emerald-deep/90" />
      <div className="relative mx-auto max-w-5xl px-5 py-16 text-center md:px-8 md:py-20">
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
      <div className="gold-hairline relative" />
    </section>
  );
}
