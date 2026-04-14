import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import WhyChooseUs from "../../components/home/WhyChooseUs";

const aboutPoints = [
  {
    label: "Clarity-first teaching",
    description: "Students learn concepts properly before moving into advanced work.",
  },
  {
    label: "Project-based practice",
    description: "Theory is reinforced with structured implementation and guided review.",
  },
  {
    label: "Mentor-led growth",
    description: "The environment stays patient, practical, and focused on steady progress.",
  },
] as const;

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
        <div className="mx-auto max-w-7xl">
          <div className="overflow-hidden border border-[var(--line)] bg-white">
            <div className="relative min-h-[16rem] sm:min-h-[20rem]">
              <Image
                src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                alt="Students collaborating around a computer"
                fill
                className="object-cover"
                sizes="100vw"
              />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(29,95,93,0.32),rgba(23,36,51,0.4))]" />

              <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center text-white">
                <p className="text-xs font-semibold uppercase tracking-[0.22em] text-white/78">
                  About Us
                </p>
                <h1 className="mt-4 text-4xl font-semibold tracking-[-0.05em] sm:text-5xl">
                  About Agamya Eduventure
                </h1>
                <div className="mt-6 inline-flex items-center gap-3 bg-white px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand-dark)]">
                  <Link href="/">Home</Link>
                  <span className="text-[var(--muted)]">/</span>
                  <span>About Us</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.42fr_1.58fr] lg:items-start">
          <div className="space-y-8">
            {aboutPoints.map((point, index) => (
              <div
                key={point.label}
                className={`${index < aboutPoints.length - 1 ? "border-b border-[var(--line)] pb-8" : ""}`}
              >
                <p className="text-[2rem] font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
                  0{index + 1}
                </p>
                <h2 className="mt-3 text-[1.3rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                  {point.label}
                </h2>
                <p className="mt-3 text-base leading-8 text-[var(--text-secondary)]">
                  {point.description}
                </p>
              </div>
            ))}
          </div>

          <div className="relative lg:col-span-1">
            <div className="relative overflow-hidden border border-[var(--line)] bg-white p-3 shadow-[0_18px_40px_rgba(15,23,42,0.05)]">
              <div className="relative min-h-[32rem] overflow-hidden sm:min-h-[38rem] lg:min-h-[42rem]">
                <Image
                  src="https://cdn.pixabay.com/photo/2016/02/15/11/40/background-1201006_640.jpg"
                  alt="Technology background"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 980px, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(17,25,38,0.72),rgba(17,25,38,0.34)_42%,rgba(17,25,38,0.18)_100%)]" />
                <div className="absolute inset-0 flex items-end">
                  <div className="max-w-3xl p-7 text-white sm:p-10 lg:p-12">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-white/72">
                      A Better Learning Experience
                    </p>
                    <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[4.2rem]">
                      Serious mentoring and practical guidance for students who want a stronger beginning.
                    </h2>
                    <p className="mt-6 max-w-2xl text-base leading-8 text-white/82 sm:text-[1.04rem]">
                      Agamya Eduventure is built for learners who need more than
                      just classes. The focus is on concept clarity, patient
                      mentoring, structured practice, and the kind of support
                      that helps students move from hesitation to confidence.
                    </p>
                    <p className="mt-4 max-w-2xl text-base leading-8 text-white/76 sm:text-[1.04rem]">
                      Instead of rushing through topics, the learning model
                      emphasizes understanding, repetition, projects, and real
                      progress. This helps students build both technical skill
                      and the confidence to keep growing.
                    </p>

                    <div className="mt-8">
                      <Link href="/#contact" className="button-primary">
                        Read More
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -left-6 top-8 hidden h-20 w-20 items-center justify-center rounded-full border border-dashed border-[var(--line-strong)] bg-white text-xs font-semibold uppercase tracking-[0.2em] text-[var(--brand)] sm:flex">
              Agamya
            </div>
          </div>
        </div>
      </section>

      <WhyChooseUs />

      <Footer />
    </main>
  );
}
