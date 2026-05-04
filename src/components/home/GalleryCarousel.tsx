"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

type GalleryCarouselProps = {
  photos: readonly string[];
  title: string;
};

export default function GalleryCarousel({
  photos,
  title,
}: GalleryCarouselProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (photos.length <= 1) {
      return;
    }

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % photos.length);
    }, 3500);

    return () => window.clearInterval(timer);
  }, [photos.length]);

  const goPrevious = () => {
    setActiveIndex((current) => (current - 1 + photos.length) % photos.length);
  };

  const goNext = () => {
    setActiveIndex((current) => (current + 1) % photos.length);
  };

  return (
    <div className="relative overflow-hidden border-b border-[var(--line)] bg-[#e8edf2]">
      <div className="relative min-h-[18rem] sm:min-h-[23rem] lg:min-h-[26rem]">
        {photos.map((photo, index) => (
          <div
            key={photo}
            className={`absolute inset-0 transition-opacity duration-700 ${
              index === activeIndex ? "opacity-100" : "opacity-0"
            }`}
          >
            <Image
              src={photo}
              alt={`${title} photo ${index + 1}`}
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 62vw, 100vw"
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,25,38,0.04),rgba(17,25,38,0.22))]" />
          </div>
        ))}
      </div>

      {photos.length > 1 ? (
        <div className="absolute inset-x-0 bottom-0 flex items-end justify-between px-5 py-5 sm:px-6">
          <div className="flex items-center gap-2">
            {photos.map((photo, index) => (
              <button
                key={`${photo}-${index}`}
                type="button"
                onClick={() => setActiveIndex(index)}
                className={`h-2.5 w-2.5 rounded-full transition ${
                  index === activeIndex ? "bg-[var(--accent)]" : "bg-white/45"
                }`}
                aria-label={`Show image ${index + 1}`}
              />
            ))}
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={goPrevious}
              className="flex h-10 w-10 items-center justify-center bg-white/92 text-[var(--text-primary)] transition hover:bg-white"
              aria-label="Previous image"
            >
              ←
            </button>
            <button
              type="button"
              onClick={goNext}
              className="flex h-10 w-10 items-center justify-center bg-white/92 text-[var(--text-primary)] transition hover:bg-white"
              aria-label="Next image"
            >
              →
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}
