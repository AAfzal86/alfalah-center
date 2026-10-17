"use client";

import { useEffect, useRef, useState } from "react";

/** Counts up once, on a timer, when it first comes into view (never tied to scroll position).
 *  Renders the final number on the server and for reduced motion. */
export default function Counter({
  to,
  suffix = "",
  duration = 1800,
  className = "",
}: {
  to: number;
  suffix?: string;
  duration?: number;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const [val, setVal] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = requestAnimationFrame(() => {
      const r = el.getBoundingClientRect();
      if (r.top > window.innerHeight || r.bottom < 0) setVal(0);
    });
    const io = new IntersectionObserver(
      ([e]) => {
        if (!e.isIntersecting) return;
        io.disconnect();
        const t0 = performance.now();
        const tick = (t: number) => {
          const k = Math.min(1, (t - t0) / duration);
          setVal(Math.round(to * (1 - Math.pow(1 - k, 3))));
          if (k < 1) raf = requestAnimationFrame(tick);
        };
        raf = requestAnimationFrame(tick);
      },
      { threshold: 0.4 },
    );
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [to, duration]);

  return (
    <span ref={ref} className={`tabular-nums ${className}`}>
      {val.toLocaleString("en-CA")}
      {suffix}
    </span>
  );
}
