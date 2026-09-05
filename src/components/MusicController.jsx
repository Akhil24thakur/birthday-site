import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function MusicController() {
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    if (!audioRef.current) return;
    if (playing) {
      audioRef.current.play().catch(() => setPlaying(false));
    } else {
      audioRef.current.pause();
    }
  }, [playing]);

  if (!siteConfig.music.enabled) return null;

  return (
    <div className="fixed bottom-6 left-6 z-[90] md:bottom-8 md:left-8">
      <button
        onClick={() => setPlaying(true)}
        className="w-12 h-12 rounded-full glass flex items-center justify-center text-rose/80 hover:text-rose transition-colors border border-rose/20"
        aria-label="Play music"
      >
        <Music size={18} />
      </button>
      <audio ref={audioRef} src={siteConfig.music.src} loop preload="auto" />
    </div>
  );
}
