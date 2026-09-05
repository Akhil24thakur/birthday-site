import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { photoGallery } from "../data/reasons";
import PhotoLightbox from "./PhotoLightbox";

function GalleryPhoto({ photo, index, onImageClick }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30, scale: 0.95 }}
      animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
      transition={{ duration: 0.6, delay: index * 0.08 }}
      className="group cursor-pointer relative overflow-hidden rounded-lg"
      onClick={() => onImageClick(index)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && onImageClick(index)}
      aria-label={`View: ${photo.caption}`}
    >
      <div className="aspect-square overflow-hidden">
        <img
          src={photo.image}
          alt={photo.caption}
          loading="lazy"
          className="w-full h-full object-cover object-top transition-transform duration-500 group-hover:scale-110"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        <div className="absolute inset-0 bg-dark-mid/40 flex items-center justify-center text-cream/40 text-xs hidden">
          Photo unavailable ❤️
        </div>
      </div>
      <div className="absolute inset-0 bg-gradient-to-t from-dark/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
        <p
          className="text-sm text-cream/90"
          style={{ fontFamily: "var(--font-handwriting)" }}
        >
          {photo.caption}
        </p>
      </div>
    </motion.div>
  );
}

export default function PhotoGallery() {
  const [lightboxIndex, setLightboxIndex] = useState(-1);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="gallery" className="relative py-20 md:py-32 px-6">
      <div className="absolute inset-0 bg-gradient-to-b from-dark via-dark-mid to-dark" />

      <div className="relative z-10 max-w-6xl mx-auto">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 30 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="section-divider mb-10" />
          <h2
            className="text-3xl md:text-5xl font-bold mb-6 gradient-text"
            style={{ fontFamily: "var(--font-heading)" }}
          >
            Little Moments, Big Memories
          </h2>
          <p className="text-sm text-cream/50 max-w-md mx-auto text-center">
            Every photo holds a piece of our story that I never want to forget.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3 md:gap-4">
          {photoGallery.map((photo, i) => (
            <GalleryPhoto
              key={photo.id}
              photo={photo}
              index={i}
              onImageClick={setLightboxIndex}
            />
          ))}
        </div>
      </div>

      {lightboxIndex >= 0 && (
        <PhotoLightbox
          items={photoGallery}
          index={lightboxIndex}
          onClose={() => setLightboxIndex(-1)}
          onPrev={() => setLightboxIndex((i) => (i > 0 ? i - 1 : photoGallery.length - 1))}
          onNext={() => setLightboxIndex((i) => (i < photoGallery.length - 1 ? i + 1 : 0))}
        />
      )}
    </section>
  );
}
