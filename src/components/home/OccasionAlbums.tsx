"use client";

import Image from "next/image";
import { ChevronLeft, ChevronRight, Images, X } from "lucide-react";
import { useEffect, useId, useRef, useState } from "react";
import { createPortal } from "react-dom";

import { canOptimizeImage } from "@/lib/content/gallery-occasions";
import type { GalleryImage } from "@/lib/content/types";

export type OccasionAlbum = {
  key: string;
  title: string;
  year: string;
  images: GalleryImage[];
};

function photoCountLabel(count: number) {
  return `${count} ${count === 1 ? "Photo" : "Photos"}`;
}

export function OccasionAlbumCard({
  album,
  listView = false,
  onOpen,
}: {
  album: OccasionAlbum;
  listView?: boolean;
  onOpen: () => void;
}) {
  const cover = album.images[0];
  const extraCount = album.images.length - 1;
  const ariaLabel = `Open ${album.title}${album.year ? ` ${album.year}` : ""} album, ${photoCountLabel(album.images.length)}`;

  const extraBadge =
    extraCount > 0 ? (
      <span className="absolute right-3 top-3 inline-flex items-center gap-1 rounded-full bg-[#0f1a28]/70 px-2.5 py-1 text-[12px] font-semibold text-white backdrop-blur-sm">
        <Images className="h-3.5 w-3.5" strokeWidth={2.2} />+{extraCount}
      </span>
    ) : null;

  if (listView) {
    return (
      <button
        type="button"
        onClick={onOpen}
        aria-label={ariaLabel}
        className="group flex w-full overflow-hidden rounded-[18px] border border-[#ebe5db] bg-white text-left shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b6b66] focus-visible:ring-offset-2"
      >
        <div className="relative h-[150px] w-[220px] shrink-0 overflow-hidden bg-[#eef1ee]">
          <Image
            src={cover.url}
            alt={cover.alt ?? album.title}
            fill
            unoptimized={!canOptimizeImage(cover.url)}
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="220px"
          />
          {extraBadge}
        </div>
        <div className="flex flex-1 flex-col justify-center gap-1.5 p-4">
          <h3 className="text-[18px] font-bold leading-tight text-[#1b4d3e]">{album.title}</h3>
          <div className="flex items-center gap-3 text-[14px] font-medium text-[#6b7c8f]">
            {album.year ? <span>{album.year}</span> : null}
            <span className="inline-flex items-center gap-1 font-semibold text-[#1b6b66]">
              <Images className="h-4 w-4" strokeWidth={2.1} />
              {photoCountLabel(album.images.length)}
            </span>
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      type="button"
      onClick={onOpen}
      aria-label={ariaLabel}
      className="group block w-full overflow-hidden rounded-[20px] border border-[#ebe5db] bg-white text-left shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1b6b66] focus-visible:ring-offset-2"
    >
      <div className="relative aspect-[4/3] overflow-hidden bg-[#eef1ee]">
        <Image
          src={cover.url}
          alt={cover.alt ?? album.title}
          fill
          unoptimized={!canOptimizeImage(cover.url)}
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 300px, (min-width: 1024px) 30vw, (min-width: 768px) 45vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/30 via-transparent to-transparent" />
        {extraBadge}
      </div>
      <div className="p-4">
        <h3 className="text-[18px] font-bold leading-tight text-[#1b4d3e] sm:text-[17px]">
          {album.title}
        </h3>
        <div className="mt-1.5 flex items-center justify-between gap-3 text-[14px] sm:text-[13px]">
          <span className="font-medium text-[#6b7c8f]">{album.year}</span>
          <span className="inline-flex items-center gap-1 font-semibold text-[#1b6b66]">
            <Images className="h-4 w-4" strokeWidth={2.1} />
            {photoCountLabel(album.images.length)}
          </span>
        </div>
      </div>
    </button>
  );
}

export function OccasionsEmptyState() {
  return (
    <div className="mt-6 flex flex-col items-center rounded-[20px] border border-[#ebe5db] bg-white px-6 py-12 text-center shadow-[0_6px_20px_rgba(15,23,42,0.05)] sm:py-14">
      <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66]">
        <Images className="h-5 w-5" strokeWidth={2} />
      </span>
      <h3 className="mt-4 text-[20px] font-bold tracking-[-0.01em] text-[#1b4d3e]">
        Institute Occasions
      </h3>
      <p className="mt-2 max-w-sm text-[15px] leading-[1.6] text-[#5f6f82]">
        Images from this section will appear here shortly.
      </p>
    </div>
  );
}

const SWIPE_THRESHOLD = 40;

