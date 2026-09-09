"use client";

import { useEffect, useState } from "react";

import type { Enquiry } from "@/lib/content/types";
import { fetchAdminList } from "@/lib/admin/fetch";

export default function EnquiriesManager() {
  const [items, setItems] = useState<Enquiry[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState<string | null>(null);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await fetchAdminList<Enquiry>("/api/admin/enquiries");
    setItems(data);
    setLoadError(error);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  async function updateStatus(id: string, status: Enquiry["status"]) {
    await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    await loadItems();
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Enquiries</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          Messages submitted from the enquiry popup and contact form.
        </p>
        {loadError && (
          <p className="mt-4 rounded-xl border border-[#f0dfbf] bg-[#fff9ef] px-4 py-3 text-sm text-[#7a5a2d]">
            {loadError}
          </p>
        )}
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-6 shadow-[0_8px_24px_rgba(15,23,42,0.05)]">
        {loading ? (
          <p className="text-sm text-[#5f6c79]">Loading...</p>
        ) : items.length === 0 ? (
          <p className="text-sm text-[#5f6c79]">No enquiries yet.</p>
        ) : (
          <div className="space-y-4">
            {items.map((item) => (
              <article
                key={item.id}
                className="rounded-xl border border-[#ebe5db] bg-[#fcfbfa] p-4"
              >
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <div>
                    <p className="text-sm font-semibold text-[#1b4d3e]">{item.name}</p>
                    <p className="text-xs text-[#7a8a9c]">
                      {new Date(item.created_at).toLocaleString()} · {item.source}
                    </p>
                  </div>
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      item.status === "new"
                        ? "bg-[#fff3df] text-[#9b6d40]"
                        : item.status === "read"
                          ? "bg-[#e8f4f3] text-[#1b6b66]"
                          : "bg-[#f1f1f1] text-[#7a8a9c]"
                    }`}
                  >
                    {item.status}
                  </span>
                </div>
                <div className="mt-3 space-y-1 text-sm text-[#3d4f63]">
                  {item.email && <p>Email: {item.email}</p>}
                  {item.phone && <p>Phone: {item.phone}</p>}
                  {item.message && <p className="leading-relaxed">{item.message}</p>}
                </div>
                <div className="mt-3 flex gap-2">
                  {item.status !== "read" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, "read")}
                      className="rounded-lg border border-[#cfe0de] px-3 py-1.5 text-xs font-semibold text-[#1b4d3e]"
                    >
                      Mark read
                    </button>
                  )}
                  {item.status !== "archived" && (
                    <button
                      type="button"
                      onClick={() => updateStatus(item.id, "archived")}
                      className="rounded-lg border border-[#e8e2d8] px-3 py-1.5 text-xs font-semibold text-[#5f6c79]"
                    >
                      Archive
                    </button>
                  )}
                </div>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
