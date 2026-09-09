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
        className={`${pageContainerClass} rounded-[20px] border border-[#ebe5db] bg-white px-7 py-8 shadow-[0_6px_22px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10`}
      >
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.5fr_0.72fr_0.72fr_0.88fr]">
          <div>
            <BrandLogo href="/" size={52} showText={false} />
            <p className="mt-4 text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
              Agamya Eduventure
            </p>
            <h2 className="mt-4 max-w-sm text-4xl font-semibold tracking-[-0.05em] text-[var(--text-primary)]">
              A more grounded place to begin learning technology.
            </h2>
            <p className="mt-5 max-w-md text-base leading-8 text-[var(--text-secondary)]">
              Built for students who want a clearer, more supported, and more
              serious start in coding.
            </p>
          </div>

          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-[var(--muted)]">
              Navigation
            </p>
            <div className="mt-5 grid gap-3">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
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
            <div className="mt-5 grid gap-3">
              {footerProgramLinks.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
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
            <div className="mt-5 grid gap-3">
              {footerPopularPrograms.map((program) => (
                <Link
                  key={program.title}
                  href="/programs"
                  className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
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
            <div className="mt-5 grid gap-3">
              <a
                href="tel:7004704078"
                className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                Phone: 7004704078
              </a>
              <a
                href="https://wa.me/917004704078"
                className="text-sm text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
              >
                WhatsApp: 7004704078
              </a>
              <Link
                href="/contact"
                className="text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
              >
                Request information
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-10 border-t border-[var(--line)] pt-6 text-sm text-[var(--text-secondary)]">
          © 2026 Agamya Eduventure. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
