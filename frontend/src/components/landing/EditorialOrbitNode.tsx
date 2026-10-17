import { motion, useReducedMotion, useTransform, type MotionValue } from "framer-motion";

/**
 * Filled editorial ring and two orbiting pointers, driven by its section's
 * native scroll progress. Unlike the former outlined ellipses, the centre
 * is deliberately solid and legible on photographs and on light paper.
 *
 * No interval, perpetual loop, extra image asset, or pointer interception.
 */
export function EditorialOrbitNode({
  progress,
  size = "photo",
}: {
  progress: MotionValue<number>;
  size?: "photo" | "compact";
}) {
  const reduceMotion = useReducedMotion();
  const rotation = useTransform(progress, [0, 1], [0, 255]);
  const compact = size === "compact";

  return (
    <span
      aria-hidden="true"
      data-colus-orbit-node={size}
      className={
        "pointer-events-none relative isolate block shrink-0 rounded-full border-[3px] border-colus-orange/85 " +
        "bg-colus-deep-blue shadow-[0_5px_20px_rgba(7,26,42,.3),inset_0_0_0_2px_rgba(255,248,239,.18)] " +
        (compact ? "h-8 w-8" : "h-[72px] w-[72px]")
      }
    >
      <span
        className="absolute inset-[8%] rounded-full bg-[radial-gradient(circle_at_38%_35%,rgba(241,129,54,.48),rgba(12,88,152,.92)_58%,rgba(7,26,42,.98)_100%)]"
      />
      <span className="absolute inset-[26%] rounded-full border border-white/45 bg-colus-orange/35" />
      <span className={"absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full bg-colus-orange " + (compact ? "h-2 w-2" : "h-3 w-3")} />
      <motion.span
        data-colus-orbit-pointer
        className="absolute inset-0 rounded-full"
        style={reduceMotion ? undefined : { rotate: rotation }}
      >
        <span
          className={
            "absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 rounded-full border border-colus-deep-blue bg-colus-orange " +
            (compact ? "h-1.5 w-1.5" : "h-2.5 w-2.5")
          }
        />
        <span
          className={
            "absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 rounded-full border border-colus-deep-blue bg-white " +
            (compact ? "h-1.5 w-1.5" : "h-2 w-2")
          }
        />
      </motion.span>
    </span>
  );
}
