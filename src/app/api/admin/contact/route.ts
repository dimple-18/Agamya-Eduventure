import { NextResponse } from "next/server";

import { requireAdmin } from "@/lib/admin/require-admin";
import { getDefaultContactSettings } from "@/lib/content/queries";
import type { ContactSettings } from "@/lib/content/types";

export async function GET() {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const { data, error } = await auth.supabase
    .from("site_settings")
    .select("value")
    .eq("key", "contact")
    .maybeSingle();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  const contact = data?.value
    ? ({ ...getDefaultContactSettings(), ...(data.value as ContactSettings) })
    : getDefaultContactSettings();

  return NextResponse.json(contact);
}

export async function PUT(request: Request) {
  const auth = await requireAdmin();
  if (auth.response) return auth.response;

  const body = (await request.json()) as ContactSettings;
  const { error } = await auth.supabase.from("site_settings").upsert({
    key: "contact",
    value: body,
    updated_at: new Date().toISOString(),
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
