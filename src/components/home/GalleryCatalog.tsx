"use client";

import Image from "next/image";
import {
  Bookmark,
  Calendar,
  Camera,
  Check,
  Grid3x3,
  List,
  MapPin,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";

import {
  badgeToneStyles,
  galleryEvents as defaultGalleryEvents,
  galleryFilters,
  getEventFilterId,
  getEventLocation,
  getGalleryCardMeta,
  parsePhotoCount,
  parseStudentLabel,
  type GalleryFilterId,
} from "./gallery-data";
import type { GalleryEvent } from "./content";

function parseEventDate(date: string) {
  const parsed = new Date(date.replace(/(\d+) (\w+), (\d+)/, "$2 $1, $3")).getTime();
  return Number.isNaN(parsed) ? 0 : parsed;
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
  const footer = `${parsePhotoCount(event)} · ${parseStudentLabel(event)} · ${getEventLocation(event)}`;

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
            <p className="mt-1.5 text-[13px] leading-relaxed text-[#5f6f82]">{meta.summary}</p>
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
          sizes="(min-width: 1280px) 360px, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/45 via-[#0f1a28]/5 to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
        >
            {event.label.toUpperCase()}
          </span>
          <button
            type="button"
            className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/95 text-[#5f6f82] shadow-sm transition hover:text-[#1b4d3e]"
            aria-label={`Save ${event.title}`}
          >
            <Bookmark className="h-4 w-4" strokeWidth={2} />
        </button>
      </div>
      <div className="p-4">
        <p className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#6b7c8f]">
          <Calendar className="h-3.5 w-3.5 text-[#1b6b66]" />
          {event.date}
        </p>
        <h3 className="mt-2 text-[17px] font-bold leading-tight text-[#1b4d3e]">{event.title}</h3>
        <p className="mt-2 text-[13px] leading-[1.55] text-[#5f6f82] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {meta.summary}
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 border-t border-[#f0ebe3] pt-3 text-[11px] font-medium text-[#6b7c8f]">
          <span className="inline-flex items-center gap-1">
            <Camera className="h-3.5 w-3.5" />
            {parsePhotoCount(event)}
          </span>
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

  const displayedEvents = useMemo(() => {
    let filtered = [...events];

    if (activeFilter !== "all") {
      filtered = filtered.filter((event) => getEventFilterId(event) === activeFilter);
    }

    if (sortBy === "latest") {
      filtered.sort((a, b) => parseEventDate(b.date) - parseEventDate(a.date));
    } else {
      filtered.sort((a, b) => a.title.localeCompare(b.title));
    }

    return filtered;
  }, [activeFilter, events, sortBy]);

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
            <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
              <Image
                src="/hero/programming-background-with-person-working-with-codes-computer.jpg"
                alt="Gallery hero"
                fill
                className="object-cover object-[72%_center]"
                priority
                sizes="1240px"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0b2f2c]/92 via-[#0f3f3b]/78 to-[#0f3f3b]/35" />

              <div className="pointer-events-none absolute -right-8 top-12 hidden h-32 w-32 rounded-full border border-dashed border-[#5eb8a8]/40 lg:block" />
              <div className="pointer-events-none absolute bottom-16 right-[18%] hidden h-20 w-20 rounded-full border border-dashed border-[#f39c12]/35 lg:block" />

              <div className="relative flex h-full flex-col justify-center px-6 py-10 sm:px-10 sm:py-12 lg:max-w-[58%] lg:px-12">
                <span className="inline-flex w-fit rounded-full border border-white/20 bg-white/10 px-3 py-1 text-[11px] font-bold uppercase tracking-[0.16em] text-[#b8ebe4] backdrop-blur-sm">
                  Photo Gallery
                </span>
                <h1 className="mt-5 text-[36px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[46px] lg:text-[54px]">
                  Explore Photos from{" "}
                  <span className="whitespace-nowrap text-[#8fe0d4]">Student Life</span>
                </h1>
                <p className="mt-4 max-w-[560px] text-[17px] leading-[1.75] text-white/82 sm:text-[18px]">
                  Browse curated albums from institute events, workshops, mentor sessions,
                  and the everyday moments that show learning in action.
                </p>

                <div className="mt-6 flex flex-wrap gap-3">
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
          <div className="mt-10 grid gap-8 lg:grid-cols-[268px_minmax(0,1fr)] lg:items-start lg:gap-10">
            <aside className="lg:sticky lg:top-24">
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

            <div>
              <div className="rounded-[18px] border border-[#ebe5db] bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.05)] sm:p-5">
                <div className="flex flex-wrap gap-2">
                  {galleryFilters.map((filter) => {
                    const Icon = filter.icon;
                    const isActive = activeFilter === filter.id;

                    return (
                      <button
                        key={filter.id}
                        type="button"
                        onClick={() => setActiveFilter(filter.id)}
                        className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors sm:text-[13px] ${
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
                  <h2 className="mt-2 text-[28px] font-bold tracking-[-0.03em] text-[#1b4d3e] sm:text-[32px]">
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
                      className="rounded-lg border border-[#e8e2d8] bg-white px-3 py-2 text-[13px] font-semibold text-[#1b4d3e] outline-none focus:border-[#1b6b66]/40"
                    >
                      <option value="latest">Latest</option>
                      <option value="name">Name</option>
                    </select>
                  </label>
                  <div className="inline-flex overflow-hidden rounded-lg border border-[#e8e2d8] bg-white">
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

              <div
                className={`mt-6 grid gap-6 ${
                  listView ? "grid-cols-1" : "grid-cols-1 md:grid-cols-2 xl:grid-cols-3"
                }`}
              >
                {displayedEvents.map((event) => (
                  <GalleryEventCard key={event.title} event={event} listView={listView} />
                ))}
              </div>

              {displayedEvents.length === 0 ? (
                <p className="mt-8 rounded-[18px] border border-dashed border-[#d6dde5] bg-white px-6 py-12 text-center text-[14px] text-[#5f6f82]">
                  No events match this filter. Try another category or clear filters.
                </p>
              ) : null}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
