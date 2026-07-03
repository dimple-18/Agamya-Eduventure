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
    idealFor: "Students who want to build websites and full-stack applications from scratch.",
    highlights: [
      "HTML, CSS, and responsive layout fundamentals",
      "JavaScript logic, DOM handling, and interactive UI",
      "React component structure and modern frontend flow",
      "Backend basics with Node.js and API integration",
      "Project planning, debugging, and deployment awareness",
    ],
    outcomes: [
      "Build portfolio-ready websites and web apps",
      "Understand frontend-to-backend project flow",
      "Gain confidence for internships and junior developer roles",
    ],
  },
  "Python Programming": {
    idealFor: "Beginners and career switchers starting with a versatile programming language.",
    highlights: [
      "Python syntax, variables, loops, and functions",
      "Object-oriented programming concepts",
      "Data structures and problem-solving practice",
      "File handling, modules, and automation basics",
      "Introductory Flask for simple application building",
    ],
    outcomes: [
      "Write clean Python programs independently",
      "Solve logic-based coding exercises with confidence",
      "Move into data, automation, or backend learning paths",
    ],
  },
  "Java Programming": {
    idealFor: "Students who want strong OOP foundations and disciplined coding habits.",
    highlights: [
      "Core Java syntax and program structure",
      "Classes, objects, inheritance, and encapsulation",
      "Collections, exception handling, and file I/O",
      "Logic-building through structured assignments",
      "Industry-style coding discipline and readability",
    ],
    outcomes: [
      "Understand object-oriented design clearly",
      "Build console and logic-based Java applications",
      "Prepare for advanced Java frameworks and placements",
    ],
  },
  "Programming Fundamentals": {
    idealFor: "Absolute beginners who need clarity before choosing a specialization.",
    highlights: [
      "How computers execute code and solve problems",
      "Variables, conditions, loops, and functions",
      "Basic algorithms and step-by-step thinking",
      "Debugging habits and structured practice",
      "Introduction to choosing the right learning track",
    ],
    outcomes: [
      "Gain a solid base before advanced courses",
      "Reduce fear around coding and technical terms",
      "Build confidence to move into language-specific tracks",
    ],
  },
  "DCA (Diploma in Computer Applications)": {
    idealFor: "Learners who want practical computer skills for study, office work, and daily use.",
    highlights: [
      "MS Office tools for documents, sheets, and presentations",
      "Internet usage, email, and digital file management",
      "Typing, formatting, and productivity workflows",
      "Basic computer operations and troubleshooting",
      "Assignments aligned to real academic and office tasks",
    ],
    outcomes: [
      "Use computers confidently for everyday tasks",
      "Complete documentation and presentation work independently",
      "Build a foundation for further technical learning",
    ],
  },
  "Basic Computers": {
    idealFor: "First-time computer users who need patient, step-by-step guidance.",
    highlights: [
      "System basics, keyboard, mouse, and file handling",
      "Internet browsing and safe digital habits",
      "Introductory office and productivity tools",
      "Guided practice with everyday computer tasks",
    ],
    outcomes: [
      "Operate a computer without hesitation",
      "Handle files, folders, and basic applications",
      "Feel ready for DCA or programming tracks",
    ],
  },
  "Database & SQL": {
    idealFor: "Students who want to work with data storage, queries, and backend systems.",
    highlights: [
      "Relational database concepts and table design",
      "SQL queries, filters, joins, and aggregations",
      "Data modeling for real application needs",
      "MySQL practice with hands-on exercises",
      "Connecting data thinking to project requirements",
    ],
    outcomes: [
      "Write efficient SQL for common use cases",
      "Design simple, well-structured databases",
      "Support web and software projects with data skills",
    ],
  },
  "Data Structures & Logic Building": {
    idealFor: "Learners preparing for coding interviews and stronger problem-solving ability.",
    highlights: [
      "Arrays, strings, stacks, queues, and linked lists",
      "Time and space complexity awareness",
      "Pattern-based problem solving",
      "Interview-style coding practice",
      "Approach building with mentor feedback",
    ],
    outcomes: [
      "Solve structured coding problems more confidently",
      "Improve technical interview readiness",
      "Strengthen logical thinking across languages",
    ],
  },
  "C++ Programming": {
    idealFor: "Students who want low-level logic skills and strong programming fundamentals.",
    highlights: [
      "C++ syntax, data types, and control flow",
      "Functions, pointers, and memory basics",
      "Object-oriented concepts in C++",
      "Console-based mini projects and exercises",
      "Code structure, debugging, and optimization habits",
    ],
    outcomes: [
      "Build logic-heavy C++ programs",
      "Understand performance-oriented programming basics",
      "Prepare for competitive programming or systems learning",
    ],
  },
  "Dot NET": {
    idealFor: "Learners interested in Microsoft-based application development.",
    highlights: [
      ".NET framework and application structure",
      "C# fundamentals for backend development",
      "Forms, logic layers, and basic architecture",
      "Guided assignments with practical implementation",
      "Code review and improvement through mentoring",
    ],
    outcomes: [
      "Understand .NET application building flow",
      "Complete structured backend practice tasks",
      "Move toward enterprise development pathways",
    ],
  },
  "PHP Programming": {
    idealFor: "Students exploring server-side scripting and backend web development.",
    highlights: [
      "PHP syntax and scripting fundamentals",
      "Form handling and server-side logic",
      "Database connectivity basics",
      "Backend workflow for simple web applications",
      "Clean code structure and debugging practice",
    ],
    outcomes: [
      "Build basic dynamic web backends",
      "Understand how frontend connects to server logic",
      "Gain practical PHP project experience",
    ],
  },
  "Internship Program": {
    idealFor: "Students who want real-world exposure through guided internship-style work.",
    highlights: [
      "Task-based learning similar to workplace projects",
      "Code review, deadlines, and execution discipline",
      "Team-style communication and reporting",
      "Practical problem solving with mentor oversight",
      "Portfolio and experience-building focus",
    ],
    outcomes: [
      "Experience structured professional work habits",
      "Complete guided tasks with review and feedback",
      "Strengthen resume with practical project exposure",
    ],
  },
  "Interview Preparation": {
    idealFor: "Students preparing for placements, internships, and technical interviews.",
    highlights: [
      "Core concept revision across chosen tracks",
      "Mock interview practice and answer structuring",
      "Communication and confidence-building sessions",
      "Resume and self-presentation guidance",
      "Technical and HR interview readiness support",
    ],
    outcomes: [
      "Present technical knowledge more clearly",
      "Handle interview questions with better composure",
      "Feel more prepared for placement opportunities",
    ],
  },
  "Certification Support": {
    idealFor: "Learners pursuing certifications who need structured preparation and clarity.",
    highlights: [
      "Certification roadmap and syllabus alignment",
      "Topic-wise revision and practice tests",
      "Concept reinforcement before assessments",
      "Doubt clearing for exam-focused areas",
      "Study planning with mentor check-ins",
    ],
    outcomes: [
      "Approach certification exams with a clear plan",
      "Strengthen weak areas through guided revision",
      "Build confidence before official assessments",
    ],
  },
  "Mini & Major Projects": {
    idealFor: "Students who need help planning, building, and presenting academic or portfolio projects.",
    highlights: [
      "Project topic selection and scope planning",
      "Architecture, modules, and implementation guidance",
      "Debugging, testing, and improvement support",
      "Documentation and presentation preparation",
      "Review cycles for academic or portfolio quality",
    ],
    outcomes: [
      "Deliver complete projects with mentor support",
      "Improve project structure and presentation quality",
      "Build stronger portfolio or submission-ready work",
    ],
  },
  "Enterprise Microsoft IT Skill Development": {
    idealFor: "Corporate teams and professionals using Microsoft tools in daily operations.",
    highlights: [
      "Microsoft productivity suite for business workflows",
      "Document, spreadsheet, and presentation efficiency",
      "Collaboration tools and workplace digital habits",
      "Task-based corporate assignments",
      "Training aligned to real office usage",
    ],
    outcomes: [
      "Improve day-to-day Microsoft tool proficiency",
      "Execute office tasks with better speed and accuracy",
      "Support team productivity in corporate environments",
    ],
  },
  "Corporate MS Application Proficiency": {
    idealFor: "Professionals who need stronger hands-on skills across Microsoft applications.",
    highlights: [
      "Word, Excel, PowerPoint, and Outlook proficiency",
      "Formatting, reporting, and presentation workflows",
      "Spreadsheet logic for business use cases",
      "Professional document and deck creation",
      "Speed and accuracy through guided practice",
    ],
    outcomes: [
      "Produce polished business documents and reports",
      "Use spreadsheets and presentations confidently",
      "Meet corporate productivity expectations",
    ],
  },
  "Desktop Publishing Training": {
    idealFor: "Learners interested in layout design, publishing, and print-ready document production.",
    highlights: [
      "Page layout, typography, and visual composition",
      "Brochures, flyers, and publication formatting",
      "Image placement and design consistency",
      "Print-ready output and production workflows",
      "Industry-relevant DTP tool practice",
    ],
    outcomes: [
      "Create professional publishing layouts",
      "Understand design-to-output publishing flow",
      "Build skills for creative and office publishing roles",
    ],
  },
  "Visual Basic Software Training": {
    idealFor: "Learners working with VB-based applications and business software development.",
    highlights: [
      "Visual Basic syntax and form-based development",
      "Event-driven programming and UI logic",
      "Database connectivity in VB applications",
      "Structured coding for business software tasks",
      "Debugging and module-based implementation",
    ],
    outcomes: [
      "Build and maintain VB-based applications",
      "Understand form, logic, and data flow clearly",
      "Support legacy and enterprise software workflows",
    ],
  },
  "FoxPro Software Training": {
    idealFor: "Professionals handling FoxPro-based database and enterprise software systems.",
    highlights: [
      "FoxPro environment and database operations",
      "Querying, reporting, and data handling",
      "Legacy system navigation and maintenance",
      "Practical exercises for enterprise workflows",
      "Troubleshooting support with mentor guidance",
    ],
    outcomes: [
      "Operate FoxPro systems with greater confidence",
      "Handle data tasks in legacy business environments",
      "Reduce dependency on external support for routine work",
    ],
  },
  "Industrial Automation Software Training": {
    idealFor: "Learners and professionals working with automation software in industrial settings.",
    highlights: [
      "Automation software concepts and workflows",
      "System operation and process-oriented tasks",
      "Practical industrial use-case exercises",
      "Tool familiarity for operational environments",
      "Mentor-led clarity for real-world application",
    ],
    outcomes: [
      "Understand automation software usage in context",
      "Execute guided industrial workflow tasks",
      "Build operational confidence in technical environments",
    ],
  },
  "SAP Business Objects Training": {
    idealFor: "Professionals who need reporting and analytics skills in enterprise environments.",
    highlights: [
      "Business Objects reporting fundamentals",
      "Data interpretation and dashboard thinking",
      "Enterprise reporting workflow practice",
      "Analytics assignments with business context",
      "Structured support for tool-based reporting",
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
    idealFor: "Students looking for guided, practical learning in this track.",
    highlights: [
      program.description,
      `Focused practice through ${program.meta.toLowerCase()} assignments`,
      "Step-by-step mentor support throughout the learning path",
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
