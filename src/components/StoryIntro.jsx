import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export default function StoryIntro() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="story" ref={ref} className="relative py-28 md:py-36 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <div className="section-divider mb-8" />
          <h2
            className="text-2xl md:text-4xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Little Journey Called Us
          </h2>
        </motion.div>

       <motion.p
  initial={{ opacity: 0, y: 15 }}
  animate={inView ? { opacity: 1, y: 0 } : {}}
  transition={{ duration: 0.7, delay: 0.2 }}
  className="mb-[15px] text-sm md:text-base text-cream/45 leading-relaxed"
>
          Some moments are ordinary when they happen...
          <br />
          until they become memories we never want to forget.
        </motion.p>
      </div>
    </section>
  );
}
