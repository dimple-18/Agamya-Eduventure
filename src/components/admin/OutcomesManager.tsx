"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import type { StudentOutcome } from "@/lib/content/types";
import { fetchAdminList } from "@/lib/admin/fetch";

const inputClass =
  "w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8";

const emptyForm: StudentOutcome = {
  title: "",
  subtitle: "",
  description: "",
  student_name: "",
  badge_label: "",
  badge_tone: "teal",
  tools: [],
  image_url: "",
  is_featured: false,
};

export default function OutcomesManager() {
  const [items, setItems] = useState<StudentOutcome[]>([]);
  const [form, setForm] = useState<StudentOutcome>(emptyForm);
  const [toolsText, setToolsText] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await fetchAdminList<StudentOutcome>("/api/admin/outcomes");
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

    const payload = {
      ...form,
      tools: toolsText
        .split(/[\n,]+/)
        .map((item) => item.trim())
        .filter(Boolean),
    };

    const response = await fetch("/api/admin/outcomes", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not save outcome.");
      return;
    }

    setForm(emptyForm);
    setToolsText("");
    setEditingId(null);
    setMessage("Student outcome saved.");
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this student project?")) return;
    await fetch(`/api/admin/outcomes?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Outcomes</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          Manage student projects shown on the home page and outcomes page.
        </p>
        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f4f3] px-4 py-3 text-sm text-[#1b4d3e]">{message}</p>
        )}
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-semibold text-[#1b4d3e]">
          {editingId ? "Edit project" : "Add project"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Project title
              </span>
              <input
                required
                value={form.title}
                onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Subtitle / type
              </span>
              <input
                required
                value={form.subtitle}
                onChange={(e) => setForm((c) => ({ ...c, subtitle: e.target.value }))}
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Description
            </span>
            <textarea
              required
              rows={3}
              value={form.description}
              onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
              className={inputClass}
            />
          </label>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Student name
              </span>
              <input
                required
                value={form.student_name}
                onChange={(e) => setForm((c) => ({ ...c, student_name: e.target.value }))}
                className={inputClass}
              />
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Badge label
              </span>
              <input
                required
                value={form.badge_label}
                onChange={(e) => setForm((c) => ({ ...c, badge_label: e.target.value }))}
                className={inputClass}
              />
            </label>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Badge color
              </span>
              <select
                value={form.badge_tone ?? "teal"}
                onChange={(e) =>
                  setForm((c) => ({
                    ...c,
                    badge_tone: e.target.value as StudentOutcome["badge_tone"],
                  }))
                }
                className={inputClass}
              >
                <option value="teal">Teal</option>
                <option value="orange">Orange</option>
                <option value="purple">Purple</option>
                <option value="green">Green</option>
              </select>
            </label>
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Image URL (optional)
              </span>
              <input
                value={form.image_url ?? ""}
                onChange={(e) => setForm((c) => ({ ...c, image_url: e.target.value }))}
                className={inputClass}
              />
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Tools used (comma separated)
            </span>
            <input
              value={toolsText}
              onChange={(e) => setToolsText(e.target.value)}
              placeholder="React, Node.js, MongoDB"
              className={inputClass}
            />
          </label>
          <label className="inline-flex items-center gap-2 text-sm text-[#1b4d3e]">
            <input
              type="checkbox"
              checked={form.is_featured ?? false}
              onChange={(e) => setForm((c) => ({ ...c, is_featured: e.target.checked }))}
            />
            Feature this project prominently
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#164032] disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update" : "Add project"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={() => {
                  setEditingId(null);
                  setForm(emptyForm);
                  setToolsText("");
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
        <h2 className="text-lg font-semibold text-[#1b4d3e]">All projects ({items.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#5f6c79]">Loading...</p>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#ebe5db] bg-[#fcfbfa] p-4">
                <p className="font-semibold text-[#1b4d3e]">
                  {item.title}
                  {item.is_featured ? (
                    <span className="ml-2 rounded-full bg-[#e8f4f3] px-2 py-0.5 text-[10px] font-bold uppercase text-[#1b6b66]">
                      Featured
                    </span>
                  ) : null}
                </p>
                <p className="mt-1 text-sm text-[#5f6c79]">
                  {item.student_name} · {item.badge_label}
                </p>
                <div className="mt-3 flex gap-2">
                  <button
                    type="button"
                    onClick={() => {
                      setEditingId(item.id ?? null);
                      setForm(item);
                      setToolsText(item.tools.join(", "));
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
