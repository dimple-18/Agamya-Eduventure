import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  BarChart3,
  Briefcase,
  CheckCircle2,
  Code2,
  FolderOpen,
  GraduationCap,
  Rocket,
  Star,
  UserRound,
  Users,
} from "lucide-react";

import { pageContainerClass, pageGutterClass } from "./section-layout";

const aboutPoints = [
  {
    title: "Concept Clarity",
    description: "Strong fundamentals before moving ahead.",
    icon: GraduationCap,
    iconBg: "bg-[#e8f5ee]",
    iconColor: "text-[#1b4d3e]",
  },
  {
    title: "Hands-on Practice",
    description: "Practice through guided exercises and projects.",
    icon: Code2,
    iconBg: "bg-[#e6f3f2]",
    iconColor: "text-[#1b4d3e]",
  },
  {
    title: "Personal Mentorship",
    description: "One-on-one support when you need it most.",
    icon: UserRound,
    iconBg: "bg-[#eef1f4]",
    iconColor: "text-[#3d4f63]",
  },
  {
    title: "Track Progress",
    description: "Regular feedback and progress checkpoints.",
    icon: BarChart3,
    iconBg: "bg-[#fdf0e4]",
    iconColor: "text-[#c56a12]",
  },
  {
    title: "Career Readiness",
    description: "Projects and skills for real opportunities.",
    icon: Briefcase,
    iconBg: "bg-[#e9eef3]",
    iconColor: "text-[#3d5568]",
  },
] as const;

const stats = [
  {
    value: "1,200+",
    label: "Students Guided",
    icon: Users,
    cardBg: "bg-[#edf7f1]",
    valueColor: "text-[#1b4d3e]",
    barColor: "bg-[#1b4d3e]",
    iconBg: "bg-white/70",
    iconColor: "text-[#1b4d3e]",
  },
  {
    value: "300+",
    label: "Projects Completed",
    icon: FolderOpen,
    cardBg: "bg-[#fdf1e7]",
    valueColor: "text-[#d97706]",
    barColor: "bg-[#e8942f]",
    iconBg: "bg-white/70",
    iconColor: "text-[#d97706]",
  },
  {
    value: "98%",
    label: "Student Satisfaction",
    icon: Star,
    cardBg: "bg-[#e8f4f3]",
    valueColor: "text-[#1b6b66]",
    barColor: "bg-[#1b6b66]",
    iconBg: "bg-white/70",
    iconColor: "text-[#1b6b66]",
  },
  {
    value: "100+",
    label: "Careers Kickstarted",
    icon: Rocket,
    cardBg: "bg-[#f1edf8]",
    valueColor: "text-[#6d4bb8]",
    barColor: "bg-[#8b6bc6]",
    iconBg: "bg-white/70",
    iconColor: "text-[#6d4bb8]",
  },
] as const;

const techStack = [
  { label: "HTML5", bg: "bg-[#fff0e8]", text: "text-[#e44d26]" },
  { label: "CSS3", bg: "bg-[#e8f1ff]", text: "text-[#264de4]" },
  { label: "JS", bg: "bg-[#fff8df]", text: "text-[#c9a227]" },
  { label: "React", bg: "bg-[#e8f7fb]", text: "text-[#149eca]" },
] as const;

type AboutProps = {
  ctaHref?: string;
  ctaLabel?: string;
};

