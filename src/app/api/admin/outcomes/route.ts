import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import {
  getStaticAdminOutcomes,
  isAdminReadOnlyMode,
  withReadOnlyHeaders,
} from "@/lib/admin/static-fallback";

function parseTools(value: unknown): string[] {
  if (Array.isArray(value)) {
    return value.map(String).filter(Boolean);
  }
  if (typeof value === "string") {
    return value
      .split(/[\n,]+/)
      .map((item) => item.trim())
      .filter(Boolean);
  }
  return [];
}

function toDbOutcome(body: Record<string, unknown>) {
  return {
    title: body.title,
    subtitle: body.subtitle ?? "",
    description: body.description,
    student_name: body.student_name,
    badge_label: body.badge_label,
    badge_tone: body.badge_tone ?? "teal",
    tools: parseTools(body.tools),
    image_url: body.image_url ?? null,
    is_featured: body.is_featured ?? false,
    sort_order: body.sort_order ?? 0,
    published: body.published ?? true,
    updated_at: new Date().toISOString(),
  };
}

export async function GET() {
  if (isAdminReadOnlyMode()) {
    return withReadOnlyHeaders(getStaticAdminOutcomes());
  }

  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { data, error } = await auth.supabase
    .from("student_outcomes")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = await request.json();
  const { data, error } = await auth.supabase
    .from("student_outcomes")
    .insert(toDbOutcome(body))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data, { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("student_outcomes")
    .update(toDbOutcome(body))
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const { error } = await auth.supabase.from("student_outcomes").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
