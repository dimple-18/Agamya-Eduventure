import {
  appliedPrograms,
  enterprisePrograms,
  programCards,
  type ProgramCard,
} from "./content";

export const corePrograms = programCards.filter((program) =>
  [
    "Web Development",
    "Python Programming",
    "Java Programming",
    "Programming Fundamentals",
    "DCA (Diploma in Computer Applications)",
  ].includes(program.title),
);

export const technicalModules = programCards.filter((program) =>
  ["Database & SQL", "Data Structures & Logic Building"].includes(program.title),
);

export const careerSupport = appliedPrograms.filter((program) =>
  ["Internship Program", "Interview Preparation"].includes(program.title),
);

export const projectsAndCertifications = appliedPrograms.filter((program) =>
  ["Certification Support", "Mini & Major Projects"].includes(program.title),
);

export const basicComputerProgram = enterprisePrograms.filter(
  (program) => program.title === "Basic Computers",
);

export const additionalTechnicalPrograms = enterprisePrograms.filter((program) =>
  ["C++ Programming", "Dot NET", "PHP Programming"].includes(program.title),
);

export const corporateEnterprisePrograms = enterprisePrograms.filter(
  (program) =>
    ![
      "Basic Computers",
      "C++ Programming",
      "Dot NET",
      "PHP Programming",
    ].includes(program.title),
);

export const groupedPrograms = [
  {
    title: "Core Programs",
    description:
      "The main learning tracks for students starting with programming, web development, and stronger coding fundamentals.",
    items: [...corePrograms, ...basicComputerProgram],
  },
  {
    title: "Technical Modules",
    description:
      "Focused modules that strengthen technical understanding through databases, SQL, logic-building, and practical problem-solving.",
    items: [...technicalModules, ...additionalTechnicalPrograms],
  },
  {
    title: "Career Support",
    description:
      "Support layers that connect learning with preparation, exposure, and confidence for next steps.",
    items: careerSupport,
  },
  {
    title: "Projects & Certifications",
    description:
      "Hands-on project work and certification guidance that help students apply learning in a meaningful way.",
    items: projectsAndCertifications,
  },
  {
    title: "Corporate & Advanced Courses",
    description:
      "Enterprise-focused and specialized professional training tracks for corporate productivity, software tooling, automation, and business workflows.",
    items: corporateEnterprisePrograms,
  },
] as const;

export const categoryId = (title: string) =>
  title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");

export type ProgramWithGroup = ProgramCard & {
  groupTitle: string;
  groupId?: string;
};

export const catalogCardMeta: Record<
  string,
  {
    summary: string;
    duration: string;
    level: string;
    topics: string;
    students: string;
    badgeTone: "teal" | "blue" | "purple" | "orange" | "green";
    floatLabel?: string;
  }
> = {
  "Web Development": {
    summary: "Learn frontend and backend development with real-world projects.",
    duration: "6 Months",
    level: "Beginner to Advanced",
    topics: "HTML, CSS, JavaScript, React, Node.js",
    students: "Open Batch",
    badgeTone: "teal",
    floatLabel: "React",
  },
  "Python Programming": {
    summary: "Master Python programming from basics to advanced concepts.",
    duration: "4 Months",
    level: "Beginner Friendly",
    topics: "Python, OOPs, Data Structures, Flask",
    students: "Open Batch",
    badgeTone: "blue",
    floatLabel: "Python",
  },
  "Database & SQL": {
    summary: "Learn database design, SQL queries, and real-time database handling.",
    duration: "3 Months",
    level: "Intermediate",
    topics: "SQL, MySQL, Data Modeling, Joins",
    students: "Open Batch",
    badgeTone: "purple",
    floatLabel: "SQL",
  },
};

export function getCatalogMeta(program: ProgramCard) {
  const custom = catalogCardMeta[program.title];
  if (custom) {
    return custom;
  }

  return {
    summary: program.description,
    duration: "Flexible",
    level: "Guided Learning",
    topics: program.meta,
    students: "Open Batch",
    badgeTone: "teal" as const,
  };
}

export const badgeToneStyles = {
  teal: "bg-[#1b6b66] text-white",
  blue: "bg-[#2563eb] text-white",
  purple: "bg-[#7c5cbf] text-white",
  orange: "bg-[#d97706] text-white",
  green: "bg-[#1b4d3e] text-white",
};

export type ProgramDetailContent = {
  idealFor: string;
  highlights: string[];
  outcomes: string[];
};

