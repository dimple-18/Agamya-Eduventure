import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import {
  getStaticAdminTestimonials,
  isAdminReadOnlyMode,
  withReadOnlyHeaders,
} from "@/lib/admin/static-fallback";

export async function GET() {
  if (isAdminReadOnlyMode()) {
    return withReadOnlyHeaders(getStaticAdminTestimonials());
  }

  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { data, error } = await auth.supabase
    .from("testimonials")
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
    .from("testimonials")
    .insert({
      quote: body.quote,
      name: body.name,
      role: body.role ?? "Student",
      sort_order: body.sort_order ?? 0,
      published: body.published ?? true,
    })
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
    .from("testimonials")
    .update({
      quote: body.quote,
      name: body.name,
      role: body.role,
      sort_order: body.sort_order,
      published: body.published,
      updated_at: new Date().toISOString(),
    })
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

  const { error } = await auth.supabase.from("testimonials").delete().eq("id", id);

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
