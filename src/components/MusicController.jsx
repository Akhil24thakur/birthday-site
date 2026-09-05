import { useState, useRef, useEffect } from "react";
import { Music } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

export default function MusicController() {
  const [playing, setPlaying] = useState(false);
  const [showPopup, setShowPopup] = useState(true);
  const audioRef = useRef(null);

  const startMusic = () => {
    setPlaying(true);
    setShowPopup(false);
  };

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
    <>
      <AnimatePresence>
        {showPopup && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-[200] bg-dark/90 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.8, opacity: 0 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-center px-8"
            >
              <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-r from-rose to-pink flex items-center justify-center shadow-xl shadow-rose/40" style={{ animation: "pulse-glow 2s ease-in-out infinite" }}>
                <Music size={36} className="text-white" />
              </div>
              <h3
                className="text-2xl md:text-3xl font-bold mb-3 gradient-text"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                A Song For You
              </h3>
              <p className="text-sm text-cream/50 mb-8">
                Tap to start the music
              </p>
              <button
                onClick={startMusic}
                className="px-16 py-6 rounded-full bg-gradient-to-r from-rose to-pink text-white text-2xl md:text-3xl font-bold shadow-2xl shadow-rose/50 hover:shadow-rose/70 hover:brightness-110 transition-all cursor-pointer border-2 border-white/20"
                style={{ animation: "pulse-glow 2s ease-in-out infinite" }}
              >
                Play Song
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {!showPopup && (
        <div className="fixed bottom-6 left-6 z-[90] md:bottom-8 md:left-8">
          <button
            onClick={() => setPlaying((p) => !p)}
            className="w-12 h-12 rounded-full glass flex items-center justify-center text-rose/80 hover:text-rose transition-colors border border-rose/20"
            aria-label={playing ? "Pause music" : "Play music"}
          >
            <Music size={18} />
          </button>
        </div>
      )}

      <audio ref={audioRef} src={siteConfig.music.src} loop preload="auto" />
    </>
  );
}
