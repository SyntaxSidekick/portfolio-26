import type { MediaItem, MediaReference } from "../types/admin";
import { apiRequest } from "./client";

export interface MediaListResponse {
  items: MediaItem[];
  pagination: { page: number; limit: number; total: number; pages: number };
}

export async function listMedia(params: Record<string, string | number | undefined> = {}, signal?: AbortSignal) {
  const query = new URLSearchParams();
  Object.entries(params).forEach(([key, value]) => {
    if (value !== undefined && value !== "") query.set(key, String(value));
  });
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api"}/media${query.size ? `?${query}` : ""}`, { signal });
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? "Media request failed");
  return { items: body.data as MediaItem[], pagination: body.pagination } satisfies MediaListResponse;
}

export async function uploadMedia(files: File[]) {
  const form = new FormData();
  files.forEach((file) => form.append("files", file));
  const response = await fetch(`${import.meta.env.VITE_API_BASE_URL ?? "http://localhost:4000/api"}/media`, { method: "POST", body: form });
  const body = await response.json();
  if (!response.ok) throw new Error(body?.error?.message ?? "Upload failed");
  return body.data as MediaItem[];
}

export function patchMedia(id: string, payload: Partial<Pick<MediaItem, "title" | "alt" | "caption" | "description" | "tags">>) {
  return apiRequest<MediaItem>(`/media/${id}`, { method: "PATCH", body: JSON.stringify(payload) });
}

export function deleteMedia(id: string) {
  return apiRequest<void>(`/media/${id}`, { method: "DELETE" });
}

export function toMediaReference(item: MediaItem): MediaReference {
  return { id: item.id, url: item.url, thumbnailUrl: item.thumbnailUrl, title: item.title, alt: item.alt, width: item.width, height: item.height };
}
