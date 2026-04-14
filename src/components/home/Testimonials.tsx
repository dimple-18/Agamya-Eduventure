import SectionHeading from "./SectionHeading";
import { testimonials } from "./content";

export default function Testimonials() {
  return (
    <section id="testimonials" className="section-shell">
      <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
        <SectionHeading
          eyebrow="Testimonials"
          title="Students and families value the sense of clarity and support."
          description="The strongest feedback is usually simple: the teaching feels clear, the guidance feels steady, and students feel more capable."
        />

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <article key={testimonial.name} className="border-t border-[var(--line)] pt-6">
              <p className="text-xl leading-9 text-[var(--text-primary)]">
                “{testimonial.quote}”
              </p>
              <div className="mt-8">
                <p className="text-base font-semibold text-[var(--text-primary)]">
                  {testimonial.name}
                </p>
                <p className="mt-1 text-sm text-[var(--text-secondary)]">
                  {testimonial.role}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
