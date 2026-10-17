/**
 * One shared budget for every background video on the page (iOS-Safari safe).
 *
 * iOS Safari keeps a decoder and frame buffers alive for every <video> that holds a src,
 * even while paused. So:
 *  - at most 1 video (phones / touch) or 2 videos (desktop) may hold a src at once,
 *  - every other video is fully unloaded (src removed + load()),
 *  - phones get the small 480x854 "-m" encodes,
 *  - nothing loads before the page `load` event, while the tab is hidden,
 *    with reduced motion, or with Save-Data / 2G connections.
 */
type Entry = {
  el: HTMLVideoElement;
  src: () => string;
  ratio: number;
  seen: number;
  active: boolean;
  onState: (playing: boolean) => void;
};

const BASE = "/v2";
const entries = new Set<Entry>();
let io: IntersectionObserver | null = null;
let raf = 0;
let ready = false;
let bound = false;

type Conn = { saveData?: boolean; effectiveType?: string };

export const isPhoneVideo = () =>
  typeof window !== "undefined" &&
  window.matchMedia("(max-width: 820px) and (orientation: portrait), (pointer: coarse) and (max-width: 820px)").matches;

const budget = () => (isPhoneVideo() || window.matchMedia("(pointer: coarse)").matches ? 1 : 2);

export const videoAllowed = () => {
  if (typeof window === "undefined") return false;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  const c = (navigator as Navigator & { connection?: Conn }).connection;
  if (c?.saveData) return false;
  if (c?.effectiveType && /(^|-)2g$/.test(c.effectiveType)) return false;
  return true;
};

export const videoSrc = (name: string) => `${BASE}/${name}${isPhoneVideo() ? "-m" : ""}.mp4`;

function unload(e: Entry) {
  if (!e.active) return;
  e.active = false;
  e.onState(false);
  const v = e.el;
  v.pause();
  v.removeAttribute("src");
  v.load(); // releases the media pipeline + decoded frames
}

function activate(e: Entry) {
  const v = e.el;
  if (!e.active) {
    e.active = true;
    v.src = e.src();
    v.load();
  }
  if (v.paused) v.play().catch(() => {});
}

function schedule() {
  if (raf || !ready) return;
  raf = requestAnimationFrame(() => {
    raf = 0;
    if (document.hidden) {
      entries.forEach(unload);
      return;
    }
    const visible = [...entries]
      .filter((e) => e.ratio > 0)
      .sort((a, b) => b.ratio - a.ratio || b.seen - a.seen);
    const keep = new Set(visible.slice(0, budget()));
    entries.forEach((e) => (keep.has(e) ? activate(e) : unload(e)));
  });
}

function bindGlobal() {
  if (bound) return;
  bound = true;
  const go = () =>
    window.setTimeout(() => {
      ready = true;
      schedule();
    }, 900);
  if (document.readyState === "complete") go();
  else window.addEventListener("load", go, { once: true });
  document.addEventListener("visibilitychange", () => {
    if (document.hidden) entries.forEach(unload);
    else schedule();
  });
  window.addEventListener("pagehide", () => entries.forEach(unload));
}

function observer() {
  if (io) return io;
  io = new IntersectionObserver(
    (list) => {
      for (const it of list) {
        for (const e of entries) {
          if (e.el !== it.target) continue;
          e.ratio = it.isIntersecting ? Math.max(it.intersectionRatio, 0.001) : 0;
          e.seen = performance.now();
        }
      }
      schedule();
    },
    { threshold: [0, 0.1, 0.25, 0.4, 0.55, 0.7, 0.85, 1] },
  );
  return io;
}

/** Register a video with the shared budget. `source` is a v2 clip name (→ /v2/name[-m].mp4) or a resolver. */
export function register(el: HTMLVideoElement, source: string | (() => string), onState: (playing: boolean) => void) {
  bindGlobal();
  const src = typeof source === "string" ? () => videoSrc(source) : source;
  const e: Entry = { el, src, ratio: 0, seen: 0, active: false, onState };
  entries.add(e);
  observer().observe(el);
  return () => {
    io?.unobserve(el);
    unload(e);
    entries.delete(e);
  };
}
