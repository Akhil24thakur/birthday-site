import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import PhotoLightbox from "./PhotoLightbox";

function MemoryCard({ memory, index, onImageClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const isLeft = index % 2 === 0;

  return (
    <div ref={ref} className={`flex items-start gap-4 md:gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"} flex-col md:flex-row`}>
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -40 : 40 }}
        animate={inView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.2 }}
        className="flex-1 w-full md:max-w-md"
      >
        <div
          className="photo-card cursor-pointer group"
          style={{ transform: `rotate(${memory.rotation || 0}deg)` }}
          onClick={() => onImageClick(index)}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && onImageClick(index)}
          aria-label={`View ${memory.title} photo`}
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
            <div
              className="absolute inset-0 bg-dark-mid/60 flex items-center justify-center text-cream/50 text-sm hidden"
            >
              Memory photo unavailable ❤️
            </div>
          </div>
          <p
            className="mt-2 text-center text-xs text-dark/60 italic"
            style={{ fontFamily: "var(--font-handwriting)" }}
          >
            {memory.caption}
          </p>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, delay: 0.4 }}
        className="flex-1 w-full md:max-w-md pt-2 md:pt-8"
      >
        <div className={`${isLeft ? "md:text-left" : "md:text-right md:ml-auto"} text-left`}>
          <p className="text-xs text-rose-light/60 tracking-widest uppercase mb-2">
            {memory.date}
          </p>
          <h3
            className="text-xl md:text-2xl font-semibold text-cream mb-3"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            {memory.title}
          </h3>
          <p className="text-sm text-cream/50 leading-relaxed">
            {memory.description}
          </p>
        </div>
      </motion.div>
    </div>
  );
}

export default function MemoryTimeline({ memories }) {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const lineRef = useRef(null);
  const lineInView = useInView(lineRef, { once: true, margin: "-100px" });

  return (
    <section id="timeline" className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-lighter to-dark" />

      <div className="relative z-10 max-w-5xl mx-auto">
        <div ref={lineRef} className="relative">
          <div className="absolute left-4 md:left-1/2 md:-translate-x-px top-0 bottom-0 w-0.5 bg-rose/10">
            <motion.div
              initial={{ height: 0 }}
              animate={lineInView ? { height: "100%" } : {}}
              transition={{ duration: 2, ease: "easeOut" }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-rose/40 via-rose/20 to-transparent"
            />
          </div>

          <div className="space-y-16 md:space-y-24">
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
