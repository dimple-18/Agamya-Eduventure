import Link from "next/link";

import GalleryCarousel from "./GalleryCarousel";
import SectionHeading from "./SectionHeading";
import { galleryEvents } from "./content";

export default function HomeGallery() {
  const previewEvents = galleryEvents.slice(0, 2);

  return (
    <section id="gallery" className="section-shell">
      <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.44fr_1.56fr]">
          <div className="space-y-7">
            <SectionHeading
              eyebrow="Gallery"
              title="Event highlights from workshops, practice, and institute occasions."
              description="Homepage pe quick preview rakha hai. Full event-wise albums and more photos `/gallery` page par available hain."
            />

            <Link href="/gallery" className="button-primary">
              View Full Gallery
            </Link>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            {previewEvents.map((event) => (
              <article key={event.title} className="motion-card overflow-hidden border border-[var(--line)] bg-white">
                <GalleryCarousel photos={event.photos} title={event.title} />
                <div className="px-5 py-5">
                  <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                    {event.label}
                  </p>
                  <h3 className="mt-3 text-[1.5rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                    {event.title}
                  </h3>
                  <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)]">{event.description}</p>
                  <div className="mt-4 flex justify-end">
                    <Link
                      href="/gallery"
                      className="button-micro border border-[var(--brand)] bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--brand-dark)]"
                    >
                      More Details
                    </Link>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
