import { useRef } from "react";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { finalMessage } from "../data/letter";

export default function FinalSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end end"],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [1.0, 1.08]);

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div
        style={{ scale }}
        className="absolute inset-0"
      >
        <div className="absolute inset-0 bg-dark" />
        <div className="absolute inset-0 bg-gradient-to-b from-dark/40 via-dark/60 to-dark" />
      </motion.div>

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-rose/5 blur-[120px] animate-pulse-glow" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-gold/3 blur-[100px] animate-pulse-glow" style={{ animationDelay: "1s" }} />
      </div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold mb-10 gradient-text leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {finalMessage.heading}
        </motion.h2>

        {finalMessage.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.5 + i * 0.5 }}
            className={`text-lg md:text-xl mb-4 ${
              i === finalMessage.lines.length - 1
                ? "text-2xl md:text-3xl text-rose-light font-semibold"
                : "text-cream/60"
            }`}
            style={{
              fontFamily:
                i === finalMessage.lines.length - 1
                  ? "var(--font-heading)"
                  : "var(--font-body)",
            }}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 1, delay: 2.5 }}
          className="mt-16"
        >
          <div className="section-divider" />
          <p className="text-xs text-cream/30 mt-6 tracking-wider">
            Made with love, just for you ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
