"use client";

import Image from "next/image";
import {
  Bookmark,
  Calendar,
  Check,
  Grid3x3,
  List,
  MapPin,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { getOccasionImages } from "@/lib/content/gallery-occasions";
import { useMediaQuery } from "@/lib/use-media-query";

import {
  badgeToneStyles,
  galleryEvents as defaultGalleryEvents,
  galleryFilters,
  getEventFilterId,
  getEventLocation,
  getGalleryCardMeta,
  isOccasionEvent,
  parseStudentLabel,
  type GalleryFilterId,
} from "./gallery-data";
import type { GalleryEvent } from "./content";
import {
  OccasionAlbumCard,
  OccasionAlbumViewer,
  OccasionsEmptyState,
  type OccasionAlbum,
} from "./OccasionAlbums";

type GalleryItem =
  | { kind: "event"; key: string; event: GalleryEvent; sortDate: number; sortName: string }
  | { kind: "album"; key: string; album: OccasionAlbum; sortDate: number; sortName: string };

function parseEventDate(date: string) {
  const parsed = new Date(date.replace(/(\d+) (\w+), (\d+)/, "$2 $1, $3")).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
}

function parseYear(year: string) {
  return /^\d{4}$/.test(year) ? Date.UTC(Number(year), 0, 1) : 0;
}

function GalleryEventCard({
  event,
  listView,
}: {
  event: GalleryEvent;
  listView: boolean;
}) {
  const meta = getGalleryCardMeta(event);
  const badgeClass = badgeToneStyles[meta.badgeTone];
  const footer = `${parseStudentLabel(event)} · ${getEventLocation(event)}`;

  if (listView) {
    return (
      <article className="flex overflow-hidden rounded-[18px] border border-[#ebe5db] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]">
        <div className="group relative h-[150px] w-[220px] shrink-0 overflow-hidden">
          <Image
            src={event.photos[0]}
            alt={event.title}
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="220px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/40 via-transparent to-transparent" />
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
          >
            {event.label.toUpperCase()}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <p className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6b7c8f]">
              <Calendar className="h-3.5 w-3.5" />
              {event.date}
            </p>
            <h3 className="mt-2 text-[18px] font-bold text-[#1b4d3e]">{event.title}</h3>
            <p className="mt-1.5 text-[16px] leading-[1.55] text-[#5f6f82]">{meta.summary}</p>
          </div>
          <p className="mt-3 text-[12px] font-medium text-[#6b7c8f]">{footer}</p>
        </div>
      </article>
    );
  }

  return (
    <article className="group overflow-hidden rounded-[20px] border border-[#ebe5db] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)]">
      <div className="relative h-[190px] overflow-hidden">
        <Image
          src={event.photos[0]}
          alt={event.title}
          fill
          className="object-cover transition duration-500 group-hover:scale-105"
          sizes="(min-width: 1280px) 360px, (min-width: 768px) 50vw, 100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/45 via-[#0f1a28]/5 to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-[0.12em] sm:text-[9px] ${badgeClass}`}
        >
            {event.label.toUpperCase()}
          </span>
          <button
            type="button"
            className="absolute right-3 top-3 hidden h-8 w-8 items-center sm:inline-flex justify-center rounded-full bg-white/95 text-[#5f6f82] shadow-sm transition hover:text-[#1b4d3e]"
            aria-label={`Save ${event.title}`}
          >
            <Bookmark className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      <div className="p-4">
        <p className="inline-flex items-center gap-1.5 text-[13px] font-medium text-[#6b7c8f] sm:text-[12px]">
          <Calendar className="h-3.5 w-3.5 text-[#1b6b66]" />
          {event.date}
        </p>
        <h3 className="mt-2 text-[17px] font-bold leading-tight text-[#1b4d3e]">{event.title}</h3>
        <p className="mt-2 text-[16px] leading-[1.55] text-[#5f6f82] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {meta.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#f0ebe3] pt-3 text-[13px] font-medium text-[#6b7c8f] sm:text-[11px]">
          <span className="inline-flex items-center gap-1">
            <Users className="h-3.5 w-3.5" />
            {parseStudentLabel(event)}
          </span>
          <span className="inline-flex items-center gap-1">
            <MapPin className="h-3.5 w-3.5" />
            {getEventLocation(event)}
          </span>
        </div>
      </div>
    </article>
  );
}

