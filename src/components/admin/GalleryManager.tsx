"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Plus, Trash2, X } from "lucide-react";

import type { GalleryEventRecord, GalleryImage } from "@/lib/content/types";
import { fetchAdminList } from "@/lib/admin/fetch";
import { revealForm } from "@/lib/admin/reveal-form";
import {
  isOccasionLabel,
  isValidImageUrl,
  MAX_OCCASION_PHOTOS,
  maxOccasionYear,
  MIN_OCCASION_YEAR,
  normalizeGalleryImages,
  OCCASION_LABEL,
  validateOccasion,
} from "@/lib/content/gallery-occasions";

const inputClass =
  "w-full rounded-xl border border-[#e8e2d8] bg-[#fcfbfa] px-3.5 py-2.5 text-base text-[#1b4d3e] outline-none focus:border-[#1b6b66]/45 focus:ring-4 focus:ring-[#1b6b66]/8 sm:text-sm";

const fieldLabelClass =
  "mb-1 block text-xs font-bold uppercase tracking-[0.14em] text-[#7a8a9c]";

const categoryOptions = [
  { value: "Workshop", label: "Workshops" },
  { value: "Practice Lab", label: "Practice Labs" },
  { value: "Mentor Session", label: "Mentor Sessions" },
  { value: "Tech Talk", label: "Tech Talks" },
  { value: "Student Moments", label: "Student Moments" },
  { value: "Presentation", label: "Student Moments (Presentation)" },
  { value: OCCASION_LABEL, label: "Institute Occasions" },
] as const;

const emptyForm: GalleryEventRecord = {
  title: "",
  label: "",
  description: "",
  photos: [],
  date: "",
  location: "",
  students: "",
  year: "",
};

