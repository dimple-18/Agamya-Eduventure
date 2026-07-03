import Image from "next/image";

import { pageContainerClass, pageGutterClass } from "./section-layout";
import { TestimonialCards, TestimonialSectionIntro } from "./TestimonialCards";
import {
  testimonialsHeroStats,
  testimonialsSummaryStats,
} from "./testimonials-data";

export default function TestimonialsCatalog() {
  return (
    <div className="bg-[#fdfbf7] pb-20">
      <div className={`pt-6 ${pageGutterClass}`}>
        <div className={pageContainerClass}>
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                alt="Student working on a laptop"
                fill
                className="object-cover object-[72%_center]"
                priority
                sizes="1240px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />

              <div className="pointer-events-none absolute -right-8 top-12 hidden h-32 w-32 rounded-full border border-dashed border-[#5eb8a8]/40 lg:block" />
              <div className="pointer-events-none absolute bottom-16 right-[18%] hidden h-20 w-20 rounded-full border border-dashed border-[#f39c12]/35 lg:block" />

              <div className="relative flex h-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:max-w-[58%] lg:px-12">
                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                  Testimonials
                </span>
                <h1 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[40px] lg:text-[46px]">
                  Feedback Rooted in{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Trust</span>
                </h1>
                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/82">
                  Real learning progress is often reflected in confidence, consistency, and
                  the quality of guidance students receive.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {testimonialsHeroStats.map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
                    >
                      <p className="text-[14px] font-bold text-white">{item.value}</p>
                      <p className="text-[11px] text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Student voice */}
          <section className="mt-12 lg:mt-14">
            <TestimonialSectionIntro />
            <TestimonialCards className="mt-10" />
          </section>

          {/* Summary stats */}
          <section className="mt-14 rounded-[24px] border border-[#ebe5db] bg-[#f3f0ea]/80 px-5 py-10 sm:px-8 sm:py-12">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              {testimonialsSummaryStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center sm:text-left lg:text-center">
                    <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66] sm:mx-0 lg:mx-auto">
                      <Icon className="h-5 w-5" strokeWidth={2.1} />
                    </span>
                    <p className="mt-4 text-[32px] font-bold leading-none tracking-[-0.03em] text-[#1b4d3e] sm:text-[34px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[15px] font-bold text-[#1b4d3e]">{stat.label}</p>
                    <p className="mt-1 text-[13px] leading-relaxed text-[#6b7c8f]">
                      {stat.description}
                    </p>
                  </div>
                );
              })}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
