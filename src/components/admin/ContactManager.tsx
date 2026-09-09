"use client";

import { useEffect, useState } from "react";

import type { ContactSettings } from "@/lib/content/types";
import { fetchAdminItem } from "@/lib/admin/fetch";

export default function ContactManager() {
  const [form, setForm] = useState<ContactSettings | null>(null);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    void (async () => {
      setLoading(true);
      const { data, error } = await fetchAdminItem<ContactSettings>("/api/admin/contact");
      if (data) setForm(data);
      if (error) setMessage(error);
      setLoading(false);
    })();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!form) return;

    setSaving(true);
    setMessage(null);

    const response = await fetch("/api/admin/contact", {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    setSaving(false);
    setMessage(response.ok ? "Contact details saved." : "Could not save contact details.");
  }

  if (loading) {
    return <p className="text-sm text-[#5f6c79]">Loading contact settings...</p>;
  }

  if (!form) {
    return (
      <p className="rounded-xl border border-[#f0dfbf] bg-[#fff9ef] px-4 py-3 text-sm text-[#7a5a2d]">
        {message ?? "Could not load contact settings."}
      </p>
    );
  }

  const fields: Array<{ key: keyof ContactSettings; label: string; multiline?: boolean }> = [
    { key: "address", label: "Address", multiline: true },
    { key: "phone", label: "Phone" },
    { key: "whatsapp", label: "WhatsApp number" },
    { key: "responseTime", label: "Response time" },
    { key: "supportType", label: "Support type" },
    { key: "paymentMethod", label: "Payment method" },
    { key: "programsText", label: "Programs summary", multiline: true },
  ];

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Contact details</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          These values are used across the contact page, footer, and enquiry areas.
        </p>
      </section>

      <form
        onSubmit={handleSubmit}
        className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]"
      >
        <div className="grid gap-4">
          {fields.map(({ key, label, multiline }) => (
            <label key={key} className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                {label}
              </span>
              {multiline ? (
                <textarea
                  rows={3}
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) =>
                      current ? { ...current, [key]: event.target.value } : current,
                    )
                  }
                  className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
                />
              ) : (
                <input
                  value={form[key]}
                  onChange={(event) =>
                    setForm((current) =>
                      current ? { ...current, [key]: event.target.value } : current,
                    )
                  }
                  className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
                />
              )}
            </label>
          ))}
        </div>

        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f4f3] px-4 py-3 text-sm text-[#1b4d3e]">{message}</p>
        )}

        <button
          type="submit"
          disabled={saving}
          className="mt-5 rounded-xl bg-[#1b4d3e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164032] disabled:opacity-60"
        >
          {saving ? "Saving..." : "Save contact details"}
        </button>
      </form>
    </div>
  );
}
