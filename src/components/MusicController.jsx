import { useState, useRef, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Music, VolumeX } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function MusicController() {
  const [playing, setPlaying] = useState(false);
  const [showLabel, setShowLabel] = useState(false);
  const [tryingAutoplay, setTryingAutoplay] = useState(true);
  const audioRef = useRef(null);

  const tryAutoplay = useCallback(() => {
    if (!siteConfig.music.autoplay || !audioRef.current) return;
    if (sessionStorage.getItem("birthday-music") === "paused") return;

    audioRef.current.play().then(() => {
      setPlaying(true);
      setTryingAutoplay(false);
    }).catch(() => {
      // Autoplay blocked - wait for user interaction
    });

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
      <div className="relative">
        <AnimatePresence>
          {showLabel && (
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -10 }}
              className="absolute right-14 top-1/2 -translate-y-1/2 glass rounded-lg px-3 py-1.5 whitespace-nowrap"
            >
              <p className="text-xs text-cream/70">
                {playing ? "Playing our song..." : "Tap to play music"}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          onClick={() => setPlaying((p) => !p)}
          onMouseEnter={() => setShowLabel(true)}
          onMouseLeave={() => setShowLabel(false)}
          className="w-12 h-12 rounded-full glass flex items-center justify-center text-rose hover:text-rose-light transition-colors shadow-lg"
          aria-label={playing ? "Pause music" : "Play music"}
        >
          {playing ? <Music size={18} /> : <VolumeX size={18} />}
        </button>
      </div>

      <audio ref={audioRef} src={siteConfig.music.src} loop preload="auto" />
    </div>
  );
}
