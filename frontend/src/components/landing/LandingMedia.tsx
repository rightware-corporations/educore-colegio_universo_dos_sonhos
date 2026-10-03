import { useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";

interface SharedMediaProps {
  alt: string;
  className?: string;
  priority?: boolean;
  active?: boolean;
}

type LandingMediaProps =
  | (SharedMediaProps & {
      kind: "image";
      src: string;
    })
  | (SharedMediaProps & {
      kind: "video";
      src: string;
      poster?: string;
    });

export function LandingMedia(props: LandingMediaProps) {
  const [failed, setFailed] = useState(false);
  const [saveData, setSaveData] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const reduceMotion = useReducedMotion();

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean };
      }
    ).connection;

    setSaveData(Boolean(connection?.saveData));
  }, []);

  useEffect(() => {
    if (
      props.kind !== "video" ||
      failed ||
      reduceMotion ||
      saveData ||
      props.active === false ||
      !videoRef.current
    ) {
      return;
    }

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
  }, [failed, props.active, props.kind, reduceMotion, saveData]);

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
    if ((reduceMotion || saveData) && props.poster) {
      return (
        <img
          className={`h-full w-full object-cover ${props.className ?? ""}`}
          src={props.poster}
          alt={props.alt}
          loading={props.priority ? "eager" : "lazy"}
          decoding="async"
          onError={() => setFailed(true)}
        />
      );
    }

    return (
      <video
        ref={videoRef}
        className={`h-full w-full object-cover ${props.className ?? ""}`}
        src={props.src}
        poster={props.poster}
        muted
        playsInline
        loop
        preload={props.priority ? "metadata" : "none"}
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
      loading={props.priority ? "eager" : "lazy"}
      decoding="async"
      onError={() => setFailed(true)}
    />
  );
}
