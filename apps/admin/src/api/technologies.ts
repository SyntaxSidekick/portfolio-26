import type { TechnologyReference } from "../types/admin";
import { apiRequest } from "./client";

export type TechnologyPayload = Pick<TechnologyReference, "name" | "slug" | "category" | "iconKey" | "brandColor" | "active" | "displayOrder"> & { key?: string };

export function listTechnologies(signal?: AbortSignal, params: { active?: boolean; category?: string } = {}) {
  const query = new URLSearchParams();
  if (typeof params.active === "boolean") query.set("active", String(params.active));
  if (params.category) query.set("category", params.category);
  return apiRequest<TechnologyReference[]>(`/technologies${query.size ? `?${query.toString()}` : ""}`, {}, signal);
}

export function createTechnology(payload: TechnologyPayload) {
  return apiRequest<TechnologyReference>("/technologies", { method: "POST", body: JSON.stringify(payload) });
}

export function updateTechnology(id: string, payload: TechnologyPayload) {
  return apiRequest<TechnologyReference>(`/technologies/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function patchTechnology(id: string, payload: Partial<TechnologyPayload>) {
  return apiRequest<TechnologyReference>(`/technologies/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteTechnology(id: string) {
  return apiRequest<void>(`/technologies/${id}`, { method: "DELETE" });
}
