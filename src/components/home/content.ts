import type { GalleryImage } from "@/lib/content/types";

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

export type ProgramCard = {
  title: string;
  description: string;
  meta: string;
  image?: string;
  projects: string;
  mentoring: string;
};

export type Testimonial = {
  quote: string;
  name: string;
  role: string;
};

type ContactDetail = {
  label: string;
  value: string;
  href?: string;
};

export type GalleryEvent = {
  title: string;
  label: string;
  description: string;
  photos: readonly string[];
  date: string;
  location?: string;
  students: string;
  year?: string;
  images?: readonly GalleryImage[];
};

export const navigationItems: readonly NavItem[] = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Programs", href: "/programs" },
  { label: "Gallery", href: "/gallery" },
  { label: "Outcomes", href: "/outcomes" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "Contact", href: "/contact" },
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
    image:
      "https://img.magnific.com/premium-vector/web-development-programming-code-testing-ui-concept-with-laptop-displaying-futuristic-code_375605-307.jpg?semt=ais_hybrid&w=740&q=80",
    projects: "Build real websites and full-stack projects.",
    mentoring: "Personal support at every stage.",
  },
  {
    title: "Python Programming",
    description:
      "A practical introduction to logic, syntax, automation thinking, and applied problem-solving for beginners.",
    meta: "Language track",
    image: "https://vitalskills.in/wp-content/uploads/2024/05/Python-Programming.webp",
    projects: "Python exercises and structured mini projects.",
    mentoring: "Step-by-step help to build concept clarity.",
  },
  {
    title: "Java Programming",
    description:
      "Core programming fundamentals with object-oriented thinking and disciplined coding practice.",
    meta: "Language track",
    image:
      "https://yaleinfotech.com/static/media/courses/best-java-training-in-coimbatore/comprehensive-training-programs.webp",
    projects: "Hands-on Java assignments built around OOP.",
    mentoring: "Regular guidance on logic and clean code.",
  },
  {
    title: "Programming Fundamentals",
    description:
      "A starting point for students who want to understand coding concepts clearly before specializing.",
    meta: "Foundation",
    image:
      "https://img.magnific.com/free-vector/laptop-with-program-code-isometric-icon-software-development-programming-applications-dark-neon_39422-971.jpg",
    projects: "Foundational logic and coding exercises.",
    mentoring: "Extra attention for first-time coders.",
  },
  {
    title: "DCA (Diploma in Computer Applications)",
    description:
      "A structured computer applications program covering office tools, internet usage, digital workflow, and practical computer fundamentals.",
    meta: "Core track",
    image: "/programs/dca-diploma-computer-applications.png",
    projects: "Practical documents, spreadsheets, and presentations.",
    mentoring: "Guided support for confident everyday computer use.",
  },
  {
    title: "Database & SQL",
    description:
      "Database design, SQL queries, data modeling, and hands-on practice for real project requirements.",
    meta: "Technical module",
    image:
      "https://www.dataversity.net/wp-content/uploads/2025/09/kf_typesofdbms_oct23.png",
    projects: "Real queries and database-backed use cases.",
    mentoring: "Guidance on data relationships and query thinking.",
  },
  {
    title: "Data Structures & Logic Building",
    description:
      "Problem-solving practice to strengthen thinking, coding confidence, and interview readiness.",
    meta: "Skill development",
    image:
      "https://media.licdn.com/dms/image/v2/D4D12AQF_Wj1fEsaRsA/article-cover_image-shrink_720_1280/article-cover_image-shrink_720_1280/0/1690875038253?e=2147483647&v=beta&t=u-5WytaSkz9aVIf1yo4F6nkMEdT0q7QOKpjTVY1nMGE",
    projects: "Progressive problem sets and logic exercises.",
    mentoring: "Support on reasoning and problem-solving approach.",
  },
];

export const appliedPrograms: readonly ProgramCard[] = [
  {
    title: "Internship Program",
    description:
      "Structured internship-style learning with guided tasks, reviews, and practical execution experience.",
    meta: "Career track",
    image:
      "https://pimwp.s3-accelerate.amazonaws.com/2021/08/school-coding-data-software-development.jpg",
    projects: "Guided tasks in an internship-style format.",
    mentoring: "Regular reviews to build professional habits.",
  },
  {
    title: "Certification Support",
    description:
      "Preparation and guidance for students who want to complete certifications with stronger understanding.",
    meta: "Credential support",
    image: "https://www.blog-qhse.com/hubfs/ISO-9001.png",
    projects: "Practice tasks aligned to certification goals.",
    mentoring: "Planning and revision support before exams.",
  },
  {
    title: "Mini & Major Projects",
    description:
      "Step-by-step help in planning, building, improving, and presenting academic or portfolio projects.",
    meta: "Project work",
    image:
      "https://img.magnific.com/free-photo/project-management-planning-development-message-box-notification-graphic_53876-120467.jpg?semt=ais_hybrid&w=740&q=80",
    projects: "Mini and major projects with review and feedback.",
    mentoring: "Close help with planning, debugging, and polish.",
  },
  {
    title: "Interview Preparation",
    description:
      "Concept revision, speaking practice, and confidence-building support for interviews and placements.",
    meta: "Career preparation",
    image:
      "https://plus.unsplash.com/premium_photo-1661306465544-cc55151ab336?fm=jpg&q=60&w=3000&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDI2fHx8ZW58MHx8fHx8",
    projects: "Mock interviews and focused revision.",
    mentoring: "Guidance on communication and confidence.",
  },
] as const;

