import { technologyRegistry } from "@portfolio/technology-registry";
import type { TechnologyCategory, TechnologyReference } from "../../../types/admin";

export const categoryLabels: Record<TechnologyCategory | "all", string> = {
  all: "All",
  frontend: "Frontend",
  framework: "Framework",
  language: "Language",
  styling: "Styling",
  backend: "Backend",
  database: "Database",
  cms: "CMS",
  design: "Design",
  testing: "Testing",
  "build-tool": "Build Tool",
  devops: "DevOps",
  cloud: "Cloud",
  accessibility: "Accessibility",
  other: "Other",
};

const registryMeta = new Map(
  technologyRegistry.map((item) => [item.key, { key: item.key, slug: item.slug, aliases: item.aliases ?? [], displayOrder: item.displayOrder }]),
);

export function normalizedText(value: string) {
  return value.trim().toLowerCase();
}

export function moveItem<T>(items: T[], index: number, direction: -1 | 1) {
  const target = index + direction;
  if (target < 0 || target >= items.length) {
    return items;
  }
  const next = [...items];
  const [entry] = next.splice(index, 1);
  next.splice(target, 0, entry);
  return next;
}

export function searchFields(technology: TechnologyReference) {
  const meta = technology.key ? registryMeta.get(technology.key) : undefined;
  return [
    technology.name,
    technology.slug,
    technology.key ?? "",
    technology.iconKey,
    technology.category,
    ...(meta?.aliases ?? []),
  ]
    .map(normalizedText)
    .filter(Boolean);
}

export function sortByRegistry(a: TechnologyReference, b: TechnologyReference) {
  const orderA = a.key ? registryMeta.get(a.key)?.displayOrder : undefined;
  const orderB = b.key ? registryMeta.get(b.key)?.displayOrder : undefined;
  const left = typeof orderA === "number" ? orderA : a.displayOrder;
  const right = typeof orderB === "number" ? orderB : b.displayOrder;
  if (left !== right) {
    return left - right;
  }
  return a.name.localeCompare(b.name);
}
