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
    <section id="letter" className="relative py-20 md:py-28 pb-48 md:pb-64 px-6">
      <div className="absolute inset-0">
        <img
          src="/birthday-site/photos/akhil-bg.png"
          alt=""
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-dark/92" />
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

        <div className="flex justify-center">
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="letter-paper px-8 md:px-12 py-6 md:py-8 flex-1"
            style={{ paddingLeft: "4px", paddingRight: "2px" }}
          >
            <div className="text-sm text-rose leading-loose whitespace-pre-line">
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
        </div>
      </div>
    </section>
  );
}
