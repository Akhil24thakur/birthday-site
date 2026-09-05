import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayLetter } from "../data/letter";
import { siteConfig } from "../data/siteConfig";

export default function LoveLetter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [displayText, setDisplayText] = useState("");
  const [typingDone, setTypingDone] = useState(false);

  useEffect(() => {
    if (!inView || !siteConfig.typewriter.enabled) {
      if (inView) {
        setDisplayText(birthdayLetter);
        setTypingDone(true);
      }
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      i++;
      setDisplayText(birthdayLetter.slice(0, i));
      if (i >= birthdayLetter.length) {
        clearInterval(interval);
        setTypingDone(true);
      }
    }, siteConfig.typewriter.speed);

    return () => clearInterval(interval);
  }, [inView]);

  const textToShow = siteConfig.typewriter.enabled ? displayText : birthdayLetter;

  return (
    <section id="letter" className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid to-dark" />

      <div className="relative z-10 max-w-2xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-12"
        >
          <div className="section-divider mb-10" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Letter For You ❤️
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="letter-paper p-8 md:p-12"
        >
          <div className="flex items-center gap-3 mb-8">
            <span className="text-2xl">💌</span>
            <p
              className="text-sm text-rose-light/60 italic"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              For you, with all my heart
            </p>
          </div>

          <div
            className="text-sm md:text-base text-cream/70 leading-loose whitespace-pre-line"
            style={{ fontFamily: "var(--font-body)" }}
          >
            {textToShow}
            {siteConfig.typewriter.enabled && !typingDone && inView && (
              <span className="typewriter-cursor" />
            )}
          </div>

          <div className="mt-10 text-right">
            <p
              className="text-lg text-rose-light/80 italic"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              With all my love ❤️
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
