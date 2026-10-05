import Image from "next/image";

import { getTestimonials } from "@/lib/content/queries";

import { pageContainerClass, pageGutterClass } from "./section-layout";
import { TestimonialCards, TestimonialSectionIntro } from "./TestimonialCards";
import {
  testimonialsHeroStats,
  testimonialsSummaryStats,
} from "./testimonials-data";

export default async function TestimonialsCatalog() {
  const items = await getTestimonials();

  return (
    <div className="bg-[#fdfbf7] pb-20">
      <div className={`pt-6 ${pageGutterClass}`}>
        <div className={pageContainerClass}>
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                alt="Student working on a laptop"
                fill
                className="object-cover object-[72%_center]"
                priority
                sizes="(min-width: 1280px) 1240px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />


              <div className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:max-w-[58%] lg:px-12">
                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                  Testimonials
                </span>
                <h1 className="mt-4 text-[34px] font-bold leading-[1.1] tracking-[-0.03em] !text-white sm:mt-5 sm:text-[46px] sm:leading-[1.08] lg:text-[54px]">
                  Feedback Rooted in{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Trust</span>
                </h1>
                <p className="mt-3 max-w-[560px] text-base leading-[1.6] text-white/82 sm:mt-4 sm:text-[18px] sm:leading-[1.75]">
                  Real learning progress is often reflected in confidence, consistency, and
                  the quality of guidance students receive.
                </p>

                <div className="mt-6 hidden flex-wrap gap-3 sm:flex">
                  {testimonialsHeroStats.map((item) => (
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

          {/* Student voice */}
          <section className="mt-10 sm:mt-12 lg:mt-14">
            <TestimonialSectionIntro />
            <TestimonialCards className="mt-8 sm:mt-10" items={items} />
          </section>

          {/* Summary stats */}
          <section className="mt-10 rounded-[24px] border border-[#ebe5db] bg-[#f3f0ea]/80 px-4 py-8 sm:mt-14 sm:px-8 sm:py-12">
            <div className="grid grid-cols-2 gap-x-4 gap-y-8 sm:gap-8 lg:grid-cols-4">
              {testimonialsSummaryStats.map((stat) => {
                const Icon = stat.icon;
                return (
                  <div key={stat.label} className="text-center sm:text-left lg:text-center">
                    <span className="mx-auto inline-flex h-12 w-12 items-center justify-center rounded-full bg-[#e8f4f3] text-[#1b6b66] sm:mx-0 lg:mx-auto">
                      <Icon className="h-5 w-5" strokeWidth={2.1} />
                    </span>
                    <p className="mt-4 text-[26px] font-bold leading-none tracking-[-0.03em] text-[#1b4d3e] sm:text-[34px]">
                      {stat.value}
                    </p>
                    <p className="mt-2 text-[14px] font-bold leading-snug text-[#1b4d3e] sm:text-[15px]">{stat.label}</p>
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
