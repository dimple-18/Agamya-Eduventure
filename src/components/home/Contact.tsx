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
        <div className="mx-auto max-w-7xl border border-[var(--line)] bg-[var(--brand-dark)] px-7 py-8 text-white sm:px-10 sm:py-10 lg:flex lg:items-center lg:justify-between">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.22em] text-[var(--brand-accent-soft)]">
              Start the conversation
            </p>
            <h2 className="mt-4 max-w-2xl text-4xl font-semibold tracking-[-0.05em] sm:text-[3rem]">
              Find the right starting point for the student.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-8 text-white/74">
              Reach out to discuss the most suitable program, current level, and
              how to begin with a clearer plan.
            </p>
          </div>

          <div className="mt-6 flex flex-col gap-4 sm:flex-row lg:mt-0">
            <a
              href="#contact"
              className="inline-flex items-center justify-center bg-white px-5 py-3 text-sm font-semibold text-[var(--brand-dark)]"
            >
              Request Info
            </a>
            <a
              href="#programs"
              className="inline-flex items-center justify-center border border-white/18 px-5 py-3 text-sm font-semibold text-white"
            >
              View Programs
            </a>
          </div>
        </div>
      </section>

      <section id="contact" className="section-shell pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.82fr_1.18fr]">
          <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-7 sm:p-8 lg:p-10">
            <SectionHeading
              eyebrow="Contact"
              title="Talk to us about the next step."
              description="Discuss programs, student fit, and how Agamya Eduventure can help create a clearer learning path."
            />

            <div className="mt-8 grid gap-4">
              {contactDetails.map((item) => (
                <div key={item.label} className="border-t border-[var(--line)] pt-5">
                  <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                    {item.label}
                  </p>
                  {item.href ? (
                    <a
                      href={item.href}
                      className="mt-3 block text-lg font-semibold text-[var(--text-primary)] transition hover:text-[var(--brand)]"
                    >
                      {item.value}
                    </a>
                  ) : (
                    <p className="mt-3 text-lg font-semibold text-[var(--text-primary)]">
                      {item.value}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </div>

          <div className="surface-card p-7 sm:p-8 lg:p-10">
            <p className="eyebrow">Enquiry Form</p>
            <h3 className="mt-5 text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
              Request information about programs and admissions.
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-8 text-[var(--text-secondary)]">
              This form is ready for the homepage and can be connected to the
              preferred enquiry workflow.
            </p>

            <form className="mt-8 grid gap-5 sm:grid-cols-2">
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 block text-sm font-semibold text-[var(--muted)]"
                >
                  Full name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Enter full name"
                  className="form-input"
                />
              </div>

              <div>
                <label
                  htmlFor="phone"
                  className="mb-2 block text-sm font-semibold text-[var(--muted)]"
                >
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Enter phone number"
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="interest"
                  className="mb-2 block text-sm font-semibold text-[var(--muted)]"
                >
                  Program interest
                </label>
                <input
                  id="interest"
                  name="interest"
                  type="text"
                  placeholder="Which program are you interested in?"
                  className="form-input"
                />
              </div>

              <div className="sm:col-span-2">
                <label
                  htmlFor="message"
                  className="mb-2 block text-sm font-semibold text-[var(--muted)]"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Tell us a little about the student or learning goal"
                  className="form-input resize-none"
                />
              </div>

              <div className="sm:col-span-2">
                <button type="submit" className="button-primary">
                  Send Enquiry
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </>
  );
}
