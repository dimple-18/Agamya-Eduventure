import Link from "next/link";

import { navigationItems, programCards } from "./content";

export default function Footer() {
  return (
    <footer className="section-shell pb-8 pt-0">
      <div className="mx-auto max-w-7xl border border-[var(--line)] bg-white px-7 py-8 sm:px-10 sm:py-10">
        <div className="grid gap-10 lg:grid-cols-[1.15fr_0.55fr_0.8fr_0.9fr]">
          <div>
            <p className="text-sm font-semibold uppercase tracking-[0.24em] text-[var(--muted)]">
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
              Programs
            </p>
            <div className="mt-5 grid gap-3">
              {programCards.slice(0, 4).map((program) => (
                <p key={program.title} className="text-sm text-[var(--text-secondary)]">
                  {program.title}
                </p>
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
                href="/#contact"
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
