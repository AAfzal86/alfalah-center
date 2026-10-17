import type { ReactNode } from "react";
import BgVideo from "./BgVideo";

/** Sun-court stage around the unchanged NizamOS <PrayerTimes /> section: dome film, turning
 *  golden sunburst and an arched top edge that rises out of the ribbons above. */
export default function PrayerStage({ children }: { children: ReactNode }) {
  return (
    <div className="cg-prayer-stage relative isolate overflow-hidden bg-[#16332e]" data-stage="">
      <BgVideo name="c-ceiling" position="center 40%" />
      <div className="absolute inset-0 -z-10 bg-[#16332e]/70" aria-hidden />
      <div className="absolute inset-0 -z-10 bg-gradient-to-b from-[#16332e]/30 via-transparent to-[#16332e]" aria-hidden />
      <div className="cg-burst pointer-events-none absolute left-1/2 top-0 -z-10 aspect-square w-[160vmin] -translate-x-1/2 -translate-y-1/3 md:w-[120vmax]" aria-hidden />
      <div className="cg-wipe" aria-hidden />
      {children}
    </div>
  );
}
