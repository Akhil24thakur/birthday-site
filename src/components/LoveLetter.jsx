import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import { birthdayLetter } from "../data/letter";
import { siteConfig } from "../data/siteConfig";

export default function LoveLetter() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
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
    <section id="letter" className="relative py-20 md:py-28 px-6">
      <div className="absolute inset-0">
        <img
          src="/photos/akhil-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/80" />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-8"
        >
          <div className="section-divider mb-6" />
          <h2
            className="text-2xl md:text-4xl font-bold mb-3 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            A Letter For You
          </h2>
          <p
            className="text-sm text-rose-light/40 italic"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            For you, with all my heart
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="letter-paper p-6 md:p-8 flex-1"
          >
            <div className="text-sm text-cream/55 leading-loose whitespace-pre-line">
              {textToShow}
              {siteConfig.typewriter.enabled && !typingDone && inView && (
                <span className="typewriter-cursor" />
              )}
            </div>

            <div className="mt-6 text-center">
              <p
                className="text-sm text-rose-light/50 italic"
                style={{ fontFamily: "var(--font-handwriting)" }}
              >
                With all my love ❤️
              </p>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.4 }}
            className="hidden md:block w-72 lg:w-80 flex-shrink-0"
          >
            <div className="photo-card" style={{ transform: "rotate(2deg)" }}>
              <div className="aspect-[3/4] overflow-hidden rounded-sm">
                <img
                  src="/photos/letter.jpg"
                  alt="Us"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                <div className="absolute inset-0 bg-dark-mid/40 flex items-center justify-center text-cream/30 text-xs hidden">
                  📷
                </div>
              </div>
            </div>
            <p
              className="text-center text-xs text-cream/30 mt-2 italic"
              style={{ fontFamily: "var(--font-handwriting)" }}
            >
              Always together ❤️
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
