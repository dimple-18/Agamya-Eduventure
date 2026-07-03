import {
  Building2,
  Code2,
  LayoutGrid,
  Mic2,
  Star,
  UserRound,
  Wrench,
  type LucideIcon,
} from "lucide-react";

import { galleryEvents, type GalleryEvent } from "./content";

export type GalleryFilterId =
  | "all"
  | "workshops"
  | "practice-labs"
  | "mentor-sessions"
  | "tech-talks"
  | "student-moments"
  | "institute-occasions";

export const galleryFilters: ReadonlyArray<{
  id: GalleryFilterId;
  label: string;
  icon: LucideIcon;
}> = [
  { id: "all", label: "All Events", icon: LayoutGrid },
  { id: "workshops", label: "Workshops", icon: Wrench },
  { id: "practice-labs", label: "Practice Labs", icon: Code2 },
  { id: "mentor-sessions", label: "Mentor Sessions", icon: UserRound },
  { id: "tech-talks", label: "Tech Talks", icon: Mic2 },
  { id: "student-moments", label: "Student Moments", icon: Star },
  { id: "institute-occasions", label: "Institute Occasions", icon: Building2 },
];

const labelToFilter: Record<string, GalleryFilterId> = {
  Workshop: "workshops",
  "Practice Lab": "practice-labs",
  "Mentor Session": "mentor-sessions",
  "Tech Talk": "tech-talks",
  "Student Moments": "student-moments",
  Occasions: "institute-occasions",
  Presentation: "student-moments",
};

export function getEventFilterId(event: GalleryEvent): GalleryFilterId {
  return labelToFilter[event.label] ?? "all";
}

export const galleryCardMeta: Record<
  string,
  {
    summary: string;
    badgeTone: "teal" | "blue" | "purple" | "orange" | "green";
  }
> = {
  "Coding Workshop Session": {
    summary: "Hands-on coding workshop where students learn by building real projects.",
    badgeTone: "teal",
  },
  "Student Practice Lab": {
    summary: "Practice-focused learning environment with guided exercises.",
    badgeTone: "blue",
  },
  "Mentor Interaction & Doubt Clearing": {
    summary: "One-on-one mentoring for doubt solving, feedback, and clarity.",
    badgeTone: "purple",
  },
  "Industry Expert Talk": {
    summary: "Industry professionals share insights, career guidance, and real-world perspectives.",
    badgeTone: "orange",
  },
  "Learning Milestones": {
    summary: "Celebrating progress, confidence, and steady improvement through mentoring.",
    badgeTone: "green",
  },
  "Institute Events": {
    summary: "Photos from institute occasions, gatherings, and meaningful learning moments.",
    badgeTone: "orange",
  },
  "Project Presentation": {
    summary: "Students presenting work, sharing outcomes, and gaining confidence through feedback.",
    badgeTone: "teal",
  },
};

export const badgeToneStyles = {
  teal: "bg-[#1b6b66] text-white",
  blue: "bg-[#2563eb] text-white",
  purple: "bg-[#7c5cbf] text-white",
  orange: "bg-[#d97706] text-white",
  green: "bg-[#1b4d3e] text-white",
};

export function getGalleryCardMeta(event: GalleryEvent) {
  const custom = galleryCardMeta[event.title];
  return {
    summary: custom?.summary ?? event.description,
    badgeTone: custom?.badgeTone ?? ("teal" as const),
  };
}

export function parsePhotoCount(event: GalleryEvent) {
  return `${event.photos.length} Photos`;
}

export function parseStudentLabel(event: GalleryEvent) {
  return event.students;
}

export function getEventLocation(event: GalleryEvent) {
  return event.location ?? "Jamshedpur";
}

export { galleryEvents };
