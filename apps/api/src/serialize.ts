import type { WithId, Document } from "mongodb";

export function serializeDocument<T extends Document>(document: WithId<T>) {
  const { _id, ...rest } = document;
  return { id: _id.toString(), ...rest };
}

export function slugify(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function errorResponse(message: string) {
  return { error: { message } };
}
