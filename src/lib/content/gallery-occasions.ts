import type { GalleryImage } from "./types";

export const OCCASION_LABEL = "Occasions";
export const MAX_OCCASION_PHOTOS = 5;
export const MIN_OCCASION_YEAR = 2000;

export function isOccasionLabel(label: string | null | undefined) {
  return label?.trim().toLowerCase() === OCCASION_LABEL.toLowerCase();
}

export function isValidImageUrl(url: string) {
  if (url.startsWith("/")) {
    return !url.startsWith("//");
  }
  return /^https:\/\/\S+$/i.test(url);
}

export function normalizeGalleryImages(value: unknown): GalleryImage[] {
  if (!Array.isArray(value)) {
    return [];
  }

  return value.flatMap((item): GalleryImage[] => {
    if (typeof item === "string") {
      const url = item.trim();
      return url ? [{ url }] : [];
    }

    if (!item || typeof item !== "object") {
      return [];
    }

    const { url, publicId, alt } = item as Record<string, unknown>;
    if (typeof url !== "string" || !url.trim()) {
      return [];
    }

    return [
      {
        url: url.trim(),
        ...(typeof publicId === "string" && publicId.trim() ? { publicId: publicId.trim() } : {}),
        ...(typeof alt === "string" && alt.trim() ? { alt: alt.trim() } : {}),
      },
    ];
  });
}

export function maxOccasionYear() {
  return new Date().getFullYear() + 1;
}

export function validateOccasion({
  title,
  year,
  images,
}: {
  title: string;
  year: string;
  images: readonly GalleryImage[];
}): string | null {
  if (!title.trim()) {
    return "Topic / occasion name is required.";
  }

  const trimmedYear = year.trim();
  if (!/^\d{4}$/.test(trimmedYear)) {
    return "Enter a 4-digit year, for example 2026.";
  }

  const numericYear = Number(trimmedYear);
  const maxYear = maxOccasionYear();
  if (numericYear < MIN_OCCASION_YEAR || numericYear > maxYear) {
    return `Year must be between ${MIN_OCCASION_YEAR} and ${maxYear}.`;
  }

  if (images.length < 1) {
    return "Add at least 1 photo.";
  }

  if (images.length > MAX_OCCASION_PHOTOS) {
    return `Maximum ${MAX_OCCASION_PHOTOS} photos per occasion.`;
  }

  if (images.some((image) => !isValidImageUrl(image.url))) {
    return "Each photo must be a site path (e.g. /gallery/photo.jpg) or an https:// URL.";
  }

  return null;
}

export function getOccasionImages(event: {
  title: string;
  photos: readonly string[];
  images?: readonly GalleryImage[] | null;
}): GalleryImage[] {
  const source: readonly GalleryImage[] = event.images?.length
    ? event.images
    : event.photos.map((url) => ({ url }));

  return source
    .filter((image) => image.url)
    .slice(0, MAX_OCCASION_PHOTOS)
    .map((image, index) => ({
      ...image,
      alt: image.alt || `${event.title} photo ${index + 1}`,
    }));
}

export function canOptimizeImage(url: string) {
  if (url.startsWith("/")) {
    return true;
  }
  try {
    return new URL(url).hostname === "res.cloudinary.com";
  } catch {
    return false;
  }
}
