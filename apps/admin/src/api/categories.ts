import type { CategoryReference } from "../types/admin";
import { apiRequest } from "./client";

export type CategoryPayload = Pick<CategoryReference, "name" | "slug">;

export function listCategories(signal?: AbortSignal) {
  return apiRequest<CategoryReference[]>("/project-categories", {}, signal);
}

export function createCategory(payload: CategoryPayload) {
  return apiRequest<CategoryReference>("/project-categories", { method: "POST", body: JSON.stringify(payload) });
}

export function updateCategory(id: string, payload: CategoryPayload) {
  return apiRequest<CategoryReference>(`/project-categories/${id}`, { method: "PUT", body: JSON.stringify(payload) });
}

export function deleteCategory(id: string) {
  return apiRequest<void>(`/project-categories/${id}`, { method: "DELETE" });
}
