import Link from "next/link";

import SectionHeading from "./SectionHeading";
import { contactDetails, outcomes } from "./content";

export default function Contact() {
  return (
    <>
      <section id="outcomes" className="section-shell">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-[var(--line)] pt-16 lg:grid-cols-[0.88fr_1.12fr]">
          <SectionHeading
            eyebrow="Outcomes"
            title="The goal is stronger understanding, better confidence, and clearer next steps."
            description="Students should leave with a better foundation, more comfort while practicing, and a clearer sense of how to keep progressing."
          />

          <div className="lg:border-l lg:border-[var(--line)] lg:pl-10">
            {outcomes.map((outcome, index) => (
              <div
                key={outcome}
                className={`${index === 0 ? "pt-0" : "pt-6"} ${index < outcomes.length - 1 ? "border-b border-[var(--line)] pb-6" : "pb-0"}`}
              >
                <p className="text-base leading-8 text-[var(--text-secondary)]">
                  {outcome}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 border border-[var(--line)] bg-white px-7 py-8 sm:px-10 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end">
          <div>
            <p className="eyebrow">Contact</p>
            <h2 className="mt-5 max-w-xl text-4xl font-semibold tracking-[-0.05em] text-[var(--text-primary)] sm:text-[3.35rem]">
              Start with one conversation and a clearer next step.
            </h2>
            <p className="mt-5 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
              Reach out to discuss the student&apos;s current level, suitable
              program options, and how Agamya can help create a stronger
              learning path.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-3">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="border-t border-[var(--line)] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"
              >
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-3 block text-lg font-semibold tracking-[-0.03em] text-[var(--text-primary)] transition hover:text-[var(--brand)]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-base font-semibold leading-7 text-[var(--text-primary)]">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell pt-0">
        <div className="mx-auto flex max-w-7xl justify-end">
          <Link href="/contact" className="button-primary">
            View Contact Page
          </Link>
        </div>
      </section>
    </>
  );
}
