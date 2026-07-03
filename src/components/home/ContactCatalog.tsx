import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import {
  BookOpen,
  Clock,
  CreditCard,
  ExternalLink,
  Headphones,
  Mail,
  MapPin,
  MessageSquare,
  Phone,
  Send,
  User,
} from "lucide-react";

import {
  contactAddress,
  contactMapsLink,
  contactPhone,
  contactPhoneHref,
  contactProgramsText,
  contactWhatsAppHref,
  heroHighlights,
} from "./contact-data";

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
          placeholder={placeholder}
          className={`${inputClass} resize-none py-1 leading-relaxed`}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={type}
          placeholder={placeholder}
          className={`${inputClass} py-2.5`}
        />
      )}
    </div>
  );
}

function InfoCard({
  label,
  children,
  icon: Icon,
  action,
}: {
  label: string;
  children: ReactNode;
  icon: typeof Phone;
  action?: { label: string; href: string };
}) {
  return (
    <div className="flex items-start gap-3 rounded-xl border border-[#ebe5db] bg-white p-4 shadow-[0_4px_16px_rgba(15,23,42,0.04)]">
      <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66]">
        <Icon className="h-4 w-4" strokeWidth={2.1} />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7c8f]">{label}</p>
        <div className="mt-1 text-[14px] font-semibold leading-relaxed text-[#1b4d3e]">{children}</div>
      </div>
      {action ? (
        <a
          href={action.href}
          className="shrink-0 rounded-lg border border-[#1b4d3e]/20 bg-[#f8f6f1] px-3 py-1.5 text-[12px] font-semibold text-[#1b4d3e] transition-colors hover:bg-[#1b4d3e] hover:text-white"
        >
          {action.label}
        </a>
      ) : null}
    </div>
  );
}

