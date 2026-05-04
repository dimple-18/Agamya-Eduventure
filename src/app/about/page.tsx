import type { Metadata } from "next";
import Link from "next/link";

import About from "../../components/home/About";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import WhyChooseUs from "../../components/home/WhyChooseUs";

export const metadata: Metadata = {
  title: "About Us | Agamya Eduventure",
  description:
    "Learn more about Agamya Eduventure, our teaching approach, student support philosophy, and practical learning environment.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="section-shell pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-[var(--banner-bg)] px-6 py-10 text-white sm:px-10 sm:py-14">
          <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">About Us</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1.15fr_0.85fr] lg:items-end">
            <div>
              <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.3rem]">
                Built to give students a clearer, calmer, and more serious start in technology.
              </h1>
            </div>
            <div className="lg:border-l lg:border-white/24 lg:pl-8">
              <p className="text-base leading-8 text-white/84">
                Agamya Eduventure focuses on strong fundamentals, practical
                support, and patient mentoring for students who want a more
                dependable learning experience.
              </p>
              <div className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                <Link href="/">Home</Link>
                <span>/</span>
                <span className="text-white">About Us</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      <About ctaHref="/contact" ctaLabel="Talk to Us" />

      <WhyChooseUs />

      <Footer />
    </main>
  );
}
