"use client";

import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { useMemo, useState } from "react";

import { testimonials as staticTestimonials, type Testimonial } from "./content";

const CARDS_PER_VIEW = 3;

function StarRating() {
  return (
    <div className="flex items-center gap-0.5" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, index) => (
        <Star
          key={index}
          className="h-4 w-4 fill-[#f39c12] text-[#f39c12]"
          strokeWidth={1.5}
        />
      ))}
    </div>
  );
}

function getInitial(name: string) {
  return name.trim().charAt(0).toUpperCase();
}

function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <article className="flex h-full flex-col rounded-[20px] border border-[#ebe5db] bg-white p-6 shadow-[0_6px_22px_rgba(15,23,42,0.06)] sm:p-7">
      <Quote className="h-8 w-8 text-[#1b6b66]/75" strokeWidth={1.75} aria-hidden />
      <p className="mt-4 flex-1 text-[15px] leading-[1.65] text-[#3d4f63]">
        {testimonial.quote}
      </p>
      <div className="mt-6 border-t border-[#f0ebe3] pt-5">
        <div className="flex items-center gap-3">
          <div
            className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#cfe0de] bg-[#e8f4f3] text-[15px] font-bold text-[#1b6b66]"
            aria-hidden
          >
            {getInitial(testimonial.name)}
          </div>
          <div className="min-w-0">
            <p className="text-[14px] font-bold text-[#1b4d3e]">{testimonial.name}</p>
            <p className="mt-0.5 text-[12px] leading-snug text-[#6b7c8f]">{testimonial.role}</p>
          </div>
        </div>
        <div className="mt-4">
          <StarRating />
        </div>
      </div>
    </article>
  );
}

export function TestimonialSectionIntro() {
  return (
    <div className="flex flex-col items-center text-center">
      <h2 className="mx-auto max-w-3xl text-[38px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[44px] lg:text-[50px]">
        What students and parents consistently appreciate.
      </h2>
      <p className="mx-auto mt-4 max-w-2xl text-[18px] leading-[1.75] text-[#5f6f82] sm:text-[19px]">
        The strongest feedback is usually simple: teaching feels clear, support feels steady,
        and students feel more capable.
      </p>
    </div>
  );
}

export function TestimonialCards({
  className,
  items,
}: {
  className?: string;
  items?: Testimonial[];
}) {
  const testimonialList = items ?? staticTestimonials;
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(testimonialList.length / CARDS_PER_VIEW);

  const visibleTestimonials = useMemo(
    () =>
      testimonialList.slice(page * CARDS_PER_VIEW, page * CARDS_PER_VIEW + CARDS_PER_VIEW),
    [page, testimonialList],
  );

  return (
    <div className={className}>
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        {visibleTestimonials.map((testimonial, index) => (
          <TestimonialCard key={`${testimonial.name}-${page}-${index}`} testimonial={testimonial} />
        ))}
      </div>

      {totalPages > 1 ? (
        <div className="mt-8 flex items-center justify-center gap-4">
          <button
            type="button"
            onClick={() => setPage((current) => Math.max(0, current - 1))}
            disabled={page === 0}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e2d8] bg-white text-[#1b4d3e] transition-colors hover:border-[#1b6b66]/35 hover:bg-[#f8f6f1] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Previous testimonials"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <div className="flex items-center gap-2">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setPage(index)}
                className={`h-2.5 rounded-full transition-all ${
                  page === index ? "w-7 bg-[#1b6b66]" : "w-2.5 bg-[#d6dde5] hover:bg-[#b8c5d3]"
                }`}
                aria-label={`Go to testimonial page ${index + 1}`}
              />
            ))}
          </div>

          <button
            type="button"
            onClick={() => setPage((current) => Math.min(totalPages - 1, current + 1))}
            disabled={page === totalPages - 1}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-[#e8e2d8] bg-white text-[#1b4d3e] transition-colors hover:border-[#1b6b66]/35 hover:bg-[#f8f6f1] disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Next testimonials"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      ) : null}
    </div>
  );
}
