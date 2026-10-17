import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

/**
 * Desktop Master V0.18 — a compact, filled NODE, not a filled PATH.
 * One dominant scroll-driven pointer travels along the host's existing path.
 * Community Ring remains visibly open; Signal and Rise paths remain intact.
 *
 * Parent <g> owns fixed or animated SVG coordinates. This primitive draws
 * at local origin (0,0). No assets, timers, input handlers or RAF loops.
 */
export function DesktopOrbitNode({
  progress,
  tone = "orange",
  size = 14,
}: {
  progress: MotionValue<number>;
  tone?: "orange" | "blue";
  size?: number;
}) {
  const reduceMotion = useReducedMotion();
  const rotate = useTransform(progress, [0, 1], [0, 250]);
  const core = tone === "orange" ? "#F18136" : "#2899EF";

  return (
    <g data-colus-desktop-orbit-node={tone} aria-hidden="true" className="pointer-events-none">
      <circle r={size} fill="#071A2A" fillOpacity=".94" stroke={core} strokeWidth="2.3" />
      <circle r={size - 3.7} fill={core} fillOpacity=".32" />
      <circle r={size * .34} fill={core} stroke="#FFF8EF" strokeWidth="1" />
      <motion.g
        data-colus-desktop-orbit-pointers
        style={reduceMotion ? undefined : { rotate, transformOrigin: "center" }}
      >
        <circle cy={-size} r={Math.max(2.6, size * .22)} fill={core} stroke="#071A2A" strokeWidth="1.1" />
        <circle cx={size} r={Math.max(2.4, size * .17)} fill="#FFF8EF" stroke="#071A2A" strokeWidth="1.1" />
      </motion.g>
    </g>
  );
}
