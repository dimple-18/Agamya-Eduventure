export type Testimonial = {
  id?: string;
  quote: string;
  name: string;
  role: string;
  sort_order?: number;
  published?: boolean;
};

export type ContactSettings = {
  address: string;
  phone: string;
  whatsapp: string;
  responseTime: string;
  supportType: string;
  paymentMethod: string;
  programsText: string;
};

export type Enquiry = {
  id: string;
  name: string;
  email: string | null;
  phone: string | null;
  message: string | null;
  source: string;
  status: "new" | "read" | "archived";
  created_at: string;
};

export type EnquiryInput = {
  name: string;
  email?: string;
  phone?: string;
  message?: string;
  source?: string;
};

export type ProgramRecord = {
  id?: string;
  title: string;
  description: string;
  meta: string;
  image?: string | null;
  projects: string;
  mentoring: string;
  group_name: string;
  sort_order?: number;
  published?: boolean;
};

export type GalleryEventRecord = {
  id?: string;
  title: string;
  label: string;
  description: string;
  photos: string[];
  date: string;
  location?: string | null;
  students: string;
  sort_order?: number;
  published?: boolean;
};

export type StudentOutcome = {
  id?: string;
  title: string;
  subtitle: string;
  description: string;
  student_name: string;
  badge_label: string;
  badge_tone?: "teal" | "orange" | "purple" | "green";
  tools: string[];
  image_url?: string | null;
  is_featured?: boolean;
  sort_order?: number;
  published?: boolean;
};
