"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  Compass,
  Leaf,
  type LucideIcon,
  User,
} from "lucide-react";

import type { StudentOutcome } from "@/lib/content/types";
import { staticStudentOutcomes } from "@/lib/content/static-outcomes";

import { pageContainerClass, pageGutterClass } from "./section-layout";

const topTags = [
  { icon: Briefcase, label: "Project-based learning" },
  { icon: BadgeCheck, label: "Practical assignments" },
  { icon: User, label: "Guided mentorship" },
  { icon: Compass, label: "Portfolio building" },
  { icon: Leaf, label: "Beginner-friendly support" },
] as const;

function TagPill({
  icon: Icon,
  label,
}: {
  icon: LucideIcon;
  label: string;
}) {
  return (
    <span className="inline-flex items-center gap-2 rounded-full border border-[#e9e3d8] bg-white px-3.5 py-1.5 text-[12px] font-medium text-[#1a2c43] shadow-[0_6px_16px_rgba(28,42,58,0.06)]">
      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-[#edf6f4] text-[#156f70]">
        <Icon className="h-3.5 w-3.5" strokeWidth={2.1} />
      </span>
      {label}
    </span>
  );
}

function MiniChip({ label }: { label: string }) {
  return (
    <span className="rounded-md border border-[#e8e2d8] bg-[#faf8f3] px-2 py-0.5 text-[11px] font-semibold text-[#22354c]">
      {label}
    </span>
  );
}

const badgeToneClass = {
  teal: "border-[#9fd6c8] bg-[#eaf7f3] text-[#186d67]",
  orange: "border-[#f3b37d] bg-[#fff2e6] text-[#ea7c2b]",
  purple: "border-[#d7c3f8] bg-[#f2ecfe] text-[#7448c6]",
  green: "border-[#84d5ca] bg-[#def4ef] text-[#176a64]",
} as const;

function OutcomeCard({ outcome }: { outcome: StudentOutcome }) {
  const tone = outcome.badge_tone ?? "teal";

  return (
    <article
      className={`rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)] sm:p-5 ${
        outcome.is_featured ? "lg:col-span-2" : ""
      }`}
    >
      <span
        className={`inline-flex rounded-full border px-3 py-0.5 text-[11px] font-bold uppercase ${badgeToneClass[tone]}`}
      >
        {outcome.badge_label}
      </span>
      <h3 className="mt-3 text-[20px] font-bold text-[#152a42] sm:text-[22px]">{outcome.title}</h3>
      <p className="mt-1 text-[13px] font-medium text-[#637488]">{outcome.subtitle}</p>
      <p className="mt-2 text-[13px] leading-[1.5] text-[#607085]">{outcome.description}</p>
      <p className="mt-3 text-[12px] text-[#7b8794]">Built by</p>
      <p className="text-[14px] font-semibold text-[#1d3049]">{outcome.student_name}</p>
      <div className="mt-2 flex flex-wrap gap-2">
        {outcome.tools.map((tool) => (
          <MiniChip key={tool} label={tool} />
        ))}
      </div>
      {outcome.image_url ? (
        <div
          className="mt-4 h-[150px] rounded-xl bg-cover bg-center"
          style={{ backgroundImage: `url(${outcome.image_url})` }}
        />
      ) : (
        <div className="mt-4 h-[150px] rounded-xl bg-[linear-gradient(130deg,#d9ebff,#f7fcff,#c6ddff)]" />
      )}
    </article>
  );
}

type StudentWorkShowcaseProps = {
  sectionId?: string;
  compactTop?: boolean;
  showViewMoreCta?: boolean;
  showIntro?: boolean;
  outcomes?: StudentOutcome[];
};

export default function StudentWorkShowcase({
  sectionId = "student-work",
  compactTop = false,
  showViewMoreCta = true,
  showIntro = true,
  outcomes = staticStudentOutcomes,
}: StudentWorkShowcaseProps) {
  return (
    <section
      id={sectionId}
      className={`bg-[#fdfbf7] pb-20 ${pageGutterClass} ${compactTop ? "pt-0" : "pt-14"}`}
    >
      <div className={pageContainerClass}>
        {showIntro ? (
          <>
            <div className="grid gap-8 lg:grid-cols-[1.03fr_0.97fr] lg:items-start">
              <div className="relative">
                <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
                  <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
                  Student Work Showcase
                </p>
                <h2 className="mt-5 max-w-[700px] text-[40px] font-bold leading-[1.08] tracking-[-0.03em] text-[#1b4d3e] sm:text-[48px] lg:text-[56px]">
                  Learning becomes
                  <br />
                  real through <span className="text-[#122741]">building.</span>
                </h2>
                <p className="mt-4 max-w-[560px] text-[15px] leading-[1.75] text-[#5f6f82]">
                  Here&apos;s what our students have built with guidance, practice,
                  and real-world problem solving.
                </p>
              </div>

              <div className="flex flex-wrap gap-4 pt-8 lg:justify-end lg:pt-9">
                {topTags.map((t) => (
                  <TagPill key={t.label} icon={t.icon} label={t.label} />
                ))}
              </div>
            </div>
          </>
        ) : null}

        <div className="mt-10 grid gap-4 lg:grid-cols-2">
          {outcomes.map((outcome) => (
            <OutcomeCard key={outcome.id ?? outcome.title} outcome={outcome} />
          ))}
        </div>

        {showViewMoreCta ? (
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/outcomes"
              className="inline-flex items-center gap-2 rounded-full border border-[#1b6e6d] bg-white px-7 py-3 text-[14px] font-semibold text-[#17314d] shadow-[0_6px_16px_rgba(24,36,52,0.05)] transition-colors hover:bg-[#f8f6f1] cta-pulse"
            >
              View More Student Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        ) : null}
      </div>
    </section>
  );
}
