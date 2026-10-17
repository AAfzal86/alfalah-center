"use client";

import { useEffect, useRef, useState } from "react";
import { register, videoAllowed } from "@/lib/videoManager";

/**
 * Full-bleed background video for v2 sections.
 * A right-sized poster (<picture>: 480x854 on phones, 1280x720 on desktop) always sits underneath.
 * The <video> starts with no src and preload="none"; lib/videoManager hands it a src only while it is
 * among the 1–2 most visible videos and unloads it again when it leaves. It fades in once playing.
 * Reduced motion / Save-Data: poster only.
 */
export default function BgVideo({
  name,
  eager = false,
  className = "",
  position = "center",
}: {
  name: string;
  eager?: boolean;
  className?: string;
  position?: string;
}) {
  const ref = useRef<HTMLVideoElement>(null);
  const [on, setOn] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || !videoAllowed()) return;
    const playing = () => setOn(true);
    v.addEventListener("playing", playing);
    const off = register(v, name, (p) => {
      if (!p) setOn(false);
    });
    return () => {
      v.removeEventListener("playing", playing);
      off();
    };
  }, [name]);

  return (
    <div className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden ${className}`} aria-hidden="true">
      <picture>
        <source media="(max-width: 820px) and (orientation: portrait)" srcSet={`/v2/${name}-m.jpg`} />
        <img
          src={`/v2/${name}.jpg`}
          alt=""
          width={1280}
          height={720}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "low"}
          decoding={eager ? "sync" : "async"}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: position }}
        />
      </picture>
      <video
        ref={ref}
        data-bg={name}
        className={`absolute inset-0 h-full w-full object-cover transition-opacity duration-[1200ms] ${on ? "opacity-100" : "opacity-0"}`}
        style={{ objectPosition: position }}
        muted
        loop
        playsInline
        preload="none"
        disablePictureInPicture
        tabIndex={-1}
      />
    </div>
  );
}
