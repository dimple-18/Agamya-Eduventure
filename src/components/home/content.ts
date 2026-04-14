type NavItem = {
  label: string;
  href: string;
};

type HeroStat = {
  value: string;
  label: string;
};

type Highlight = {
  title: string;
  description: string;
};

type ProgramCard = {
  title: string;
  description: string;
  meta: string;
  image?: string;
  projects: string;
  mentoring: string;
};

type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export const navigationItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Outcomes", href: "/#outcomes" },
  { label: "Testimonials", href: "/#testimonials" },
  { label: "Contact", href: "/#contact" },
] as const;

export const heroStats: readonly HeroStat[] = [
  { value: "Beginner-first", label: "Clear progression from fundamentals to practice" },
  { value: "Project-led", label: "Learning reinforced through guided implementation" },
  { value: "Mentor-supported", label: "Steady feedback and personal direction" },
] as const;

export const trustPoints = [
  "Small-batch guidance",
  "Structured teaching",
  "Career-minded support",
] as const;

export const aboutHighlights: readonly Highlight[] = [
  {
    title: "Teaching that slows down where it matters",
    description:
      "Concepts are explained with care so students understand properly before moving forward.",
  },
  {
    title: "Practice that builds confidence",
    description:
      "Students apply what they learn through repetition, exercises, and guided project work.",
  },
  {
    title: "Mentoring that feels personal",
    description:
      "The learning experience stays supportive, direct, and focused on steady student growth.",
  },
] as const;

export const programCards: readonly ProgramCard[] = [
  {
    title: "Web Development",
    description:
      "Frontend and backend fundamentals taught through structured lessons, exercises, and practical project work.",
    meta: "Core track",
    image: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    projects: "Build websites and full-stack practice projects with guided review.",
    mentoring: "Personal support through each stage of the development journey.",
  },
  {
    title: "Python Programming",
    description:
      "A practical introduction to logic, syntax, automation thinking, and applied problem-solving for beginners.",
    meta: "Language track",
    image: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    projects: "Work on beginner-friendly Python exercises and structured mini projects.",
    mentoring: "Concept clarity and step-by-step support while building confidence.",
  },
  {
    title: "Java & OOP",
    description:
      "Core programming fundamentals with object-oriented thinking and disciplined coding practice.",
    meta: "Language track",
    image: "/hero/html-css-collage-concept-with-person.jpg",
    projects: "Practice OOP concepts through assignments and hands-on Java implementations.",
    mentoring: "Regular guidance to strengthen logic, syntax, and disciplined coding habits.",
  },
  {
    title: "Programming Fundamentals",
    description:
      "A starting point for students who want to understand coding concepts clearly before specializing.",
    meta: "Foundation",
    image: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    projects: "Build basic logic exercises and foundational coding tasks with support.",
    mentoring: "Extra attention for beginners who need clarity before moving ahead.",
  },
  {
    title: "Database & SQL",
    description:
      "Database design, SQL queries, data modeling, and hands-on practice for real project requirements.",
    meta: "Technical module",
    image: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    projects: "Practice real query writing, table design, and database-backed use cases.",
    mentoring: "Guidance on understanding data structure, relationships, and query thinking.",
  },
  {
    title: "Data Structures & Logic Building",
    description:
      "Problem-solving practice to strengthen thinking, coding confidence, and interview readiness.",
    meta: "Skill development",
    image: "/hero/html-css-collage-concept-with-person.jpg",
    projects: "Solve structured problem sets and logic-based coding exercises progressively.",
    mentoring: "Support focused on reasoning, approach, and problem-solving confidence.",
  },
];

export const appliedPrograms: readonly ProgramCard[] = [
  {
    title: "Internship Program",
    description:
      "Structured internship-style learning with guided tasks, reviews, and practical execution experience.",
    meta: "Career track",
    image: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    projects: "Complete guided tasks and practical execution work in an internship-style format.",
    mentoring: "Regular review and support to help students work more professionally.",
  },
  {
    title: "Certification Support",
    description:
      "Preparation and guidance for students who want to complete certifications with stronger understanding.",
    meta: "Credential support",
    image: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    projects: "Practice aligned exercises and preparation tasks connected to certification goals.",
    mentoring: "Support for planning, preparation, and concept reinforcement before assessment.",
  },
  {
    title: "Mini & Major Projects",
    description:
      "Step-by-step help in planning, building, improving, and presenting academic or portfolio projects.",
    meta: "Project work",
    image: "/hero/html-css-collage-concept-with-person.jpg",
    projects: "Build mini and major projects with review, feedback, and presentation guidance.",
    mentoring: "Close help in planning, structuring, debugging, and improving project quality.",
  },
  {
    title: "Interview Preparation",
    description:
      "Concept revision, speaking practice, and confidence-building support for interviews and placements.",
    meta: "Career preparation",
    image: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    projects: "Prepare through mock tasks, revision work, and focused interview practice.",
    mentoring: "Guidance on communication, confidence, and presenting technical understanding clearly.",
  },
] as const;

export const differentiators: readonly Highlight[] = [
  {
    title: "Clarity before complexity",
    description:
      "Students are not rushed through concepts. The focus stays on understanding first.",
  },
  {
    title: "A more disciplined learning environment",
    description:
      "Structure, consistency, and feedback create a learning experience students can trust.",
  },
  {
    title: "Practical work with guidance",
    description:
      "Projects and exercises are supported closely so students build confidence as they apply concepts.",
  },
  {
    title: "Steady support throughout the journey",
    description:
      "The mentoring style stays patient and direct, especially for learners starting from the basics.",
  },
] as const;

export const outcomes = [
  "Stronger understanding of core programming concepts.",
  "More confidence while practicing and building independently.",
  "Better readiness for projects, interviews, and next learning steps.",
  "A clearer sense of direction in technology and coding.",
] as const;

export const testimonials: readonly Testimonial[] = [
  {
    quote:
      "The teaching style feels calm and structured. It helps beginners feel capable instead of intimidated.",
    name: "Early-stage learner",
    role: "Programming fundamentals track",
  },
  {
    quote:
      "What stands out is the balance between concept explanation and practical work. It feels serious and supportive.",
    name: "Career switch student",
    role: "Web development program",
  },
  {
    quote:
      "The mentorship focus changes the experience. Students feel guided, corrected, and encouraged at the right pace.",
    name: "Parent feedback",
    role: "Student support perspective",
  },
] as const;

export const contactDetails: readonly ContactDetail[] = [
  { label: "Phone", value: "7004704078", href: "tel:7004704078" },
  { label: "WhatsApp", value: "7004704078", href: "https://wa.me/917004704078" },
  {
    label: "Programs",
    value:
      "Web Development, Java, Python, Database, Internship, Certification, Projects",
  },
] as const;