function splitPhotoText(text: string) {
  return text
    .split(/[\n,]+/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function OccasionPhotosField({
  images,
  onChange,
}: {
  images: GalleryImage[];
  onChange: (images: GalleryImage[]) => void;
}) {
  const [newUrl, setNewUrl] = useState("");
  const [error, setError] = useState<string | null>(null);
  const isFull = images.length >= MAX_OCCASION_PHOTOS;

  function addPhoto() {
    const url = newUrl.trim();
    if (isFull) {
      setError(`Maximum ${MAX_OCCASION_PHOTOS} photos per occasion.`);
      return;
    }
    if (!url) {
      setError("Paste an image path or URL first.");
      return;
    }
    if (!isValidImageUrl(url)) {
      setError("Use a site path like /gallery/photo.jpg or an https:// URL.");
      return;
    }
    if (images.some((image) => image.url === url)) {
      setError("This photo is already in the album.");
      return;
    }
    onChange([...images, { url }]);
    setNewUrl("");
    setError(null);
  }

  function removePhoto(index: number) {
    onChange(images.filter((_, current) => current !== index));
    setError(null);
  }

  function movePhoto(index: number, direction: -1 | 1) {
    const target = index + direction;
    if (target < 0 || target >= images.length) return;
    const next = [...images];
    [next[index], next[target]] = [next[target], next[index]];
    onChange(next);
  }

  return (
    <div>
      <div className="flex items-center justify-between gap-3">
        <span className={fieldLabelClass}>Photos</span>
        <span
          className={`text-sm font-semibold ${isFull ? "text-[#a16207]" : "text-[#1b6b66]"}`}
          aria-live="polite"
        >
          {images.length} / {MAX_OCCASION_PHOTOS} photos
        </span>
      </div>
      <p className="text-sm text-[#5f6c79]">
        Add up to {MAX_OCCASION_PHOTOS} photos. The first photo is the album cover.
      </p>

      {images.length > 0 ? (
        <ul className="mt-3 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {images.map((image, index) => (
            <li
              key={`${image.url}-${index}`}
              className="overflow-hidden rounded-xl border border-[#e8e2d8] bg-white"
            >
              <div className="relative aspect-[4/3] bg-[#f3f1ec]">
                <Image
                  src={image.url}
                  alt={`Photo ${index + 1}`}
                  fill
                  unoptimized
                  className="object-cover"
                  sizes="200px"
                />
                {index === 0 ? (
                  <span className="absolute left-1.5 top-1.5 rounded-full bg-[#1b4d3e] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.08em] text-white">
                    Cover
                  </span>
                ) : null}
                <button
                  type="button"
                  onClick={() => removePhoto(index)}
                  className="absolute right-1.5 top-1.5 inline-flex h-9 w-9 items-center justify-center rounded-full bg-white/95 text-[#9b3d3d] shadow-sm hover:bg-white"
                  aria-label={`Remove photo ${index + 1}`}
                >
                  <X className="h-4 w-4" strokeWidth={2.4} />
                </button>
              </div>
              <div className="flex items-center justify-between px-1 py-1">
                <button
                  type="button"
                  onClick={() => movePhoto(index, -1)}
                  disabled={index === 0}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#1b4d3e] hover:bg-[#f3f5f4] disabled:opacity-30"
                  aria-label={`Move photo ${index + 1} earlier`}
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <span className="text-xs font-semibold text-[#5f6c79]">Photo {index + 1}</span>
                <button
                  type="button"
                  onClick={() => movePhoto(index, 1)}
                  disabled={index === images.length - 1}
                  className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-[#1b4d3e] hover:bg-[#f3f5f4] disabled:opacity-30"
                  aria-label={`Move photo ${index + 1} later`}
                >
                  <ChevronRight className="h-4 w-4" />
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : null}

      {isFull ? (
        <p className="mt-3 rounded-xl bg-[#fdf3e3] px-3.5 py-2.5 text-sm font-medium text-[#8a5a12]">
          Maximum {MAX_OCCASION_PHOTOS} photos per occasion.
        </p>
      ) : (
        <div className="mt-3 flex flex-col gap-2 sm:flex-row">
          <input
            value={newUrl}
            onChange={(e) => setNewUrl(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addPhoto();
              }
            }}
            placeholder="/gallery/annual-day-1.jpg or https://…"
            aria-label="Photo path or URL"
            className={inputClass}
          />
          <button
            type="button"
            onClick={addPhoto}
            className="inline-flex min-h-11 shrink-0 items-center justify-center gap-1.5 rounded-xl border border-[#cfe0de] bg-[#e8f4f3] px-4 py-2.5 text-sm font-semibold text-[#1b4d3e] hover:bg-[#dcefed] sm:min-h-0"
          >
            <Plus className="h-4 w-4" />
            Add Photo
          </button>
        </div>
      )}
      {error ? <p className="mt-2 text-sm text-[#9b3d3d]">{error}</p> : null}
    </div>
  );
}

export default function GalleryManager() {
  const [items, setItems] = useState<GalleryEventRecord[]>([]);
  const [form, setForm] = useState(emptyForm);
  const [photosText, setPhotosText] = useState("");
  const [occasionImages, setOccasionImages] = useState<GalleryImage[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [message, setMessage] = useState<string | null>(null);
  const formSectionRef = useRef<HTMLElement>(null);
  const firstFieldRef = useRef<HTMLSelectElement>(null);

  const isOccasion = isOccasionLabel(form.label);
  const knownCategory = categoryOptions.some((option) => option.value === form.label);

  async function loadItems() {
    setLoading(true);
    const { data, error } = await fetchAdminList<GalleryEventRecord>("/api/admin/gallery");
    setItems(data);
    if (error) setMessage(error);
    setLoading(false);
  }

  useEffect(() => {
    void loadItems();
  }, []);

  function resetForm() {
    setEditingId(null);
    setForm(emptyForm);
    setPhotosText("");
    setOccasionImages([]);
  }

  function handleCategoryChange(label: string) {
    if (isOccasionLabel(label) && !occasionImages.length) {
      setOccasionImages(
        splitPhotoText(photosText)
          .slice(0, MAX_OCCASION_PHOTOS)
          .map((url) => ({ url })),
      );
    } else if (!isOccasionLabel(label) && !photosText.trim() && occasionImages.length) {
      setPhotosText(occasionImages.map((image) => image.url).join("\n"));
    }
    setForm((current) => ({ ...current, label }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage(null);

    let payload: Record<string, unknown>;

    if (isOccasion) {
      const title = form.title.trim();
      const year = (form.year ?? "").trim();
      const validationError = validateOccasion({ title, year, images: occasionImages });
      if (validationError) {
        setMessage(validationError);
        return;
      }

      payload = {
        title,
        label: OCCASION_LABEL,
        year,
        images: occasionImages.map((image, index) => ({
          ...image,
          alt: image.alt || `${title} ${year} photo ${index + 1}`,
        })),
        sort_order: form.sort_order,
        published: form.published,
      };
    } else {
      payload = {
        ...form,
        photos: splitPhotoText(photosText),
      };
    }

    setSaving(true);
    const response = await fetch("/api/admin/gallery", {
      method: editingId ? "PATCH" : "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(editingId ? { id: editingId, ...payload } : payload),
    });

    const data = await response.json();
    setSaving(false);

    if (!response.ok) {
      setMessage(data.error ?? "Could not save gallery event.");
      return;
    }

    resetForm();
    setMessage(isOccasion ? "Occasion album saved." : "Gallery event saved.");
    await loadItems();
  }

  async function handleDelete(item: GalleryEventRecord) {
    const prompt = isOccasionLabel(item.label)
      ? `Delete the "${item.title}" occasion album?`
      : "Delete this gallery event?";
    if (!item.id || !window.confirm(prompt)) return;
    await fetch(`/api/admin/gallery?id=${item.id}`, { method: "DELETE" });
    await loadItems();
  }

  function startEditing(item: GalleryEventRecord) {
    setEditingId(item.id ?? null);
    setForm({ ...item, year: item.year ?? "" });
    if (isOccasionLabel(item.label)) {
      const images = normalizeGalleryImages(item.images?.length ? item.images : item.photos);
      setOccasionImages(images.slice(0, MAX_OCCASION_PHOTOS));
      setPhotosText("");
    } else {
      setPhotosText(item.photos.join("\n"));
      setOccasionImages([]);
    }
    revealForm(formSectionRef.current, firstFieldRef.current);
  }

  return (
    <div className="space-y-6">
      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6">
        <h1 className="text-2xl font-semibold text-[#1b4d3e]">Gallery</h1>
        <p className="mt-2 text-sm text-[#5f6c79]">
          Manage event photos shown on the home gallery and gallery page.
        </p>
        {message && (
          <p className="mt-4 rounded-xl bg-[#e8f4f3] px-4 py-3 text-sm text-[#1b4d3e]">{message}</p>
        )}
      </section>

      <section
        ref={formSectionRef}
        className="scroll-mt-20 rounded-2xl border border-[#e8e2d8] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6 lg:scroll-mt-6"
      >
        <h2 className="text-lg font-semibold text-[#1b4d3e]">
          {editingId
            ? isOccasion
              ? "Edit occasion album"
              : "Edit event"
            : isOccasion
              ? "Add occasion album"
              : "Add event"}
        </h2>
        <form onSubmit={handleSubmit} className="mt-4 grid gap-4">
          <label className="block">
            <span className={fieldLabelClass}>Category</span>
            <select
              ref={firstFieldRef}
              required
              value={form.label}
              onChange={(e) => handleCategoryChange(e.target.value)}
              className={inputClass}
            >
              <option value="" disabled>
                Select a category
              </option>
              {categoryOptions.map((option) => (
                <option key={option.value} value={option.value}>
                  {option.label}
                </option>
              ))}
              {form.label && !knownCategory ? (
                <option value={form.label}>{form.label}</option>
              ) : null}
            </select>
          </label>

          {isOccasion ? (
            <>
              <div className="grid gap-4 md:grid-cols-[minmax(0,1fr)_180px]">
                <label className="block">
                  <span className={fieldLabelClass}>Topic / Occasion name</span>
                  <input
                    required
                    value={form.title}
                    onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                    placeholder="Annual Celebration"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className={fieldLabelClass}>Year</span>
                  <input
                    required
                    inputMode="numeric"
                    pattern="\d{4}"
                    maxLength={4}
                    value={form.year ?? ""}
                    onChange={(e) =>
                      setForm((c) => ({ ...c, year: e.target.value.replace(/\D/g, "") }))
                    }
                    placeholder={String(new Date().getFullYear())}
                    title={`4-digit year between ${MIN_OCCASION_YEAR} and ${maxOccasionYear()}`}
                    className={inputClass}
                  />
                </label>
              </div>
              <OccasionPhotosField
                key={editingId ?? "new"}
                images={occasionImages}
                onChange={setOccasionImages}
              />
            </>
          ) : (
            <>
              <label className="block">
                <span className={fieldLabelClass}>Title</span>
                <input
                  required
                  value={form.title}
                  onChange={(e) => setForm((c) => ({ ...c, title: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Description</span>
                <textarea
                  required
                  rows={3}
                  value={form.description}
                  onChange={(e) => setForm((c) => ({ ...c, description: e.target.value }))}
                  className={inputClass}
                />
              </label>
              <label className="block">
                <span className={fieldLabelClass}>Photo URLs (one per line)</span>
                <textarea
                  required
                  rows={4}
                  value={photosText}
                  onChange={(e) => setPhotosText(e.target.value)}
                  placeholder="/hero/example.jpg"
                  className={inputClass}
                />
              </label>
              <div className="grid gap-4 md:grid-cols-3">
                <label className="block">
                  <span className={fieldLabelClass}>Date</span>
                  <input
                    required
                    value={form.date}
                    onChange={(e) => setForm((c) => ({ ...c, date: e.target.value }))}
                    placeholder="18 May, 2024"
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className={fieldLabelClass}>Location</span>
                  <input
                    value={form.location ?? ""}
                    onChange={(e) => setForm((c) => ({ ...c, location: e.target.value }))}
                    className={inputClass}
                  />
                </label>
                <label className="block">
                  <span className={fieldLabelClass}>Students</span>
                  <input
                    required
                    value={form.students}
                    onChange={(e) => setForm((c) => ({ ...c, students: e.target.value }))}
                    placeholder="42 Students"
                    className={inputClass}
                  />
                </label>
              </div>
            </>
          )}

          <div className="flex flex-col gap-3 sm:flex-row">
            <button
              type="submit"
              disabled={saving}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-4 py-2.5 sm:min-h-0 text-sm font-semibold text-white hover:bg-[#164032] disabled:opacity-60"
            >
              <Plus className="h-4 w-4" />
              {saving
                ? "Saving..."
                : editingId
                  ? "Update"
                  : isOccasion
                    ? "Save occasion"
                    : "Add event"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={resetForm}
                className="min-h-11 rounded-xl border border-[#e8e2d8] px-4 py-2.5 text-sm font-medium text-[#5f6c79] sm:min-h-0"
              >
                Cancel
              </button>
            )}
          </div>
        </form>
      </section>

      <section className="rounded-2xl border border-[#e8e2d8] bg-white p-4 shadow-[0_8px_24px_rgba(15,23,42,0.05)] sm:p-6">
        <h2 className="text-lg font-semibold text-[#1b4d3e]">All events ({items.length})</h2>
        {loading ? (
          <p className="mt-4 text-sm text-[#5f6c79]">Loading...</p>
        ) : (
          <div className="mt-4 space-y-3">
            {items.map((item) => {
              const occasion = isOccasionLabel(item.label);
              const photoCount = occasion
                ? normalizeGalleryImages(item.images?.length ? item.images : item.photos).length
                : item.photos.length;

              return (
                <article key={item.id} className="rounded-xl border border-[#ebe5db] bg-[#fcfbfa] p-4">
                  <p className="break-words font-semibold text-[#1b4d3e]">{item.title}</p>
                  <p className="mt-1 text-sm text-[#5f6c79]">
                    {occasion
                      ? `Institute Occasion · ${item.year || item.date} · ${photoCount} / ${MAX_OCCASION_PHOTOS} photos`
                      : `${item.date} · ${item.students} · ${photoCount} photos`}
                  </p>
                  <div className="mt-3 flex gap-3 sm:gap-2">
                    <button
                      type="button"
                      onClick={() => startEditing(item)}
                      className="inline-flex min-h-10 items-center rounded-lg border border-[#e8e2d8] px-4 text-sm font-semibold text-[#1b4d3e] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(item)}
                      className="inline-flex min-h-10 items-center gap-1 rounded-lg border border-[#f2d4d4] px-4 text-sm font-semibold text-[#9b3d3d] sm:min-h-0 sm:px-3 sm:py-1.5 sm:text-xs"
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      Delete
                    </button>
                  </div>
                </article>
              );
            })}
          </div>
        )}
      </section>
    </div>
  );
}
