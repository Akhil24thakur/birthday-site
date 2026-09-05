import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

function MemoryCard({ memory, index, onImageClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, scale: 0.97 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.5, delay: index * 0.06 }}
      className="photo-card cursor-pointer group"
      style={{ transform: `rotate(${memory.rotation || 0}deg)` }}
      onClick={() => onImageClick(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onImageClick(index)}
      aria-label={`View ${memory.title}`}
    >
      <div className="relative overflow-hidden rounded-sm aspect-[4/3]">
        <img
          src={memory.image}
          alt={memory.caption || memory.title}
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 bg-dark-mid/60 flex items-center justify-center text-cream/40 text-xs hidden">
          Photo unavailable ❤️
        </div>
      </div>
    </motion.div>
  );
}

export default function MemoryTimeline({ memories }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);

  return (
    <section id="timeline" className="relative py-16 md:py-24 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-4xl mx-auto">
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
          {memories.map((memory, i) => (
            <MemoryCard
              key={memory.id}
              memory={memory}
              index={i}
              onImageClick={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {lightboxIndex >= 0 && (
        <PhotoLightbox
          items={memories}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={() => setLightboxIndex((i) => (i > 0 ? i - 1 : memories.length - 1))}
          onNext={() => setLightboxIndex((i) => (i < memories.length - 1 ? i + 1 : 0))}
        />
      )}
    </section>
  );
}
