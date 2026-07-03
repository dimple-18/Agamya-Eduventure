"use client";

import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronRight,
  Code2,
  FolderOpen,
  Monitor,
  Rocket,
  Star,
  TrendingUp,
  UserRound,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import ProgramsCatalog from "./ProgramsCatalog";
import { categoryId, groupedPrograms } from "./programs-data";
import { pageContainerClass, pageGutterClass } from "./section-layout";

type CoursesProps = {
  preview?: boolean;
};

const PREVIEW_PROGRAM_LIMIT = 4;

const programCategories = groupedPrograms.map((group) => {
  const iconByTitle: Record<string, typeof Monitor> = {
    "Core Programs": Monitor,
    "Technical Modules": Code2,
    "Career Support": Briefcase,
    "Projects & Certifications": Award,
    "Corporate & Advanced Courses": Building2,
  };

  return {
    title: group.title,
    description: group.description,
    icon: iconByTitle[group.title] ?? Monitor,
  };
});

const programHighlights = [
  {
    label: "Industry-relevant curriculum",
    icon: BookOpen,
    iconBg: "bg-[#e8f4f3]",
    iconColor: "text-[#1b6b66]",
  },
  {
    label: "Mentor-guided learning",
    icon: UserRound,
    iconBg: "bg-[#fdf0e4]",
    iconColor: "text-[#d97706]",
  },
  {
    label: "Practical projects & assignments",
    icon: Briefcase,
    iconBg: "bg-[#e8f4f3]",
    iconColor: "text-[#1b6b66]",
  },
  {
    label: "Career-focused outcomes",
    icon: TrendingUp,
    iconBg: "bg-[#fdf0e4]",
    iconColor: "text-[#d97706]",
  },
] as const;

const programStats = [
  { value: "1,200+", label: "Students Guided", icon: Users, tone: "teal" },
  { value: "300+", label: "Projects Completed", icon: FolderOpen, tone: "orange" },
  { value: "98%", label: "Student Satisfaction", icon: Star, tone: "teal" },
  { value: "100+", label: "Careers Kickstarted", icon: Rocket, tone: "orange" },
] as const;

const programCardOverlays: Record<
  string,
  { type: "tech" } | { type: "badge"; label: string; className: string } | { type: "icon" }
> = {
  "Web Development": { type: "tech" },
  "Python Programming": { type: "badge", label: "Python", className: "bg-[#fff4e8] text-[#3776ab]" },
  "Database & SQL": { type: "badge", label: "SQL", className: "bg-[#e8f1ff] text-[#1d4ed8]" },
  "Internship Program": { type: "icon" },
};

const techOverlay = [
  { label: "HTML", className: "bg-[#fff0e8] text-[#e44d26]" },
  { label: "CSS", className: "bg-[#e8f1ff] text-[#264de4]" },
  { label: "JS", className: "bg-[#fff8df] text-[#c9a227]" },
  { label: "React", className: "bg-[#e8f7fb] text-[#149eca]" },
] as const;

