"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigationItems } from "./content";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 border-b border-[var(--line)] px-4 backdrop-blur-sm transition-all duration-300 sm:px-6 lg:px-8 ${
        isScrolled
          ? "bg-[rgba(255,255,255,0.97)] py-3 shadow-[0_6px_22px_rgba(15,23,42,0.06)]"
          : "bg-[rgba(255,255,255,0.94)] py-4"
      }`}
    >
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
              scroll
              onClick={() => {
                if (!item.href.includes("#") && item.href === pathname) {
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }
              }}
              className="text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://wa.me/917004704078"
            target="_blank"
            rel="noreferrer"
            className="rounded-full border border-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:!text-white"
          >
            WhatsApp
          </Link>
          <Link href="/contact" className="button-primary">
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
                  scroll
                  onClick={() => {
                    if (!item.href.includes("#") && item.href === pathname) {
                      window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                    }
                  }}
                  className="px-2 py-3 text-sm font-medium text-[var(--text-secondary)] transition hover:text-[var(--text-primary)]"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <div className="mt-4 border-t border-[var(--line)] pt-4">
              <Link href="/contact" className="button-primary w-full text-center">
                Enquire Now
              </Link>
            </div>
          </div>
        </details>
      </div>
    </header>
  );
}