export function OccasionAlbumViewer({
  album,
  onClose,
}: {
  album: OccasionAlbum;
  onClose: () => void;
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const titleId = useId();
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const thumbRefs = useRef<Array<HTMLButtonElement | null>>([]);
  const touchStartX = useRef<number | null>(null);

  const count = album.images.length;
  const activeImage = album.images[activeIndex] ?? album.images[0];
  const hasMultiple = count > 1;

  const goPrevious = () => setActiveIndex((current) => (current - 1 + count) % count);
  const goNext = () => setActiveIndex((current) => (current + 1) % count);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    const previouslyFocused = document.activeElement as HTMLElement | null;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
        return;
      }
      if (event.key === "ArrowLeft" && count > 1) {
        setActiveIndex((current) => (current - 1 + count) % count);
        return;
      }
      if (event.key === "ArrowRight" && count > 1) {
        setActiveIndex((current) => (current + 1) % count);
        return;
      }
      if (event.key === "Tab" && dialogRef.current) {
        const focusable = dialogRef.current.querySelectorAll<HTMLElement>(
          'button:not([disabled]), [href], [tabindex]:not([tabindex="-1"])',
        );
        if (!focusable.length) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault();
          last.focus();
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
      previouslyFocused?.focus();
    };
  }, [count, onClose]);

  useEffect(() => {
    thumbRefs.current[activeIndex]?.scrollIntoView({ block: "nearest", inline: "center" });
  }, [activeIndex]);

  const handleTouchEnd = (event: React.TouchEvent) => {
    if (touchStartX.current === null || !hasMultiple) return;
    const deltaX = event.changedTouches[0].clientX - touchStartX.current;
    touchStartX.current = null;
    if (deltaX > SWIPE_THRESHOLD) goPrevious();
    else if (deltaX < -SWIPE_THRESHOLD) goNext();
  };

  return createPortal(
    <div
      className="fixed inset-0 z-[10001] flex items-center justify-center bg-[#0b1512]/85 backdrop-blur-sm sm:p-6"
      onClick={onClose}
      role="presentation"
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        onClick={(event) => event.stopPropagation()}
        className="flex h-[100dvh] w-full max-w-5xl flex-col overflow-hidden bg-white sm:h-auto sm:max-h-[calc(100dvh-3rem)] sm:rounded-[24px] sm:shadow-[0_30px_80px_rgba(0,0,0,0.35)]"
      >
        <div className="flex items-start justify-between gap-3 border-b border-[#f0ebe3] px-4 py-3 sm:px-6 sm:py-4">
          <div className="min-w-0">
            <h2
              id={titleId}
              className="text-[18px] font-bold leading-tight text-[#1b4d3e] sm:text-[20px]"
            >
              {album.title}
            </h2>
            {album.year ? (
              <p className="mt-0.5 text-[14px] font-medium text-[#6b7c8f]">{album.year}</p>
            ) : null}
          </div>
          <button
            ref={closeButtonRef}
            type="button"
            onClick={onClose}
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#e8e2d8] text-[#1b4d3e] transition-colors hover:bg-[#f3f5f4]"
            aria-label="Close album"
          >
            <X className="h-5 w-5" strokeWidth={2.2} />
          </button>
        </div>

        <div
          className="relative min-h-[240px] flex-1 bg-[#0f1a28] sm:h-[min(64dvh,600px)] sm:flex-none"
          onTouchStart={(event) => {
            touchStartX.current = event.touches[0].clientX;
          }}
          onTouchEnd={handleTouchEnd}
        >
          <Image
            key={activeImage.url}
            src={activeImage.url}
            alt={activeImage.alt ?? `${album.title} photo ${activeIndex + 1}`}
            fill
            unoptimized={!canOptimizeImage(activeImage.url)}
            className="object-contain"
            sizes="(min-width: 1024px) 1000px, 100vw"
            priority
          />

          {hasMultiple ? (
            <>
              <button
                type="button"
                onClick={goPrevious}
                className="absolute left-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b4d3e] shadow-md transition hover:bg-white sm:left-4 sm:h-12 sm:w-12"
                aria-label="Previous photo"
              >
                <ChevronLeft className="h-5 w-5" strokeWidth={2.4} />
              </button>
              <button
                type="button"
                onClick={goNext}
                className="absolute right-2 top-1/2 inline-flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full bg-white/90 text-[#1b4d3e] shadow-md transition hover:bg-white sm:right-4 sm:h-12 sm:w-12"
                aria-label="Next photo"
              >
                <ChevronRight className="h-5 w-5" strokeWidth={2.4} />
              </button>
            </>
          ) : null}
        </div>

        {hasMultiple ? (
          <div className="border-t border-[#f0ebe3] px-4 pb-4 pt-3 sm:px-6">
            <p className="text-center text-[14px] font-semibold text-[#3f4f61]" aria-live="polite">
              {activeIndex + 1} / {count}
            </p>
            <div className="-mx-4 mt-3 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:justify-center sm:px-0 [&::-webkit-scrollbar]:hidden">
              {album.images.map((image, index) => (
                <button
                  key={`${image.url}-${index}`}
                  ref={(node) => {
                    thumbRefs.current[index] = node;
                  }}
                  type="button"
                  onClick={() => setActiveIndex(index)}
                  aria-label={`Show photo ${index + 1} of ${count}`}
                  aria-current={index === activeIndex}
                  className={`relative h-14 w-20 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:h-16 sm:w-24 ${
                    index === activeIndex
                      ? "ring-[#1b6b66]"
                      : "opacity-65 ring-transparent hover:opacity-100"
                  }`}
                >
                  <Image
                    src={image.url}
                    alt=""
                    fill
                    unoptimized={!canOptimizeImage(image.url)}
                    className="object-cover"
                    sizes="96px"
                  />
                </button>
              ))}
            </div>
          </div>
        ) : null}
      </div>
    </div>,
    document.body,
  );
}
