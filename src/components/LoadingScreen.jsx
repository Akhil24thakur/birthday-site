import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1800);
    const t2 = setTimeout(() => setStage(2), 3600);
    const t3 = setTimeout(() => onComplete(), 4400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
      clearTimeout(t3);
    };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-glow"
            style={{
              width: `${2 + Math.random() * 4}px`,
              height: `${2 + Math.random() * 4}px`,
              background: "var(--color-rose)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              opacity: 0.3,
            }}
          />
        ))}
      </div>

      <div className="text-center px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 0 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <motion.p
            className="text-lg md:text-xl text-cream/70 font-light tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            I made something for you...
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={stage >= 1 ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="mt-4"
        >
          <p
            className="text-lg md:text-xl text-rose-light tracking-wide"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Because today is special ❤️
          </p>
        </motion.div>

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
            className="mt-8"
          >
            <div className="w-8 h-8 mx-auto border-2 border-rose/40 border-t-rose rounded-full animate-spin" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
