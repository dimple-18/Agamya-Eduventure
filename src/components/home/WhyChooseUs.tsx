import SectionHeading from "./SectionHeading";
import { differentiators } from "./content";

export default function WhyChooseUs() {
  return (
    <section id="why-us" className="section-shell">
      <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
        <SectionHeading
          eyebrow="Why Agamya"
          title="A more dependable learning experience for students who are serious about progress."
          description="The difference is in how students are taught, supported, and guided from the beginning."
        />

        <div className="mt-12 grid gap-x-12 gap-y-8 md:grid-cols-2">
          {differentiators.map((item, index) => (
            <article
              key={item.title}
              className={`${index < 2 ? "md:border-b md:pb-8" : ""} border-[var(--line)]`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