export default function GalleryCatalog({
  events = defaultGalleryEvents,
}: {
  events?: readonly GalleryEvent[];
}) {
  const [activeFilter, setActiveFilter] = useState<GalleryFilterId>("all");
  const [sortBy, setSortBy] = useState<"latest" | "name">("latest");
  const [listView, setListView] = useState(false);
  const [openAlbumKey, setOpenAlbumKey] = useState<string | null>(null);
  const isMdUp = useMediaQuery("(min-width: 768px)");
  const isOccasionsView = activeFilter === "institute-occasions";
  const effectiveListView = listView && isMdUp && !isOccasionsView;

  const galleryItems = useMemo<GalleryItem[]>(
    () =>
      events.flatMap((event, index): GalleryItem[] => {
        if (!isOccasionEvent(event)) {
          return [
            {
              kind: "event",
              key: `event-${index}-${event.title}`,
              event,
              sortDate: parseEventDate(event.date),
              sortName: event.title,
            },
          ];
        }

        const images = getOccasionImages(event);
        if (!images.length) {
          return [];
        }

        const year = event.year ?? (/^\d{4}$/.test(event.date) ? event.date : "");
        return [
          {
            kind: "album",
            key: `album-${index}-${event.title}`,
            album: { key: `album-${index}-${event.title}`, title: event.title, year, images },
            sortDate: parseYear(year),
            sortName: event.title,
          },
        ];
      }),
    [events],
  );

  const displayedItems = useMemo(() => {
    let filtered = [...galleryItems];

    if (isOccasionsView) {
      filtered = filtered.filter((item) => item.kind === "album");
    } else if (activeFilter !== "all") {
      filtered = filtered.filter(
        (item) => item.kind === "event" && getEventFilterId(item.event) === activeFilter,
      );
    }

    if (sortBy === "latest") {
      filtered.sort((a, b) => b.sortDate - a.sortDate);
    } else {
      filtered.sort((a, b) => a.sortName.localeCompare(b.sortName));
    }

    return filtered;
  }, [activeFilter, galleryItems, isOccasionsView, sortBy]);

  const openAlbum = useMemo(() => {
    const item = galleryItems.find(
      (candidate) => candidate.kind === "album" && candidate.key === openAlbumKey,
    );
    return item?.kind === "album" ? item.album : null;
  }, [galleryItems, openAlbumKey]);

  const closeAlbum = useCallback(() => setOpenAlbumKey(null), []);

  const headerLabel =
    activeFilter === "all"
      ? "All Events"
      : galleryFilters.find((filter) => filter.id === activeFilter)?.label ?? "Events";

  return (
    <div className="bg-[#fdfbf7] pb-20">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          {/* Hero */}
          <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
            <div className="relative min-h-[280px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                alt="Gallery hero"
                fill
                className="object-cover object-[72%_center]"
                priority
                sizes="(min-width: 1280px) 1240px, 100vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />


              <div className="relative flex h-full flex-col justify-center px-5 py-8 sm:px-10 sm:py-12 lg:max-w-[58%] lg:px-12">
                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                  Photo Gallery
                </span>
                <h1 className="mt-4 text-[34px] font-bold leading-[1.1] tracking-[-0.03em] !text-white sm:mt-5 sm:text-[46px] sm:leading-[1.08] lg:text-[54px]">
                  Explore Photos from{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Student Life</span>
                </h1>
                <p className="mt-3 max-w-[560px] text-base leading-[1.6] text-white/82 sm:mt-4 sm:text-[18px] sm:leading-[1.75]">
                  Browse curated albums from institute events, workshops, mentor sessions,
                  and the everyday moments that show learning in action.
                </p>

                <div className="mt-6 hidden flex-wrap gap-3 sm:flex">
                  {[
                    { value: "25+", label: "Events" },
                    { value: "500+", label: "Photos" },
                    { value: "1000+", label: "Moments" },
                  ].map((item) => (
                    <div
                      key={item.label}
                      className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
                    >
                      <p className="text-[18px] font-bold leading-tight text-white">{item.value}</p>
                      <p className="mt-0.5 text-[13px] font-semibold text-white/70">{item.label}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Main layout */}
          <div className="mt-8 grid gap-8 sm:mt-10 lg:grid-cols-[268px_minmax(0,1fr)] lg:items-start lg:gap-10">
            <aside className="hidden lg:sticky lg:top-24 lg:block">
              <div className="rounded-[20px] border border-[#ebe5db] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2">
                    <SlidersHorizontal className="h-4 w-4 text-[#1b6b66]" strokeWidth={2.25} />
                    <h2 className="text-[13px] font-bold uppercase tracking-[0.12em] text-[#1b4d3e]">
                      Filter Events
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => setActiveFilter("all")}
                    className="text-[13px] font-semibold text-[#1b6b66] hover:text-[#164032]"
                  >
                    Clear All
                  </button>
                </div>

                <ul className="mt-4 divide-y divide-[#f0ebe3]">
                  {galleryFilters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.id;

                    return (
                      <li key={filter.id}>
                        <button
                          type="button"
                          onClick={() => setActiveFilter(filter.id)}
                          className={`flex w-full items-center justify-between gap-2 rounded-xl px-2 py-3 text-left transition-colors ${
                            isActive ? "bg-[#e8f4f3]" : "hover:bg-[#f8f6f1]"
                          }`}
                        >
                          <span className="flex items-center gap-2.5">
                            <Icon
                              className={`h-4 w-4 ${isActive ? "text-[#1b6b66]" : "text-[#6b7c8f]"}`}
                              strokeWidth={2.1}
                            />
                            <span
                              className={`text-[14px] font-semibold ${
                                isActive ? "text-[#1b4d3e]" : "text-[#3f4f61]"
                              }`}
                            >
                              {filter.label}
                            </span>
                          </span>
                          {isActive ? (
                            <Check className="h-4 w-4 shrink-0 text-[#1b6b66]" strokeWidth={2.5} />
                          ) : null}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              </div>
            </aside>

            <div className="min-w-0">
              <div className="rounded-[18px] border border-[#ebe5db] bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.05)] sm:p-5">
                <div className="-mx-4 flex gap-2 overflow-x-auto px-4 pb-1 [scrollbar-width:none] sm:mx-0 sm:flex-wrap sm:overflow-visible sm:px-0 sm:pb-0 [&::-webkit-scrollbar]:hidden">
                  {galleryFilters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.id;

                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setActiveFilter(filter.id)}
                        className={`inline-flex min-h-10 shrink-0 items-center gap-2 whitespace-nowrap rounded-full px-3.5 py-2 text-[13px] font-semibold transition-colors sm:min-h-0 ${
                          isActive
                            ? "bg-[#1b4d3e] text-white shadow-sm"
                            : "border border-[#e8e2d8] bg-[#f8f6f1] text-[#3f4f61] hover:border-[#cfe0de]"
                        }`}
                      >
                        <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                        {filter.label}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
                <div>
                  <p className="text-[11px] font-bold uppercase tracking-[0.16em] text-[#1b6b66]">
                    {headerLabel}
                  </p>
                  <h2 className="mt-2 text-[32px] font-bold tracking-[-0.03em] text-[#1b4d3e] sm:text-[32px]">
                    Explore Our Events
                  </h2>
                  <p className="mt-2 max-w-2xl text-[14px] leading-[1.65] text-[#5f6f82]">
                    Moments from workshops, practice labs, mentor sessions, tech talks, and
                    institute occasions.
                  </p>
                </div>

                <div className="flex flex-wrap items-center gap-3">
                  <label className="flex items-center gap-2 text-[13px] text-[#5f6f82]">
                    <span className="font-medium">Sort by:</span>
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value as "latest" | "name")}
                      className="min-h-11 rounded-lg border border-[#e8e2d8] bg-white px-3 py-2 text-base font-semibold text-[#1b4d3e] outline-none focus:border-[#1b6b66]/40 sm:min-h-0 sm:text-[13px]"
                    >
                      <option value="latest">Latest</option>
                      <option value="name">Name</option>
                    </select>
                  </label>
                  <div
                    className={`hidden overflow-hidden rounded-lg border border-[#e8e2d8] bg-white ${
                      isOccasionsView ? "" : "md:inline-flex"
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => setListView(false)}
                      className={`inline-flex h-9 w-9 items-center justify-center ${
                        !listView ? "bg-[#1b4d3e] text-white" : "text-[#5f6f82]"
                      }`}
                      aria-label="Grid view"
                    >
                      <Grid3x3 className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => setListView(true)}
                      className={`inline-flex h-9 w-9 items-center justify-center border-l border-[#e8e2d8] ${
                        listView ? "bg-[#1b4d3e] text-white" : "text-[#5f6f82]"
                      }`}
                      aria-label="List view"
                    >
                      <List className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>

              {displayedItems.length > 0 ? (
                <div
                  className={`mt-6 grid gap-5 sm:gap-6 ${
                    isOccasionsView
                      ? "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"
                      : effectiveListView
                        ? "grid-cols-1"
                        : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                  }`}
                >
                  {displayedItems.map((item) =>
                    item.kind === "album" ? (
                      <OccasionAlbumCard
                        key={item.key}
                        album={item.album}
                        listView={effectiveListView}
                        onOpen={() => setOpenAlbumKey(item.key)}
                      />
                    ) : (
                      <GalleryEventCard
                        key={item.key}
                        event={item.event}
                        listView={effectiveListView}
                      />
                    ),
                  )}
                </div>
              ) : isOccasionsView ? (
                <OccasionsEmptyState />
              ) : (
                <p className="mt-8 rounded-[18px] border border-dashed border-[#d6dde5] bg-white px-6 py-12 text-center text-[14px] text-[#5f6f82]">
                  No events match this filter. Try another category or clear filters.
                </p>
              )}
            </div>
          </div>
        </div>
      </div>

      {openAlbum ? (
        <OccasionAlbumViewer key={openAlbum.key} album={openAlbum} onClose={closeAlbum} />
      ) : null}
    </div>
  );
}
