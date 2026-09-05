import { useEffect, useRef, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";

export default function PhotoLightbox({ items, index, onClose, onPrev, onNext }) {
  const [touchStart, setTouchStart] = useState(null);

  const handleKeyDown = useCallback(
    (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    },
    [onClose, onPrev, onNext]
  );

  useEffect(() => {
    document.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [handleKeyDown]);

  const item = items[index];

  const handleTouchStart = (e) => {
    setTouchStart(e.touches[0].clientX);
  };

  const handleTouchEnd = (e) => {
    if (touchStart === null) return;
    const diff = touchStart - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) onNext();
      else onPrev();
    }
    setTouchStart(null);
  };

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-[150] bg-dark/95 backdrop-blur-sm flex items-center justify-center p-4 md:p-8"
        onClick={onClose}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
        role="dialog"
        aria-modal="true"
        aria-label="Photo viewer"
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-cream/60 hover:text-cream transition-colors z-10 p-2"
          aria-label="Close"
        >
          <X size={28} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onPrev(); }}
          className="absolute left-2 md:left-6 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors p-2 z-10"
          aria-label="Previous photo"
        >
          <ChevronLeft size={32} />
        </button>

        <button
          onClick={(e) => { e.stopPropagation(); onNext(); }}
          className="absolute right-2 md:right-6 top-1/2 -translate-y-1/2 text-cream/40 hover:text-cream transition-colors p-2 z-10"
          aria-label="Next photo"
        >
          <ChevronRight size={32} />
        </button>

        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.9 }}
          transition={{ duration: 0.3 }}
          className="max-w-4xl w-full max-h-[85vh] flex flex-col items-center"
          onClick={(e) => e.stopPropagation()}
        >
          <div className="relative w-full flex-1 min-h-0">
            <img
              src={item.image}
              alt={item.caption || item.title}
              className="w-full h-full object-contain rounded-lg max-h-[65vh]"
              onError={(e) => {
                e.target.style.display = "none";
              }}
            />
          </div>
          <div className="text-center mt-4">
            <h3
              className="text-xl font-semibold text-cream mb-1"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              {item.title}
            </h3>
            <p className="text-sm text-cream/50 mb-1">{item.date}</p>
            {item.caption && (
              <p
                className="text-sm text-rose-light/70 italic"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                {item.caption}
              </p>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
