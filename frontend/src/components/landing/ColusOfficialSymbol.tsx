/**
 * Shows ONLY the symbol area of the official COLUS logo raster.
 *
 * Source stays the official asset (COLUS-BRAND-LOGO-RASTER-001.jpg, 842x842).
 * Nothing is redrawn or re-encoded: the existing JPG is displayed through a
 * CSS crop window that excludes the "COLUS" wordmark and the school name.
 *
 * Crop window (source pixels), measured from the asset:
 * - symbol spans x 192-613, y 71-548; the wordmark starts at y 551
 * - the bottom edge is held at y 546 so JPEG ringing from the wordmark's top
 *   edge (same 8x8 block row as the book's lowest pixels) stays out of view
 *
 * The JPG has an opaque white background. To avoid a white rectangle on the
 * warm-paper surface, the PARENT must apply `mix-blend-multiply` and sit in a
 * stacking context that contains the section background (see ContactFooter).
 */
const LOGO_SRC =
  "/media/colus/landing/colus-assets-final-v03/00-brand/COLUS-BRAND-LOGO-RASTER-001.jpg";

const SOURCE_SIZE = 842;
const CROP = { x: 186, y: 64, width: 434, height: 482 } as const;

interface ColusOfficialSymbolProps {
  /** Set the rendered height here (e.g. "h-24 md:h-28"); width follows the crop ratio. */
  className?: string;
}

export function ColusOfficialSymbol({ className = "" }: ColusOfficialSymbolProps) {
  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: `${CROP.width} / ${CROP.height}` }}
    >
      <img
        src={LOGO_SRC}
        alt="Símbolo COLUS — Colégio Universo dos Sonhos"
        width={SOURCE_SIZE}
        height={SOURCE_SIZE}
        decoding="async"
        loading="lazy"
        draggable={false}
        className="pointer-events-none absolute max-w-none select-none"
        style={{
          width: `${(SOURCE_SIZE / CROP.width) * 100}%`,
          left: `${(-CROP.x / CROP.width) * 100}%`,
          top: `${(-CROP.y / CROP.height) * 100}%`,
        }}
      />
    </div>
  );
}
