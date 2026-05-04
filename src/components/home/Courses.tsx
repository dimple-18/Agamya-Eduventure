"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

import SectionHeading from "./SectionHeading";
import { appliedPrograms, enterprisePrograms, programCards } from "./content";

type CoursesProps = {
  preview?: boolean;
};

const corePrograms = programCards.filter((program) =>
  [
    "Web Development",
    "Python Programming",
    "Java Programming",
    "Programming Fundamentals",
    "DCA (Diploma in Computer Applications)",
  ].includes(program.title),
);

const technicalModules = programCards.filter((program) =>
  ["Database & SQL", "Data Structures & Logic Building"].includes(program.title),
);

const careerSupport = appliedPrograms.filter((program) =>
  ["Internship Program", "Interview Preparation"].includes(program.title),
);

const projectsAndCertifications = appliedPrograms.filter((program) =>
  ["Certification Support", "Mini & Major Projects"].includes(program.title),
);

const basicComputerProgram = enterprisePrograms.filter(
  (program) => program.title === "Basic Computers",
);

const additionalTechnicalPrograms = enterprisePrograms.filter((program) =>
  ["C++ Programming", "Dot NET", "PHP Programming"].includes(program.title),
);

const corporateEnterprisePrograms = enterprisePrograms.filter(
  (program) =>
    ![
      "Basic Computers",
      "C++ Programming",
      "Dot NET",
      "PHP Programming",
    ].includes(program.title),
);

const groupedPrograms = [
  {
    title: "Core Programs",
    description:
      "The main learning tracks for students starting with programming, web development, and stronger coding fundamentals.",
    items: [...corePrograms, ...basicComputerProgram],
  },
  {
    title: "Technical Modules",
    description:
      "Focused modules that strengthen technical understanding through databases, SQL, logic-building, and practical problem-solving.",
    items: [...technicalModules, ...additionalTechnicalPrograms],
  },
  {
    title: "Career Support",
    description:
      "Support layers that connect learning with preparation, exposure, and confidence for next steps.",
    items: careerSupport,
  },
  {
    title: "Projects & Certifications",
    description:
      "Hands-on project work and certification guidance that help students apply learning in a meaningful way.",
    items: projectsAndCertifications,
  },
  {
    title: "Corporate & Advanced Courses",
    description:
      "Enterprise-focused and specialized professional training tracks for corporate productivity, software tooling, automation, and business workflows.",
    items: corporateEnterprisePrograms,
  },
] as const;

const previewPrograms = [...corePrograms.slice(0, 2), ...technicalModules.slice(0, 1), ...careerSupport.slice(0, 1)];