function ProgramsPreview() {
  const [activeCategory, setActiveCategory] = useState(programCategories[0]?.title ?? "Core Programs");

  const activeGroup = useMemo(
    () => programCategories.find((category) => category.title === activeCategory),
    [activeCategory],
  );

  const activePrograms = useMemo(() => {
    const group = groupedPrograms.find((item) => item.title === activeCategory);
    return group?.items.slice(0, PREVIEW_PROGRAM_LIMIT) ?? [];
  }, [activeCategory]);

  return (
    <section id="programs" className={`bg-[#fdfbf7] pb-20 pt-14 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <div className="grid gap-10 lg:grid-cols-[minmax(0,0.92fr)_minmax(0,1.35fr)] lg:items-start lg:gap-12">
          <div className="max-w-[420px]">
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              Programs
            </p>

            <h2 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[40px] lg:text-[46px]">
              Programs arranged with more clarity and less{" "}
              <span className="inline-block whitespace-nowrap">friction.</span>
            </h2>

            <p className="mt-6 text-[15px] leading-[1.75] text-[#5f6f82]">
              {activeGroup?.description ??
                "The same structured categories from the full Programs page are shown here in a concise preview."}
            </p>

            <div className="mt-8 rounded-[18px] border border-[#ebe5db] bg-white p-2 shadow-[0_4px_18px_rgba(0,0,0,0.04)]">
              <p className="px-4 pt-3 text-[11px] font-bold uppercase tracking-[0.16em] text-[#6b7c8f]">
                Explore Categories
              </p>
              <ul className="mt-2 space-y-1 pb-2">
                {programCategories.map((category) => {
                  const Icon = category.icon;
                  const isActive = activeCategory === category.title;

                  return (
                    <li key={category.title}>
                      <button
                        type="button"
                        onClick={() => setActiveCategory(category.title)}
                        className={`flex w-full items-center justify-between gap-3 rounded-xl px-4 py-3 text-left transition-colors ${
                          isActive ? "bg-[#f3f5f4]" : "hover:bg-[#faf9f6]"
                        }`}
                      >
                        <span className="flex items-center gap-3">
                          <span
                            className={`inline-flex h-9 w-9 items-center justify-center rounded-lg ${
                              isActive
                                ? "bg-[#e8f4f3] text-[#1b4d3e]"
                                : "bg-[#f6f3ee] text-[#5f6f82]"
                            }`}
                          >
                            <Icon className="h-4 w-4" strokeWidth={2.1} />
                          </span>
                          <span
                            className={`text-[14px] font-semibold ${
                              isActive ? "text-[#1b4d3e]" : "text-[#3f4f61]"
                            }`}
                          >
                            {category.title}
                          </span>
                        </span>
                        {isActive ? (
                          <ChevronRight className="h-4 w-4 shrink-0 text-[#1b4d3e]" strokeWidth={2.25} />
                        ) : null}
                      </button>
                    </li>
                  );
                })}
              </ul>
            </div>

            <Link
              href="/programs"
              className="mt-7 inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032]"
            >
              Open Full Programs Page
              <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.25} />
            </Link>
          </div>

          <div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
              {programHighlights.map((highlight) => {
                const Icon = highlight.icon;

                return (
                  <div
                    key={highlight.label}
                    className="flex items-center gap-3 rounded-[14px] border border-[#ebe5db] bg-white px-4 py-3.5 shadow-[0_4px_16px_rgba(0,0,0,0.04)]"
                  >
                    <span
                      className={`inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-lg ${highlight.iconBg} ${highlight.iconColor}`}
                    >
                      <Icon className="h-4 w-4" strokeWidth={2.1} />
                    </span>
                    <p className="text-[12px] font-semibold leading-snug text-[#1b4d3e]">
                      {highlight.label}
                    </p>
                  </div>
                );
              })}
            </div>

            <div key={activeCategory} className="mt-5 grid gap-5 md:grid-cols-2">
              {activePrograms.length === 0 ? (
                <p className="col-span-full rounded-[20px] border border-dashed border-[#d6dde5] bg-white px-6 py-10 text-center text-[14px] text-[#5f6f82]">
                  No programs are listed in this category yet. Open the full Programs page to
                  explore all tracks.
                </p>
              ) : null}

              {activePrograms.map((program) => {
                const overlay = programCardOverlays[program.title];
                const imageSrc = program.image;

                return (
                  <article
                    key={`${activeCategory}-${program.title}`}
                    className="overflow-hidden rounded-[20px] border border-[#ebe5db] bg-white shadow-[0_8px_28px_rgba(15,23,42,0.07)]"
                  >
                    <div className="relative h-[190px] sm:h-[205px]">
                      {imageSrc ? (
                        <Image
                          src={imageSrc}
                          alt={program.title}
                          fill
                          className="object-cover"
                          sizes="(min-width: 1024px) 280px, 50vw"
                        />
                      ) : null}
                      <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/35 via-transparent to-transparent" />

                      <span className="absolute left-4 top-4 rounded-full border border-white/30 bg-white/95 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.14em] text-[#1b4d3e] shadow-sm">
                        {program.meta.toUpperCase()}
                      </span>

                      <div className="absolute bottom-3 right-3 flex flex-wrap justify-end gap-1.5">
                        {overlay?.type === "tech"
                          ? techOverlay.map((tech) => (
                              <span
                                key={tech.label}
                                className={`inline-flex h-7 min-w-7 items-center justify-center rounded-md px-1.5 text-[9px] font-bold shadow-sm ${tech.className}`}
                              >
                                {tech.label}
                              </span>
                            ))
                          : null}
                        {overlay?.type === "badge" ? (
                          <span
                            className={`inline-flex h-8 items-center justify-center rounded-lg px-2.5 text-[11px] font-bold shadow-sm ${overlay.className}`}
                          >
                            {overlay.label}
                          </span>
                        ) : null}
                        {overlay?.type === "icon" ? (
                          <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#1b6b66] shadow-sm">
                            <Briefcase className="h-4 w-4" strokeWidth={2.1} />
                          </span>
                        ) : null}
                      </div>
                    </div>

                    <div className="px-5 pb-5 pt-4">
                      <h3 className="text-[22px] font-bold leading-tight tracking-[-0.02em] text-[#1b4d3e]">
                        {program.title}
                      </h3>
                      <p className="mt-2.5 text-[14px] leading-[1.65] text-[#5f6f82] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                        {program.description}
                      </p>
                      <div className="mt-4 flex justify-end">
                        <Link
                          href="/programs"
                          className="inline-flex items-center gap-1.5 rounded-full border border-[#e5e9ef] bg-[#f7f9fb] px-4 py-2 text-[13px] font-semibold text-[#1b6b66] transition-colors hover:bg-[#eef6f5]"
                        >
                          More Details
                          <ArrowRight className="h-3.5 w-3.5" strokeWidth={2.25} />
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col divide-y divide-[#e3e7ec] overflow-hidden rounded-[20px] border border-[#e3e7ec] bg-[#f3f5f7] sm:flex-row sm:divide-x sm:divide-y-0">
          {programStats.map((stat) => {
            const Icon = stat.icon;
            const isTeal = stat.tone === "teal";

            return (
              <div
                key={stat.label}
                className="flex flex-1 items-center gap-4 px-6 py-5 sm:px-7 sm:py-6"
              >
                <span
                  className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-full ${
                    isTeal ? "bg-[#e8f4f3] text-[#1b6b66]" : "bg-[#fdf0e4] text-[#d97706]"
                  }`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <div>
                  <p
                    className={`text-[26px] font-bold leading-none tracking-tight ${
                      isTeal ? "text-[#1b4d3e]" : "text-[#d97706]"
                    }`}
                  >
                    {stat.value}
                  </p>
                  <p className="mt-1.5 text-[14px] font-semibold text-[#3f4f61]/85">
                    {stat.label}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

export default function Courses({ preview = false }: CoursesProps) {
  if (preview) {
    return <ProgramsPreview />;
  }

  return (
    <section id="programs">
      <ProgramsCatalog />
    </section>
  );
}
