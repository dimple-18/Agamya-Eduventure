"use client";

import { useState } from "react";
import { useSearchParams } from "next/navigation";

import { createClient } from "@/lib/supabase/client";

export default function AdminLoginForm() {
  const searchParams = useSearchParams();
  const setupError = searchParams.get("error") === "setup";
  const authError = searchParams.get("error") === "auth";

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setLoading(true);
    setError(null);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setLoading(false);
      return;
    }

    window.location.href = "/admin";
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#f8f5ef] px-4">
      <div className="w-full max-w-md rounded-2xl border border-[#e8e2d8] bg-white p-8 shadow-[0_12px_28px_rgba(15,23,42,0.07)]">
        <p className="text-[11px] font-bold uppercase tracking-[0.18em] text-[#7a8a9c]">
          Agamya Eduventure
        </p>
        <h1 className="mt-2 text-2xl font-semibold text-[#1b4d3e]">Admin sign in</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          Sign in to manage testimonials, contact details, and enquiries.
        </p>

        {(setupError || authError || error) && (
          <div className="mt-5 rounded-xl border border-[#f2d4d4] bg-[#fff5f5] px-4 py-3 text-sm text-[#9b3d3d]">
            {setupError
              ? "Supabase is not configured. Add env vars from env.example, then redeploy."
              : authError
                ? "Sign in failed. Check your email and password."
                : error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Email
            </span>
            <input
              type="email"
              required
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
            />
          </label>

          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Password
            </span>
            <input
              type="password"
              required
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
            />
          </label>

          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-[#1b4d3e] px-4 py-3 text-sm font-semibold text-white transition hover:bg-[#164032] disabled:opacity-60"
          >
            {loading ? "Signing in..." : "Sign in"}
          </button>
        </form>
      </div>
    </div>
  );
}
