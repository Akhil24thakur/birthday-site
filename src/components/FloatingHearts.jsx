import { useEffect, useRef, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      idRef.current += 1;
      const heart = {
        id: idRef.current,
        x: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 6 + Math.random() * 6,
        delay: Math.random() * 0.5,
        drift: (Math.random() - 0.5) * 80,
        random: Math.random(),
      };
      setHearts((prev) => [...prev.slice(-12), heart]);
    }, 1200);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50" aria-hidden="true">
      {hearts.map((h) => (
        <span
          key={h.id}
          className="animate-float-heart"
          style={{
            "--x": `${h.x}vw`,
            "--size": `${h.size}px`,
            "--duration": `${h.duration}s`,
            "--drift": `${h.drift}px`,
            "--random": h.random,
            animationDelay: `${h.delay}s`,
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
