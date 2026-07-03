import type { LucideIcon } from "lucide-react";
import { MessageSquareQuote, ShieldCheck, Star, Users } from "lucide-react";

export const testimonialsHeroStats = [
  { value: "350+", label: "Reviews" },
  { value: "4.9/5", label: "Rating" },
  { value: "98%", label: "Satisfaction" },
] as const;

export type TestimonialsSummaryStat = {
  value: string;
  label: string;
  description: string;
  icon: LucideIcon;
};

export const testimonialsSummaryStats: readonly TestimonialsSummaryStat[] = [
  {
    value: "1200+",
    label: "Happy Students",
    description: "Trained across multiple programs.",
    icon: Users,
  },
  {
    value: "4.9/5",
    label: "Average Rating",
    description: "Consistent feedback across all batches.",
    icon: Star,
  },
  {
    value: "350+",
    label: "Real Reviews",
    description: "From students and parents.",
    icon: MessageSquareQuote,
  },
  {
    value: "98%",
    label: "Satisfaction Rate",
    description: "Students recommend our programs.",
    icon: ShieldCheck,
  },
] as const;
