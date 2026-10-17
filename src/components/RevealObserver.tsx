"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

/**
 * One IntersectionObserver for every [data-reveal] element — no layout reads.
 * html.reveal-ready (which arms the hidden state) is only added after the
 * first observer batch has already marked on-screen items as revealed, so
 * nothing above the fold ever flashes or delays LCP.
 */
export default function RevealObserver() {
  const pathname = usePathname();

  // Ambient motion (Ken Burns / poster drift) starts once the page has loaded.
  useEffect(() => {
    const root = document.documentElement;
    const start = () => window.setTimeout(() => root.classList.add("motion-ready"), 300);
    if (document.readyState === "complete") start();
    else window.addEventListener("load", start, { once: true });
    return () => window.removeEventListener("load", start);
  }, []);

  useEffect(() => {
    if (!("IntersectionObserver" in window)) return;
    const root = document.documentElement;
    const seen = new WeakSet<Element>();
    let armed = root.classList.contains("reveal-ready");

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-revealed");
            io.unobserve(e.target);
          }
        }
        if (!armed) {
          armed = true;
          root.classList.add("reveal-ready");
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );

    const scan = () => {
      document.querySelectorAll("[data-reveal]:not(.is-revealed)").forEach((el) => {
        if (seen.has(el)) return;
        seen.add(el);
        io.observe(el);
      });
    };

    scan();

    let raf = 0;
    const mo = new MutationObserver((records) => {
      if (raf || !records.some((r) => r.addedNodes.length)) return;
      raf = window.requestAnimationFrame(() => {
        raf = 0;
        scan();
      });
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
      if (raf) window.cancelAnimationFrame(raf);
    };
  }, [pathname]);

  return null;
}
