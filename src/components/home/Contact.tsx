import Link from "next/link";

import { contactDetails } from "./content";
import { pageContainerClass, pageGutterClass } from "./section-layout";

export default function Contact() {
  return (
    <>
      <section className={`bg-[#fdfbf7] pb-10 pt-14 ${pageGutterClass}`}>
        <div
          className={`${pageContainerClass} grid gap-8 rounded-[20px] border border-[#ebe5db] bg-white px-7 py-8 shadow-[0_6px_22px_rgba(15,23,42,0.06)] sm:px-10 sm:py-10 lg:grid-cols-[0.9fr_1.1fr] lg:items-end`}
        >
          <div>
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              Contact
            </p>
            <h2 className="mt-5 max-w-xl text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[40px]">
              Start with one conversation and a clearer next step.
            </h2>
            <p className="mt-5 max-w-xl text-[15px] leading-[1.75] text-[#5f6f82]">
              Reach out to discuss the student&apos;s current level, suitable program options,
              and how Agamya can help create a stronger learning path.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {contactDetails.map((item) => (
              <div
                key={item.label}
                className="border-t border-[#f0ebe3] pt-4 sm:border-l sm:border-t-0 sm:pl-5 sm:pt-0"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.14em] text-[#6b7c8f]">
                  {item.label}
                </p>
                {item.href ? (
                  <a
                    href={item.href}
                    className="mt-3 block text-[15px] font-semibold text-[#1b4d3e] transition hover:text-[#1b6b66]"
                  >
                    {item.value}
                  </a>
                ) : (
                  <p className="mt-3 text-[15px] font-semibold leading-relaxed text-[#1b4d3e]">
                    {item.value}
                  </p>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className={`pb-20 pt-0 ${pageGutterClass}`}>
        <div className={`${pageContainerClass} flex justify-end`}>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032]"
          >
            View Contact Page
          </Link>
        </div>
      </section>
    </>
  );
}
