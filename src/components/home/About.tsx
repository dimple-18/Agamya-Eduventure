import Image from "next/image";
import Link from "next/link";

const aboutPoints = [
  {
    title: "Clarity-first teaching",
    description:
      "Students are taught carefully so they understand fundamentals properly before moving into more advanced topics.",
  },
  {
    title: "Practice with structure",
    description:
      "Concepts are reinforced through repetition, exercises, guided tasks, and project-based work that feels manageable.",
  },
  {
    title: "Support that stays personal",
    description:
      "The mentoring style remains direct, patient, and steady so students keep progressing with confidence.",
  },
] as const;

type AboutProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function About({
  ctaHref = "/about",
  ctaLabel = "Read More",
}: AboutProps) {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
        <div className="grid gap-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
          <div>
            <p className="eyebrow">About</p>
            <h2 className="mt-5 max-w-2xl text-4xl font-semibold tracking-[-0.055em] text-[var(--text-primary)] sm:text-5xl lg:text-[4.1rem]">
              A steadier way to help students begin learning technology well.
            </h2>
            <p className="mt-6 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
              Agamya Eduventure is built for students who need more than
              standard classes. The focus stays on concept clarity, practical
              work, disciplined learning, and guidance that helps students move
              forward with more confidence.
            </p>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
              Instead of rushing through topics, the learning model emphasizes
              understanding, repetition, projects, and personal support. That
              creates a stronger beginning and a more dependable path ahead.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <Link href={ctaHref} className="button-primary">
                {ctaLabel}
              </Link>
              <Link href="/programs" className="button-secondary">
                View Programs
              </Link>
            </div>
          </div>

          <div className="grid gap-5">
            <div className="motion-card relative overflow-hidden border border-[var(--line)] bg-white">
              <div className="relative min-h-[21rem] sm:min-h-[27rem]">
                <Image
                  src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                  alt="Student learning on a computer"
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 720px, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,25,38,0.04),rgba(17,25,38,0.34))]" />
              </div>
            </div>

            <div className="grid gap-5 border border-[var(--line)] bg-white px-6 py-6 sm:grid-cols-3 sm:px-7">
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Focus
                </p>
                <p className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  Beginner confidence
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Approach
                </p>
                <p className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  Structured practical learning
                </p>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Outcome
                </p>
                <p className="mt-3 text-base font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
                  Clearer progress and direction
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {aboutPoints.map((point) => (
            <article
              key={point.title}
              className="motion-card lite-splash-card border border-[var(--line)] bg-white px-6 py-7 sm:px-7"
            >
              <div className="lite-splash-content">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                  About Agamya
                </p>
                <h3 className="mt-4 text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                  {point.title}
                </h3>
                <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
                  {point.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
