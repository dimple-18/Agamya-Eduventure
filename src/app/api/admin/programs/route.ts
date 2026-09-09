import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import {
  getStaticAdminPrograms,
  isAdminReadOnlyMode,
  withReadOnlyHeaders,
} from "@/lib/admin/static-fallback";

function toDbProgram(body: Record<string, unknown>) {
  return {
    title: body.title,
    description: body.description,
    meta: body.meta,
    image: body.image ?? null,
    projects: body.projects,
    mentoring: body.mentoring,
    category: body.group_name,
    sort_order: body.sort_order ?? 0,
    published: body.published ?? true,
    updated_at: new Date().toISOString(),
  };
}

function fromDbProgram(row: Record<string, unknown>) {
  return {
    id: row.id,
    title: row.title,
    description: row.description,
    meta: row.meta,
    image: row.image,
    projects: row.projects,
    mentoring: row.mentoring,
    group_name: row.category,
    sort_order: row.sort_order,
    published: row.published,
  };
}

export async function GET() {
  if (isAdminReadOnlyMode()) {
    return withReadOnlyHeaders(getStaticAdminPrograms());
  }

  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { data, error } = await auth.supabase
    .from("programs")
    .select("*")
    .order("sort_order", { ascending: true })
    .order("created_at", { ascending: true });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data.map((row) => fromDbProgram(row)));
}

export async function POST(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = await request.json();
  const { data, error } = await auth.supabase
    .from("programs")
    .insert(toDbProgram(body))
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(fromDbProgram(data), { status: 201 });
}

export async function PATCH(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = await request.json();
  if (!body.id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const { data, error } = await auth.supabase
    .from("programs")
    .update(toDbProgram(body))
    .eq("id", body.id)
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(fromDbProgram(data));
}

export async function DELETE(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { searchParams } = new URL(request.url);
  const id = searchParams.get("id");

  if (!id) {
    return NextResponse.json({ error: "id is required." }, { status: 400 });
  }

  const { error } = await auth.supabase.from("programs").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
