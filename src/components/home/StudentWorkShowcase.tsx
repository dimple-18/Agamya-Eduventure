"use client";

import Link from "next/link";
import {
  ArrowRight,
  BadgeCheck,
  Briefcase,
  ChartColumnBig,
  Code2,
  Compass,
  Leaf,
  type LucideIcon,
  Monitor,
  User,
} from "lucide-react";

import { pageContainerClass, pageGutterClass } from "./section-layout";

const topTags = [
  { icon: Briefcase, label: "Project-based learning" },
  { icon: BadgeCheck, label: "Practical assignments" },
  { icon: User, label: "Guided mentorship" },
  { icon: Compass, label: "Portfolio building" },
  { icon: Leaf, label: "Beginner-friendly support" },
] as const;

const stats = [
  { icon: User, value: "200+", label: "Student Projects", tone: "teal" },
  { icon: Code2, value: "15+", label: "Tech & Tools", tone: "orange" },
  {
    icon: ChartColumnBig,
    value: "Real",
    label: "Career Confidence",
    tone: "teal",
  },
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

type StudentWorkShowcaseProps = {
  sectionId?: string;
  compactTop?: boolean;
  showViewMoreCta?: boolean;
  showIntro?: boolean;
};

export default function StudentWorkShowcase({
  sectionId = "student-work",
  compactTop = false,
  showViewMoreCta = true,
  showIntro = true,
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
                <h2 className="mt-5 max-w-[640px] text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[40px] lg:text-[48px]">
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

            <div className="mt-8 flex flex-wrap items-center gap-10 rounded-2xl border border-[#ece5db] bg-white/66 px-6 py-4">
              {stats.map((s, i) => {
                const Icon = s.icon;
                return (
                  <div key={s.value} className="flex items-center gap-4">
                    <span
                      className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${
                        s.tone === "orange"
                          ? "bg-[#fff1e6] text-[#ef7f30]"
                          : "bg-[#eaf5f3] text-[#146f70]"
                      }`}
                    >
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-[22px] font-bold leading-none text-[#13304d]">{s.value}</p>
                      <p className="mt-0.5 text-[13px] font-medium leading-snug text-[#2f4058]">{s.label}</p>
                    </div>
                    {i < stats.length - 1 ? <span className="ml-6 h-10 w-px bg-[#e7e1d7]" /> : null}
                  </div>
                );
              })}
            </div>
          </>
        ) : null}

        <div className={`grid gap-4 lg:grid-cols-2 ${showIntro ? "mt-6" : "mt-10"}`}>
          <article className="rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)]">
            <div className="overflow-hidden rounded-[22px] border border-[#e9e4db] bg-white">
              <div className="relative h-[340px] bg-gradient-to-br from-[#f8fbff] via-[#edf5ff] to-[#ddedff] p-4 sm:p-5">
                <span className="inline-flex items-center gap-2 rounded-full bg-[#0f6a62] px-3 py-1 text-[11px] font-bold uppercase tracking-[0.08em] text-white">
                  FEATURED PROJECT
                </span>
                <div className="mt-3 grid grid-cols-[1fr_1.2fr] gap-3">
                  <div>
                    <h3 className="text-[22px] font-bold leading-[1.08] tracking-[-0.02em] text-[#142943] sm:text-[24px]">
                      Explore Beyond
                      <br />
                      <span className="text-[#136d67]">Boundaries</span>
                    </h3>
                    <p className="mt-3 text-[13px] leading-[1.45] text-[#5f7085]">
                      Discover beautiful places, plan your trip, and create unforgettable memories.
                    </p>
                    <div className="mt-4">
                      <button className="rounded-lg bg-[#146f69] px-3 py-1.5 text-[12px] font-semibold text-white">
                        Show Images
                      </button>
                    </div>
                  </div>
                  <div className="relative rounded-xl bg-[linear-gradient(140deg,#d8ebff,#9dd0ff_50%,#5b9ece)]" />
                </div>
                <div className="absolute bottom-3 left-4 right-4 grid grid-cols-3 gap-2 rounded-xl bg-white/88 p-2.5 text-[11px] font-semibold text-[#39506a]">
                  <span>Best Price Guaranteed</span>
                  <span>24/7 Support Always here</span>
                  <span>Custom Plan For you</span>
                </div>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-[1.3fr_0.8fr_1fr] items-center gap-3 px-2 pb-1">
              <div className="flex items-center gap-2.5">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-[#eaf5f3] text-[#136d67]"><Monitor className="h-4 w-4" /></span>
                <div>
                  <p className="text-[17px] font-bold leading-tight text-[#152a42] sm:text-[18px]">Travel Explorer Website</p>
                  <p className="mt-0.5 text-[13px] text-[#637488]">Full Stack Website</p>
                </div>
              </div>
              <div>
                <p className="text-[12px] text-[#7b8794]">Built by</p>
                <p className="text-[14px] font-semibold text-[#1d3049]">Riya Patel</p>
              </div>
              <div>
                <p className="text-[12px] text-[#7b8794]">Tools Used</p>
                <div className="mt-2 flex gap-2"><MiniChip label="React" /><MiniChip label="Node.js" /><MiniChip label="MongoDB" /></div>
              </div>
            </div>
          </article>

          <div className="grid gap-4">
            <article className="rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)] sm:p-5">
              <span className="inline-flex rounded-full border border-[#f3b37d] bg-[#fff2e6] px-3 py-0.5 text-[11px] font-bold text-[#ea7c2b]">UI/UX DESIGN</span>
              <div className="mt-3 grid grid-cols-[1fr_0.9fr] gap-3 items-center">
                <div>
                  <h3 className="text-[20px] font-bold text-[#152a42] sm:text-[22px]">FinTrack Mobile App</h3>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#607085]">Banking app UI/UX design with clean interface and smooth user flow.</p>
                  <p className="mt-3 text-[12px] text-[#7b8794]">Built by</p>
                  <p className="text-[14px] font-semibold text-[#1d3049]">Aarav Mehta</p>
                  <div className="mt-2 flex gap-2"><MiniChip label="Figma" /><MiniChip label="Prototyping" /></div>
                </div>
                <div className="relative h-[210px] rounded-[24px] border-[5px] border-[#0f1f37] bg-white shadow-lg rotate-[7deg]" />
              </div>
            </article>

            <article className="rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)] sm:p-5">
              <span className="inline-flex rounded-full border border-[#9fd6c8] bg-[#eaf7f3] px-3 py-0.5 text-[11px] font-bold text-[#186d67]">PYTHON PROJECT</span>
              <div className="mt-3 grid grid-cols-[1fr_1fr] gap-3 items-center">
                <div>
                  <h3 className="text-[20px] font-bold text-[#152a42] sm:text-[22px]">Task Manager App</h3>
                  <p className="mt-2 text-[13px] leading-[1.5] text-[#607085]">Python desktop app to manage tasks with calendar, reminders and priorities.</p>
                  <p className="mt-3 text-[12px] text-[#7b8794]">Built by</p>
                  <p className="text-[14px] font-semibold text-[#1d3049]">Devansh Singh</p>
                  <div className="mt-2 flex gap-2"><MiniChip label="Python" /><MiniChip label="Tkinter" /><MiniChip label="SQLite" /></div>
                </div>
                <div className="h-[200px] rounded-2xl bg-[radial-gradient(circle_at_20%_10%,#1e3a5f,#0a1528_58%)]" />
              </div>
            </article>
          </div>
        </div>

        <div className="mt-4 grid gap-4 lg:grid-cols-2">
          <article className="rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)] sm:p-5">
            <span className="inline-flex rounded-full border border-[#d7c3f8] bg-[#f2ecfe] px-3 py-0.5 text-[11px] font-bold text-[#7448c6]">PRESENTATION PROJECT</span>
            <h3 className="mt-3 text-[20px] font-bold text-[#152a42] sm:text-[22px]">Marketing Strategy Deck</h3>
            <p className="mt-2 text-[13px] leading-[1.5] text-[#607085]">Business strategy presentation with research, insights, and visual storytelling.</p>
            <p className="mt-3 text-[12px] text-[#7b8794]">Built by</p>
            <p className="text-[14px] font-semibold text-[#1d3049]">Ishita Sharma</p>
            <div className="mt-2 flex gap-2"><MiniChip label="PowerPoint" /><MiniChip label="Canva" /><MiniChip label="Research" /></div>
            <div className="mt-3 h-[150px] rounded-xl bg-[linear-gradient(130deg,#d9ebff,#f7fcff,#c6ddff)]" />
          </article>

          <article className="rounded-[28px] border border-[#e8e2d8] bg-white p-4 shadow-[0_10px_28px_rgba(24,36,52,0.07)] sm:p-5">
            <span className="inline-flex rounded-full border border-[#84d5ca] bg-[#def4ef] px-3 py-0.5 text-[11px] font-bold text-[#176a64]">DATA DASHBOARD</span>
            <h3 className="mt-3 text-[20px] font-bold text-[#152a42] sm:text-[22px]">Sales Analytics Dashboard</h3>
            <p className="mt-2 text-[13px] leading-[1.5] text-[#607085]">Interactive dashboard to analyze sales trends, revenue, and performance with data visualization.</p>
            <p className="mt-3 text-[12px] text-[#7b8794]">Built by</p>
            <p className="text-[14px] font-semibold text-[#1d3049]">Mehul Jain</p>
            <div className="mt-2 flex gap-2"><MiniChip label="Excel" /><MiniChip label="SQL" /><MiniChip label="Power BI" /></div>
            <div className="mt-3 h-[150px] rounded-xl bg-[radial-gradient(circle_at_70%_20%,#143d63,#0b1b30_56%,#081523)]" />
          </article>
        </div>

        {showViewMoreCta ? (
          <div className="mt-10 flex items-center justify-center">
            <Link
              href="/outcomes"
              className="inline-flex items-center gap-2 rounded-full border border-[#1b6e6d] bg-white px-7 py-3 text-[14px] font-semibold text-[#17314d] shadow-[0_6px_16px_rgba(24,36,52,0.05)] transition-colors hover:bg-[#f8f6f1]"
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
