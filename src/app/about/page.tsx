import type { Metadata } from "next";
import Image from "next/image";

import About from "../../components/home/About";
import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";

export const metadata: Metadata = {
  title: "About Us | Agamya Eduventure",
  description:
    "Learn more about Agamya Eduventure, our teaching approach, student support philosophy, and practical learning environment.",
};

export default function AboutPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="bg-[#fdfbf7] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="https://media.istockphoto.com/id/1304225026/photo/top-view-of-mobile-phone-glasses-pen-and-notebook-written-with-about-us-on-wooden-background.jpg?s=612x612&w=0&k=20&c=YhbAlzZONGfWt-Qm5W10Z0-Z8waHkblhtZEbRh4E0bM="
                alt="About us workspace with notebook and phone"
                fill
                className="object-cover object-right"
                priority
                sizes="1240px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />

              <div className="pointer-events-none absolute -right-8 top-12 hidden h-32 w-32 rounded-full border border-dashed border-[#5eb8a8]/40 lg:block" />
              <div className="pointer-events-none absolute bottom-16 right-[18%] hidden h-20 w-20 rounded-full border border-dashed border-[#f39c12]/35 lg:block" />

              <div className="relative flex h-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:max-w-[58%] lg:px-12">
                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                  About Us
                </span>
                <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[46px] lg:text-[54px]">
                  Built to Give Students a{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Clearer Start</span>
                </h1>
                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.75] text-white/82 sm:text-[18px]">
                  Agamya Eduventure focuses on strong fundamentals, practical support, and
                  patient mentoring for students who want a more dependable learning experience.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { value: "Clear", label: "Teaching" },
                    { value: "Practical", label: "Learning" },
                    { value: "Personal", label: "Mentoring" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
                    >
                      <p className="text-[18px] font-bold leading-tight text-white">{item.value}</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>
        </div>
      </section>

      <About ctaHref="/contact" ctaLabel="Talk to Us" />

      <Footer />
    </main>
  );
}
