"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Mail, X } from "lucide-react";

const INITIAL_DELAY_MS = 5000;
const REPEAT_INTERVAL_MS = 120000;

const inputClass =
  "w-full rounded-lg border border-[#e5dfd4] bg-[#faf8f4] px-3 py-2 text-[13px] text-[#1b4d3e] outline-none transition placeholder:text-[#a8b4c2] focus:border-[#1b6b66]/50 focus:bg-white focus:ring-2 focus:ring-[#1b6b66]/10";

function Field({
  id,
  name,
  label,
  type = "text",
  placeholder,
  multiline = false,
  className = "",
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder: string;
  multiline?: boolean;
  className?: string;
}) {
  return (
    <label htmlFor={id} className={`block ${className}`}>
      <span className="mb-1 block text-[10px] font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
        {label}
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={2}
          required
          placeholder={placeholder}
          className={`${inputClass} resize-none leading-relaxed`}
        />
      ) : (
        <input id={id} name={name} type={type} required placeholder={placeholder} className={inputClass} />
      )}
    </label>
  );
}

export default function EnquiryPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    let intervalId: ReturnType<typeof setInterval> | undefined;

    const initialTimer = setTimeout(() => {
      setIsOpen(true);
      intervalId = setInterval(() => {
        setSubmitted(false);
        setIsOpen(true);
      }, REPEAT_INTERVAL_MS);
    }, INITIAL_DELAY_MS);

    return () => {
      clearTimeout(initialTimer);
      if (intervalId) clearInterval(intervalId);
    };
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
    setIsVisible(false);
    window.setTimeout(() => {
      setIsOpen(false);
      setSubmitted(false);
    }, 220);
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitted(true);
    window.setTimeout(handleClose, 1600);
  };

  if (!isOpen) return null;

  return (
    <>
      <button
        type="button"
        aria-label="Close enquiry form"
        className={`fixed inset-0 z-[9998] bg-[#0b1f1c]/20 transition-opacity duration-200 sm:bg-transparent ${
          isVisible ? "opacity-100" : "opacity-0"
        }`}
        onClick={handleClose}
      />

      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-popup-title"
        className={`fixed bottom-4 left-4 right-4 z-[10000] mx-auto max-w-[380px] transition-all duration-300 ease-out sm:bottom-6 sm:left-auto sm:right-6 ${
          isVisible ? "translate-y-0 opacity-100" : "translate-y-4 opacity-0"
        }`}
      >
        <div className="overflow-hidden rounded-[18px] border border-[#0d3d38]/15 bg-white shadow-[0_18px_48px_rgba(11,47,44,0.18),0_4px_12px_rgba(15,23,42,0.08)]">
          <div className="relative overflow-hidden bg-gradient-to-br from-[#0b2f2c] via-[#124a45] to-[#1a5c56] px-4 py-3.5">
            <div className="pointer-events-none absolute -right-6 -top-6 h-20 w-20 rounded-full bg-[#5eb8a8]/20 blur-2xl" />
            <div className="pointer-events-none absolute bottom-0 left-8 h-10 w-10 rounded-full bg-[#f39c12]/15 blur-xl" />

            <div className="relative flex items-start justify-between gap-3">
              <div className="min-w-0">
                <span className="inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/10 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4]">
                  <Mail className="h-3 w-3" strokeWidth={2.4} />
                  Enquire
                </span>
                <h2
                  id="enquiry-popup-title"
                  className="mt-2 text-[17px] font-bold leading-tight tracking-[-0.02em] !text-white"
                >
                  Start your learning journey
                </h2>
                <p className="mt-1 text-[11px] leading-relaxed text-white/72">
                  Quick form — we reply within 24 hours.
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

          {submitted ? (
            <div className="px-5 py-8 text-center">
              <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66]">
                <CheckCircle2 className="h-4 w-4" strokeWidth={2.2} />
              </div>
              <p className="mt-3 text-[15px] font-bold text-[#1b4d3e]">Thank you!</p>
              <p className="mt-1 text-[12px] text-[#5f6f82]">We&apos;ll be in touch shortly.</p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-2.5 px-4 py-3.5">
              <div className="grid grid-cols-2 gap-2.5">
                <Field id="enquiry-name" name="name" label="Name" placeholder="Your name" />
                <Field
                  id="enquiry-phone"
                  name="phone"
                  label="Phone"
                  type="tel"
                  placeholder="Phone no."
                />
              </div>

              <Field
                id="enquiry-email"
                name="email"
                label="Email"
                type="email"
                placeholder="you@email.com"
              />

              <Field id="enquiry-address" name="address" label="Address" placeholder="City, area" />

              <Field
                id="enquiry-message"
                name="message"
                label="Message"
                placeholder="What would you like to know?"
                multiline
              />

              <button
                type="submit"
                className="group mt-1 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-[#1b4d3e] px-4 py-2.5 text-[13px] font-semibold text-white shadow-[0_6px_18px_rgba(27,77,62,0.25)] transition hover:bg-[#164032]"
              >
                Send Enquiry
                <ArrowRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" strokeWidth={2.4} />
              </button>
            </form>
          )}
        </div>
      </div>
    </>
  );
}
