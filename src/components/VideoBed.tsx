"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

type Tone = "cream" | "emerald" | "ink";

/** Brand overlays — Alfalah greens #20413A / #12A880 + gold for readable text. */
const TONE_OVERLAY: Record<Tone, string> = {
  cream:
    "bg-[linear-gradient(180deg,rgba(247,243,234,0.90)_0%,rgba(247,243,234,0.78)_40%,rgba(239,232,218,0.88)_100%),radial-gradient(ellipse_at_20%_0%,rgba(32,65,58,0.14),transparent_55%),radial-gradient(ellipse_at_90%_10%,rgba(201,168,76,0.12),transparent_45%)]",
  emerald:
    "bg-[linear-gradient(180deg,rgba(22,51,46,0.82)_0%,rgba(32,65,58,0.76)_45%,rgba(22,51,46,0.90)_100%),radial-gradient(ellipse_at_50%_0%,rgba(18,168,128,0.14),transparent_50%),radial-gradient(ellipse_at_80%_100%,rgba(201,168,76,0.12),transparent_45%)]",
  ink:
    "bg-[linear-gradient(180deg,rgba(26,31,28,0.78)_0%,rgba(22,51,46,0.82)_50%,rgba(22,51,46,0.92)_100%),radial-gradient(ellipse_at_30%_20%,rgba(32,65,58,0.40),transparent_55%),radial-gradient(ellipse_at_90%_80%,rgba(201,168,76,0.10),transparent_40%)]",
};

/**
 * Full-bleed cinematic video bed for mosque marketing sections.
 * Desktop-first autoplay; poster-only on reduced-motion, saveData, or small screens.
 */
export default function VideoBed({
  src,
  poster,
  tone = "cream",
  lattice = false,
  grain = true,
  className = "",
  minWidth = 768,
}: {
  src: string;
  poster: string;
  tone?: Tone;
  lattice?: boolean;
  grain?: boolean;
  className?: string;
  /** Skip video autoplay below this viewport width (desktop-first). */
  minWidth?: number;
}) {
  const reduce = useReducedMotion();
  const videoRef = useRef<HTMLVideoElement>(null);
  const rootRef = useRef<HTMLDivElement>(null);
  const [canPlayVideo, setCanPlayVideo] = useState(false);

  useEffect(() => {
    if (reduce) {
      setCanPlayVideo(false);
      return;
    }
    const mq = window.matchMedia(`(min-width: ${minWidth}px)`);
    const connection = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
    const allowed = mq.matches && !connection?.saveData;
    setCanPlayVideo(allowed);

    const onChange = () => {
      const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection;
      setCanPlayVideo(mq.matches && !conn?.saveData && !reduce);
    };
    mq.addEventListener("change", onChange);
    return () => mq.removeEventListener("change", onChange);
  }, [reduce, minWidth]);

  useEffect(() => {
    const video = videoRef.current;
    const root = rootRef.current;
    if (!video || !root || !canPlayVideo) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
          void video.play().catch(() => {});
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.15, 0.4] },
    );
    observer.observe(root);
    return () => observer.disconnect();
  }, [canPlayVideo]);

  return (
    <div ref={rootRef} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${poster})` }}
      />
      {canPlayVideo && (
        <video
          ref={videoRef}
          className="absolute inset-0 h-full w-full object-cover"
          src={src}
          poster={poster}
          muted
          loop
          playsInline
          preload="metadata"
          tabIndex={-1}
        />
      )}
      <div className={`absolute inset-0 ${TONE_OVERLAY[tone]}`} />
      {lattice && <div className="pattern-geometric-lattice absolute inset-0 opacity-50" />}
      {grain && <div className="video-grain absolute inset-0" />}
    </div>
  );
}
