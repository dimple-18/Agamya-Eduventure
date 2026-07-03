"use client";

import { BookOpen, Briefcase, Code2, GraduationCap, Handshake } from "lucide-react";
import RadialOrbitalTimeline from "@/components/ui/radial-orbital-timeline";

const timelineData = [
  {
    id: 1,
    title: "Foundation",
    date: "Jan 2024",
    content: "Map learning goals, weekly targets, and a clear execution plan.",
    category: "Foundation",
    icon: BookOpen,
    relatedIds: [2],
    status: "completed" as const,
    energy: 100,
  },
  {
    id: 2,
    title: "Learning",
    date: "Feb 2024",
    content: "Shape UI ideas, user flow, and practical structure before building.",
    category: "Learning",
    icon: GraduationCap,
    relatedIds: [1, 3],
    status: "completed" as const,
    energy: 90,
  },
  {
    id: 3,
    title: "Practice",
    date: "Mar 2024",
    content: "Build features step by step with guided coding and review support.",
    category: "Practice",
    icon: Code2,
    relatedIds: [2, 4],
    status: "in-progress" as const,
    energy: 60,
  },
  {
    id: 4,
    title: "Mentorship",
    date: "Apr 2024",
    content: "Test workflows, fix errors, and improve quality with mentor feedback.",
    category: "Mentorship",
    icon: Handshake,
    relatedIds: [3, 5],
    status: "pending" as const,
    energy: 30,
  },
  {
    id: 5,
    title: "Career Ready",
    date: "May 2024",
    content: "Publish the final version and present outcomes with confidence.",
    category: "Career Ready",
    icon: Briefcase,
    relatedIds: [4],
    status: "pending" as const,
    energy: 10,
  },
];

export function RadialOrbitalTimelineDemo() {
  return (
    <RadialOrbitalTimeline
      timelineData={timelineData}
      compact
      light
      className="bg-transparent"
    />
  );
}