export default function ContactCatalog() {
  return (
    <div className="bg-[#fdfbf7] pb-20">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="/hero/contact-hero.png"
                alt="Contact us workspace"
                fill
                className="object-cover object-center"
                priority
                sizes="1280px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />

              <div className="pointer-events-none absolute -right-8 top-12 hidden h-32 w-32 rounded-full border border-dashed border-[#5eb8a8]/40 lg:block" />
              <div className="pointer-events-none absolute bottom-16 right-[18%] hidden h-20 w-20 rounded-full border border-dashed border-[#f39c12]/35 lg:block" />

              <div className="relative grid gap-8 p-6 sm:p-8 lg:grid-cols-[1fr_320px] lg:items-center lg:p-10">
                <div className="max-w-[560px]">
                  <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                    Contact Agamya
                  </span>
                  <h1 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[40px] lg:text-[46px]">
                    More than just a class,
                    <br />
                    a stronger place
                    <br />
                    to begin.
                  </h1>
                  <p className="mt-4 max-w-[500px] text-[15px] leading-[1.7] text-white/82">
                    Get guidance on programs, admissions, student fit, projects, and the best
                    next step for a clearer learning journey.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <a
                      href="#contact-form"
                      className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-6 py-3.5 text-[14px] font-semibold !text-white shadow-[0_8px_20px_rgba(27,77,62,0.28)] transition-colors hover:bg-[#164032] hover:!text-white"
                    >
                      <Send className="h-4 w-4" strokeWidth={2.25} />
                      Send a Message
                    </a>
                    <Link
                      href="/programs"
                      className="inline-flex items-center gap-2 rounded-xl border border-white/35 bg-white/12 px-6 py-3.5 text-[14px] font-semibold !text-white backdrop-blur-sm transition-colors hover:bg-white/20 hover:!text-white"
                    >
                      View Programs
                    </Link>
                  </div>
                  <p className="mt-4 text-[13px] text-white/72">
                    We usually reply quickly and help you choose the right starting point.
                  </p>
                </div>

                <div className="rounded-[20px] border border-white/35 bg-white/12 p-2 backdrop-blur-sm lg:absolute lg:right-8 lg:top-1/2 lg:w-[300px] lg:-translate-y-1/2 xl:right-10">
                  {heroHighlights.map((item, index) => {
                    const toneClass =
                      item.tone === "orange"
                        ? "bg-[#f39c12]/20 text-[#f5c084]"
                        : item.tone === "blue"
                          ? "bg-[#3b82f6]/20 text-[#93c5fd]"
                          : "bg-[#1b6b66]/30 text-[#8fe0d4]";

                    return (
                      <div
                        key={item.title}
                        className={`flex items-center gap-3 px-3 py-3.5 ${
                          index < heroHighlights.length - 1 ? "border-b border-white/20" : ""
                        }`}
                      >
                        <span
                          className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full ${toneClass}`}
                        >
                          <Clock className="h-4 w-4" strokeWidth={2.1} />
                        </span>
                        <div>
                          <p className="text-[13px] font-bold text-white">{item.title}</p>
                          <p className="text-[12px] text-white/72">{item.detail}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Main contact card */}
          <section className="mt-10 rounded-[24px] border border-[#ebe5db] bg-white p-6 shadow-[0_10px_36px_rgba(15,23,42,0.06)] sm:p-8 lg:p-10">
            <div className="grid gap-10 lg:grid-cols-[1.05fr_0.95fr] lg:gap-12">
              <div id="contact-form">
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66]">
                    <Mail className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <div>
                    <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#1b4d3e] sm:text-[28px]">
                      Get in Touch
                    </h2>
                    <p className="mt-2 max-w-lg text-[14px] leading-relaxed text-[#5f6f82]">
                      Fill out the form and we&apos;ll get back to you with the right guidance.
                    </p>
                  </div>
                </div>

                <form className="mt-8 grid gap-4">
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
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-6 py-3.5 text-[15px] font-semibold text-white shadow-[0_8px_22px_rgba(27,77,62,0.22)] transition-colors hover:bg-[#164032]"
                  >
                    <Send className="h-4 w-4" strokeWidth={2.25} />
                    Submit Message
                  </button>

                  <p className="text-center text-[12px] text-[#8a9aad]">
                    Your information is safe and will never be shared.
                  </p>
                </form>
              </div>

              <div>
                <div className="flex items-start gap-3">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66]">
                    <Headphones className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <div>
                    <h2 className="text-[26px] font-bold tracking-[-0.02em] text-[#1b4d3e] sm:text-[28px]">
                      Connect with Us
                    </h2>
                    <p className="mt-2 text-[14px] leading-relaxed text-[#5f6f82]">
                      For support, program questions, or admissions guidance, reach out using the
                      details below.
                    </p>
                  </div>
                </div>

                <div className="mt-8 grid gap-3">
                  <InfoCard
                    label="Phone"
                    icon={Phone}
                    action={{ label: "Call Now", href: contactPhoneHref }}
                  >
                    <a href={contactPhoneHref} className="hover:text-[#1b6b66]">
                      {contactPhone}
                    </a>
                  </InfoCard>

                  <InfoCard
                    label="WhatsApp"
                    icon={MessageSquare}
                    action={{ label: "Chat Now", href: contactWhatsAppHref }}
                  >
                    <a
                      href={contactWhatsAppHref}
                      target="_blank"
                      rel="noreferrer"
                      className="hover:text-[#1b6b66]"
                    >
                      Chat on WhatsApp
                    </a>
                  </InfoCard>

                  <InfoCard label="Programs" icon={BookOpen}>
                    {contactProgramsText}
                  </InfoCard>

                  <InfoCard label="Response Time" icon={Clock}>
                    Within 24 hrs
                  </InfoCard>

                  <InfoCard label="Support Type" icon={Headphones}>
                    Phone / Chat / Email
                  </InfoCard>

                  <InfoCard label="Payment Method" icon={CreditCard}>
                    Online / Offline
                  </InfoCard>

                  <InfoCard label="Location" icon={MapPin}>
                    <span className="font-semibold text-[#1b4d3e]">Agamya Eduventure</span>
                    <br />
                    <span className="font-normal text-[#5f6f82]">{contactAddress}</span>
                  </InfoCard>

                  <a
                    href={contactMapsLink}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex w-full items-center justify-center gap-2 rounded-xl border border-[#1b4d3e]/25 bg-[#f8f6f1] px-5 py-3 text-[14px] font-semibold text-[#1b4d3e] transition-colors hover:bg-[#1b4d3e] hover:text-white"
                  >
                    Open in Google Maps
                    <ExternalLink className="h-4 w-4" strokeWidth={2.1} />
                  </a>
                </div>
              </div>
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="mt-8 overflow-hidden rounded-[22px] border border-[#ebe5db] bg-white p-6 shadow-[0_8px_28px_rgba(15,23,42,0.06)] sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10">
              <div className="relative hidden h-32 w-32 shrink-0 lg:block">
                <Image
                  src="/hero/contact-support-icon.png"
                  alt="Contact support"
                  width={128}
                  height={128}
                  className="h-32 w-32 object-contain"
                />
              </div>

              <div>
                <h2 className="text-[24px] font-bold tracking-[-0.02em] text-[#1b4d3e] sm:text-[26px]">
                  Let&apos;s help you take the next step.
                </h2>
                <p className="mt-2 max-w-xl text-[14px] leading-relaxed text-[#5f6f82]">
                  Whether you&apos;re exploring options or ready to start, we&apos;re here to guide
                  you.
                </p>
                <div className="mt-4 flex flex-wrap gap-2">
                  {["Personalized Guidance", "Right Program Match", "Career Support"].map(
                    (pill) => (
                      <span
                        key={pill}
                        className="rounded-full border border-[#e8e2d8] bg-[#f8f6f1] px-3 py-1.5 text-[12px] font-semibold text-[#3f4f61]"
                      >
                        {pill}
                      </span>
                    ),
                  )}
                </div>
              </div>

              <div className="text-center lg:text-right">
                <a
                  href={contactWhatsAppHref}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white shadow-[0_8px_22px_rgba(27,77,62,0.22)] transition-colors hover:bg-[#164032] hover:!text-white lg:w-auto"
                >
                  <svg viewBox="0 0 24 24" aria-hidden className="h-4 w-4 fill-current">
                    <path d="M20.52 3.48A11.86 11.86 0 0 0 12.07 0C5.49 0 .14 5.35.14 11.93c0 2.1.55 4.16 1.6 5.98L0 24l6.26-1.64a11.87 11.87 0 0 0 5.81 1.48h.01c6.58 0 11.93-5.35 11.93-11.93 0-3.19-1.24-6.19-3.49-8.43Zm-8.45 18.35h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.72.98 1-3.63-.23-.38a9.9 9.9 0 0 1-1.52-5.28C2.2 6.44 6.58 2.06 12.07 2.06c2.64 0 5.13 1.03 7 2.9a9.84 9.84 0 0 1 2.9 6.99c0 5.49-4.38 9.88-9.9 9.88Zm5.43-7.42c-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.66.15-.2.3-.76.97-.94 1.17-.17.2-.35.22-.64.08-.3-.15-1.24-.46-2.37-1.47a8.84 8.84 0 0 1-1.64-2.04c-.17-.3-.02-.46.13-.6.13-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.08-.15-.67-1.62-.92-2.22-.24-.58-.48-.5-.66-.5h-.56c-.2 0-.52.08-.8.37-.27.3-1.05 1.03-1.05 2.5 0 1.47 1.08 2.9 1.23 3.1.15.2 2.12 3.24 5.14 4.55.72.31 1.28.5 1.72.64.72.23 1.38.2 1.9.12.58-.09 1.76-.72 2-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z" />
                  </svg>
                  Talk to Our Team
                </a>
                <p className="mt-2 text-[12px] text-[#6b7c8f]">We&apos;re here to help you succeed.</p>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
