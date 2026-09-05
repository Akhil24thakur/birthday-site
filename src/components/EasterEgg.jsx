import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function EasterEgg() {
  const [clicks, setClicks] = useState(0);
  const [revealed, setRevealed] = useState(false);

  const handleClick = () => {
    const next = clicks + 1;
    setClicks(next);
    if (next >= 5) {
      setRevealed(true);
      setTimeout(() => { setRevealed(false); setClicks(0); }, 4000);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-4 left-4 z-[90] opacity-10 hover:opacity-25 transition-opacity"
        aria-label="Secret"
      >
        <span className="text-xs">❤️</span>
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="fixed top-12 left-4 z-[90] glass rounded-lg px-4 py-3 max-w-[180px]"
          >
            <p className="text-xs text-cream/70 italic" style={{ fontFamily: "var(--font-handwriting)" }}>
              You found my secret ❤️
            </p>
            <p className="text-[10px] text-cream/40 mt-1">
              You're the best thing that ever happened to me.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
