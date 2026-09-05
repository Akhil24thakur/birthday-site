import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause, ChevronDown } from "lucide-react";

const sections = [
  { id: "hero", label: "Birthday Wish" },
  { id: "story", label: "Our Story" },
  { id: "timeline", label: "Memories" },
  { id: "gallery", label: "Photo Gallery" },
  { id: "reasons", label: "Reasons I Love You" },
  { id: "letter", label: "Love Letter" },
  { id: "surprise", label: "Surprise" },
  { id: "final", label: "Final Message" },
];

const SCROLL_INTERVAL = 5000;

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showPrompt, setShowPrompt] = useState(true);

  const scrollToSection = useCallback((index) => {
    if (index >= sections.length) {
      setActive(false);
      return;
    }
    const el = document.getElementById(sections[index].id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      setCurrentIndex(index);
    }
  }, []);

  useEffect(() => {
    if (!active) return;

    const timer = setTimeout(() => {
      const next = currentIndex + 1;
      if (next < sections.length) {
        scrollToSection(next);
      } else {
        setActive(false);
      }
    }, SCROLL_INTERVAL);

    return () => clearTimeout(timer);
  }, [active, currentIndex, scrollToSection]);

  const toggleAutoScroll = () => {
    if (active) {
      setActive(false);
    } else {
      setCurrentIndex(0);
      setActive(true);
      scrollToSection(0);
    }
  };

  const handleDismiss = () => {
    setShowPrompt(false);
    sessionStorage.setItem("auto-scroll-dismissed", "true");
  };

  useEffect(() => {
    if (sessionStorage.getItem("auto-scroll-dismissed")) {
      setShowPrompt(false);
    }
  }, []);

  return (
    <>
      {/* Floating auto-scroll button */}
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[85] flex flex-col items-center gap-2">
        <AnimatePresence>
          {showPrompt && !active && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              className="glass rounded-xl px-4 py-2 flex items-center gap-2"
            >
              <p className="text-xs text-cream/70">Let me show you our story</p>
              <button
                onClick={handleDismiss}
                className="text-[10px] text-cream/40 hover:text-cream/70 ml-1"
              >
                ✕
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="flex items-center gap-3">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={toggleAutoScroll}
            className={`w-12 h-12 rounded-full flex items-center justify-center shadow-lg transition-colors ${
              active
                ? "bg-rose text-white"
                : "glass text-rose hover:text-rose-light"
            }`}
            aria-label={active ? "Stop auto-scroll" : "Auto-scroll through story"}
          >
            {active ? <Pause size={18} /> : <Play size={18} />}
          </motion.button>

          {active && (
            <motion.div
              initial={{ opacity: 0, width: 0 }}
              animate={{ opacity: 1, width: "auto" }}
              className="glass rounded-full px-3 py-1.5 overflow-hidden"
            >
              <p className="text-[10px] text-cream/50 whitespace-nowrap">
                {currentIndex + 1} / {sections.length}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* Section dots indicator (visible during auto-scroll) */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            className="fixed left-6 top-1/2 -translate-y-1/2 z-[85] hidden md:flex flex-col gap-2"
          >
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => {
                  setCurrentIndex(i);
                  scrollToSection(i);
                }}
                className="group flex items-center gap-2"
                aria-label={`Go to ${s.label}`}
              >
                <div
                  className={`w-2 h-2 rounded-full transition-all ${
                    i === currentIndex
                      ? "bg-rose scale-125"
                      : i < currentIndex
                      ? "bg-rose/40"
                      : "bg-cream/20"
                  }`}
                />
                <span
                  className={`text-[10px] transition-opacity ${
                    i === currentIndex
                      ? "text-cream/70 opacity-100"
                      : "text-cream/40 opacity-0 group-hover:opacity-100"
                  }`}
                >
                  {s.label}
                </span>
              </button>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
