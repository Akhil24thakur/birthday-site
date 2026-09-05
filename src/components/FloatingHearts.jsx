import { useEffect, useRef, useState } from "react";

export default function FloatingHearts() {
  const [hearts, setHearts] = useState([]);
  const idRef = useRef(0);

  useEffect(() => {
    const interval = setInterval(() => {
      idRef.current += 1;
      setHearts((prev) => [
        ...prev.slice(-6),
        {
          id: idRef.current,
          x: Math.random() * 100,
          size: 12 + Math.random() * 10,
          duration: 8 + Math.random() * 6,
          drift: (Math.random() - 0.5) * 60,
        },
      ]);
    }, 2500);

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
          }}
        >
          ❤️
        </span>
      ))}
    </div>
  );
}
