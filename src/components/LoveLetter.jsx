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
    <section id="letter" className="relative py-24 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid to-dark" />

      <div className="relative z-10 max-w-xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-10"
        >
          <div className="section-divider mb-8" />
          <h2
            className="text-2xl md:text-4xl font-bold mb-4 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Letter For You
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 15 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, delay: 0.2 }}
          className="letter-paper p-6 md:p-10"
        >
          <p
            className="text-xs text-rose-light/50 italic mb-6"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            For you, with all my heart
          </p>

          <div
            className="text-sm text-cream/60 leading-loose whitespace-pre-line"
          >
            {textToShow}
            {siteConfig.typewriter.enabled && !typingDone && inView && (
              <span className="typewriter-cursor" />
            )}
          </div>

          <div className="mt-8 text-right">
            <p
              className="text-base text-rose-light/60 italic"
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
