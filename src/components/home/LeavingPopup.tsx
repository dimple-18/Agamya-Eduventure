"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { ArrowRight, MessageCircle, X } from "lucide-react";

import { contactWhatsAppHref } from "./contact-data";

const SHOW_DELAY_MS = 60000;
const DISMISS_KEY = "agamya-leaving-popup-dismissed";

export default function LeavingPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    if (sessionStorage.getItem(DISMISS_KEY) === "1") return;

    const timer = setTimeout(() => {
      if (sessionStorage.getItem(DISMISS_KEY) === "1") return;
      setIsOpen(true);
    }, SHOW_DELAY_MS);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      setIsVisible(false);
      return;
    }

    const frame = requestAnimationFrame(() => setIsVisible(true));
    return () => cancelAnimationFrame(frame);
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") handleClose();
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen]);

  const handleClose = () => {
    sessionStorage.setItem(DISMISS_KEY, "1");
    setIsVisible(false);
    window.setTimeout(() => setIsOpen(false), 220);
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close leaving popup"
        className={`fixed inset-0 z-[9998] bg-[#0b1f1c]/25 transition-opacity duration-200 ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="leaving-popup-title"
        className={`fixed bottom-4 left-4 right-4 z-[10000] mx-auto max-w-[360px] transition-all duration-300 ease-out sm:bottom-6 sm:left-6 sm:right-auto ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[18px] border border-[#ebe5db] bg-white shadow-[0_18px_48px_rgba(11,47,44,0.16),0_4px_12px_rgba(15,23,42,0.08)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#3d2e1f] via-[#5c4528] to-[#7a5c35] px-4 py-3.5">
            <div className="pointer-events-none absolute -left-4 -top-4 h-16 w-16 rounded-full bg-[#f39c12]/20 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 right-6 h-12 w-12 rounded-full bg-white/10 blur-xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#fde8c8]">
                  Before you go
                </span>
                <h2
                  id="leaving-popup-title"
                  className="mt-2 text-[17px] font-bold leading-tight tracking-[-0.02em] !text-white"
                >
                  Leaving already?
                </h2>
                <p className="mt-1 text-[11px] leading-relaxed text-white/78">
                  Take a minute to explore programs or talk to our team — we&apos;re here to help
                  you choose the right path.
                </p>
              </div>
              <button
                type="button"
                onClick={handleClose}
                className="inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-white/80 transition hover:bg-white/20 hover:text-white"
                aria-label="Close"
              >
                <X className="h-3.5 w-3.5" strokeWidth={2.5} />
              </button>
            </div>
          </div>

          <div className="space-y-2 px-4 py-3.5">
            <Link
              href="/programs"
              onClick={handleClose}
              className="group inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1b4d3e] px-4 py-2.5 text-[13px] font-semibold !text-white shadow-[0_6px_18px_rgba(27,77,62,0.22)] transition hover:bg-[#164032] hover:!text-white"
            >
              Explore Programs
              <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
            </Link>

            <a
              href={contactWhatsAppHref}
              target="_blank"
              rel="noreferrer"
              onClick={handleClose}
              className="inline-flex w-full items-center justify-center gap-2 rounded-lg border border-[#1b4d3e]/20 bg-[#f8f6f1] px-4 py-2.5 text-[13px] font-semibold text-[#1b4d3e] transition hover:bg-[#eef5f3]"
            >
              <MessageCircle className="h-3.5 w-3.5" strokeWidth={2.2} />
              Chat on WhatsApp
            </a>

            <button
              type="button"
              onClick={handleClose}
              className="w-full py-1.5 text-[11px] font-medium text-[#8a9aad] transition hover:text-[#5f6f82]"
            >
              No thanks, I&apos;ll keep browsing
            </button>
          </div>
        </div>
      </div>
    </>
  );
}
