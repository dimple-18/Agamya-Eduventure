"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { navigationItems } from "./content";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 14);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (href: string) =>
    href === "/" ? pathname === "/" : pathname.startsWith(href);

  return (
    <header
      className={`sticky top-0 z-[70] border-b border-[var(--line)] px-4 backdrop-blur-md transition-all duration-300 sm:px-6 lg:px-8 ${
        isScrolled
          ? "bg-[rgba(250,247,241,0.92)] py-3 shadow-[0_10px_30px_rgba(15,23,42,0.08)]"
          : "bg-[rgba(250,247,241,0.84)] py-4"
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

        <nav aria-label="Primary" className="hidden items-center gap-7 lg:flex">
          {navigationItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              scroll={false}
              onClick={() => {
                if (!item.href.includes("#") && item.href === pathname) {
                  window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                }
              }}
              className={`relative py-2 text-[0.96rem] font-semibold tracking-[0.01em] transition ${
                isActive(item.href)
                  ? "text-[var(--brand-dark)]"
                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
              }`}
            >
              {item.label}
              <span
                className={`absolute -bottom-[0.45rem] left-0 h-[2.5px] rounded-full bg-[var(--brand)] transition-all duration-250 ${
                  isActive(item.href) ? "w-full opacity-100" : "w-0 opacity-0"
                }`}
              />
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="https://wa.me/917004704078"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-2 rounded-full border border-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:!text-white"
          >
            <span className="inline-flex h-4 w-4 items-center justify-center">
              <svg
                viewBox="0 0 24 24"
                aria-hidden="true"
                className="h-4 w-4 fill-current"
              >
                <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.81 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43Zm-8.45 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.63-.23-.38a9.9 9.9 0 0 1-1.52-5.28C2.2 6.44 6.58 2.06 12.07 2.06c2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 6.99c0 5.49-4.38 9.88-9.9 9.88Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.64.08-.3-.15-1.24-.46-2.37-1.47a8.84 8.84 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
              </svg>
            </span>
            WhatsApp
          </Link>
          <Link href="/contact" className="button-primary">
            Enquire Now
          </Link>
        </div>

        <button
          type="button"
          aria-expanded={isMobileOpen}
          aria-controls="mobile-nav-panel"
          aria-label={isMobileOpen ? "Close navigation menu" : "Open navigation menu"}
          onClick={() => setIsMobileOpen((current) => !current)}
          className="grid h-10 w-10 place-items-center border border-[var(--line-strong)] bg-white text-[var(--text-primary)] transition hover:border-[var(--brand)] hover:text-[var(--brand)] lg:hidden"
        >
          <span className="flex flex-col gap-1.5">
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${isMobileOpen ? "translate-y-2 rotate-45" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${isMobileOpen ? "opacity-0" : ""}`}
            />
            <span
              className={`h-0.5 w-5 rounded-full bg-current transition ${isMobileOpen ? "-translate-y-2 -rotate-45" : ""}`}
            />
          </span>
        </button>
      </div>

      <div
        id="mobile-nav-panel"
        className={`overflow-hidden transition-all duration-300 ease-out lg:hidden ${
          isMobileOpen ? "max-h-[34rem] opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="mx-auto mt-3 max-w-7xl border border-[var(--line)] bg-[rgba(255,255,255,0.96)] p-4 shadow-[0_18px_40px_rgba(15,23,42,0.08)]">
          <nav aria-label="Mobile primary" className="grid gap-1">
            {navigationItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                scroll={false}
                onClick={() => {
                  setIsMobileOpen(false);
                  if (!item.href.includes("#") && item.href === pathname) {
                    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
                  }
                }}
                className={`px-2 py-3 text-[0.95rem] font-semibold transition ${
                  isActive(item.href)
                    ? "text-[var(--brand-dark)]"
                    : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                }`}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="mt-4 grid gap-2 border-t border-[var(--line)] pt-4">
            <Link
              href="https://wa.me/917004704078"
              target="_blank"
              rel="noreferrer"
              className="inline-flex w-full items-center justify-center gap-2 rounded-full border border-[var(--brand)] px-5 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:!text-white"
            >
              <span className="inline-flex h-4 w-4 items-center justify-center">
                <svg
                  viewBox="0 0 24 24"
                  aria-hidden="true"
                  className="h-4 w-4 fill-current"
                >
                  <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.81 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43Zm-8.45 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.63-.23-.38a9.9 9.9 0 0 1-1.52-5.28C2.2 6.44 6.58 2.06 12.07 2.06c2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 6.99c0 5.49-4.38 9.88-9.9 9.88Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.64.08-.3-.15-1.24-.46-2.37-1.47a8.84 8.84 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                </svg>
              </span>
              WhatsApp
            </Link>
            <Link href="/contact" className="button-primary w-full text-center">
              Enquire Now
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
