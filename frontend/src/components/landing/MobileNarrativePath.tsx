import { motion, useMotionValue, useMotionValueEvent, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef } from "react";

/**
 * Master Draw.io V0.18 — mobile narrative devices.
 * One scroll-driven PATH and one active NODE, not a repeated free-running pulse.
 *
 * The path starts at x=14 and ends at x=14, so neighboring sections hand
 * a consistent editorial axis to one another. Shapes vary with the narrative:
 * Trail → Signal Field → Story Marker → Community Ring → Rise Axis/Horizon.
 *
 * This layer is purely decorative, never captures gestures, and becomes
 * a completed, static path when reduced motion is requested.
 */
type NarrativeDevice = "trail" | "signal" | "marker" | "ring" | "axis";

const devices: Record<NarrativeDevice, { path: string; color: string; weight: number }> = {
  trail: {
    path: "M14 0 C14 125 38 176 18 283 S14 490 26 625 S38 840 14 1000",
    color: "#F18136",
    weight: 2.3,
  },
  signal: {
    path: "M14 0 C14 180 35 245 14 350 S29 530 14 672 S14 850 14 1000",
    color: "#2899EF",
    weight: 2.1,
  },
  marker: {
    path: "M14 0 C14 230 28 305 14 430 S20 700 14 1000",
    color: "#F18136",
    weight: 1.5,
  },
  ring: {
    path: "M14 0 C56 148 56 246 24 360 C-3 465 50 550 42 660 S14 850 14 1000",
    color: "#F18136",
    weight: 1.85,
  },
  axis: {
    path: "M14 0 C14 260 14 550 14 710 C14 812 115 876 300 885 C342 890 364 940 360 1000",
    color: "#F18136",
    weight: 2.2,
  },
};

export function MobileNarrativePath({ kind }: { kind: NarrativeDevice }) {
  const hostRef = useRef<HTMLDivElement>(null);
  const pathRef = useRef<SVGPathElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: hostRef,
    offset: ["start 88%", "end 12%"],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 85,
    damping: 26,
    mass: 0.42,
  });
  const drawn = useTransform(progress, [0, 0.96], [0, 1]);
  // Signal hands visual attention to human photography in Vida COLUS.
  const exitOpacity = useTransform(progress, [0, 0.8, 1], [1, 1, kind === "signal" ? 0.16 : 1]);
  const activeX = useMotionValue(14);
  const activeY = useMotionValue(0);
  const left = useTransform(activeX, (x) => `${(x / 360) * 100}%`);
  const top = useTransform(activeY, (y) => `${(y / 1000) * 100}%`);
  const device = devices[kind];

  useMotionValueEvent(progress, "change", (value) => {
    if (reducedMotion || !pathRef.current) return;
    const path = pathRef.current;
    const distance = Math.max(0, Math.min(1, value)) * path.getTotalLength();
    const point = path.getPointAtLength(distance);
    activeX.set(point.x);
    activeY.set(point.y);
  });

  return (
    <div
      ref={hostRef}
      className="pointer-events-none absolute inset-0 z-20 overflow-hidden"
      aria-hidden="true"
    >
      <svg viewBox="0 0 360 1000" preserveAspectRatio="none" className="absolute inset-0 h-full w-full">
        <path
          d={device.path}
          fill="none"
          stroke={device.color}
          strokeWidth={device.weight}
          strokeOpacity={kind === "marker" ? 0.19 : 0.23}
          vectorEffect="non-scaling-stroke"
        />
        {kind === "signal" && (
          <path
            d="M35 0 C70 145 14 340 54 500 S24 782 54 1000"
            fill="none"
            stroke="#2899EF"
            strokeWidth="1"
            strokeDasharray="3 15"
            strokeOpacity="0.17"
            vectorEffect="non-scaling-stroke"
          />
        )}
        <motion.path
          ref={pathRef}
          d={device.path}
          fill="none"
          stroke={device.color}
          strokeWidth={device.weight + 0.5}
          strokeLinecap="round"
          vectorEffect="non-scaling-stroke"
          style={reducedMotion ? { pathLength: 1 } : { pathLength: drawn, opacity: exitOpacity }}
        />
      </svg>
      {/* HTML nodes stay perfectly circular even while the SVG stretches across
          several viewport heights. Coordinates still follow the real path. */}
      {reducedMotion ? (
        <span
          className="absolute h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-colus-orange"
          style={{ left: kind === "axis" ? "100%" : "3.89%", top: "99.5%" }}
        />
      ) : (
        <>
          <motion.span
            className="absolute h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-colus-orange/15"
            style={{ left, top, opacity: exitOpacity }}
          />
          <motion.span
            className="absolute h-[9px] w-[9px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/75 bg-colus-orange"
            style={{ left, top, opacity: exitOpacity }}
          />
        </>
      )}
    </div>
  );
}
