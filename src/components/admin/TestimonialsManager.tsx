"use client";

import { useEffect, useState } from "react";
import { Database, Plus, Trash2 } from "lucide-react";

import type { Testimonial } from "@/lib/content/types";
import { fetchAdminList } from "@/lib/admin/fetch";

const emptyForm = {
  quote: "",
  name: "",
  role: "Student",
};

export default function TestimonialsManager() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [importing, setImporting] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await fetchAdminList<Testimonial>("/api/admin/testimonials");
    setItems(data);
    if (error) setMessage(error);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSaving(true);
    setMessage(null);

    const response = await fetch("/api/admin/testimonials", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not save testimonial.");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setMessage("Saved.");
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this testimonial?")) return;

    const response = await fetch(`/api/admin/testimonials?id=${id}`, { method: "DELETE" });
    if (response.ok) {
      await loadItems();
    }
  }

  async function handleImport() {
    setImporting(true);
    setMessage(null);

    const response = await fetch("/api/admin/seed", { method: "POST" });
    const data = await response.json();
    setImporting(false);

    if (!response.ok) {
      setMessage(data.error ?? "Import failed.");
      return;
    }

    setMessage(
      `Imported ${data.imported?.testimonials ?? 0} testimonials, ${data.imported?.programs ?? 0} programs, ${data.imported?.galleryEvents ?? 0} gallery events, and ${data.imported?.outcomes ?? 0} outcomes.`,
    );
    await loadItems();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h1 className="text-2xl font-semibold text-[#1b4d3e]">Testimonials</h1>
            <p className="mt-2 text-sm text-[#5f6c79]">
              Manage reviews shown on the home page and testimonials page.
            </p>
          </div>
          <button
            type="button"
            onClick={handleImport}
            disabled={importing}
            className="inline-flex items-center gap-2 rounded-xl border border-[#cfe0de] bg-[#e8f4f3] px-4 py-2.5 text-sm font-semibold text-[#1b4d3e] transition hover:bg-[#dff0ee] disabled:opacity-60"
          >
            <Database className="h-4 w-4" />
            {importing ? "Importing..." : "Import site content"}
          </button>
        </div>
        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f4f3] px-4 py-3 text-sm text-[#1b4d3e]">{message}</p>
        )}
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-semibold text-[#1b4d3e]">
          {editingId ? "Edit testimonial" : "Add testimonial"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Quote
            </span>
            <textarea
              required
              rows={4}
              value={form.quote}
              onChange={(event) => setForm((current) => ({ ...current, quote: event.target.value }))}
              className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Name
              </span>
              <input
                required
                value={form.name}
                onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))}
                className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Role
              </span>
              <input
                required
                value={form.role}
                onChange={(event) => setForm((current) => ({ ...current, role: event.target.value }))}
                className="w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8"
              />
            </label>
          </div>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-[#164032] disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update" : "Add testimonial"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                }}
                className="rounded-xl border border-[#e8e2d8] px-4 py-2.5 text-sm font-medium text-[#5f6c79]"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-semibold text-[#1b4d3e]">All testimonials</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#5f6c79]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="mt-4 text-sm text-[#5f6c79]">
            No testimonials yet. Use Import site content or add one above.
          </p>
        ) : (
          <div className="mt-4 space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-[#ebe5db] bg-[#fcfbfa] p-4"
              >
                <p className="text-sm leading-relaxed text-[#3d4f63]">{item.quote}</p>
                <p className="mt-3 text-sm font-semibold text-[#1b4d3e]">
                  {item.name} · {item.role}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id ?? null);
                      setForm({
                        quote: item.quote,
                        name: item.name,
                        role: item.role,
                      });
                    }}
                    className="rounded-lg border border-[#e8e2d8] px-3 py-1.5 text-xs font-semibold text-[#1b4d3e]"
                  >
                    Edit
                  </button>
                  <button
                    type="button"
                    onClick={() => item.id && handleDelete(item.id)}
                    className="inline-flex items-center gap-1 rounded-lg border border-[#f2d4d4] px-3 py-1.5 text-xs font-semibold text-[#9b3d3d]"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                    Delete
                  </button>
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
