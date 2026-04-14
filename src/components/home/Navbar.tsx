import Link from "next/link";

import { navigationItems } from "./content";

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-[var(--line)] bg-[rgba(255,255,255,0.94)] px-4 py-4 backdrop-blur-sm sm:px-6 lg:px-8">
      <div className="mx-auto flex max-w-7xl items-center justify-between gap-6">
        <Link href="/" className="flex min-w-0 items-center gap-3">
          <span className="flex h-11 w-11 items-center justify-center border border-[var(--line-strong)] bg-[var(--surface-soft)] text-sm font-semibold tracking-[0.22em] text-[var(--brand)]">
            AE
          </span>
          <span className="min-w-0">
            <span className="block truncate text-[11px] font-semibold uppercase tracking-[0.26em] text-[var(--muted)]">
              Agamya
            </span>
            <span className="block truncate text-lg font-semibold tracking-[-0.02em] text-[var(--text-primary)]">
              Eduventure
            </span>
          </span>
        </Link>

        <nav aria-label="Primary" className="hidden items-center gap-8 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/#contact"
            className="text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
          >
            Request Info
          </Link>
          <Link href="/#contact" className="button-primary">
            Enquire Now
          </Link>
        </div>

        <details className="group lg:hidden">
          <summary className="flex h-10 w-10 cursor-pointer list-none items-center justify-center border border-[var(--line-strong)] bg-white text-[var(--text-primary)]">
            <span className="sr-only">Open navigation menu</span>
            <span className="flex flex-col gap-1.5">
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
              <span className="h-0.5 w-5 rounded-full bg-current" />
            </span>
          </summary>

          <div className="absolute inset-x-4 top-[4.75rem] z-40 border border-[var(--line)] bg-white p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)] sm:inset-x-6">
            <nav aria-label="Mobile primary" className="grid gap-2">
              {navigationItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="px-2 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-[var(--line)] pt-4">
              <Link href="/#contact" className="button-primary w-full text-center">
                Enquire Now
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
