"use client";

import { useEffect, useState } from "react";
import { Plus, Trash2 } from "lucide-react";

import { PROGRAM_GROUP_OPTIONS } from "@/lib/content/program-groups";
import type { ProgramRecord } from "@/lib/content/types";
import { fetchAdminList } from "@/lib/admin/fetch";

const inputClass =
  "w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-sm text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8";

const emptyForm: ProgramRecord = {
  title: "",
  description: "",
  meta: "",
  image: "",
  projects: "",
  mentoring: "",
  group_name: PROGRAM_GROUP_OPTIONS[0] ?? "Core Programs",
};

export default function ProgramsManager() {
  const [items, setItems] = useState<ProgramRecord[]>([]);
  const [form, setForm] = useState<ProgramRecord>(emptyForm);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const [readOnlyNotice, setReadOnlyNotice] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const { data, error, notice } = await fetchAdminList<ProgramRecord>("/api/admin/programs");
    setItems(data);
    setReadOnlyNotice(notice);
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

    const response = await fetch("/api/admin/programs", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...form } : form),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not save program.");
      return;
    }

    setForm(emptyForm);
    setEditingId(null);
    setMessage("Program saved.");
    await loadItems();
  }

  async function handleDelete(id: string) {
    if (!window.confirm("Delete this program?")) return;
    await fetch(`/api/admin/programs?id=${id}`, { method: "DELETE" });
    await loadItems();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Programs</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          Manage courses shown on the home page and programs page.
        </p>
        {readOnlyNotice && (
          <p className="mt-4 rounded-xl border border-[#f0dfbf] bg-[#fff9ef] px-4 py-3 text-sm text-[#7a5a2d]">
            {readOnlyNotice}
          </p>
        )}
        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f4f3] px-4 py-3 text-sm text-[#1b4d3e]">{message}</p>
        )}
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h2 className="text-lg font-semibold text-[#1b4d3e]">
          {editingId ? "Edit program" : "Add program"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <div className="grid gap-4 md:grid-cols-2">
            <label className="block">
              <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
                Title
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
                Category
              </span>
              <select
                value={form.group_name}
                onChange={(e) => setForm((c) => ({ ...c, group_name: e.target.value }))}
                className={inputClass}
              >
                {PROGRAM_GROUP_OPTIONS.map((group) => (
                  <option key={group} value={group}>
                    {group}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Short label (meta)
            </span>
            <input
              required
              value={form.meta}
              onChange={(e) => setForm((c) => ({ ...c, meta: e.target.value }))}
              className={inputClass}
            />
          </label>
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
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Image URL
            </span>
            <input
              value={form.image ?? ""}
              onChange={(e) => setForm((c) => ({ ...c, image: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Projects line
            </span>
            <textarea
              required
              rows={2}
              value={form.projects}
              onChange={(e) => setForm((c) => ({ ...c, projects: e.target.value }))}
              className={inputClass}
            />
          </label>
          <label className="block">
            <span className="mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]">
              Mentoring line
            </span>
            <textarea
              required
              rows={2}
              value={form.mentoring}
              onChange={(e) => setForm((c) => ({ ...c, mentoring: e.target.value }))}
              className={inputClass}
            />
          </label>
          <div className="flex gap-3">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1b4d3e] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#164032] disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving ? "Saving..." : editingId ? "Update" : "Add program"}
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
        <h2 className="text-lg font-semibold text-[#1b4d3e]">All programs ({items.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#5f6c79]">Loading...</p>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item) => (
              <article key={item.id} className="rounded-xl border border-[#ebe5db] bg-[#fcfbfa] p-4">
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p className="font-semibold text-[#1b4d3e]">{item.title}</p>
                    <p className="mt-1 text-xs text-[#7a8a9c]">{item.group_name}</p>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setEditingId(item.id ?? null);
                        setForm(item);
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
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
