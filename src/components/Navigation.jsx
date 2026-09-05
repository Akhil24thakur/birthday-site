import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, BookOpen, Camera, Mail, Sparkles } from "lucide-react";

const navItems = [
  { id: "hero", label: "Home", icon: Heart },
  { id: "story", label: "Our Story", icon: BookOpen },
  { id: "gallery", label: "Memories", icon: Camera },
  { id: "letter", label: "Letter", icon: Mail },
  { id: "surprise", label: "Surprise", icon: Sparkles },
];

export default function Navigation() {
  const [visible, setVisible] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setVisible(window.scrollY > window.innerHeight * 0.8);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollTo = (id) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      setOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-6 right-6 z-[90] md:bottom-8 md:right-8"
        >
          <div className="relative">
            <AnimatePresence>
              {open && (
                <motion.div
                  initial={{ opacity: 0, scale: 0.8, y: 10 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.8, y: 10 }}
                  className="absolute bottom-16 right-0 mb-2 glass rounded-xl p-2 min-w-[160px]"
                >
                  {navItems.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className="flex items-center gap-2.5 w-full px-3 py-2.5 text-sm text-cream/80 hover:text-cream hover:bg-white/5 rounded-lg transition-colors text-left"
                    >
                      <item.icon size={16} />
                      {item.label}
                    </button>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>

            <button
              onClick={() => setOpen((o) => !o)}
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-rose hover:text-rose-light transition-colors shadow-lg"
              aria-label="Navigation menu"
            >
              <motion.div
                animate={{ rotate: open ? 45 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <Heart size={20} fill={open ? "currentColor" : "none"} />
              </motion.div>
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
