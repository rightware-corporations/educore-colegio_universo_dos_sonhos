import { useEffect, useRef, useState } from "react";

type LandingMediaProps =
  | {
      kind: "image";
      src: string;
      alt: string;
      className?: string;
    }
  | {
      kind: "video";
      src: string;
      poster?: string;
      alt: string;
      className?: string;
    };

export function LandingMedia(props: LandingMediaProps) {
  const [failed, setFailed] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    if (props.kind !== "video" || failed || !videoRef.current) return;

    const video = videoRef.current;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && entry.intersectionRatio > 0.2) {
          void video.play().catch(() => undefined);
        } else {
          video.pause();
        }
      },
      { threshold: [0, 0.2, 0.6] },
    );

    observer.observe(video);

    return () => {
      observer.disconnect();
      video.pause();
    };
  }, [failed, props.kind]);

  if (failed) {
    return (
      <div
        className={`relative h-full w-full overflow-hidden bg-[radial-gradient(circle_at_70%_25%,rgba(40,153,239,.35),transparent_32%),radial-gradient(circle_at_32%_72%,rgba(241,129,54,.3),transparent_28%),linear-gradient(145deg,#0B2436,#071A2A)] ${props.className ?? ""}`}
        aria-hidden="true"
      >
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,.04)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,.04)_1px,transparent_1px)] [background-size:48px_48px]" />
      </div>
    );
  }

  if (props.kind === "video") {
    return (
      <video
        ref={videoRef}
        className={`h-full w-full object-cover ${props.className ?? ""}`}
        src={props.src}
        poster={props.poster}
        muted
        playsInline
        loop
        preload="metadata"
        aria-label={props.alt}
        onError={() => setFailed(true)}
      />
    );
  }

  return (
    <img
      className={`h-full w-full object-cover ${props.className ?? ""}`}
      src={props.src}
      alt={props.alt}
      loading="lazy"
      onError={() => setFailed(true)}
    />
  );
}
