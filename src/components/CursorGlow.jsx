import { useEffect, useRef } from "react";
import { siteConfig } from "../data/siteConfig";

export default function CursorGlow() {
  const glowRef = useRef(null);

  useEffect(() => {
    if (window.matchMedia("(hover: none)").matches) return;
    if (!siteConfig.effects.cursorGlow) return;

    const glow = glowRef.current;
    if (!glow) return;

    let raf;
    const move = (e) => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        glow.style.left = `${e.clientX}px`;
        glow.style.top = `${e.clientY}px`;
      });
    };

    window.addEventListener("mousemove", move, { passive: true });
    return () => {
      window.removeEventListener("mousemove", move);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={glowRef}
      className="fixed w-[300px] h-[300px] rounded-full pointer-events-none z-[5] -translate-x-1/2 -translate-y-1/2 opacity-[0.07]"
      style={{
        background:
          "radial-gradient(circle, var(--color-rose) 0%, var(--color-pink) 30%, transparent 70%)",
      }}
      aria-hidden="true"
    />
  );
}
