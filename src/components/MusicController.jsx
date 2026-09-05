import { useRef, useEffect } from "react";
import { siteConfig } from "../data/siteConfig";

export default function MusicController() {
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    audioRef.current.play().catch(() => {});
  }, []);

  if (!siteConfig.music.enabled) return null;

  return (
    <audio
      ref={audioRef}
      src={siteConfig.music.src}
      loop
      preload="auto"
      autoPlay
      style={{ display: "none" }}
    />
  );
}
