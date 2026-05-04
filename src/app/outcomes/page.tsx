import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import SectionHeading from "../../components/home/SectionHeading";
import { outcomes } from "../../components/home/content";

export const metadata: Metadata = {
  title: "Outcomes | Agamya Eduventure",
  description:
    "See the core learning outcomes students gain at Agamya Eduventure: stronger fundamentals, confidence, and readiness for projects and interviews.",
};

export default function OutcomesPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="section-shell pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl overflow-hidden border border-[var(--line)] bg-[var(--banner-bg)] text-white">
          <div className="px-6 py-10 sm:px-10 sm:py-14">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">Outcomes</p>
            <div className="mt-5 grid gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
              <div>
                <h1 className="max-w-4xl text-4xl font-semibold tracking-[-0.055em] text-white sm:text-5xl lg:text-[4.1rem]">
                  What students should confidently take forward.
                </h1>
              </div>
              <div className="lg:border-l lg:border-white/24 lg:pl-8">
                <p className="text-base leading-8 text-white/84">
                  The goal is not just completion of classes, but stronger understanding, better practice confidence,
                  and clearer career-learning direction.
                </p>
                <div className="mt-6 inline-flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.18em] text-white/72">
                  <Link href="/">Home</Link>
                  <span>/</span>
                  <span className="text-white">Outcomes</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-white p-6 sm:p-8 lg:p-10">
          <SectionHeading
            eyebrow="Learning Outcomes"
            title="The goal is stronger understanding, better confidence, and clearer next steps."
            description="Students should leave with a better foundation, more comfort while practicing, and a clearer sense of how to keep progressing."
          />

          <div className="mt-10 grid gap-4 md:grid-cols-2">
            {outcomes.map((outcome) => (
              <article key={outcome} className="border border-[var(--line)] bg-[var(--surface-soft)] px-5 py-5">
                <p className="text-base leading-8 text-[var(--text-secondary)]">{outcome}</p>
              </article>
            ))}
          </div>

          <div className="mt-8 flex justify-end">
            <Link href="/contact" className="button-primary">
              Talk to Us
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
