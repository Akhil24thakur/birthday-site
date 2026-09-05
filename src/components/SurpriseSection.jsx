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
    <section id="surprise" className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider mb-10" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Ready for One More Surprise?
          </h2>
          <p className="text-cream/50 mb-10">
            I have something special saved just for you...
          </p>
        </motion.div>

        <AnimatePresence mode="wait">
          {!opened ? (
            <motion.button
              key="button"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={handleOpen}
              className="px-8 py-4 rounded-full bg-gradient-to-r from-rose to-pink text-white font-medium text-lg shadow-lg shadow-rose/20 hover:shadow-rose/40 transition-shadow"
              style={{ fontFamily: "var(--font-heading)" }}
            >
              Open Your Surprise ❤️
            </motion.button>
          ) : (
            <motion.div
              key="card"
              initial={{ opacity: 0, scale: 0.8, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ duration: 0.8, type: "spring" }}
              className="glass rounded-3xl p-8 md:p-12 max-w-lg mx-auto"
            >
              <div className="text-5xl mb-6">🎁</div>
              <h3
                className="text-2xl md:text-3xl font-bold text-cream mb-4"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                Happy Birthday, {siteConfig.girlfriendName} ❤️
              </h3>
              <p className="text-cream/60 leading-relaxed mb-6">
                I hope this year brings you everything you've been wishing for.
              </p>
              <p className="text-cream/60 leading-relaxed mb-6">
                And I hope I get to be there for many more birthdays with you.
              </p>
              <p
                className="text-xl text-rose-light italic"
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
