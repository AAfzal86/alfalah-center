import type { CSSProperties, ReactNode } from "react";

/**
 * Scroll reveal marker. Pure markup — the shared <RevealObserver /> toggles
 * `.is-revealed` with one IntersectionObserver. SSR / no-JS / reduced-motion:
 * content is always visible. Transform + opacity only, so no layout shift.
 */
export default function Reveal({
  children,
  className = "",
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const style = delay
    ? ({ "--reveal-delay": `${Math.round(delay * 1000)}ms` } as CSSProperties)
    : undefined;
  return (
    <div data-reveal="" className={className} style={style}>
      {children}
    </div>
  );
}
