import Courses from "@/components/home/Courses";
import { getProgramGroups } from "@/lib/content/queries";

type CoursesSectionProps = {
  preview?: boolean;
};

export default async function CoursesSection({ preview = false }: CoursesSectionProps) {
  const groups = await getProgramGroups();
  return <Courses preview={preview} groups={groups} />;
}
