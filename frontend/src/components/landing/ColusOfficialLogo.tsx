const LOGO_SRC =
  "/media/colus/landing/colus-assets-final-v03/00-brand/COLUS-BRAND-LOGO-RASTER-001.jpg";

interface ColusOfficialLogoProps {
  className?: string;
}

export function ColusOfficialLogo({ className = "" }: ColusOfficialLogoProps) {
  return (
    <img
      src={LOGO_SRC}
      alt="COLUS — Colégio Universo dos Sonhos"
      className={className}
      width={512}
      height={512}
      decoding="async"
    />
  );
}
