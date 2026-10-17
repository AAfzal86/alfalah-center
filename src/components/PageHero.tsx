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
    <section className="relative isolate overflow-hidden">
      <VideoBed src={videoSrc} poster={videoPoster} tone="emerald" lattice grain priority />
      <div className="frame-corners hidden md:block" style={{ inset: "1.25rem 1.5rem" }} aria-hidden />
      <div className="relative z-10 mx-auto max-w-5xl px-5 py-20 text-center md:px-8 md:py-28">
        <p className="hero-rise eyebrow eyebrow-center text-gold-bright/90">Alfalah Islamic Centre</p>
        <h1 className="hero-settle display-section mx-auto mt-5 max-w-3xl text-white md:text-[3.5rem]">
          {title}
        </h1>
        <div
          className="hero-rise gold-hairline mx-auto mt-6 w-24"
          style={{ ["--d" as string]: "120ms" }}
          aria-hidden
        />
        {subtitle ? (
          <p
            className="hero-rise lead mx-auto mt-6 max-w-2xl text-white/80"
            style={{ ["--d" as string]: "180ms" }}
          >
            {subtitle}
          </p>
        ) : null}
      </div>
      <div className="gold-hairline relative z-10" />
    </section>
  );
}
