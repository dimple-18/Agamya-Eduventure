"use client";

import Image from "next/image";
import {
  ArrowRight,
  Award,
  BookOpen,
  Briefcase,
  Building2,
  ChevronDown,
  ChevronUp,
  Code2,
  Grid3x3,
  LayoutGrid,
  List,
  Monitor,
  Search,
  SlidersHorizontal,
  Users,
} from "lucide-react";
import { useMemo, useRef, useState } from "react";

import {
  badgeToneStyles,
  categoryId,
  getCatalogMeta,
  getProgramDetails,
  groupedPrograms,
  type ProgramWithGroup,
} from "./programs-data";

const INITIAL_VISIBLE_PROGRAMS = 9;
const LOAD_MORE_STEP = 6;

const categoryChips = [
  { id: "all", label: "All Programs", icon: LayoutGrid },
  { id: categoryId("Core Programs"), label: "Core Programs", icon: Monitor },
  { id: categoryId("Technical Modules"), label: "Technical Modules", icon: Code2 },
  { id: categoryId("Career Support"), label: "Career Support", icon: Briefcase },
  {
    id: categoryId("Projects & Certifications"),
    label: "Projects & Certifications",
    icon: Award,
  },
  {
    id: categoryId("Corporate & Advanced Courses"),
    label: "Corporate & Advanced Courses",
    icon: Building2,
  },
] as const;

const filterCategoryIcons: Record<string, typeof Monitor> = {
  "Core Programs": Monitor,
  "Technical Modules": Code2,
  "Career Support": Briefcase,
  "Projects & Certifications": Award,
  "Corporate & Advanced Courses": Building2,
};

const floatIconStyles: Record<string, string> = {
  React: "bg-[#e8f7fb] text-[#149eca]",
  Python: "bg-[#fff4e8] text-[#3776ab]",
  SQL: "bg-[#e8f1ff] text-[#1d4ed8]",
};

