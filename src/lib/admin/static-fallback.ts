import { NextResponse } from "next/server";

import { galleryEvents, testimonials } from "@/components/home/content";
import { flattenProgramsForSeed } from "@/lib/content/program-groups";
import { staticStudentOutcomes } from "@/lib/content/static-outcomes";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export const ADMIN_READ_ONLY_HEADER = "X-Admin-Read-Only";
export const ADMIN_READ_ONLY_NOTICE =
  "Supabase is not connected. Showing website content in read-only mode. Add .env.local to save changes.";

export function isAdminReadOnlyMode() {
  return !isSupabaseConfigured();
}

export function getStaticAdminPrograms() {
  return flattenProgramsForSeed().map((program, index) => ({
    ...program,
    id: `static-program-${index}`,
  }));
}

export function getStaticAdminGallery() {
  return galleryEvents.map((event, index) => ({
    id: `static-gallery-${index}`,
    title: event.title,
    label: event.label,
    description: event.description,
    photos: [...event.photos],
    date: event.date,
    location: event.location ?? null,
    students: event.students,
    sort_order: index,
    published: true,
  }));
}

export function getStaticAdminOutcomes() {
  return staticStudentOutcomes.map((outcome, index) => ({
    ...outcome,
    id: `static-outcome-${index}`,
  }));
}

export function getStaticAdminTestimonials() {
  return testimonials.map((item, index) => ({
    ...item,
    id: `static-testimonial-${index}`,
    sort_order: index,
    published: true,
  }));
}

export function withReadOnlyHeaders<T>(data: T) {
  const response = NextResponse.json(data);
  response.headers.set(ADMIN_READ_ONLY_HEADER, "true");
  return response;
}
