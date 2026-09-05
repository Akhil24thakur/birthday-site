import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Play, Pause } from "lucide-react";

const sections = [
  { id: "hero", label: "Birthday Wish" },
  { id: "story", label: "Our Story" },
  { id: "timeline", label: "Memories" },
  { id: "gallery", label: "Gallery" },
  { id: "reasons", label: "Reasons" },
  { id: "letter", label: "Letter" },
  { id: "surprise", label: "Surprise" },
  { id: "final", label: "Final" },
];

export default function AutoScroll() {
  const [active, setActive] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const scrollToSection = useCallback((index) => {
    if (index >= sections.length) { setActive(false); return; }
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
      if (next < sections.length) scrollToSection(next);
      else setActive(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [active, currentIndex, scrollToSection]);

  const toggle = () => {
    if (active) { setActive(false); return; }
    setCurrentIndex(0);
    setActive(true);
    scrollToSection(0);
  };

  return (
    <>
      <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[85]">
        <motion.button
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={toggle}
          className={`h-10 px-4 rounded-full flex items-center gap-2 text-xs font-medium transition-all shadow-lg ${
            active
              ? "bg-rose text-white"
              : "glass text-cream/70 hover:text-cream"
          }`}
          aria-label={active ? "Stop auto-scroll" : "Auto-play story"}
        >
          {active ? <Pause size={14} /> : <Play size={14} />}
          {active ? `${currentIndex + 1}/${sections.length}` : "Auto-play"}
        </motion.button>
      </div>

      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed left-5 top-1/2 -translate-y-1/2 z-[85] hidden md:flex flex-col gap-1.5"
          >
            {sections.map((s, i) => (
              <button
                key={s.id}
                onClick={() => { setCurrentIndex(i); scrollToSection(i); }}
                className="group flex items-center gap-2"
                aria-label={s.label}
              >
                <div className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === currentIndex ? "bg-rose scale-125" : i < currentIndex ? "bg-rose/30" : "bg-cream/15"
                }`} />
                <span className={`text-[9px] tracking-wider uppercase transition-opacity ${
                  i === currentIndex ? "text-cream/60 opacity-100" : "text-cream/30 opacity-0 group-hover:opacity-100"
                }`}>
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