export const enterprisePrograms: readonly ProgramCard[] = [
  {
    title: "Basic Computers",
    description:
      "Beginner computer literacy training covering system usage, internet basics, and essential productivity tools.",
    meta: "Foundation module",
    image: "/programs/basic-computers.png",
    projects: "Typing, file handling, and everyday computer tasks.",
    mentoring: "Patient, step-by-step support for beginners.",
  },
  {
    title: "C++ Programming",
    description:
      "Structured C++ training focused on syntax, logic-building, and practical coding fundamentals.",
    meta: "Language track",
    image: "https://img-c.udemycdn.com/course/480x270/1576854_9aeb_2.jpg?w=3840&q=75",
    projects: "Programming exercises and console mini apps.",
    mentoring: "Concept-first support to build coding confidence.",
  },
  {
    title: "Dot NET",
    description:
      "Focused .NET learning path for building application development understanding with practical implementation.",
    meta: "Technical stack",
    image:
      "https://www.robotlab.com/hs-fs/hubfs/coding-job.jpg?width=800&name=coding-job.jpg",
    projects: "Guided .NET tasks and structured assignments.",
    mentoring: "Regular reviews to improve implementation quality.",
  },
  {
    title: "PHP Programming",
    description:
      "Backend programming basics in PHP with real-use concepts and practical coding flow.",
    meta: "Language track",
    image: "/programs/php-programming.png",
    projects: "Hands-on scripting and backend exercises.",
    mentoring: "Guidance on clean, logical code.",
  },
  {
    title: "Enterprise Microsoft IT Skill Development",
    description:
      "Corporate-focused Microsoft tools training to improve workplace productivity and execution quality.",
    meta: "Corporate training",
    image:
      "https://img.magnific.com/free-photo/online-learning-skills-concept-laptop-screen_53876-94882.jpg?semt=ais_hybrid&w=740&q=80",
    projects: "Assignments across office productivity workflows.",
    mentoring: "Mentoring aligned to real business usage.",
  },
  {
    title: "Corporate MS Application Proficiency",
    description:
      "Structured training to strengthen practical proficiency in Microsoft application suites.",
    meta: "Corporate training",
    image:
      "https://static0.howtogeekimages.com/wordpress/wp-content/uploads/2024/06/laptop-with-a-powerpoint-presentation-and-a-screen-with-the-powerpoint-logo-in-the-background.jpg",
    projects: "Practice on spreadsheets, documents, and presentations.",
    mentoring: "Guided reviews to improve speed and accuracy.",
  },
  {
    title: "Desktop Publishing Training",
    description:
      "Comprehensive DTP training for layout, formatting, and document production workflows.",
    meta: "Corporate training",
    image: "https://ficainstitute.com/Image/desktop-publishing-course.jpg",
    projects: "Publishing assignments with format and output checks.",
    mentoring: "Expert support on industry publishing standards.",
  },
  {
    title: "Visual Basic Software Training",
    description:
      "Visual Basic skill-building for application logic, coding structure, and practical implementation.",
    meta: "Software training",
    image:
      "https://images.pexels.com/photos/7988758/pexels-photo-7988758.jpeg?cs=srgb&dl=pexels-mikhail-nilov-7988758.jpg&fm=jpg",
    projects: "Guided coding tasks and software practice modules.",
    mentoring: "Reviews to improve accuracy and structure.",
  },
  {
    title: "FoxPro Software Training",
    description:
      "FoxPro-focused training for legacy database workflows and enterprise software handling.",
    meta: "Software training",
    image: "/hero/html-css-collage-concept-with-person.jpg",
    projects: "Database tasks and software operation exercises.",
    mentoring: "Support for troubleshooting and practical usage.",
  },
  {
    title: "Industrial Automation Software Training",
    description:
      "Software-oriented automation training for industrial use cases and practical system operations.",
    meta: "Industry training",
    image: "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    projects: "Applied, workflow-based automation tasks.",
    mentoring: "Mentor-led guidance for operational confidence.",
  },
  {
    title: "SAP Business Objects Training",
    description:
      "Business Objects training for reporting, analytics understanding, and enterprise data workflows.",
    meta: "Enterprise analytics",
    image: "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    projects: "Practical reporting and analytics assignments.",
    mentoring: "Structured support for tool usage and interpretation.",
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
      "I walked into Agamya Eduventure with self-doubt and left with confidence. The mentorship here changed how I learn, solve problems, and believe in my ability to build real-world software.",
    name: "Dimple",
    role: "Agamya Eduventure",
  },
  {
    quote:
      "One of the best institute in jamshedpur. Great learning experience. Focus on coding and practical knowledge. Placement assistance.",
    name: "Bhawna Kumari",
    role: "Student",
  },
  {
    quote:
      "Just amazing... This is the place where i got to learn a lot. Quality education provided n u would actually deal with practical stuffs rather than focusing on useless bookish language what most of the colleges teach.",
    name: "Muskan",
    role: "Student",
  },
  {
    quote:
      "Amazing learning experience, supportive nd motivating atmosphere. I have learned many things in such a short time in agamya. One of the best place to study.",
    name: "Anamika Pradhan",
    role: "Student",
  },
  {
    quote:
      "I know it's late to say this, but that place is truly awesome! Hands down, it's the best place for learning how to code",
    name: "Sunidhi Kumari",
    role: "Student",
  },
  {
    quote: "One of the best institute in jamshedpur. I had a great learning experience here.",
    name: "Suman Kshetry",
    role: "Student",
  },
  {
    quote:
      "This is the only institute in jamshedpur. Where faculty are awlays aviable to help you in your study and future goals.",
    name: "Chetna Sahu",
    role: "Student",
  },
  {
    quote:
      "Studying from Agamya institute will definitely help you to grow more in your field.",
    name: "Shivani Rai",
    role: "Student",
  },
  {
    quote:
      "Best learning experience, quality education and very good for beginners best training institue in jsr",
    name: "Saba Jawed",
    role: "Student",
  },
  {
    quote: "Best experiences in Agamya. Specially Faculty. Teaching is also best ever.",
    name: "Abhishek Soy",
    role: "Student",
  },
] as const;