export default function About({
  ctaHref = "/about",
  ctaLabel = "Read More",
}: AboutProps) {
  return (
    <section id="about" className={`bg-[#fdfbf7] pb-20 pt-14 ${pageGutterClass}`}>
      <div className={pageContainerClass}>
        <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1.02fr)_minmax(0,1fr)] lg:gap-12">
          <div className="max-w-[560px]">
            <p className="inline-flex items-center gap-2.5 text-[12px] font-bold uppercase tracking-[0.22em] text-[#1b4d3e]">
              <span className="h-2 w-2 rounded-full bg-[#f39c12]" />
              About Agamya
            </p>

            <h2 className="mt-5 text-[34px] font-bold leading-[1.12] tracking-[-0.03em] text-[#1b4d3e] sm:text-[42px] lg:text-[52px]">
              A steadier way to help students begin learning technology{" "}
              <span className="relative inline-block whitespace-nowrap">
                well.
              </span>
            </h2>

            <p className="mt-7 text-[15px] leading-[1.75] text-[#5f6f82]">
              Agamya Eduventure is built for students who need more than standard classes.
              The focus stays on concept clarity, practical work, disciplined learning, and
              guidance that helps students move forward with more confidence.
            </p>
            <p className="mt-4 text-[15px] leading-[1.75] text-[#5f6f82]">
              Instead of rushing through topics, the learning model emphasizes understanding,
              repetition, projects, and personal support. That creates a stronger beginning
              and a more dependable path ahead.
            </p>

            <div className="mt-9 flex flex-wrap gap-3.5">
              <Link
                href={ctaHref}
                className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-7 py-3.5 text-[14px] font-semibold !text-white transition-colors hover:bg-[#164032]"
              >
                {ctaLabel}
                <ArrowRight className="h-4 w-4 text-white" strokeWidth={2.25} />
              </Link>
              <Link
                href="/programs"
                className="inline-flex items-center gap-2 rounded-xl border border-[#1b4d3e]/25 bg-white px-7 py-3.5 text-[14px] font-semibold text-[#1b4d3e] transition-colors hover:bg-[#f8f6f1]"
              >
                View Programs
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </Link>
            </div>
          </div>

          <div className="relative overflow-hidden rounded-[22px] border border-[#e8e2d8] bg-[#dfe8e4] shadow-[0_18px_42px_rgba(24,36,52,0.1)]">
            <div className="relative aspect-[1.05/1] min-h-[360px] sm:min-h-[420px] lg:min-h-[470px]">
              <Image
                src="https://www.dahmani.net/images/news/about-us.jpg"
                alt="Student learning technology with confidence"
                fill
                className="object-cover object-center"
                sizes="(min-width: 1024px) 560px, 100vw"
                priority
              />

              <div className="absolute left-5 top-5 max-w-[220px] rounded-2xl border border-white/10 bg-[#0f1a28]/72 p-4 text-[11px] leading-[1.65] text-white backdrop-blur-sm sm:left-6 sm:top-6 sm:max-w-[250px] sm:p-5 sm:text-[12px]">
                <p className="font-mono text-[#6bb8ff]">&lt;main&gt;</p>
                <div className="pl-3 font-mono">
                  <p className="text-[#6bb8ff]">&lt;section class=&quot;learning&quot;&gt;</p>
                  <p className="pl-3 text-[#ff74ba]">&lt;h1&gt;</p>
                  <p className="pl-6 text-white/90">Build. Practice. Grow.</p>
                  <p className="pl-3 text-[#ff74ba]">&lt;/h1&gt;</p>
                  <p className="pl-3 text-[#ff9f6e]">&lt;p&gt;</p>
                  <p className="pl-6 text-white/90">Consistent guidance + real projects</p>
                  <p className="pl-3 text-[#ff9f6e]">&lt;/p&gt;</p>
                  <p className="text-[#6bb8ff]">&lt;/section&gt;</p>
                </div>
                <p className="font-mono text-[#6bb8ff]">&lt;/main&gt;</p>
              </div>

              <div className="absolute bottom-5 right-5 rounded-2xl border border-white/25 bg-white/92 p-3.5 shadow-[0_10px_24px_rgba(15,23,42,0.12)] backdrop-blur-sm sm:bottom-6 sm:right-6 sm:p-4">
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#6b7c8f]">
                  Technologies Used
                </p>
                <div className="mt-2.5 flex flex-wrap gap-2">
                  {techStack.map((tech) => (
                    <span
                      key={tech.label}
                      className={`inline-flex h-8 min-w-8 items-center justify-center rounded-lg px-2 text-[10px] font-bold ${tech.bg} ${tech.text}`}
                    >
                      {tech.label}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-14 overflow-hidden rounded-[20px] border border-[#ebe5db] bg-white shadow-[0_4px_20px_rgba(0,0,0,0.05)]">
          <div className="flex flex-col divide-y divide-[#ebe5db] lg:flex-row lg:divide-x lg:divide-y-0">
            {aboutPoints.map((point) => {
              const Icon = point.icon;

              return (
                <div
                  key={point.title}
                  className="flex flex-1 items-center gap-3.5 px-5 py-5 sm:px-6 lg:py-6"
                >
                  <span
                    className={`inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${point.iconBg} ${point.iconColor}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={2.1} />
                  </span>
                  <div className="min-w-0">
                    <h3 className="text-[14px] font-bold leading-tight text-[#1b4d3e]">
                      {point.title}
                    </h3>
                    <p className="mt-1 text-[12px] leading-snug text-[#6b7c8f]">
                      {point.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-6 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {stats.map((stat) => {
            const Icon = stat.icon;

            return (
              <div
                key={stat.label}
                className={`rounded-[22px] px-7 py-7 ${stat.cardBg}`}
              >
                <span
                  className={`inline-flex h-11 w-11 items-center justify-center rounded-xl ${stat.iconBg} ${stat.iconColor}`}
                >
                  <Icon className="h-5 w-5" strokeWidth={2.1} />
                </span>
                <div className="mt-5">
                  <p className={`text-[34px] font-bold leading-none tracking-tight ${stat.valueColor}`}>
                    {stat.value}
                  </p>
                  <div className={`mt-3 h-[3px] w-11 rounded-full ${stat.barColor}`} />
                  <p className="mt-3 text-[15px] font-semibold text-[#3f4f61]/80">
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
