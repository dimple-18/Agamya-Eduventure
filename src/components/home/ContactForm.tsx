"use client";

import { useState } from "react";
import { Mail, MessageSquare, Phone, Send, User } from "lucide-react";

function IconField({
  id,
  name,
  type = "text",
  placeholder,
  icon: Icon,
  multiline = false,
}: {
  id: string;
  name: string;
  type?: string;
  placeholder: string;
  icon: typeof User;
  multiline?: boolean;
}) {
  const wrapperClass =
    "flex w-full gap-3 rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 transition focus-within:border-[#1b6b66]/45 focus-within:bg-white focus-within:ring-4 focus-within:ring-[#1b6b66]/8";

  const inputClass =
    "min-w-0 flex-1 border-0 bg-transparent text-[14px] text-[#1b4d3e] outline-none placeholder:text-[#9aa8b8]";

  return (
    <div className={`${wrapperClass} ${multiline ? "items-start py-3" : "items-center py-1"}`}>
      <span
        className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-[#e8f4f3] text-[#1b6b66] ${
          multiline ? "mt-0.5" : ""
        }`}
      >
        <Icon className="h-4 w-4" strokeWidth={2.1} />
      </span>
      {multiline ? (
        <textarea
          id={id}
          name={name}
          rows={5}
          required
          placeholder={placeholder}
          className={`${inputClass} resize-none py-1 leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          required={name !== "phone"}
          placeholder={placeholder}
          className={`${inputClass} py-2.5`}
        />
      )}
    </div>
  );
}

export default function ContactForm() {
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitting(true);

    const formData = new FormData(event.currentTarget);
    await fetch("/api/enquiries", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(formData.get("name") ?? ""),
        email: String(formData.get("email") ?? ""),
        phone: String(formData.get("phone") ?? ""),
        message: String(formData.get("message") ?? ""),
        source: "contact_page",
      }),
    });

    setSubmitting(false);
    setSubmitted(true);
    event.currentTarget.reset();
  }

  if (submitted) {
    return (
      <div className="mt-8 rounded-2xl border border-[#cfe0de] bg-[#e8f4f3] px-5 py-8 text-center">
        <p className="text-[18px] font-bold text-[#1b4d3e]">Message sent</p>
        <p className="mt-2 text-sm text-[#5f6f82]">We&apos;ll get back to you within 24 hours.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="mt-8 grid gap-4">
      <IconField id="name" name="name" placeholder="Your Name" icon={User} />
      <IconField
        id="email"
        name="email"
        type="email"
        placeholder="Your Email Address"
        icon={Mail}
      />
      <IconField
        id="phone"
        name="phone"
        type="tel"
        placeholder="Phone Number"
        icon={Phone}
      />
      <IconField
        id="message"
        name="message"
        placeholder="How can we help you?"
        icon={MessageSquare}
        multiline
      />

      <p className="text-[13px] leading-relaxed text-[#6b7c8f]">
        Share your current level, program of interest, or any question.
      </p>

      <button
        type="submit"
        disabled={submitting}
        className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_22px_rgba(27,77,62,0.22)] transition-colors hover:bg-[#164032] disabled:opacity-60 cta-pulse"
      >
        <Send className="h-4 w-4" strokeWidth={2.25} />
        {submitting ? "Sending..." : "Submit Message"}
      </button>

      <p className="text-center text-[12px] text-[#8a9aad]">
        Your information is safe and will never be shared.
      </p>
    </form>
  );
}
