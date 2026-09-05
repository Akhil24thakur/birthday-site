import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { siteConfig } from "../data/siteConfig";

export default function BirthdayCountdown() {
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calc = () => {
      const birthday = new Date(siteConfig.birthdayDate + "T00:00:00");
      const now = new Date();
      const diff = birthday - now;

      if (diff <= 0) {
        window.location.reload();
        return;
      }

      setTimeLeft({
        days: Math.floor(diff / (1000 * 60 * 60 * 24)),
        hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
        minutes: Math.floor((diff / (1000 * 60)) % 60),
        seconds: Math.floor((diff / 1000) % 60),
      });
    };

    calc();
    const interval = setInterval(calc, 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n) => String(n).padStart(2, "0");

  return (
    <div className="min-h-screen flex items-center justify-center bg-dark px-6">
      <div className="absolute inset-0">
        {[...Array(25)].map((_, i) => (
          <div
            key={i}
            className="absolute rounded-full animate-pulse-glow"
            style={{
              width: `${1 + Math.random() * 3}px`,
              height: `${1 + Math.random() * 3}px`,
              background: "var(--color-rose)",
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center">
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-lg text-cream/60 mb-8 italic"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Something special is almost here...
        </motion.p>

        <motion.h1
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-4xl md:text-6xl font-bold mb-10 gradient-text"
          style={{ fontFamily: "var(--font-heading)" }}
        >
          Happy Birthday, {siteConfig.girlfriendName} ❤️
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="flex items-center justify-center gap-4 md:gap-6"
        >
          {[
            { value: timeLeft.days, label: "Days" },
            { value: timeLeft.hours, label: "Hours" },
            { value: timeLeft.minutes, label: "Minutes" },
            { value: timeLeft.seconds, label: "Seconds" },
          ].map((item, i) => (
            <div key={item.label} className="glass rounded-xl p-4 md:p-6 min-w-[70px] md:min-w-[90px]">
              <p
                className="text-2xl md:text-4xl font-bold text-cream"
                style={{ fontFamily: "var(--font-heading)" }}
              >
                {pad(item.value)}
              </p>
              <p className="text-[10px] md:text-xs text-cream/40 mt-1 uppercase tracking-wider">
                {item.label}
              </p>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1, duration: 0.8 }}
          className="mt-10 text-xs text-cream/30"
        >
          The website will be available once your birthday arrives 🎂
        </motion.p>
      </div>
    </div>
  );
}
