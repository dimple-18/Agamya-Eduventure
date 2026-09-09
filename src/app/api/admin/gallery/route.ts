import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import {
  getStaticAdminGallery,
  isAdminReadOnlyMode,
  withReadOnlyHeaders,
} from "@/lib/admin/static-fallback";

function parsePhotos(value: unknown): string[] {
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

function toDbEvent(body: Record<string, unknown>) {
  return {
    title: body.title,
    label: body.label,
    description: body.description,
    photos: parsePhotos(body.photos),
    date: body.date,
    location: body.location ?? null,
    students: body.students,
    sort_order: body.sort_order ?? 0,
    published: body.published ?? true,
    updated_at: new Date().toISOString(),
  };
}

export async function GET() {
  if (isAdminReadOnlyMode()) {
    return withReadOnlyHeaders(getStaticAdminGallery());
  }

  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { data, error } = await auth.supabase
    .from("gallery_events")
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
    .from("gallery_events")
    .insert(toDbEvent(body))
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
    .from("gallery_events")
    .update(toDbEvent(body))
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

  const { error } = await auth.supabase.from("gallery_events").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
