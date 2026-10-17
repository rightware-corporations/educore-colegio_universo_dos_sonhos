import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef, type ReactNode } from "react";

/**
 * Mobile Scene Window — subtle, native-scroll image motion.
 * Keeps existing photo/video assets untouched. The window is not pinned,
 * snap-scrolled or delayed. Static content is shown for reduced motion.
 */
export function MobileSceneWindow({ children }: { children: ReactNode }) {
  const windowRef = useRef<HTMLDivElement>(null);
  const reducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: windowRef,
    offset: ["start end", "end start"],
  });

  // One quiet media motion; narrative PATH and NODE remain the active accents.
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.028, 1, 1.028]);
  const y = useTransform(scrollYProgress, [0, 1], [6, -6]);

  return (
    <div ref={windowRef} className="absolute inset-0 overflow-hidden">
      <motion.div
        className="absolute inset-0"
        style={reducedMotion ? undefined : { scale, y }}
      >
        {children}
      </motion.div>
    </div>
  );
}
