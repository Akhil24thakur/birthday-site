import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reasons } from "../data/reasons";

function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="glass rounded-xl p-6 text-center"
    >
      <div className="text-2xl mb-3">{reason.emoji}</div>
      <h3
        className="text-sm font-semibold text-cream mb-2"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {reason.title}
      </h3>
      <p className="text-xs text-cream/40 leading-relaxed">{reason.text}</p>
    </motion.div>
  );
}

export default function ReasonsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="reasons" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <div className="section-divider mb-8" />
          <h2
            className="text-2xl md:text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Few Reasons You're Special
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
