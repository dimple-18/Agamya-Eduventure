import { NextResponse } from "next/server";

import type { EnquiryInput } from "@/lib/content/types";
import { isSupabaseConfigured } from "@/lib/supabase/config";
import { createClient } from "@/lib/supabase/server";

export async function POST(request: Request) {
  if (!isSupabaseConfigured()) {
    return NextResponse.json(
      { error: "Form storage is not configured yet." },
      { status: 503 },
    );
  }

  let body: EnquiryInput;

  try {
    body = (await request.json()) as EnquiryInput;
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  if (!body.name?.trim()) {
    return NextResponse.json({ error: "Name is required." }, { status: 400 });
  }

  const supabase = await createClient();
  const { error } = await supabase.from("enquiries").insert({
    name: body.name.trim(),
    email: body.email?.trim() || null,
    phone: body.phone?.trim() || null,
    message: body.message?.trim() || null,
    source: body.source?.trim() || "website",
    status: "new",
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
