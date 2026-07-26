import type { CaseStudySectionKey, MetricType, ProjectResult } from "../../../types/admin";
import type { ProjectFormValues } from "../ProjectForm";
import { coerceMetricType } from "./metricIconRegistry";

export const requiredSections: CaseStudySectionKey[] = ["overview", "challenge", "solution"];
export const optionalSections: CaseStudySectionKey[] = ["key-results", "lessons-learned"];
export const supportedSections: CaseStudySectionKey[] = [...requiredSections, ...optionalSections];

export const sectionMeta: Record<CaseStudySectionKey, { title: string; subtitle: string }> = {
  overview: { title: "Overview", subtitle: "A high-level summary of the project." },
  challenge: { title: "The Challenge", subtitle: "The problem we set out to solve." },
  solution: { title: "The Solution", subtitle: "Our approach and how we solved it." },
  "key-results": { title: "Key Results", subtitle: "The impact and outcomes of the project." },
  "lessons-learned": { title: "Lessons Learned", subtitle: "What we learned and how it helps future projects." },
};

export const mediaKeyMap = {
  overview: { id: "overviewMediaId", url: "overviewMediaUrl", alt: "overviewMediaAlt" },
  challenge: { id: "challengeMediaId", url: "challengeMediaUrl", alt: "challengeMediaAlt" },
  solution: { id: "solutionMediaId", url: "solutionMediaUrl", alt: "solutionMediaAlt" },
  "lessons-learned": { id: "highlightsMediaId", url: "highlightsMediaUrl", alt: "highlightsMediaAlt" },
} as const;

export type EditableSection = keyof typeof mediaKeyMap;

export function deepClone<T>(value: T): T {
  return JSON.parse(JSON.stringify(value)) as T;
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) return items;
  const next = [...items];
  const [entry] = next.splice(index, 1);
  next.splice(target, 0, entry);
  return next;
}

export function normalizeSectionOrder(input: CaseStudySectionKey[]) {
  const allowed = input.filter((section): section is CaseStudySectionKey => supportedSections.includes(section));
  const required = requiredSections.filter((section) => !allowed.includes(section));
  return [...new Set([...requiredSections, ...allowed, ...required])];
}

export function normalizeResultOrder(results: ProjectResult[]) {
  return [...results]
    .map((result, index) => ({
      ...result,
      type: coerceMetricType(result.type, result.iconKey),
      order: typeof result.order === "number" ? result.order : typeof result.displayOrder === "number" ? result.displayOrder : index,
    }))
    .sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

export function deriveSectionStatus(values: ProjectFormValues, section: CaseStudySectionKey) {
  if (section === "overview") return Boolean(values.overviewContent.trim());
  if (section === "challenge") return Boolean(values.challengeContent.trim());
  if (section === "solution") return Boolean(values.solutionContent.trim());
  if (section === "key-results") return values.keyResults.some((result) => result.label.trim() && result.value.trim());
  return values.highlights.some((highlight) => highlight.text.trim());
}

export function deriveSectionExcerpt(values: ProjectFormValues, section: CaseStudySectionKey) {
  if (section === "overview") return values.overviewContent.trim();
  if (section === "challenge") return values.challengeContent.trim();
  if (section === "solution") return values.solutionContent.trim();
  if (section === "key-results") {
    const total = values.keyResults.filter((result) => result.label.trim() && result.value.trim()).length;
    return total ? `${total} metric${total === 1 ? "" : "s"} configured.` : "Add outcome metrics.";
  }
  const first = values.highlights.find((highlight) => highlight.text.trim());
  return first?.text.trim() || "Add lessons learned and takeaways.";
}

export function deriveSectionHeading(values: ProjectFormValues, section: CaseStudySectionKey) {
  if (section === "overview") return values.overviewHeading.trim() || sectionMeta.overview.title;
  if (section === "challenge") return values.challengeHeading.trim() || sectionMeta.challenge.title;
  if (section === "solution") return values.solutionHeading.trim() || sectionMeta.solution.title;
  return sectionMeta[section].title;
}

export function buildSectionOrder(values: ProjectFormValues) {
  const current: CaseStudySectionKey[] = values.caseStudySectionOrder.length ? values.caseStudySectionOrder : ["overview", "challenge", "solution"];
  return normalizeSectionOrder(current);
}

export function makeId() {
  return typeof crypto !== "undefined" && "randomUUID" in crypto ? crypto.randomUUID() : String(Date.now());
}

export function hasResultMismatch(values: ProjectFormValues) {
  return values.keyResults.some((result) => {
    const hasLabel = result.label.trim().length > 0;
    const hasValue = result.value.trim().length > 0;
    return hasLabel !== hasValue;
  });
}

export function sectionMediaFor(values: ProjectFormValues, section: EditableSection) {
  const keys = mediaKeyMap[section];
  const url = values[keys.url];
  if (!url) return null;
  return {
    id: values[keys.id],
    url,
    alt: values[keys.alt],
  };
}
