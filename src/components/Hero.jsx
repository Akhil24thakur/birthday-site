import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { siteConfig } from "../data/siteConfig";

export default function Hero() {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const opacity = useTransform(scrollY, [0, 400], [1, 0]);

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <motion.div style={{ y, opacity }} className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid to-dark" />
        <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] rounded-full bg-rose/[0.07] blur-[120px]" />
        <div className="absolute bottom-1/3 right-1/3 w-[400px] h-[400px] rounded-full bg-purple/[0.08] blur-[100px]" />
      </motion.div>

      <div className="relative z-10 text-center px-6 max-w-2xl mx-auto">
        <motion.span
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.1 }}
          className="text-4xl md:text-5xl block mb-6"
        >
          🎂
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="text-4xl md:text-5xl lg:text-6xl font-bold mb-8 gradient-text leading-tight"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Happy Birthday,<br />My Love ❤️
        </motion.h1>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.0 }}
          className="text-sm text-rose-light/50 italic mb-4"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          And I'm so lucky that our paths crossed.
        </motion.p>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 1.2 }}
          className="text-xl md:text-2xl text-gold-light font-semibold"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          {siteConfig.girlfriendName}
        </motion.p>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5"
      >
        <p className="text-[10px] text-cream/30 tracking-[0.2em] uppercase">Scroll</p>
        <ChevronDown size={16} className="text-cream/30 animate-scroll-arrow" />
      </motion.div>
    </section>
  );
}
