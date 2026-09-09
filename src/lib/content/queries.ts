import {
  contactAddress,
  contactPhone,
  contactProgramsText,
} from "@/components/home/contact-data";
import {
  contactDetails,
  galleryEvents as staticGalleryEvents,
  testimonials as staticTestimonials,
  type GalleryEvent,
} from "@/components/home/content";

import { buildGroupedPrograms, type ProgramGroup } from "./program-groups";
import { staticStudentOutcomes } from "./static-outcomes";
import type {
  ContactSettings,
  GalleryEventRecord,
  ProgramRecord,
  StudentOutcome,
  Testimonial,
} from "./types";
import { isSupabaseConfigured } from "../supabase/config";
import { createClient } from "../supabase/server";

const DEFAULT_CONTACT: ContactSettings = {
  address: contactAddress,
  phone: contactPhone,
  whatsapp: contactPhone,
  responseTime: "Within 24 hrs",
  supportType: "Phone / Chat / Email",
  paymentMethod: "Online / Offline",
  programsText: contactProgramsText,
};

function mapStaticTestimonials(): Testimonial[] {
  return staticTestimonials.map((item, index) => ({
    ...item,
    sort_order: index,
    published: true,
  }));
}

export async function getTestimonials(): Promise<Testimonial[]> {
  if (!isSupabaseConfigured()) {
    return mapStaticTestimonials();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("testimonials")
      .select("id, quote, name, role, sort_order, published")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data?.length) {
      return mapStaticTestimonials();
    }

    return data;
  } catch {
    return mapStaticTestimonials();
  }
}

export async function getContactSettings(): Promise<ContactSettings> {
  if (!isSupabaseConfigured()) {
    return DEFAULT_CONTACT;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("site_settings")
      .select("key, value")
      .eq("key", "contact");

    if (error || !data?.length) {
      return DEFAULT_CONTACT;
    }

    return { ...DEFAULT_CONTACT, ...(data[0].value as ContactSettings) };
  } catch {
    return DEFAULT_CONTACT;
  }
}

export function getDefaultContactSettings(): ContactSettings {
  const phoneDetail = contactDetails.find((item) => item.label === "Phone");
  const whatsappDetail = contactDetails.find((item) => item.label === "WhatsApp");
  const responseDetail = contactDetails.find((item) => item.label === "Response Time");
  const supportDetail = contactDetails.find((item) => item.label === "Support Type");
  const paymentDetail = contactDetails.find((item) => item.label === "Payment Method");

  return {
    address: contactAddress,
    phone: phoneDetail?.value ?? contactPhone,
    whatsapp: whatsappDetail?.value ?? contactPhone,
    responseTime: responseDetail?.value ?? "Within 24 hrs",
    supportType: supportDetail?.value ?? "Phone / Chat / Email",
    paymentMethod: paymentDetail?.value ?? "Online / Offline",
    programsText: contactProgramsText,
  };
}

function mapStaticGalleryEvents(): GalleryEvent[] {
  return staticGalleryEvents.map((event) => ({
    ...event,
    photos: [...event.photos],
  }));
}

function mapGalleryRow(row: GalleryEventRecord): GalleryEvent {
  return {
    title: row.title,
    label: row.label,
    description: row.description,
    photos: row.photos,
    date: row.date,
    location: row.location ?? undefined,
    students: row.students,
  };
}

export async function getGalleryEvents(): Promise<GalleryEvent[]> {
  if (!isSupabaseConfigured()) {
    return mapStaticGalleryEvents();
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("gallery_events")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data?.length) {
      return mapStaticGalleryEvents();
    }

    return data.map((row) => mapGalleryRow(row as GalleryEventRecord));
  } catch {
    return mapStaticGalleryEvents();
  }
}

function mapProgramRow(row: Record<string, unknown>): ProgramRecord {
  return {
    id: row.id as string | undefined,
    title: row.title as string,
    description: row.description as string,
    meta: row.meta as string,
    image: (row.image as string | null) ?? undefined,
    projects: row.projects as string,
    mentoring: row.mentoring as string,
    group_name: row.category as string,
    sort_order: row.sort_order as number | undefined,
    published: row.published as boolean | undefined,
  };
}

export async function getProgramGroups(): Promise<ProgramGroup[]> {
  if (!isSupabaseConfigured()) {
    return buildGroupedPrograms([]);
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("programs")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data?.length) {
      return buildGroupedPrograms([]);
    }

    return buildGroupedPrograms(data.map((row) => mapProgramRow(row)));
  } catch {
    return buildGroupedPrograms([]);
  }
}

export async function getStudentOutcomes(): Promise<StudentOutcome[]> {
  if (!isSupabaseConfigured()) {
    return staticStudentOutcomes;
  }

  try {
    const supabase = await createClient();
    const { data, error } = await supabase
      .from("student_outcomes")
      .select("*")
      .eq("published", true)
      .order("sort_order", { ascending: true })
      .order("created_at", { ascending: true });

    if (error || !data?.length) {
      return staticStudentOutcomes;
    }

    return data as StudentOutcome[];
  } catch {
    return staticStudentOutcomes;
  }
}
