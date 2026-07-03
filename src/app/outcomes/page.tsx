import type { Metadata } from "next";
import Image from "next/image";

import Footer from "../../components/home/Footer";
import Navbar from "../../components/home/Navbar";
import StudentWorkShowcase from "../../components/home/StudentWorkShowcase";

export const metadata: Metadata = {
  title: "Outcomes | Agamya Eduventure",
  description:
    "Explore student projects and practical outcomes from Agamya Eduventure — real builds, guided mentorship, and career-ready learning.",
};

export default function OutcomesPage() {
  return (
    <main className="page-shell">
      <Navbar />

      <section className="bg-[#fdfbf7] px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="https://images.unsplash.com/photo-1517694712202-14dd9538aa97?q=80&w=1600&auto=format&fit=crop"
                alt="Student working on a coding project"
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
                  Student Outcomes
                </span>
                <h1 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[40px] lg:text-[46px]">
                  Learning Becomes Real Through{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Building</span>
                </h1>
                <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/82">
                  See what students have built with guidance, practice, and real-world
                  problem solving — projects that reflect confidence, skill, and steady
                  progress.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
                  {[
                    { value: "300+", label: "Projects" },
                    { value: "Portfolio", label: "Ready" },
                    { value: "Career", label: "Focused" },
                  ].map((item) => (
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
        </div>
      </section>

      <StudentWorkShowcase
        sectionId="outcomes"
        compactTop
        showIntro={false}
        showViewMoreCta={false}
      />

      <Footer />
    </main>
  );
}
