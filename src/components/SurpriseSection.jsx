import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { siteConfig } from "../data/siteConfig";

export default function SurpriseSection() {
  const [opened, setOpened] = useState(false);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  const fireConfetti = () => {
    if (!siteConfig.effects.confetti) return;

    const duration = 4000;
    const end = Date.now() + duration;

    const colors = ["#c77dba", "#e8b4d8", "#d4849f", "#d4a76a", "#fdf2f0"];

    const frame = () => {
      confetti({
        particleCount: 2,
        angle: 60,
        spread: 55,
        origin: { x: 0, y: 0.7 },
        colors,
        shapes: ["heart", "circle"],
        scalar: 1.2,
      });
      confetti({
        particleCount: 2,
        angle: 120,
        spread: 55,
        origin: { x: 1, y: 0.7 },
        colors,
        shapes: ["heart", "circle"],
        scalar: 1.2,
      });

      if (Date.now() < end) {
        requestAnimationFrame(frame);
      }
    };

    frame();

    confetti({
      particleCount: 80,
      spread: 100,
      origin: { y: 0.6 },
      colors,
      shapes: ["heart", "circle"],
      scalar: 1.5,
    });
  };

  const handleOpen = () => {
    setOpened(true);
    setTimeout(fireConfetti, 300);
  };

  return (
    <section id="surprise" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-lg mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-8" />
          <h2
            className="text-2xl md:text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            One More Surprise?
          </h2>
          <p className="text-sm text-cream/40 mb-8">
            I have something special saved just for you...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="button"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              onClick={handleOpen}
              className="px-6 py-3 rounded-full bg-gradient-to-r from-rose to-pink text-white text-sm font-medium shadow-lg shadow-rose/20"
            >
              Open Your Surprise ❤️
            </motion.button>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.6, type: "spring" }}
              className="glass rounded-2xl p-8 max-w-md mx-auto"
            >
              <h3
                className="text-xl md:text-2xl font-bold text-cream mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Happy Birthday, {siteConfig.girlfriendName} ❤️
              </h3>
              <p className="text-sm text-cream/50 leading-relaxed mb-4">
                I hope this year brings you everything you've been wishing for.
              </p>
              <p className="text-sm text-cream/50 leading-relaxed mb-6">
                And I hope I get to be there for many more birthdays with you.
              </p>
              <p
                className="text-base text-rose-light/70 italic"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                You deserve the world. ❤️
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