function ProgramCatalogCard({
  program,
  listView,
  isExpanded,
  onViewDetails,
}: {
  program: ProgramWithGroup;
  listView: boolean;
  isExpanded: boolean;
  onViewDetails: () => void;
}) {
  const meta = getCatalogMeta(program);
  const details = isExpanded ? getProgramDetails(program) : null;
  const badgeClass = badgeToneStyles[meta.badgeTone];
  const floatStyle = meta.floatLabel ? floatIconStyles[meta.floatLabel] : undefined;

  const expandedDetails = details ? (
    <div className="mt-3 space-y-2 border-t border-[#f0ebe3] pt-3 text-[12px] leading-relaxed text-[#5f6f82]">
      <p>
        <span className="font-semibold text-[#1b4d3e]">Ideal for: </span>
        {details.idealFor}
      </p>
      <div>
        <p className="font-semibold text-[#1b4d3e]">You&apos;ll learn:</p>
        <ul className="mt-1 list-disc space-y-1 pl-4">
          {details.highlights.slice(0, 4).map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      </div>
      <p>
        <span className="font-semibold text-[#1b4d3e]">Projects: </span>
        {details.projects}
      </p>
      <p>
        <span className="font-semibold text-[#1b4d3e]">Mentoring: </span>
        {details.mentoring}
      </p>
    </div>
  ) : null;

  if (listView) {
    return (
      <article className="flex overflow-hidden rounded-[18px] border border-[#ebe5db] bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_28px_rgba(15,23,42,0.1)]">
        <div className="relative h-[140px] w-[200px] shrink-0">
          {program.image ? (
            <Image src={program.image} alt={program.title} fill className="object-cover" sizes="200px" />
          ) : null}
          <span
            className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
          >
            {program.meta.toUpperCase()}
          </span>
        </div>
        <div className="flex flex-1 flex-col justify-between p-4">
          <div>
            <h4 className="text-[18px] font-bold text-[#1b4d3e]">{program.title}</h4>
            <p className="mt-1 text-[13px] leading-relaxed text-[#5f6f82]">{meta.summary}</p>
            <p className="mt-2 text-[12px] text-[#6b7c8f]">
              {meta.duration} | {meta.level}
            </p>
            {expandedDetails}
          </div>
          <div className="mt-3 flex items-center justify-between">
            <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#5f6f82]">
              <Users className="h-3.5 w-3.5" />
              {meta.students}
            </span>
            <button
              type="button"
              onClick={onViewDetails}
              className="inline-flex items-center gap-1 text-[13px] font-semibold text-[#1b6b66]"
            >
              {isExpanded ? "Show Less" : "View Details"}
              {isExpanded ? (
                <ChevronUp className="h-3.5 w-3.5" />
              ) : (
                <ArrowRight className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </article>
    );
  }

  return (
    <article
      className={`flex h-full flex-col overflow-hidden rounded-[20px] border bg-white shadow-[0_6px_22px_rgba(15,23,42,0.06)] transition hover:-translate-y-1 hover:shadow-[0_14px_32px_rgba(15,23,42,0.1)] ${
        isExpanded ? "border-[#cfe0de] ring-1 ring-[#cfe0de]" : "border-[#ebe5db]"
      }`}
    >
      <div className="relative h-[168px]">
        {program.image ? (
          <Image
            src={program.image}
            alt={program.title}
            fill
            className="object-cover"
            sizes="(min-width: 1280px) 320px, 33vw"
          />
        ) : null}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0f1a28]/25 via-transparent to-transparent" />
        <span
          className={`absolute left-3 top-3 rounded-full px-2.5 py-1 text-[9px] font-bold uppercase tracking-[0.12em] ${badgeClass}`}
        >
          {program.meta.toUpperCase()}
        </span>
        <button
          type="button"
          onClick={onViewDetails}
          className="absolute right-3 top-3 inline-flex h-8 w-8 items-center justify-center rounded-full bg-white/92 text-[#1b6b66] shadow-sm transition-colors hover:bg-white hover:text-[#1b4d3e]"
          aria-label={`View ${program.title} details`}
        >
          <BookOpen className="h-4 w-4" strokeWidth={2} />
        </button>
        {meta.floatLabel && floatStyle ? (
          <span
            className={`absolute bottom-3 right-3 inline-flex h-9 w-9 items-center justify-center rounded-full text-[10px] font-bold shadow-md ${floatStyle}`}
          >
            {meta.floatLabel}
          </span>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col p-4">
        <h4 className="text-[17px] font-bold leading-tight text-[#1b4d3e]">{program.title}</h4>
        <p className="mt-2 text-[13px] leading-[1.55] text-[#5f6f82] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
          {meta.summary}
        </p>
        <p className="mt-3 text-[12px] font-medium text-[#6b7c8f]">
          {meta.duration} <span className="text-[#c5cdd6]">|</span> {meta.level}
        </p>
        <span className="mt-3 inline-flex w-fit rounded-full border border-[#e8e2d8] bg-[#f8f6f1] px-2.5 py-1 text-[11px] font-medium text-[#3f4f61]">
          {meta.topics}
        </span>
        {expandedDetails}
        <div className="mt-auto flex items-center justify-between border-t border-[#f0ebe3] pt-4">
          <span className="inline-flex items-center gap-1.5 text-[12px] font-medium text-[#5f6f82]">
            <Users className="h-3.5 w-3.5 text-[#1b6b66]" />
            {meta.students}
          </span>
          <button
            type="button"
            onClick={onViewDetails}
            className="inline-flex items-center gap-1 rounded-lg bg-[#1b4d3e] px-3 py-1.5 text-[12px] font-semibold text-white transition-colors hover:bg-[#164032]"
          >
            {isExpanded ? "Show Less" : "View Details"}
            {isExpanded ? (
              <ChevronUp className="h-3.5 w-3.5" />
            ) : (
              <ArrowRight className="h-3.5 w-3.5" />
            )}
          </button>
        </div>
      </div>
    </article>
  );
}

export default function ProgramsCatalog() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [openFilterGroupId, setOpenFilterGroupId] = useState<string | null>(
    categoryId("Core Programs"),
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [visibleProgramsCount, setVisibleProgramsCount] = useState(INITIAL_VISIBLE_PROGRAMS);
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);
  const [sortBy, setSortBy] = useState("popular");
  const [listView, setListView] = useState(false);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const selectedGroup = groupedPrograms.find(
    (group) => categoryId(group.title) === selectedCategory,
  );

  const allPrograms = useMemo(
    () =>
      groupedPrograms.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupTitle: group.title,
          groupId: categoryId(group.title),
        })),
      ),
    [],
  );

  const displayedPrograms = useMemo(() => {
    let programs: ProgramWithGroup[];

    if (selectedCategory === "all") {
      programs = groupedPrograms.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupTitle: group.title,
        })),
      );
    } else if (!selectedGroup) {
      programs = [];
    } else {
      programs = selectedGroup.items.map((item) => ({
        ...item,
        groupTitle: selectedGroup.title,
      }));
    }

    const query = searchQuery.trim().toLowerCase();
    if (query) {
      programs = programs.filter(
        (program) =>
          program.title.toLowerCase().includes(query) ||
          program.description.toLowerCase().includes(query) ||
          program.meta.toLowerCase().includes(query),
      );
    }

    if (sortBy === "name") {
      programs = [...programs].sort((a, b) => a.title.localeCompare(b.title));
    }

    return programs;
  }, [selectedCategory, selectedGroup, searchQuery, sortBy]);

  const visiblePrograms = useMemo(
    () => displayedPrograms.slice(0, visibleProgramsCount),
    [displayedPrograms, visibleProgramsCount],
  );

  const searchSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) return [];

    return allPrograms
      .filter((program) => program.title.toLowerCase().includes(query))
      .slice(0, 6);
  }, [allPrograms, searchQuery]);

  const resetProgramViewport = () => {
    setExpandedProgramId(null);
    setVisibleProgramsCount(INITIAL_VISIBLE_PROGRAMS);
  };

  const selectCategory = (nextCategory: string) => {
    setSelectedCategory(nextCategory);
    resetProgramViewport();
  };

  const clearFilters = () => {
    selectCategory("all");
    setOpenFilterGroupId(categoryId("Core Programs"));
    setSearchQuery("");
  };

  const openProgramCard = (program: (typeof allPrograms)[number]) => {
    const programId = `${program.groupTitle}-${program.title}`;
    setSelectedCategory(program.groupId ?? "all");
    setOpenFilterGroupId(program.groupId ?? null);
    setSearchQuery(program.title);
    setSearchFocused(false);
    setExpandedProgramId(programId);

    window.setTimeout(() => {
      cardRefs.current[programId]?.scrollIntoView({ behavior: "smooth", block: "center" });
    }, 80);
  };

  const runSearch = () => {
    if (!searchQuery.trim()) {
      selectCategory("all");
      return;
    }
    const firstMatch = searchSuggestions[0];
    if (firstMatch) openProgramCard(firstMatch);
  };

  const headerLabel =
    selectedCategory === "all" ? "All Categories" : selectedGroup?.title ?? "Programs";

  const headerDescription =
    selectedCategory === "all"
      ? "Explore complete offerings across all learning categories, from core tracks to certifications and project guidance."
      : selectedGroup?.description ??
        "Explore complete offerings across all learning categories.";

  return (
    <div className="bg-[#fdfbf7] pb-20">
      <div className="px-4 pt-6 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
        {/* Hero */}
        <section className="relative overflow-hidden rounded-[28px] border border-[#0d3d38]/20 shadow-[0_20px_50px_rgba(15,23,42,0.12)]">
          <div className="relative min-h-[320px] sm:min-h-[360px] lg:min-h-[390px]">
            <Image
              src="https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop"
              alt="Student exploring programs"
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
                All Programs
              </span>
              <h1 className="mt-5 text-[32px] font-bold leading-[1.08] tracking-[-0.03em] !text-white sm:text-[40px] lg:text-[46px]">
                Explore Programs with{" "}
                <span className="whitespace-nowrap text-[#8fe0d4]">Better Clarity</span>
              </h1>
              <p className="mt-4 max-w-[520px] text-[15px] leading-[1.7] text-white/82">
                Find the right learning path by filtering categories and reviewing detailed
                program tracks in one focused view.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                {[
                  { value: "25+", label: "Programs" },
                  { value: "Industry", label: "Relevant" },
                  { value: "1000+", label: "Learners" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="rounded-xl border border-white/15 bg-white/10 px-3.5 py-2 backdrop-blur-sm"
                  >
                    <p className="text-[14px] font-bold text-white">{item.value}</p>
                    <p className="text-[11px] text-white/70">{item.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Search */}
        <div className="relative z-20 -mt-8">
          <div className="mx-auto max-w-[920px] rounded-[18px] border border-[#ebe5db] bg-white p-2 shadow-[0_16px_40px_rgba(15,23,42,0.1)] sm:p-2.5">
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              <div className="relative flex-1">
                <Search className="pointer-events-none absolute left-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#8a9aad]" />
                <input
                  type="text"
                  aria-label="Search programs"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => window.setTimeout(() => setSearchFocused(false), 120)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      runSearch();
                    }
                  }}
                  placeholder="Search programs, modules, or learning tracks..."
                  className="w-full rounded-xl border border-transparent bg-[#f8f6f1] py-3.5 pl-11 pr-4 text-[14px] text-[#1b4d3e] outline-none transition focus:border-[#1b6b66]/30 focus:bg-white"
                />
                {searchFocused && searchSuggestions.length > 0 ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-30 overflow-hidden rounded-xl border border-[#ebe5db] bg-white shadow-[0_14px_28px_rgba(15,23,42,0.1)]">
                    {searchSuggestions.map((suggestion) => (
                      <button
                        key={`${suggestion.groupTitle}-${suggestion.title}`}
                        type="button"
                        onClick={() => openProgramCard(suggestion)}
                        className="w-full border-b border-[#f0ebe3] px-4 py-3 text-left last:border-b-0 hover:bg-[#f8f6f1]"
                      >
                        <p className="text-[14px] font-semibold text-[#1b4d3e]">{suggestion.title}</p>
                        <p className="mt-0.5 text-[11px] font-semibold uppercase tracking-[0.12em] text-[#1b6b66]">
                          {suggestion.groupTitle}
                        </p>
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <button
                type="button"
                onClick={runSearch}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1b4d3e] px-6 py-3.5 text-[14px] font-semibold text-white transition-colors hover:bg-[#164032] sm:min-w-[130px]"
              >
                Search
                <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
              </button>
            </div>
          </div>
        </div>

        {/* Main layout */}
        <div className="mt-12 grid gap-10 lg:grid-cols-[290px_minmax(0,1fr)] lg:items-start lg:gap-14 xl:gap-16">
          {/* Sidebar - mobile visible, desktop sticky */}
          <aside className="lg:sticky lg:top-24">
            <div className="rounded-[20px] border border-[#ebe5db] bg-white p-5 shadow-[0_8px_28px_rgba(15,23,42,0.06)]">
              <div className="flex items-center justify-between gap-3">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4 text-[#1b6b66]" strokeWidth={2.25} />
                  <h2 className="text-[16px] font-bold text-[#1b4d3e]">Filter Programs</h2>
                </div>
                <button
                  type="button"
                  onClick={clearFilters}
                  className="text-[13px] font-semibold text-[#1b6b66] hover:text-[#164032]"
                >
                  Clear All
                </button>
              </div>

              <p className="mt-5 text-[12px] font-bold uppercase tracking-[0.14em] text-[#6b7c8f]">
                Program Category
              </p>

              <div className="mt-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    selectCategory("all");
                    setOpenFilterGroupId(null);
                  }}
                  className={`flex w-full items-center gap-2 rounded-xl px-3 py-2.5 text-left text-[14px] font-semibold transition-colors ${
                    selectedCategory === "all"
                      ? "bg-[#e8f4f3] text-[#1b4d3e]"
                      : "text-[#3f4f61] hover:bg-[#f8f6f1]"
                  }`}
                >
                  <LayoutGrid className="h-4 w-4" />
                  All Programs
                </button>

                {groupedPrograms.map((group) => {
                  const id = categoryId(group.title);
                  const isOpen = openFilterGroupId === id;
                  const isActive = selectedCategory === id;
                  const Icon = filterCategoryIcons[group.title] ?? Monitor;

                  return (
                    <div
                      key={group.title}
                      className={`overflow-hidden rounded-xl border ${
                        isActive || isOpen
                          ? "border-[#cfe8e4] bg-[#f3faf8]"
                          : "border-[#f0ebe3] bg-[#fcfbfa]"
                      }`}
                    >
                      <button
                        type="button"
                        onClick={() => {
                          selectCategory(id);
                          setOpenFilterGroupId(isOpen ? null : id);
                        }}
                        className="flex w-full items-center justify-between gap-2 px-3 py-2.5 text-left"
                      >
                        <span className="flex items-center gap-2">
                          <Icon className="h-4 w-4 text-[#1b6b66]" strokeWidth={2.1} />
                          <span
                            className={`text-[14px] font-semibold ${
                              isActive ? "text-[#1b4d3e]" : "text-[#3f4f61]"
                            }`}
                          >
                            {group.title}
                          </span>
                        </span>
                        {isOpen ? (
                          <ChevronUp className="h-4 w-4 text-[#6b7c8f]" />
                        ) : (
                          <ChevronDown className="h-4 w-4 text-[#6b7c8f]" />
                        )}
                      </button>

                      {isOpen ? (
                        <ul className="space-y-1 border-t border-[#e3ecea] px-3 pb-3 pt-2">
                          {group.items.map((item) => (
                            <li key={item.title}>
                              <button
                                type="button"
                                onClick={() => {
                                  selectCategory(id);
                                  openProgramCard({
                                    ...item,
                                    groupTitle: group.title,
                                    groupId: id,
                                  });
                                }}
                                className="flex w-full items-start gap-2 rounded-lg px-2 py-1.5 text-left text-[13px] text-[#5f6f82] transition-colors hover:bg-white hover:text-[#1b4d3e]"
                              >
                                <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[#1b6b66]" />
                                <span>
                                  {item.title === "DCA (Diploma in Computer Applications)"
                                    ? "DCA (Diploma in Computer Apps)"
                                    : item.title}
                                </span>
                              </button>
                            </li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  );
                })}
              </div>
            </div>
          </aside>

          {/* Main content */}
          <div>
            <div className="rounded-[18px] border border-[#ebe5db] bg-white p-4 shadow-[0_6px_20px_rgba(15,23,42,0.05)] sm:p-5">
              <div className="flex flex-wrap gap-2.5">
                {categoryChips.map((chip) => {
                  const Icon = chip.icon;
                  const isActive = selectedCategory === chip.id;

                  return (
                    <button
                      key={chip.id}
                      type="button"
                      onClick={() => {
                        selectCategory(chip.id);
                        if (chip.id !== "all") setOpenFilterGroupId(chip.id);
                      }}
                      className={`inline-flex items-center gap-2 rounded-full px-3.5 py-2 text-[12px] font-semibold transition-colors sm:text-[13px] ${
                        isActive
                          ? "bg-[#1b4d3e] text-white shadow-sm"
                          : "border border-[#e8e2d8] bg-[#f8f6f1] text-[#3f4f61] hover:border-[#cfe0de]"
                      }`}
                    >
                      <Icon className="h-3.5 w-3.5" strokeWidth={2.2} />
                      {chip.label}
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
                  Programs at Agamya
                </h2>
                <p className="mt-2 max-w-2xl text-[14px] leading-[1.65] text-[#5f6f82]">
                  {headerDescription}
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-[13px] text-[#5f6f82]">
                  <span className="font-medium">Sort by:</span>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="rounded-lg border border-[#e8e2d8] bg-white px-3 py-2 text-[13px] font-semibold text-[#1b4d3e] outline-none focus:border-[#1b6b66]/40"
                  >
                    <option value="popular">Popular</option>
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
              className={`mt-8 grid gap-7 ${
                listView
                  ? "grid-cols-1"
                  : "grid-cols-1 md:grid-cols-2 2xl:grid-cols-3"
              }`}
            >
              {visiblePrograms.map((program) => {
                const programId = `${program.groupTitle}-${program.title}`;
                const isExpanded = expandedProgramId === programId;

                return (
                  <div
                    key={programId}
                    ref={(el) => {
                      cardRefs.current[programId] = el;
                    }}
                  >
                    <ProgramCatalogCard
                      program={program}
                      listView={listView}
                      isExpanded={isExpanded}
                      onViewDetails={() =>
                        setExpandedProgramId(isExpanded ? null : programId)
                      }
                    />
                  </div>
                );
              })}
            </div>

            {visiblePrograms.length === 0 ? (
              <p className="mt-8 rounded-[18px] border border-dashed border-[#d6dde5] bg-white px-6 py-12 text-center text-[14px] text-[#5f6f82]">
                No programs match your search. Try another keyword or clear filters.
              </p>
            ) : null}

            {visiblePrograms.length < displayedPrograms.length ? (
              <div className="mt-8 flex justify-center">
                <button
                  type="button"
                  onClick={() =>
                    setVisibleProgramsCount((count) =>
                      Math.min(count + LOAD_MORE_STEP, displayedPrograms.length),
                    )
                  }
                  className="rounded-xl border border-[#1b4d3e] bg-white px-6 py-2.5 text-[14px] font-semibold text-[#1b4d3e] transition-colors hover:bg-[#1b4d3e] hover:text-white"
                >
                  Show More Programs
                </button>
              </div>
            ) : null}
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}
