import { useState, useRef, useEffect, useCallback } from "react";
import { Music, VolumeX } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function MusicController() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  const tryAutoplay = useCallback(() => {
    if (!siteConfig.music.autoplay || !audioRef.current) return;
    if (sessionStorage.getItem("birthday-music") === "paused") return;
    audioRef.current.play().then(() => setPlaying(true)).catch(() => {});
    window.removeEventListener("click", tryAutoplay);
    window.removeEventListener("touchstart", tryAutoplay);
  }, []);

  useEffect(() => {
    if (!siteConfig.music.enabled || !siteConfig.music.autoplay) return;
    window.addEventListener("click", tryAutoplay, { once: true });
    window.addEventListener("touchstart", tryAutoplay, { once: true });
    return () => {
      window.removeEventListener("click", tryAutoplay);
      window.removeEventListener("touchstart", tryAutoplay);
    };
  }, [tryAutoplay]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
      sessionStorage.setItem("birthday-music", "playing");
    } else {
      audioRef.current.pause();
      sessionStorage.setItem("birthday-music", "paused");
    }
  }, [playing]);

  if (!siteConfig.music.enabled) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] md:bottom-8 md:left-8">
      <button
        onClick={() => setPlaying((p) => !p)}
        className="w-10 h-10 rounded-full glass flex items-center justify-center text-rose/70 hover:text-rose transition-colors"
        aria-label={playing ? "Pause music" : "Play music"}
      >
        {playing ? <Music size={15} /> : <VolumeX size={15} />}
      </button>
      <audio ref={audioRef} src={siteConfig.music.src} loop preload="auto" />
    </div>
  );
}
