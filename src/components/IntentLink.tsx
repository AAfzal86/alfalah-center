"use client";
// Drop-in replacement for next/link that prefetches on intent (hover, focus, touch) instead of on viewport.
//
// Why: next/link prefetches every internal link as soon as it scrolls into view. On alfalahcenter.ca that was ~26 RSC
// requests per home view (header menu, footer, page cards), i.e. ~40% of the requests of a visit, mostly for pages the
// visitor never opened. Prefetching on intent keeps navigation instant for
// the link the visitor is about to tap/click while removing the speculative requests. Navigation itself is unchanged.
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useRef, type ComponentProps } from "react";

type Props = ComponentProps<typeof Link>;

export default function IntentLink({ href, prefetch, onMouseEnter, onFocus, onTouchStart, ...rest }: Props) {
  const router = useRouter();
  const done = useRef(false);
  const target = typeof href === "string" ? href : (href.pathname ?? "") + (href.hash ? `#${href.hash.replace(/^#/, "")}` : "");
  const warm = useCallback(() => {
    if (done.current || prefetch === false || !target.startsWith("/")) return;
    done.current = true;
    router.prefetch(target);
  }, [router, target, prefetch]);

  return (
    <Link
      href={href}
      prefetch={false}
      onMouseEnter={(e) => { warm(); onMouseEnter?.(e); }}
      onFocus={(e) => { warm(); onFocus?.(e); }}
      onTouchStart={(e) => { warm(); onTouchStart?.(e); }}
      {...rest}
    />
  );
}
