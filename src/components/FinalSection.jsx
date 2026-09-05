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
      id="final"
      ref={ref}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      <motion.div style={{ scale }} className="absolute inset-0">
        <div className="absolute inset-0 bg-dark" />
      </motion.div>

      <div className="absolute inset-0">
        <div className="absolute top-1/3 left-1/3 w-[400px] h-[400px] rounded-full bg-rose/[0.04] blur-[100px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[350px] h-[350px] rounded-full bg-gold/[0.03] blur-[80px]" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-3xl md:text-5xl font-bold mb-8 gradient-text leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {finalMessage.heading}
        </motion.h2>

        {finalMessage.lines.map((line, i) => (
          <motion.p
            key={i}
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.4 + i * 0.4 }}
            className={`mb-3 ${
              i === finalMessage.lines.length - 1
                ? "text-xl md:text-2xl text-rose-light font-semibold"
                : "text-sm md:text-base text-cream/50"
            }`}
            style={{
              fontFamily: i === finalMessage.lines.length - 1 ? "var(--font-heading)" : "var(--font-body)",
            }}
          >
            {line}
          </motion.p>
        ))}

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 2 }}
          className="mt-12"
        >
          <div className="section-divider" />
          <p className="text-[10px] text-cream/25 mt-4 tracking-wider">
            Made with love, just for you ❤️
          </p>
        </motion.div>
      </div>
    </section>
  );
}
