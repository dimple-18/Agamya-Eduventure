import { NextResponse } from "next/server";

import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/config";

export async function requireAdmin() {
  if (!isSupabaseConfigured()) {
    return {
      supabase: null,
      user: null,
      response: NextResponse.json(
        { error: "Supabase is not configured. Copy env.example to .env.local and add your project keys." },
        { status: 503 },
      ),
    };
  }

  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return {
      supabase,
      user: null,
      response: NextResponse.json({ error: "Unauthorized" }, { status: 401 }),
    };
  }

  return { supabase, user, response: null };
}