export const contactDetails: readonly ContactDetail[] = [
  { label: "Phone", value: "7004704078", href: "tel:7004704078" },
  { label: "WhatsApp", value: "7004704078", href: "https://wa.me/917004704078" },
  { label: "Response Time", value: "Within 24 hrs" },
  { label: "Support Type", value: "Phone / Chat / Email" },
  { label: "Payment Method", value: "Online / Offline" },
  {
    label: "Programs",
    value: "Core, Technical, Career, Projects, Certification, Advanced",
  },
] as const;

export const galleryEvents: readonly GalleryEvent[] = [
  {
    title: "Coding Workshop Session",
    label: "Workshop",
    description:
      "Students explore problem-solving, logic building, and practical implementation in guided coding sessions.",
    photos: [
      "/gallery/coding-workshop-session.png",
      "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
      "/hero/html-css-collage-concept-with-person.jpg",
    ],
    date: "18 May, 2024",
    location: "Jamshedpur",
    students: "42 Students",
  },
  {
    title: "Student Practice Lab",
    label: "Practice Lab",
    description:
      "Practice-focused learning environment where students work through guided exercises and build confidence.",
    photos: [
      "/gallery/student-practice-lab.png",
      "/hero/programming-background-with-person-working-with-codes-computer.jpg",
      "/hero/html-css-collage-concept-with-person.jpg",
    ],
    date: "12 May, 2024",
    students: "28 Students",
  },
  {
    title: "Mentor Interaction & Doubt Clearing",
    label: "Mentor Session",
    description:
      "One-on-one mentoring moments where students receive guidance, feedback, and clarity on challenging topics.",
    photos: [
      "/gallery/mentor-doubt-clearing-v4.png",
      "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?q=80&w=1200&auto=format&fit=crop",
      "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    ],
    date: "8 May, 2024",
    students: "35 Students",
  },
  {
    title: "Industry Expert Talk",
    label: "Tech Talk",
    description:
      "Industry professionals share real-world insights, career guidance, and practical perspectives with students.",
    photos: [
      "/gallery/industry-expert-talk.png",
      "/hero/programming-background-with-person-working-with-codes-computer.jpg",
      "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    ],
    date: "5 May, 2024",
    students: "50 Students",
  },
  {
    title: "Learning Milestones",
    label: "Student Moments",
    description:
      "Celebrating progress, confidence, and steady improvement through regular mentoring.",
    photos: [
      "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
      "/hero/html-css-collage-concept-with-person.jpg",
      "/hero/programming-background-with-person-working-with-codes-computer.jpg",
    ],
    date: "22 Apr, 2024",
    students: "30 Students",
  },
  {
    title: "Project Presentation",
    label: "Presentation",
    description:
      "Students presenting work, sharing outcomes, and gaining confidence through feedback.",
    photos: [
      "/hero/html-css-collage-concept-with-person.jpg",
      "/hero/programming-background-with-person-working-with-codes-computer.jpg",
      "/hero/christopher-gower-m_HRfLhgABo-unsplash.jpg",
    ],
    date: "10 Apr, 2024",
    students: "38 Students",
  },
] as const;

export const homeGalleryFeatured = galleryEvents.slice(0, 4);

export const homeGallerySidebar = galleryEvents.slice(1, 4);
