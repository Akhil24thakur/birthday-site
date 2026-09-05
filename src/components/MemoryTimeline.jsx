import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

function MemoryCard({ memory, index, onImageClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-center ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:gap-10 gap-6`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="w-full md:w-1/2 flex justify-center"
      >
        <div
          className="photo-card cursor-pointer group max-w-sm w-full"
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
        </div>
      </motion.div>

      <div className="hidden md:block w-1/2" />
    </div>
  );
}

export default function MemoryTimeline({ memories }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-80px" });

  return (
    <section id="timeline" className="relative py-16 md:py-28 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={lineRef} className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-px bg-rose/10">
            <motion.div
              initial={{ height: 0 }}
              animate={lineInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-rose/30 via-rose/15 to-transparent"
            />
          </div>

          <div className="space-y-14 md:space-y-20">
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
