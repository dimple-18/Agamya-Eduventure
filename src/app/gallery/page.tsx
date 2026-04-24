import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../../components/home/Footer";
import GalleryCarousel from "../../components/home/GalleryCarousel";
import Navbar from "../../components/home/Navbar";
import { galleryEvents } from "../../components/home/content";

export const metadata: Metadata = {
  title: "Gallery | Agamya Eduventure",
  description:
    "Explore event-wise photos from Agamya Eduventure including workshops, institute occasions, practical sessions, project work, and student activities.",
};

export default function GalleryPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="section-shell pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-white px-6 py-10 sm:px-10 sm:py-14">
          <p className="eyebrow">Gallery</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-[var(--text-primary)] sm:text-5xl lg:text-[4.2rem]">
                Event-wise photo gallery for institute occasions, workshops, and student moments.
              </h1>
            </div>
            <div className="lg:border-l lg:border-[var(--line)] lg:pl-8">
              <p className="text-base leading-8 text-[var(--text-secondary)]">
                Each event or occasion can have its own photo set here, so
                visitors can browse multiple images from the same moment instead
                of seeing only one static thumbnail.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                <Link href="/">Home</Link>
                <span>/</span>
                <span className="text-[var(--text-primary)]">Gallery</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-7xl gap-6">
          {galleryEvents.map((event, index) => (
            <article
              key={event.title}
              className="overflow-hidden border border-[var(--line)] bg-white"
            >
              <div className="grid lg:grid-cols-[1.18fr_0.82fr]">
                <div className={index % 2 === 1 ? "lg:order-2" : ""}>
                  <GalleryCarousel photos={event.photos} title={event.title} />
                </div>

                <div
                  className={`flex flex-col justify-between px-6 py-7 sm:px-8 sm:py-8 ${
                    index % 2 === 1
                      ? "border-b border-[var(--line)] lg:order-1 lg:border-b-0 lg:border-r"
                      : "border-b border-[var(--line)] lg:border-b-0 lg:border-l"
                  }`}
                >
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                      {event.label}
                    </p>
                    <h2 className="mt-4 text-[2rem] font-semibold tracking-[-0.045em] text-[var(--text-primary)] sm:text-[2.4rem]">
                      {event.title}
                    </h2>
                    <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
                      {event.description}
                    </p>
                  </div>

                  <div className="mt-8 grid gap-4 border-t border-[var(--line)] pt-6 sm:grid-cols-2">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Photos
                      </p>
                      <p className="mt-2 text-lg font-semibold text-[var(--text-primary)]">
                        {event.photos.length} images
                      </p>
                    </div>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                        Use
                      </p>
                      <p className="mt-2 text-base leading-7 text-[var(--text-secondary)]">
                        Replace these placeholders with actual event photos anytime.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-white px-6 py-8 sm:px-10 sm:py-10 lg:flex lg:items-end lg:justify-between">
          <div>
            <p className="eyebrow">Add Real Photos</p>
            <h2 className="mt-4 max-w-2xl text-3xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-[3rem]">
              Each event section is ready for your actual institute albums.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              Once you share real event folders or selected photos, we can plug
              them into each carousel and make the gallery feel fully authentic.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <Link href="/contact" className="button-primary">
              Share Gallery Photos
            </Link>
            <Link href="/about" className="button-secondary">
              Learn More
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
