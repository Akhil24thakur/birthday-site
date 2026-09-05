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
      setTimeout(() => {
        setRevealed(false);
        setClicks(0);
      }, 5000);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className="fixed top-4 left-4 z-[90] w-8 h-8 flex items-center justify-center opacity-20 hover:opacity-40 transition-opacity"
        aria-label="Secret heart"
      >
        <span className="text-sm">❤️</span>
      </button>

      <AnimatePresence>
        {revealed && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed top-16 left-4 z-[90] glass rounded-xl p-4 max-w-[200px]"
          >
            <p
              className="text-sm text-cream/80 italic"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              You found my secret ❤️
            </p>
            <p className="text-xs text-cream/50 mt-2">
              You're the best thing that ever happened to me.
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
