import Link from "next/link";

import BrandLogo from "./BrandLogo";
import { appliedPrograms, enterprisePrograms, navigationItems, programCards } from "./content";
import { pageContainerClass, pageGutterClass } from "./section-layout";

const footerProgramLinks = [
  { label: "Core Programs", href: "/programs" },
  { label: "Technical Modules", href: "/programs" },
  { label: "Career Support", href: "/programs" },
  { label: "Projects & Certifications", href: "/programs" },
  { label: "Corporate & Advanced Courses", href: "/programs" },
  { label: "View All Programs", href: "/programs" },
] as const;

const footerPopularPrograms = [
  programCards.find((program) => program.title === "Web Development"),
  programCards.find((program) => program.title === "Java Programming"),
  enterprisePrograms.find((program) => program.title === "Basic Computers"),
  appliedPrograms.find((program) => program.title === "Interview Preparation"),
].filter((program): program is NonNullable<typeof program> => Boolean(program));

export default function Footer() {
  return (
    <footer className={`bg-[#fdfbf7] pb-8 pt-0 ${pageGutterClass}`}>
      <div
        className={`${pageContainerClass} rounded-[20px] border border-[#ebe5db] bg-white px-5 py-7 shadow-[0_6px_22px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10`}
      >
        <div className="grid grid-cols-2 gap-x-6 gap-y-8 md:grid-cols-4 md:gap-10 lg:grid-cols-[1.08fr_0.5fr_0.72fr_0.72fr_0.88fr]">
          <div className="col-span-2 md:col-span-4 lg:col-span-1">
            <BrandLogo href="/" size={52} showText={false} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Agamya Eduventure
            </p>
            <h2 className="mt-4 max-w-sm text-[30px] font-semibold leading-tight tracking-[-0.04em] text-[var(--text-primary)] sm:text-4xl sm:leading-10 sm:tracking-[-0.05em]">
              A more grounded place to begin learning technology.
            </h2>
            <p className="mt-3 max-w-md text-base leading-7 text-[var(--text-secondary)] sm:mt-5 sm:leading-8">
              Built for students who want a clearer, more supported, and more
              serious start in coding.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Navigation
            </p>
            <div className="mt-3 grid sm:mt-5 sm:gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:py-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Program Categories
            </p>
            <div className="mt-3 grid sm:mt-5 sm:gap-3">
              {footerProgramLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:py-0"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Popular Tracks
            </p>
            <div className="mt-3 grid sm:mt-5 sm:gap-3">
              {footerPopularPrograms.map((program) => (
                <Link
                  key={program.title}
                  href="/programs"
                  className="py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:py-0"
                >
                  {program.title}
                </Link>
              ))}
            </div>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Contact
            </p>
            <div className="mt-3 grid sm:mt-5 sm:gap-3">
              <a
                href="tel:7004704078"
                className="py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:py-0"
              >
                Phone: 7004704078
              </a>
              <a
                href="https://wa.me/917004704078"
                className="py-2 text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)] sm:py-0"
              >
                WhatsApp: 7004704078
              </a>
              <Link
                href="/contact"
                className="py-2 text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)] sm:py-0"
              >
                Request information
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-8 border-t border-[var(--line)] pt-6 text-sm sm:mt-10 text-[var(--text-secondary)]">
          © 2026 Agamya Eduventure. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
