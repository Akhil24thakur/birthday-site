import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { reasons } from "../data/reasons";

function ReasonCard({ reason, index }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: index * 0.1 }}
      className="glass rounded-2xl p-6 md:p-8 text-center group hover:bg-white/[0.07] transition-colors duration-300"
    >
      <div className="text-4xl mb-4">{reason.emoji}</div>
      <h3
        className="text-lg md:text-xl font-semibold text-cream mb-3"
        style={{ fontFamily: "var(--font-heading)" }}
      >
        {reason.title}
      </h3>
      <p className="text-sm text-cream/50 leading-relaxed">
        {reason.text}
      </p>
    </motion.div>
  );
}

export default function ReasonsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full bg-rose/3 blur-[130px]" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-divider mb-10" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Few Reasons You're So Special
          </h2>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 md:gap-6">
          {reasons.map((reason, i) => (
            <ReasonCard key={reason.id} reason={reason} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
