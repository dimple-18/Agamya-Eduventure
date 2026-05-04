import type { Metadata } from "next";
import Link from "next/link";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "Contact | Agamya Eduventure",
  description:
    "Contact Agamya Eduventure to discuss programs, student fit, admissions, and the right next step for learning.",
};

export default function ContactPage() {
  const address =
    "2nd floor, R.S. Tower, New Kalimati Rd, Hirasingh Bagan, Sakchi, Jamshedpur, Jharkhand 831001, India";
  const mapsQuery = encodeURIComponent(`Agamya Eduventure, ${address}`);
  const mapsLink = `https://www.google.com/maps/search/?api=1&query=${mapsQuery}`;
  const mapsEmbed = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;

  return (
    <main className="page-shell">
      <Navbar />

      <section className="section-shell pt-6 sm:pt-8">
        <div className="mx-auto max-w-7xl overflow-hidden border border-[var(--line)] bg-[var(--banner-bg)] text-white">
          <div className="px-6 py-14 text-center sm:px-10 sm:py-20">
            <p className="text-xs font-semibold uppercase tracking-[0.24em] text-white/72">
              Contact Agamya
            </p>
            <h1 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold tracking-[-0.05em] sm:text-5xl lg:text-[4rem]">
              More than just a class, a stronger place to begin.
            </h1>
            <p className="mx-auto mt-5 max-w-3xl text-base leading-8 text-white/84 sm:text-lg">
              Get guidance on programs, admissions, student fit, projects, and
              the best next step for a clearer learning journey.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
              <a href="#contact-form" className="bg-white px-8 py-3 text-sm font-semibold text-[#20345f] transition hover:bg-white/92">
                Get Started
              </a>
              <Link href="/programs" className="border border-white/32 px-8 py-3 text-sm font-semibold text-white transition hover:bg-white/10">
                View Programs
              </Link>
            </div>
            <p className="mt-5 text-sm text-white/72">
              We usually reply quickly and help you choose the right starting point.
            </p>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto grid max-w-7xl gap-8 border border-[var(--line)] bg-[#f3f5f8] px-6 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1.08fr_0.92fr]">
          <div id="contact-form">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
              Get in Touch
            </h2>
            <p className="mt-4 max-w-xl text-base leading-8 text-[var(--text-secondary)]">
              Fill out the form and we&apos;ll get back to you with guidance on
              the right program, current level, and next steps.
            </p>

            <form className="mt-8 grid gap-5">
              <div>
                <label htmlFor="name" className="sr-only">
                  Name
                </label>
                <input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="Name"
                  className="form-input rounded-none px-4 py-4"
                />
              </div>

              <div>
                <label htmlFor="email" className="sr-only">
                  Email address
                </label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Your email address"
                  className="form-input rounded-none px-4 py-4"
                />
              </div>

              <div>
                <label htmlFor="phone" className="sr-only">
                  Phone number
                </label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="Phone number"
                  className="form-input rounded-none px-4 py-4"
                />
              </div>

              <div>
                <label htmlFor="message" className="sr-only">
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  rows={5}
                  placeholder="Message"
                  className="form-input resize-none rounded-none px-4 py-4"
                />
              </div>

              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm leading-7 text-[var(--text-secondary)]">
                  Share the student&apos;s current level or the program you want to ask about.
                </p>
                <button
                  type="submit"
                  className="bg-[#e45f73] px-8 py-3 text-sm font-semibold text-white transition hover:bg-[#d94d62]"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>

          <div className="lg:pl-10">
            <h2 className="text-3xl font-semibold tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl">
              Connect with us
            </h2>
            <p className="mt-4 text-base leading-8 text-[var(--text-secondary)]">
              For support, program questions, or admissions guidance, reach out
              directly using the details below.
            </p>

            <div className="mt-8 grid gap-6">
              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Phone
                </p>
                <a
                  href="tel:7004704078"
                  className="mt-2 block text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] transition hover:text-[var(--brand)]"
                >
                  7004704078
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  WhatsApp
                </p>
                <a
                  href="https://wa.me/917004704078"
                  className="mt-2 block text-xl font-semibold tracking-[-0.03em] text-[var(--text-primary)] transition hover:text-[var(--brand)]"
                >
                  Chat on WhatsApp
                </a>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Programs
                </p>
                <p className="mt-2 max-w-md text-base leading-8 text-[var(--text-secondary)]">
                  Web Development, Java, Python, Database, Internship,
                  Certification, and Project Guidance.
                </p>
              </div>

              <div>
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
                  Location
                </p>
                <p className="mt-2 max-w-md text-base leading-8 text-[var(--text-secondary)]">
                  Agamya Eduventure
                  <br />
                  {address}
                </p>
              </div>

              <div className="pt-2">
                <a
                  href={mapsLink}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center border border-[var(--brand)] px-6 py-3 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                >
                  Open in Google Maps
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="section-shell pt-0">
        <div className="mx-auto max-w-7xl overflow-hidden border border-[var(--line)] bg-[#edf1f6]">
          <div className="flex items-center justify-between border-b border-[var(--line)] px-5 py-4 sm:px-6">
            <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--muted)]">
              Google Location
            </p>
            <a
              href={mapsLink}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
            >
              Open in Maps
            </a>
          </div>

          <div className="h-[24rem] sm:h-[30rem]">
            <iframe
              title="Agamya Eduventure location"
              src={mapsEmbed}
              className="h-full w-full border-0"
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
