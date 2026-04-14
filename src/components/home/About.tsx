import SectionHeading from "./SectionHeading";
import { aboutHighlights } from "./content";

export default function About() {
  return (
    <section id="about" className="section-shell">
      <div className="mx-auto grid max-w-7xl gap-10 border-t border-[var(--line)] pt-16 lg:grid-cols-[0.88fr_1.12fr]">
        <div>
          <SectionHeading
            eyebrow="About"
            title="Built for students who need stronger direction at the beginning."
            description="Agamya Eduventure is designed to make early learning feel clearer, steadier, and more supported for students who want to take technology seriously."
          />
        </div>

        <div className="lg:border-l lg:border-[var(--line)] lg:pl-10">
          {aboutHighlights.map((item, index) => (
            <article
              key={item.title}
              className={`${index === 0 ? "pt-0" : "pt-8"} ${index < aboutHighlights.length - 1 ? "border-b border-[var(--line)] pb-8" : "pb-0"}`}
            >
              <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--brand)]">
                {String(index + 1).padStart(2, "0")}
              </p>
              <h3 className="mt-4 text-[1.7rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                {item.title}
              </h3>
              <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
