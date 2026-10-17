import { useMotionValue, useMotionValueEvent, type MotionValue } from "framer-motion";

/**
 * Keep opacity interpolation in JavaScript instead of Framer Motion's
 * accelerated WAAPI scroll timeline. Chromium can advance the source
 * scrollYProgress without advancing an opacity effect exported as
 * an accelerated native animation (reproduced at 1440/1024px in CI).
 *
 * Uses one MotionValue subscription, no timers, RAF loop or React rerenders.
 * Geometry, assets and existing scroll semantics are unaffected.
 */
function opacityAt(progress: number, stops: readonly number[], values: readonly number[]) {
  if (progress <= stops[0]) return values[0];
  for (let i = 1; i < stops.length; i++) {
    if (progress <= stops[i]) {
      const interval = stops[i] - stops[i - 1];
      const t = interval ? (progress - stops[i - 1]) / interval : 1;
      return values[i - 1] + (values[i] - values[i - 1]) * t;
    }
  }
  return values[values.length - 1];
}

export function useScrollOpacity(
  scroll: MotionValue<number>,
  stops: readonly number[],
  values: readonly number[],
) {
  const output = useMotionValue(values[0]);
  useMotionValueEvent(scroll, "change", progress => {
    const next = opacityAt(progress, stops, values);
    if (Math.abs(output.get() - next) > 0.0001) output.set(next);
  });
  return output;
}
