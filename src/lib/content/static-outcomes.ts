import type { StudentOutcome } from "./types";

export const staticStudentOutcomes: StudentOutcome[] = [
  {
    title: "Project 1",
    subtitle: "Full Stack Website",
    description:
      "Discover beautiful places, plan your trip, and create unforgettable memories.",
    student_name: "Riya Patel",
    badge_label: "Featured Project",
    badge_tone: "teal",
    tools: ["React", "Node.js", "MongoDB"],
    is_featured: true,
    sort_order: 0,
    published: true,
  },
  {
    title: "Project 2",
    subtitle: "UI/UX Design",
    description: "Banking app UI/UX design with clean interface and smooth user flow.",
    student_name: "Aarav Mehta",
    badge_label: "UI/UX Design",
    badge_tone: "orange",
    tools: ["Figma", "Prototyping"],
    is_featured: false,
    sort_order: 1,
    published: true,
  },
  {
    title: "Project 3",
    subtitle: "Python Project",
    description:
      "Python desktop app to manage tasks with calendar, reminders and priorities.",
    student_name: "Devansh Singh",
    badge_label: "Python Project",
    badge_tone: "teal",
    tools: ["Python", "Tkinter", "SQLite"],
    is_featured: false,
    sort_order: 2,
    published: true,
  },
  {
    title: "Project 4",
    subtitle: "Presentation Project",
    description:
      "Business strategy presentation with research, insights, and visual storytelling.",
    student_name: "Ishita Sharma",
    badge_label: "Presentation Project",
    badge_tone: "purple",
    tools: ["PowerPoint", "Canva", "Research"],
    is_featured: false,
    sort_order: 3,
    published: true,
  },
  {
    title: "Project 5",
    subtitle: "Data Dashboard",
    description:
      "Interactive dashboard to analyze sales trends, revenue, and performance with data visualization.",
    student_name: "Mehul Jain",
    badge_label: "Data Dashboard",
    badge_tone: "green",
    tools: ["Excel", "SQL", "Power BI"],
    is_featured: false,
    sort_order: 4,
    published: true,
  },
];
