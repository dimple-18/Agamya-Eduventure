import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import SectionHeading from "../../components/home/SectionHeading";
import { testimonials } from "../../components/home/content";

export const metadata: Metadata = {
  title: "Testimonials | Agamya Eduventure",
  description:
    "Read student and parent feedback about the learning approach, mentoring style, and confidence-building experience at Agamya Eduventure.",
};

export default function TestimonialsPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="section-shell pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl overflow-hidden border border-[var(--line)] bg-[var(--banner-bg)] text-white">
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">Testimonials</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.1rem]">
                  Feedback from students and families who value clarity and support.
                </h1>
              </div>
              <div className="lg:border-l lg:border-white/24 lg:pl-8">
                <p className="text-base leading-8 text-white/84">
                  Real learning progress is often reflected in confidence, consistency, and the quality of guidance students receive.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                  <Link href="/">Home</Link>
                  <span>/</span>
                  <span className="text-white">Testimonials</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-white p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Student Voice"
            title="What students and parents consistently appreciate."
            description="The strongest feedback is usually simple: teaching feels clear, support feels steady, and students feel more capable."
          />

          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((testimonial) => (
              <article key={testimonial.name} className="border-t border-[var(--line)] pt-6">
                <p className="text-xl leading-9 text-[var(--text-primary)]">“{testimonial.quote}”</p>
                <div className="mt-8">
                  <p className="text-base font-semibold text-[var(--text-primary)]">{testimonial.name}</p>
                  <p className="mt-1 text-sm text-[var(--text-secondary)]">{testimonial.role}</p>
                </div>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/contact" className="button-primary">
              Connect With Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
