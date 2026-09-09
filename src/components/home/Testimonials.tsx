import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getTestimonials } from "@/lib/content/queries";

import { TestimonialCards, TestimonialSectionIntro } from "./TestimonialCards";
import { pageContainerClass, pageGutterClass } from "./section-layout";

export default async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section id="testimonials" className={`bg-[#fdfbf7] pb-20 pt-14 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
          <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
          Testimonials
        </p>

        <div className="mt-8">
          <TestimonialSectionIntro />
        </div>

        <TestimonialCards className="mt-10" items={items} />

        <div className="mt-10 flex justify-end">
          <Link
            href="/testimonials"
            className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032] cta-pulse"
          >
            View All Testimonials
            <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
