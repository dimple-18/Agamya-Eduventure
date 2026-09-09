import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import { getDefaultContactSettings } from "@/lib/content/queries";
import { flattenProgramsForSeed } from "@/lib/content/program-groups";
import { staticStudentOutcomes } from "@/lib/content/static-outcomes";
import { galleryEvents, testimonials } from "@/components/home/content";
import { createServiceClient } from "@/lib/supabase/server";

export async function POST() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  try {
    const supabase = createServiceClient();

    const testimonialRows = testimonials.map((item, index) => ({
      quote: item.quote,
      name: item.name,
      role: item.role,
      sort_order: index,
      published: true,
    }));

    const { count: testimonialCount } = await supabase
      .from("testimonials")
      .select("*", { count: "exact", head: true });

    if (!testimonialCount) {
      const { error: insertError } = await supabase.from("testimonials").insert(testimonialRows);
      if (insertError) {
        return NextResponse.json({ error: insertError.message }, { status: 500 });
      }
    }

    const contact = getDefaultContactSettings();
    const { error: settingsError } = await supabase.from("site_settings").upsert({
      key: "contact",
      value: contact,
      updated_at: new Date().toISOString(),
    });

    if (settingsError) {
      return NextResponse.json({ error: settingsError.message }, { status: 500 });
    }

    const allPrograms = flattenProgramsForSeed().map((item, index) => ({
      title: item.title,
      description: item.description,
      meta: item.meta,
      image: item.image ?? null,
      projects: item.projects,
      mentoring: item.mentoring,
      category: item.group_name,
      sort_order: index,
      published: true,
    }));

    await supabase.from("programs").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: programsError } = await supabase.from("programs").insert(allPrograms);
    if (programsError) {
      return NextResponse.json({ error: programsError.message }, { status: 500 });
    }

    const galleryRows = galleryEvents.map((item, index) => ({
      title: item.title,
      label: item.label,
      description: item.description,
      photos: [...item.photos],
      date: item.date,
      location: item.location ?? null,
      students: item.students,
      sort_order: index,
      published: true,
    }));

    await supabase.from("gallery_events").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: galleryError } = await supabase.from("gallery_events").insert(galleryRows);
    if (galleryError) {
      return NextResponse.json({ error: galleryError.message }, { status: 500 });
    }

    const outcomeRows = staticStudentOutcomes.map((item, index) => ({
      title: item.title,
      subtitle: item.subtitle,
      description: item.description,
      student_name: item.student_name,
      badge_label: item.badge_label,
      badge_tone: item.badge_tone ?? "teal",
      tools: item.tools,
      image_url: item.image_url ?? null,
      is_featured: item.is_featured ?? false,
      sort_order: index,
      published: true,
    }));

    await supabase.from("student_outcomes").delete().neq("id", "00000000-0000-0000-0000-000000000000");
    const { error: outcomesError } = await supabase.from("student_outcomes").insert(outcomeRows);
    if (outcomesError) {
      return NextResponse.json({ error: outcomesError.message }, { status: 500 });
    }

    return NextResponse.json({
      ok: true,
      imported: {
        testimonials: testimonialRows.length,
        programs: allPrograms.length,
        galleryEvents: galleryRows.length,
        outcomes: outcomeRows.length,
      },
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : "Import failed.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
