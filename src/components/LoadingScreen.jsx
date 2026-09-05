import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function LoadingScreen({ onComplete }) {
  const [stage, setStage] = useState(0);

  useEffect(() => {
    const t1 = setTimeout(() => setStage(1), 1600);
    const t2 = setTimeout(() => setStage(2), 3200);
    const t3 = setTimeout(() => onComplete(), 3800);
    return () => { clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); };
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center bg-dark"
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
    >
      <div className="text-center px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={stage >= 0 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-base md:text-lg text-cream/50 font-light tracking-wide"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          I made something for you...
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={stage >= 1 ? { opacity: 1 } : {}}
          transition={{ duration: 0.6 }}
          className="text-base md:text-lg text-rose-light/70 tracking-wide mt-3"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Because today is special ❤️
        </motion.p>

        {stage >= 2 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="mt-6"
          >
            <div className="w-5 h-5 mx-auto border border-rose/30 border-t-rose rounded-full animate-spin" />
          </motion.div>
        )}
      </div>
    </motion.div>
  );
}
