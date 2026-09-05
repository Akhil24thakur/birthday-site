import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, Camera, Mail, Sparkles } from "lucide-react";

const navItems = [
  { id: "hero", icon: Heart, label: "Home" },
  { id: "story", icon: BookOpen, label: "Story" },
  { id: "gallery", icon: Camera, label: "Gallery" },
  { id: "letter", icon: Mail, label: "Letter" },
  { id: "surprise", icon: Sparkles, label: "Surprise" },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.8);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (id) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          className="fixed bottom-6 right-6 z-[90] md:bottom-8 md:right-8"
        >
          <div className="relative">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9, y: 8 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.9, y: 8 }}
                  className="absolute bottom-14 right-0 mb-2 glass rounded-xl p-1.5 min-w-[140px]"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-2 w-full px-3 py-2 text-xs text-cream/60 hover:text-cream hover:bg-white/5 rounded-lg transition-colors"
                    >
                      <item.icon size={13} />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen((o) => !o)}
              className="w-10 h-10 rounded-full glass flex items-center justify-center text-rose/70 hover:text-rose transition-colors"
              aria-label="Menu"
            >
              <Heart size={16} fill={open ? "currentColor" : "none"} />
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
