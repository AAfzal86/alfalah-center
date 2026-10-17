import { atAlfalah } from "@/lib/content";
import { brand } from "@/lib/brand";

const short = [
  "Daily five-time prayers & Jumu’ah",
  "Evening madrasah · weekend classes",
  "Youth activities",
  "Dawah & interfaith programs",
  "Sisters’ activities & halaqas",
  "Food bank",
];

function Ribbon({ items, variant }: { items: readonly string[]; variant: "gold" | "green" }) {
  const list = [...items, ...items];
  return (
    <div className={`cg-ribbon cg-ribbon-${variant}`}>
      <div className="cg-ribbon-track">
        {list.map((w, i) => (
          <span key={i} className="inline-flex items-center gap-5 pr-5 md:gap-8 md:pr-8" aria-hidden={i >= items.length ? true : undefined}>
            <span>{w}</span>
            <span className="cg-ribbon-mark" aria-hidden>
              ✦
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/** Two crossing ribbons (gold + green) that glide in opposite directions. CSS only, starts after load. */
export default function Ribbons() {
  return (
    <section aria-label={`At ${brand.name}`} className="cg-ribbons relative overflow-hidden bg-cream py-14 md:py-20">
      <p className="sr-only">{atAlfalah.join(" ")}</p>
      <div aria-hidden>
        <Ribbon items={short} variant="gold" />
        <Ribbon items={[brand.tagline, brand.campus, "ICNA Edmonton", brand.fullName, "Peace & Unity"]} variant="green" />
      </div>
    </section>
  );
}