export default function Courses({ preview = false }: CoursesProps) {
  const INITIAL_VISIBLE_PROGRAMS = 4;
  const LOAD_MORE_STEP = 4;
  const categoryId = (title: string) => title.toLowerCase().replaceAll(/[^a-z0-9]+/g, "-");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedProgramId, setExpandedProgramId] = useState<string | null>(null);
  const [openFilterGroupId, setOpenFilterGroupId] = useState<string | null>(categoryId("Core Programs"));
  const [searchQuery, setSearchQuery] = useState("");
  const [searchFocused, setSearchFocused] = useState(false);
  const [visibleProgramsCount, setVisibleProgramsCount] = useState(INITIAL_VISIBLE_PROGRAMS);
  const cardRefs = useRef<Record<string, HTMLElement | null>>({});

  const selectedGroup = groupedPrograms.find((group) => categoryId(group.title) === selectedCategory);

  const categoryOptions = [
    { id: "all", label: "All Programs" },
    ...groupedPrograms.map((group) => ({ id: categoryId(group.title), label: group.title })),
  ];

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
    if (selectedCategory === "all") {
      return groupedPrograms.flatMap((group) =>
        group.items.map((item) => ({
          ...item,
          groupTitle: group.title,
        })),
      );
    }

    if (!selectedGroup) {
      return [];
    }

    return selectedGroup.items.map((item) => ({
      ...item,
      groupTitle: selectedGroup.title,
    }));
  }, [selectedCategory, selectedGroup]);

  useEffect(() => {
    setVisibleProgramsCount(INITIAL_VISIBLE_PROGRAMS);
  }, [selectedCategory]);

  const visiblePrograms = useMemo(() => {
    return displayedPrograms.slice(0, visibleProgramsCount);
  }, [displayedPrograms, visibleProgramsCount]);

  const searchSuggestions = useMemo(() => {
    const query = searchQuery.trim().toLowerCase();
    if (!query) {
      return [];
    }

    return allPrograms
      .filter((program) => {
        const title = program.title.toLowerCase();
        const words = title.split(/[^a-z0-9]+/g).filter(Boolean);

        return title.includes(query) || words.some((word) => word.startsWith(query));
      })
      .slice(0, 6);
  }, [allPrograms, searchQuery]);

  const openProgramCard = (program: (typeof allPrograms)[number]) => {
    const programId = `${program.groupTitle}-${program.title}`;
    setSelectedCategory(program.groupId);
    setOpenFilterGroupId(program.groupId);
    setExpandedProgramId(programId);
    setSearchQuery(program.title);
    setSearchFocused(false);
    setVisibleProgramsCount((current) => {
      const selectedPrograms =
        program.groupId === "all"
          ? allPrograms
          : allPrograms.filter((item) => item.groupId === program.groupId);
      const selectedIndex = selectedPrograms.findIndex((item) => item.title === program.title);
      const requiredVisibleCount = selectedIndex >= 0 ? selectedIndex + 1 : INITIAL_VISIBLE_PROGRAMS;
      return Math.max(current, requiredVisibleCount);
    });

    window.setTimeout(() => {
      const card = cardRefs.current[programId];
      if (card) {
        card.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 80);
  };

  const runSearch = () => {
    if (!searchQuery.trim()) {
      setSelectedCategory("all");
      setExpandedProgramId(null);
      return;
    }

    const firstMatch = searchSuggestions[0];
    if (firstMatch) {
      openProgramCard(firstMatch);
    }
  };

  if (preview) {
    return (
      <section id="programs" className="section-shell">
        <div className="mx-auto max-w-7xl border-t border-[var(--line)] pt-16">
          <div className="grid gap-10 lg:grid-cols-[0.46fr_1.54fr]">
            <div className="space-y-8">
              <SectionHeading
                eyebrow="Programs"
                title="Programs arranged with more clarity and less friction."
                description="The same structured categories from the full Programs page are shown here in a concise preview."
              />

              <div className="border border-[var(--line)] bg-[var(--surface-soft)] p-6 sm:p-7">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                  Program Categories
                </p>
                <div className="mt-5 grid gap-3">
                  {groupedPrograms.map((group) => (
                    <div
                      key={group.title}
                      className="border-b border-[var(--line)] pb-3 last:border-b-0 last:pb-0"
                    >
                      <p className="text-[1.02rem] font-semibold tracking-[-0.02em] text-[var(--text-primary)]">{group.title}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Link href="/programs" className="button-primary">
                Open Full Programs Page
              </Link>
            </div>

            <div>
              <div className="flex flex-wrap gap-2 border-b border-[var(--line)] pb-5">
                {groupedPrograms.map((group) => (
                  <span
                    key={group.title}
                    className="border border-[var(--line)] bg-white px-3 py-2 text-xs font-semibold uppercase tracking-[0.14em] text-[var(--text-secondary)]"
                  >
                    {group.title}
                  </span>
                ))}
              </div>

              <div className="mt-6 grid gap-5 md:grid-cols-2">
              {previewPrograms.map((program) => (
                <article
                    key={program.title}
                    className="motion-card lite-splash-card overflow-hidden border border-[var(--line)] bg-white"
                >
                  <div className="relative min-h-[15rem]">
                    {program.image ? (
                      <Image
                        src={program.image}
                        alt={program.title}
                        fill
                        className="object-cover"
                        sizes="(min-width: 1280px) 30vw, (min-width: 768px) 50vw, 100vw"
                      />
                    ) : null}
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(17,25,38,0.06),rgba(17,25,38,0.34))]" />
                  </div>

                    <div className="lite-splash-content px-6 py-6">
                    <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                      {program.meta}
                    </p>
                    <h3 className="mt-3 text-[1.55rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                      {program.title}
                    </h3>
                      <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden">
                      {program.description}
                    </p>
                      <div className="mt-4 flex justify-end">
                        <Link
                          href="/programs"
                        className="button-micro border border-[var(--brand)] bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--brand-dark)]"
                        >
                          More Details
                        </Link>
                      </div>
                  </div>
                </article>
              ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="programs" className="section-shell">
      <div className="mx-auto max-w-[100rem] border-t border-[var(--line)] pt-16">
        <section className="overflow-hidden border border-[var(--line)] bg-[#7d9199] text-white">
          <div className="px-5 py-8 sm:px-8 sm:py-10 lg:px-12 lg:py-12">
            <h2 className="text-[2rem] font-semibold tracking-[-0.04em] sm:text-[2.6rem] lg:text-[3.1rem]">
              Explore Programs with Better Clarity
            </h2>
            <p className="mt-4 max-w-3xl text-base leading-8 text-white/86">
              Find the right learning path by filtering categories and reviewing detailed program tracks in one focused view.
            </p>
          </div>
        </section>

        <section className="-mt-6 px-4 sm:-mt-7 sm:px-8 lg:px-12">
          <div className="border border-[var(--line)] bg-white p-4 shadow-[0_16px_40px_rgba(15,23,42,0.08)] sm:p-5">
            <div className="grid gap-3 sm:grid-cols-[1fr_auto]">
              <div className="relative">
                <input
                  type="text"
                  aria-label="Search programs"
                  value={searchQuery}
                  onChange={(event) => setSearchQuery(event.target.value)}
                  onFocus={() => setSearchFocused(true)}
                  onBlur={() => {
                    window.setTimeout(() => setSearchFocused(false), 120);
                  }}
                  onKeyDown={(event) => {
                    if (event.key === "Enter") {
                      event.preventDefault();
                      runSearch();
                    }
                  }}
                  placeholder="Search programs, modules, or learning tracks"
                  className="w-full border border-[var(--line)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text-primary)] outline-none transition focus:border-[var(--brand)]"
                />

                {searchFocused && searchSuggestions.length > 0 ? (
                  <div className="absolute left-0 right-0 top-[calc(100%+0.35rem)] z-20 border border-[var(--line)] bg-white shadow-[0_14px_28px_rgba(15,23,42,0.08)]">
                    {searchSuggestions.map((suggestion) => (
                      <button
                        key={`${suggestion.groupTitle}-${suggestion.title}`}
                        type="button"
                        onClick={() => openProgramCard(suggestion)}
                        className="w-full border-b border-[var(--line)] px-4 py-3 text-left transition last:border-b-0 hover:bg-[var(--surface-soft)]"
                      >
                        <p className="text-sm font-semibold text-[var(--text-primary)]">{suggestion.title}</p>
                        <p className="mt-1 text-xs uppercase tracking-[0.14em] text-[var(--brand)]">
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
                className="min-w-[9rem] border border-[var(--brand)] bg-[var(--brand)] px-5 py-3 text-sm font-semibold text-white transition hover:bg-[var(--brand-dark)]"
              >
                Search
              </button>
            </div>
          </div>
        </section>

        <section className="mt-8 border border-[var(--line)] bg-white">
          <div className="grid lg:grid-cols-[0.27fr_0.73fr]">
            <aside className="hidden border-b border-[var(--line)] bg-[var(--surface-soft)] p-5 sm:p-7 lg:block lg:max-h-[70vh] lg:overflow-y-auto lg:border-b-0 lg:border-r">
              <div className="flex items-center justify-between">
                <h3 className="text-[1.75rem] font-semibold tracking-[-0.04em] text-[var(--text-primary)]">
                  Filter
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setSelectedCategory("all");
                    setOpenFilterGroupId(null);
                  }}
                  className="text-sm font-semibold text-[var(--brand)] transition hover:text-[var(--brand-dark)]"
                >
                  Clear All
                </button>
              </div>

              <div className="mt-5 border-t border-[var(--line)] pt-5">
                <p className="text-[1.1rem] font-semibold text-[var(--text-primary)]">Program Category</p>

                <div className="mt-4 space-y-3">
                  <button
                    type="button"
                    onClick={() => {
                      setSelectedCategory("all");
                      setOpenFilterGroupId(null);
                    }}
                    className={`w-full text-left text-[1.02rem] leading-7 transition ${
                      selectedCategory === "all"
                        ? "font-semibold text-[var(--text-primary)]"
                        : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                    }`}
                  >
                    All Programs
                  </button>

                  {groupedPrograms.map((group) => {
                    const id = categoryId(group.title);
                    const isOpen = openFilterGroupId === id;
                    const isActive = selectedCategory === id;

                    return (
                      <div key={group.title} className="rounded-sm border border-[var(--line)] bg-white/70 p-3">
                        <button
                          type="button"
                          onClick={() => {
                            setSelectedCategory(id);
                            setOpenFilterGroupId(isOpen ? null : id);
                          }}
                          className="flex w-full items-center justify-between gap-3 text-left"
                        >
                          <span className="flex items-center gap-3">
                            <span
                              className={`text-[1.02rem] leading-7 ${
                                isActive
                                  ? "font-semibold text-[var(--text-primary)]"
                                  : "text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
                              }`}
                            >
                              {group.title}
                            </span>
                          </span>
                          <span className="text-sm text-[var(--text-secondary)]">{isOpen ? "−" : "+"}</span>
                        </button>

                        {isOpen ? (
                          <ul className="mt-3 space-y-1 border-t border-[var(--line)] pt-3 pl-7">
                            {group.items.map((item) => (
                              <li key={item.title} className="text-sm leading-7 text-[var(--text-secondary)]">
                                {item.title}
                              </li>
                            ))}
                          </ul>
                        ) : null}
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="mt-6 border-t border-[var(--line)] pt-5">
                <p className="text-[1.1rem] font-semibold text-[var(--text-primary)]">Selected Category</p>
                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">
                  {selectedCategory === "all"
                    ? "Showing all programs across core learning, technical modules, career support, and projects."
                    : selectedGroup?.description}
                </p>
              </div>
            </aside>

            <div className="p-5 sm:p-7 lg:max-h-[70vh] lg:overflow-y-auto">
              <div className="flex flex-wrap items-center gap-2 border-b border-[var(--line)] pb-5">
                {categoryOptions.map((option) => (
                  <button
                    key={option.id}
                    type="button"
                    onClick={() => setSelectedCategory(option.id)}
                    className={`px-4 py-2 text-sm font-semibold transition ${
                      selectedCategory === option.id
                        ? "bg-[var(--brand)] text-white"
                        : "border border-[var(--line)] bg-white text-[var(--text-secondary)] hover:border-[var(--line-strong)]"
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              <div className="mt-6">
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                  {selectedCategory === "all" ? "All Categories" : selectedGroup?.title}
                </p>
                <h3 className="mt-2 text-[2rem] font-semibold tracking-[-0.045em] text-[var(--text-primary)] sm:text-[2.3rem]">
                  Programs at Agamya
                </h3>
                <p className="mt-3 max-w-3xl text-base leading-8 text-[var(--text-secondary)]">
                  {selectedCategory === "all"
                    ? "Explore complete offerings across all learning categories, from core tracks to certifications and project guidance."
                    : selectedGroup?.description}
                </p>
              </div>

              <div className="mt-6 grid gap-6 md:grid-cols-2">
                {visiblePrograms.map((program) => {
                  const programId = `${program.groupTitle}-${program.title}`;
                  const isExpanded = expandedProgramId === programId;

                  return (
                    <article
                      key={programId}
                      ref={(element) => {
                        cardRefs.current[programId] = element;
                      }}
                      className="motion-card flex h-full flex-col overflow-hidden border border-[var(--line)] bg-white"
                    >
                        <div className="relative min-h-[14rem]">
                          {program.image ? (
                            <Image
                              src={program.image}
                              alt={program.title}
                              fill
                              className="object-cover"
                              sizes="(min-width: 1280px) 32vw, (min-width: 768px) 48vw, 100vw"
                            />
                          ) : null}
                        </div>

                        <div className="flex flex-1 flex-col px-5 py-5">
                          <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--brand)]">
                            {program.meta}
                          </p>
                          <h4 className="mt-3 text-[1.95rem] font-semibold leading-[1.16] tracking-[-0.04em] text-[var(--text-primary)] md:min-h-[7rem]">
                            {program.title}
                          </h4>
                          <p className="mt-3 text-sm leading-7 text-[var(--text-secondary)] [display:-webkit-box] [-webkit-box-orient:vertical] [-webkit-line-clamp:2] overflow-hidden md:min-h-[3.8rem]">
                            {program.description}
                          </p>

                          <div className="mt-4 border-t border-[var(--line)] pt-4">
                            <ul className="space-y-2 text-sm leading-7 text-[var(--text-secondary)]">
                              <li>
                                <span className="font-semibold text-[var(--text-primary)]">Projects:</span>{" "}
                                Guided practical implementation work
                              </li>
                              <li>
                                <span className="font-semibold text-[var(--text-primary)]">Mentoring:</span>{" "}
                                Regular personalized review and support
                              </li>
                            </ul>
                          </div>

                          {isExpanded ? (
                            <div className="mt-4 space-y-4 border-t border-[var(--line)] pt-4">
                              <div>
                                <p className="text-sm font-semibold text-[var(--text-primary)]">Projects</p>
                                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{program.projects}</p>
                              </div>
                              <div className="border-t border-[var(--line)] pt-4">
                                <p className="text-sm font-semibold text-[var(--text-primary)]">Mentoring</p>
                                <p className="mt-2 text-sm leading-7 text-[var(--text-secondary)]">{program.mentoring}</p>
                              </div>
                            </div>
                          ) : null}

                          <div className="mt-auto flex justify-end pt-5">
                            <button
                              type="button"
                              onClick={() => setExpandedProgramId(isExpanded ? null : programId)}
                              className="button-micro border border-[var(--brand)] bg-[var(--brand)] px-3 py-1.5 text-xs font-semibold text-white transition hover:bg-[var(--brand-dark)]"
                            >
                              {isExpanded ? "Show Less" : "More Details"}
                            </button>
                          </div>
                        </div>
                      </article>
                  );
                })}
              </div>

              {visiblePrograms.length < displayedPrograms.length || (selectedCategory === "all" && visibleProgramsCount > INITIAL_VISIBLE_PROGRAMS) ? (
                <div className="mt-7 flex justify-center gap-3">
                  {visiblePrograms.length < displayedPrograms.length ? (
                    <button
                      type="button"
                      onClick={() =>
                        setVisibleProgramsCount((count) =>
                          Math.min(count + LOAD_MORE_STEP, displayedPrograms.length),
                        )
                      }
                      className="border border-[var(--brand)] bg-white px-6 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                    >
                      Show More
                    </button>
                  ) : null}

                  {selectedCategory === "all" && visibleProgramsCount > INITIAL_VISIBLE_PROGRAMS ? (
                    <button
                      type="button"
                      onClick={() => setVisibleProgramsCount(INITIAL_VISIBLE_PROGRAMS)}
                      className="border border-[var(--brand)] bg-white px-6 py-2.5 text-sm font-semibold text-[var(--brand)] transition hover:bg-[var(--brand)] hover:text-white"
                    >
                      Show Less
                    </button>
                  ) : null}
                </div>
              ) : null}

            </div>
          </div>
        </section>
      </div>
    </section>
  );
}