export const programDetails: Record<string, ProgramDetailContent> = {
  "Web Development": {
    idealFor: "Students who want to build websites and full-stack apps.",
    highlights: [
      "Responsive HTML & CSS",
      "JavaScript & interactive UI",
      "React fundamentals",
      "Node.js & APIs",
    ],
    outcomes: [
      "Build portfolio-ready websites and web apps",
      "Understand frontend-to-backend project flow",
      "Gain confidence for internships and junior developer roles",
    ],
  },
  "Python Programming": {
    idealFor: "Beginners starting with a versatile first language.",
    highlights: [
      "Python syntax & functions",
      "Object-oriented programming",
      "Data structures & problem solving",
      "Automation & Flask basics",
    ],
    outcomes: [
      "Write clean Python programs independently",
      "Solve logic-based coding exercises with confidence",
      "Move into data, automation, or backend learning paths",
    ],
  },
  "Java Programming": {
    idealFor: "Students who want strong OOP foundations.",
    highlights: [
      "Core Java syntax",
      "Classes, objects & inheritance",
      "Collections & exception handling",
      "Structured logic building",
    ],
    outcomes: [
      "Understand object-oriented design clearly",
      "Build console and logic-based Java applications",
      "Prepare for advanced Java frameworks and placements",
    ],
  },
  "Programming Fundamentals": {
    idealFor: "Absolute beginners before choosing a specialization.",
    highlights: [
      "How code runs",
      "Variables, loops & functions",
      "Basic algorithms",
      "Debugging habits",
    ],
    outcomes: [
      "Gain a solid base before advanced courses",
      "Reduce fear around coding and technical terms",
      "Build confidence to move into language-specific tracks",
    ],
  },
  "DCA (Diploma in Computer Applications)": {
    idealFor: "Learners who need practical computer skills for study and work.",
    highlights: [
      "MS Office essentials",
      "Internet, email & file management",
      "Typing & productivity workflows",
      "Basic troubleshooting",
    ],
    outcomes: [
      "Use computers confidently for everyday tasks",
      "Complete documentation and presentation work independently",
      "Build a foundation for further technical learning",
    ],
  },
  "Basic Computers": {
    idealFor: "First-time computer users who need step-by-step guidance.",
    highlights: [
      "Keyboard, mouse & file basics",
      "Safe internet browsing",
      "Intro to office tools",
      "Everyday computer tasks",
    ],
    outcomes: [
      "Operate a computer without hesitation",
      "Handle files, folders, and basic applications",
      "Feel ready for DCA or programming tracks",
    ],
  },
  "Database & SQL": {
    idealFor: "Students who want to work with data and backend systems.",
    highlights: [
      "Relational database design",
      "Queries, joins & aggregations",
      "Data modeling",
      "Hands-on MySQL practice",
    ],
    outcomes: [
      "Write efficient SQL for common use cases",
      "Design simple, well-structured databases",
      "Support web and software projects with data skills",
    ],
  },
  "Data Structures & Logic Building": {
    idealFor: "Learners preparing for coding interviews.",
    highlights: [
      "Arrays, stacks, queues & lists",
      "Time & space complexity",
      "Pattern-based problem solving",
      "Interview-style practice",
    ],
    outcomes: [
      "Solve structured coding problems more confidently",
      "Improve technical interview readiness",
      "Strengthen logical thinking across languages",
    ],
  },
  "C++ Programming": {
    idealFor: "Students who want strong low-level programming skills.",
    highlights: [
      "C++ syntax & control flow",
      "Functions, pointers & memory",
      "OOP in C++",
      "Console mini projects",
    ],
    outcomes: [
      "Build logic-heavy C++ programs",
      "Understand performance-oriented programming basics",
      "Prepare for competitive programming or systems learning",
    ],
  },
  "Dot NET": {
    idealFor: "Learners interested in Microsoft-based app development.",
    highlights: [
      ".NET application structure",
      "C# fundamentals",
      "Forms & logic layers",
      "Guided practical assignments",
    ],
    outcomes: [
      "Understand .NET application building flow",
      "Complete structured backend practice tasks",
      "Move toward enterprise development pathways",
    ],
  },
  "PHP Programming": {
    idealFor: "Students exploring server-side web development.",
    highlights: [
      "PHP scripting basics",
      "Forms & server-side logic",
      "Database connectivity",
      "Simple web backends",
    ],
    outcomes: [
      "Build basic dynamic web backends",
      "Understand how frontend connects to server logic",
      "Gain practical PHP project experience",
    ],
  },
  "Internship Program": {
    idealFor: "Students who want real, workplace-style experience.",
    highlights: [
      "Workplace-style tasks",
      "Code reviews & deadlines",
      "Team communication",
      "Portfolio building",
    ],
    outcomes: [
      "Experience structured professional work habits",
      "Complete guided tasks with review and feedback",
      "Strengthen resume with practical project exposure",
    ],
  },
  "Interview Preparation": {
    idealFor: "Students preparing for placements and technical interviews.",
    highlights: [
      "Core concept revision",
      "Mock interviews",
      "Resume & self-presentation",
      "Technical & HR readiness",
    ],
    outcomes: [
      "Present technical knowledge more clearly",
      "Handle interview questions with better composure",
      "Feel more prepared for placement opportunities",
    ],
  },
  "Certification Support": {
    idealFor: "Learners who want a clear plan for certification exams.",
    highlights: [
      "Syllabus-aligned roadmap",
      "Practice tests & revision",
      "Exam-focused doubt clearing",
      "Mentor study check-ins",
    ],
    outcomes: [
      "Approach certification exams with a clear plan",
      "Strengthen weak areas through guided revision",
      "Build confidence before official assessments",
    ],
  },
  "Mini & Major Projects": {
    idealFor: "Students building academic or portfolio projects.",
    highlights: [
      "Topic selection & scoping",
      "Architecture & implementation",
      "Debugging & testing",
      "Documentation & presentation",
    ],
    outcomes: [
      "Deliver complete projects with mentor support",
      "Improve project structure and presentation quality",
      "Build stronger portfolio or submission-ready work",
    ],
  },
  "Enterprise Microsoft IT Skill Development": {
    idealFor: "Corporate teams using Microsoft tools every day.",
    highlights: [
      "Microsoft productivity suite",
      "Document & spreadsheet efficiency",
      "Collaboration tools",
      "Real office assignments",
    ],
    outcomes: [
      "Improve day-to-day Microsoft tool proficiency",
      "Execute office tasks with better speed and accuracy",
      "Support team productivity in corporate environments",
    ],
  },
  "Corporate MS Application Proficiency": {
    idealFor: "Professionals who need stronger Microsoft Office skills.",
    highlights: [
      "Word, Excel, PowerPoint & Outlook",
      "Reports & presentations",
      "Business spreadsheet logic",
      "Speed & accuracy practice",
    ],
    outcomes: [
      "Produce polished business documents and reports",
      "Use spreadsheets and presentations confidently",
      "Meet corporate productivity expectations",
    ],
  },
  "Desktop Publishing Training": {
    idealFor: "Learners interested in layout design and print publishing.",
    highlights: [
      "Layout & typography",
      "Brochures, flyers & publications",
      "Print-ready output",
      "Industry DTP tools",
    ],
    outcomes: [
      "Create professional publishing layouts",
      "Understand design-to-output publishing flow",
      "Build skills for creative and office publishing roles",
    ],
  },
  "Visual Basic Software Training": {
    idealFor: "Learners building business software with Visual Basic.",
    highlights: [
      "Form-based VB development",
      "Event-driven UI logic",
      "Database connectivity",
      "Debugging & modules",
    ],
    outcomes: [
      "Build and maintain VB-based applications",
      "Understand form, logic, and data flow clearly",
      "Support legacy and enterprise software workflows",
    ],
  },
  "FoxPro Software Training": {
    idealFor: "Professionals maintaining FoxPro database systems.",
    highlights: [
      "FoxPro database operations",
      "Queries & reporting",
      "Legacy system maintenance",
      "Guided troubleshooting",
    ],
    outcomes: [
      "Operate FoxPro systems with greater confidence",
      "Handle data tasks in legacy business environments",
      "Reduce dependency on external support for routine work",
    ],
  },
  "Industrial Automation Software Training": {
    idealFor: "Learners working with industrial automation software.",
    highlights: [
      "Automation concepts & workflows",
      "System operation tasks",
      "Industrial use-case practice",
      "Tool familiarity",
    ],
    outcomes: [
      "Understand automation software usage in context",
      "Execute guided industrial workflow tasks",
      "Build operational confidence in technical environments",
    ],
  },
  "SAP Business Objects Training": {
    idealFor: "Professionals who need enterprise reporting skills.",
    highlights: [
      "Business Objects reporting",
      "Dashboards & data interpretation",
      "Enterprise reporting workflows",
      "Business analytics practice",
    ],
    outcomes: [
      "Create and interpret business reports more effectively",
      "Understand enterprise analytics workflows",
      "Support data-driven decision-making in organizations",
    ],
  },
};

export function getProgramDetails(program: ProgramCard) {
  const meta = getCatalogMeta(program);
  const details = programDetails[program.title] ?? {
    idealFor: "Students looking for guided, practical learning.",
    highlights: [
      "Core concepts of the track",
      "Guided practical assignments",
      "Step-by-step mentor support",
    ],
    outcomes: [
      "Stronger understanding of core concepts",
      "Practical confidence through guided work",
      "Clearer readiness for the next learning step",
    ],
  };

  return {
    meta,
    overview: program.description,
    projects: program.projects,
    mentoring: program.mentoring,
    ...details,
  };
}
