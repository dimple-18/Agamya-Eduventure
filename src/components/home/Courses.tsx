import Image from "next/image";
import Link from "next/link";

import SectionHeading from "./SectionHeading";
import { appliedPrograms, programCards } from "./content";

type CoursesProps = {
  preview?: boolean;
};

const allPrograms = [...programCards, ...appliedPrograms];

export default function Courses({ preview = false }: CoursesProps) {
  const visiblePrograms = preview ? allPrograms.slice(0, 3) : allPrograms;

  return (
    <section id="programs" className="section-shell">
      <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
        <div className="grid gap-12 lg:grid-cols-[0.58fr_1.42fr]">
          <div className="space-y-8">
            <SectionHeading
              eyebrow="Programs"
              title="A broader learning path with stronger visual presence."
              description="Agamya combines core programming tracks, technical modules, project work, internships, certifications, and interview preparation within one connected learning system."
            />

            <div className="border border-[var(--line)] bg-[linear-gradient(180deg,#f6f1e9_0%,#efe7dc_100%)] p-6 sm:p-7">
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                Program Structure
              </p>
              <div className="mt-6 grid gap-5">
                <div className="border-b border-[var(--line)] pb-4">
                  <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                    Core programming tracks
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Language and development programs taught in a structured and practical way.
                  </p>
                </div>
                <div className="border-b border-[var(--line)] pb-4">
                  <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                    Technical modules
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Databases, SQL, logic building, and supporting modules that strengthen understanding.
                  </p>
                </div>
                <div>
                  <p className="text-[1.05rem] font-semibold tracking-[-0.03em] text-[var(--text-primary)]">
                    Execution and career support
                  </p>
                  <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                    Projects, internships, certifications, and interview preparation that connect learning with outcomes.
                  </p>
                </div>
              </div>
            </div>

            {preview ? (
              <Link href="/programs" className="button-primary">
                View More Programs
              </Link>
            ) : null}
          </div>

          <div className="space-y-6">
            {visiblePrograms.map((program, index) => (
              <article
                key={program.title}
                className="overflow-hidden border border-[var(--line)] bg-[var(--brand-dark)] text-white"
              >
                <div className="grid lg:grid-cols-[1.12fr_0.88fr]">
                  <div className="relative min-h-[23rem]">
                    {program.image ? (
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1024px) 760px, 100vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(23,63,75,0.08),rgba(23,63,75,0.58))]" />
                    <div className="absolute inset-x-0 bottom-0 p-7 sm:p-9">
                      <p className="text-[11px] font-semibold uppercase tracking-[0.26em] text-white/72">
                        {index === 0 ? "Featured Program" : program.meta}
                      </p>
                      <h3 className="mt-4 max-w-md text-[2.4rem] font-semibold tracking-[-0.06em] text-white sm:text-[3rem]">
                        {program.title}
                      </h3>
                    </div>
                  </div>

                  <div className="flex flex-col justify-between border-t border-white/10 p-7 sm:p-9 lg:border-l lg:border-t-0">
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/58">
                        {program.meta}
                      </p>
                      <p className="mt-6 text-[1.04rem] leading-8 text-white/76">
                        {program.description}
                      </p>
                    </div>

                    <div className="mt-10 grid grid-cols-2 gap-6 border-t border-white/10 pt-6">
                      <div>
                        <p className="text-sm font-semibold text-white">Projects</p>
                        <p className="mt-2 text-sm leading-7 text-white/62">
                          {program.projects}
                        </p>
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-white">Mentoring</p>
                        <p className="mt-2 text-sm leading-7 text-white/62">
                          {program.mentoring}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </article>
            ))}

            {preview ? (
              <div className="flex justify-start lg:justify-end">
                <Link href="/programs" className="button-secondary">
                  Show All Programs
                </Link>
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
}
