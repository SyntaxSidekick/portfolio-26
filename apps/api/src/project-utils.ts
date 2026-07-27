import { ObjectId } from "mongodb";
import { z } from "zod";
import { technologies, toObjectId } from "./db";

export function getStoredTechnologyIds(project: Record<string, unknown>) {
  const ids = Array.isArray(project.technologyIds) ? project.technologyIds.filter((id): id is string => typeof id === "string") : [];
  if (ids.length > 0) return ids;
  const legacy = Array.isArray(project.technologies) ? project.technologies : [];
  return legacy.map((technology) => (typeof technology === "object" && technology && "id" in technology ? String(technology.id) : "")).filter(Boolean);
}

export function cleanProjectInput<T extends { technologies?: unknown; technologyIds?: unknown }>(input: T) {
  const { technologies: _technologies, technologyIds: _technologyIds, ...project } = input;
  return project;
}

export async function resolveSubmittedTechnologyIds(technologyIds: string[] = [], technologyReferences: { id: string }[] = [], existingIds: Set<string>) {
  const submitted = technologyIds.length > 0 ? technologyIds : technologyReferences.map((technology) => technology.id);
  const ids = [...new Set(submitted.filter(Boolean))];
  if (ids.length === 0) return [];

  const objectIds = ids.map((id) => toObjectId(id));
  if (objectIds.some((id) => !id)) {
    throw new z.ZodError([{ code: "custom", message: "Invalid technology id", path: ["technologyIds"] }]);
  }

  const found = await technologies().find({ _id: { $in: objectIds as ObjectId[] } }).toArray();
  if (found.length !== ids.length) {
    throw new z.ZodError([{ code: "custom", message: "One or more technologies do not exist", path: ["technologyIds"] }]);
  }

  const inactiveNew = found.find((technology) => technology.active === false && !existingIds.has(technology._id.toString()));
  if (inactiveNew) {
    throw new z.ZodError([{ code: "custom", message: `${inactiveNew.name} is inactive and cannot be assigned`, path: ["technologyIds"] }]);
  }

  return ids;
}
