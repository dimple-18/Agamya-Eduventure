import Link from "next/link";
import { ArrowRight } from "lucide-react";

import { getTestimonials } from "@/lib/content/queries";

import { TestimonialCards, TestimonialSectionIntro } from "./TestimonialCards";
import { pageContainerClass, pageGutterClass } from "./section-layout";

export default async function Testimonials() {
  const items = await getTestimonials();

  return (
    <section id="testimonials" className={`bg-[#fdfbf7] pb-14 pt-10 sm:pb-20 sm:pt-14 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <TestimonialSectionIntro />

        <TestimonialCards className="mt-8 sm:mt-10" items={items} />

        <div className="mt-8 flex sm:mt-10 sm:justify-end">
          <Link
            href="/testimonials"
            className="inline-flex w-full items-center justify-center gap-2 sm:w-auto rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032] cta-pulse"
          >
            View All Testimonials
            <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.25} />
          </Link>
        </div>
      </div>
    </section>
  );
}
