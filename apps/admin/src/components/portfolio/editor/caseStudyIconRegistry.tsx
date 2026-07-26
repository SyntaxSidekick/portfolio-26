import { ChartNoAxesCombined, FileText, GraduationCap, Puzzle, Target, type LucideIcon } from "lucide-react";
import type { CaseStudySectionKey } from "../../../types/admin";

export const caseStudySectionIcons = {
  overview: FileText,
  challenge: Target,
  solution: Puzzle,
  "key-results": ChartNoAxesCombined,
  "lessons-learned": GraduationCap,
} satisfies Record<CaseStudySectionKey, LucideIcon>;

export function getCaseStudyIcon(section: CaseStudySectionKey) {
  return caseStudySectionIcons[section] ?? FileText;
}
