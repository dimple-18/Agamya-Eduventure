"use client";

import {
  BookOpen,
  CalendarDays,
  ChartNoAxesColumnIncreasing,
  Code2,
  Compass,
  Leaf,
  MonitorCog,
  UserRound,
  Users,
} from "lucide-react";
import { RadialOrbitalTimelineDemo } from "@/components/ui/radial-orbital-timeline-demo";

import { pageContainerClass, pageGutterClass } from "./section-layout";

const whyWorks = [
  { label: "Project-based learning", icon: Code2, accent: "teal" },
  { label: "Guided mentorship", icon: UserRound, accent: "orange" },
  { label: "Beginner-friendly environment", icon: Leaf, accent: "teal" },
  { label: "Practical understanding", icon: MonitorCog, accent: "teal" },
] as const;

const steps = [
  {
    step: "01",
    title: "Learn Fundamentals",
    description:
      "Start with concept clarity in programming logic, syntax, and computer basics before moving into advanced work.",
    icon: BookOpen,
  },
  {
    step: "02",
    title: "Practice Consistently",
    description:
      "Build retention through guided exercises, repetition, and daily implementation routines that remove hesitation.",
    icon: CalendarDays,
  },
  {
    step: "03",
    title: "Build Real Projects",
    description:
      "Apply learning to mini and major projects so students understand workflows, structure, debugging, and delivery.",
    icon: Code2,
  },
  {
    step: "04",
    title: "Receive Personal Mentorship",
    description:
      "Get patient one-on-one guidance, regular review, and practical correction at every stage of the learning path.",
    icon: Users,
  },
  {
    step: "05",
    title: "Prepare for Interviews",
    description:
      "Strengthen communication, problem-solving confidence, and role-based preparation with focused practice support.",
    icon: Compass,
  },
  {
    step: "06",
    title: "Become Career Ready",
    description:
      "Finish with practical skills, stronger confidence, and a clear foundation for internships and job opportunities.",
    icon: ChartNoAxesColumnIncreasing,
  },
] as const;

type LearningJourneyProps = {
  compactTop?: boolean;
};

export default function LearningJourney({ compactTop = false }: LearningJourneyProps) {
  return (
    <section
      id="learning-journey"
      className={`bg-[#fdfbf7] pb-20 ${pageGutterClass} ${compactTop ? "pt-0" : "pt-14"}`}
    >
      <div className={pageContainerClass}>
        <div className="grid gap-10 lg:grid-cols-[1.08fr_0.92fr] lg:items-start">
          <div className="max-w-[680px]">
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              Learning Journey
            </p>
            <h2 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[42px] lg:text-[52px]">
              Every strong career
              <br />
              begins with the
              <br />
              right <span className="text-[#122741]">learning path.</span>
            </h2>
            <p className="mt-4 max-w-[620px] text-[15px] leading-[1.75] text-[#5f6f82]">
              From first concepts to interview confidence, each phase is
              designed to help students grow steadily, practice deeply, and move
              forward with clarity.
            </p>
          </div>

          <aside className="rounded-2xl border border-[#ebe5db] bg-white/85 p-6 shadow-[0_10px_28px_rgba(20,35,55,0.06)]">
            <p className="text-sm font-bold uppercase tracking-[0.16em] text-[#145f5f]">
              Why This Works
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {whyWorks.map((item) => {
                const Icon = item.icon;
                const orange = item.accent === "orange";
                return (
                  <div
                    key={item.label}
                    className="flex min-h-[74px] items-center gap-3 rounded-xl border border-[#efe9e0] bg-white px-3.5 py-2.5"
                  >
                    <span
                      className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full ${
                        orange
                          ? "bg-[#fff1e6] text-[#ea7a2a]"
                          : "bg-[#eaf4f2] text-[#196f70]"
                      }`}
                    >
                      <Icon className="h-5 w-5" strokeWidth={2.1} />
                    </span>
                    <span className="text-[16px] leading-tight text-[#172a44]">
                      {item.label}
                    </span>
                  </div>
                );
              })}
            </div>
          </aside>
        </div>

        <div className="mt-10 grid gap-5 lg:grid-cols-[0.84fr_1.16fr]">
          <div className="overflow-hidden rounded-2xl border border-[#dcd6cb] shadow-[0_10px_28px_rgba(20,35,55,0.08)]">
            <RadialOrbitalTimelineDemo />
          </div>
          <div className="rounded-2xl border border-[#e6e0d6] bg-white/90 p-5 shadow-[0_10px_28px_rgba(20,35,55,0.06)]">
            <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[#106b6d]">
              Learning Steps
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              {steps.map((item) => {
                const Icon = item.icon;
                return (
                  <article
                    key={item.step}
                    className="rounded-xl border border-[#eee8de] bg-white p-3"
                  >
                    <div className="flex items-start gap-2.5">
                      <span className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#edf5f3] text-[#1b7272]">
                        <Icon className="h-4.5 w-4.5" strokeWidth={2} />
                      </span>
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-[14px] font-semibold text-[#1e7c7b]">
                            {item.step}
                          </span>
                          <h3 className="text-[16px] font-semibold leading-tight text-[#132640]">
                            {item.title}
                          </h3>
                        </div>
                        <p className="mt-1 text-[13px] leading-[1.45] text-[#5e6d82]">
                          {item.description}
                        </p>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
