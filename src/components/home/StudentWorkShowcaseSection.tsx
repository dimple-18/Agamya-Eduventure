import StudentWorkShowcase from "@/components/home/StudentWorkShowcase";
import { getStudentOutcomes } from "@/lib/content/queries";

type StudentWorkShowcaseSectionProps = {
  sectionId?: string;
  compactTop?: boolean;
  showViewMoreCta?: boolean;
  showIntro?: boolean;
};

export default async function StudentWorkShowcaseSection(
  props: StudentWorkShowcaseSectionProps,
) {
  const outcomes = await getStudentOutcomes();
  return <StudentWorkShowcase {...props} outcomes={outcomes} />;
}
