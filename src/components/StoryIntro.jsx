import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StoryIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section
      id="story"
      ref={ref}
      className="relative py-32 md:py-40 px-6 overflow-hidden"
    >
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-rose/4 blur-[150px]" />

      <div className="relative z-10 max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
        >
          <div className="section-divider mb-10" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-8 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Little Journey Called Us ❤️
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-base md:text-lg text-cream/60 leading-relaxed mb-6"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Some moments are ordinary when they happen...
          <br />
          until they become memories we never want to forget.
        </motion.p>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.5 }}
          className="text-sm text-cream/40 italic"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Here are a few of my favorites...
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-10"
        >
          <div className="section-divider" />
        </motion.div>
      </div>
    </section>
  );
}
