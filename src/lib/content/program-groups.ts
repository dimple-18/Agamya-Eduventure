import type { ProgramCard } from "@/components/home/content";
import { groupedPrograms as staticGroupedPrograms } from "@/components/home/programs-data";

import type { ProgramRecord } from "./types";

const GROUP_ORDER = staticGroupedPrograms.map((group) => group.title);

const GROUP_DESCRIPTIONS = Object.fromEntries(
  staticGroupedPrograms.map((group) => [group.title, group.description]),
) as Record<string, string>;

export type ProgramGroup = {
  title: string;
  description: string;
  items: readonly ProgramCard[];
};

export function buildGroupedPrograms(programs: ProgramRecord[]): ProgramGroup[] {
  if (!programs.length) {
    return staticGroupedPrograms.map((group) => ({
      title: group.title,
      description: group.description,
      items: [...group.items],
    }));
  }

  return GROUP_ORDER.map((title) => ({
    title,
    description: GROUP_DESCRIPTIONS[title] ?? "",
    items: programs
      .filter((program) => program.group_name === title)
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .map(({ title: programTitle, description, meta, image, projects, mentoring }) => ({
        title: programTitle,
        description,
        meta,
        image: image ?? undefined,
        projects,
        mentoring,
      })),
  })).filter((group) => group.items.length > 0);
}

export function flattenProgramsForSeed(): ProgramRecord[] {
  return staticGroupedPrograms.flatMap((group) =>
    group.items.map((item, index) => ({
      title: item.title,
      description: item.description,
      meta: item.meta,
      image: item.image,
      projects: item.projects,
      mentoring: item.mentoring,
      group_name: group.title,
      sort_order: index,
      published: true,
    })),
  );
}

export const PROGRAM_GROUP_OPTIONS = GROUP_ORDER;
