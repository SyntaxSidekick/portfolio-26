import { randomBytes } from "node:crypto";
import { mkdir, rm, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const apiRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");

export const mediaPublicBaseUrl = process.env.MEDIA_PUBLIC_BASE_URL ?? "http://localhost:4000/media";
export const maxFileSize = Number(process.env.MEDIA_MAX_FILE_SIZE_MB ?? 15) * 1024 * 1024;
export const maxFiles = Number(process.env.MEDIA_MAX_FILES_PER_UPLOAD ?? 20);

export function mediaStorageRoot() {
  return path.resolve(apiRoot, process.env.MEDIA_STORAGE_PATH ?? "../../storage/media");
}

export function mediaUrl(storageKey: string) {
  return `${mediaPublicBaseUrl}/${storageKey.replace(/^media\//, "").replaceAll("\\", "/")}`;
}

export function mediaStaticRoot() {
  return mediaStorageRoot();
}

export function safeStoredName(originalName: string, extension: string) {
  const base = path.basename(originalName, path.extname(originalName)).toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-+|-+$/g, "") || "media";
  return `${base}-${randomBytes(3).toString("hex")}.${extension}`;
}

export function dateParts(date = new Date()) {
  return { year: String(date.getFullYear()), month: String(date.getMonth() + 1).padStart(2, "0") };
}

export function detectImage(buffer: Buffer) {
  if (buffer.subarray(0, 3).equals(Buffer.from([0xff, 0xd8, 0xff]))) return { mimeType: "image/jpeg", extension: "jpg" };
  if (buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return { mimeType: "image/png", extension: "png" };
  if (buffer.subarray(0, 4).toString("ascii") === "RIFF" && buffer.subarray(8, 12).toString("ascii") === "WEBP") return { mimeType: "image/webp", extension: "webp" };
  if (buffer.subarray(4, 12).toString("ascii").includes("ftypavif")) return { mimeType: "image/avif", extension: "avif" };
  if (buffer.subarray(0, 6).toString("ascii") === "GIF87a" || buffer.subarray(0, 6).toString("ascii") === "GIF89a") return { mimeType: "image/gif", extension: "gif" };
  return undefined;
}

export function imageDimensions(buffer: Buffer, mimeType: string) {
  if (mimeType === "image/png" && buffer.length > 24) return { width: buffer.readUInt32BE(16), height: buffer.readUInt32BE(20) };
  if (mimeType === "image/gif" && buffer.length > 10) return { width: buffer.readUInt16LE(6), height: buffer.readUInt16LE(8) };
  if (mimeType === "image/webp" && buffer.subarray(12, 16).toString("ascii") === "VP8X") return { width: 1 + buffer.readUIntLE(24, 3), height: 1 + buffer.readUIntLE(27, 3) };
  if (mimeType === "image/jpeg") {
    let offset = 2;
    while (offset < buffer.length) {
      if (buffer[offset] !== 0xff) break;
      const marker = buffer[offset + 1];
      const length = buffer.readUInt16BE(offset + 2);
      if ([0xc0, 0xc1, 0xc2].includes(marker)) return { height: buffer.readUInt16BE(offset + 5), width: buffer.readUInt16BE(offset + 7) };
      offset += 2 + length;
    }
  }
  return {};
}

export async function storeOriginal(file: { buffer: Buffer; originalFilename: string }) {
  if (file.buffer.length > maxFileSize) throw new Error(`File exceeds ${Math.round(maxFileSize / 1024 / 1024)}MB limit`);
  const detected = detectImage(file.buffer);
  if (!detected) throw new Error("Unsupported or invalid image file");
  const { year, month } = dateParts();
  const filename = safeStoredName(file.originalFilename, detected.extension);
  const relativePath = path.join("originals", year, month, filename);
  const absolutePath = path.join(mediaStorageRoot(), relativePath);
  if (!absolutePath.startsWith(mediaStorageRoot())) throw new Error("Invalid storage path");
  await mkdir(path.dirname(absolutePath), { recursive: true });
  await writeFile(absolutePath, file.buffer);
  const dimensions = imageDimensions(file.buffer, detected.mimeType);
  const storageKey = `media/${relativePath.replaceAll("\\", "/")}`;
  return { filename, storageKey, url: mediaUrl(storageKey), mimeType: detected.mimeType, extension: detected.extension, size: file.buffer.length, ...dimensions };
}

export async function deleteStoredMedia(keys: string[]) {
  for (const key of keys.filter(Boolean)) {
    const relative = key.replace(/^media\//, "");
    const absolute = path.join(mediaStorageRoot(), relative);
    if (absolute.startsWith(mediaStorageRoot())) await rm(absolute, { force: true }).catch(() => undefined);
  }
}

export async function readMultipartFiles(request: NodeJS.ReadableStream, contentType: string | undefined) {
  const boundary = contentType?.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[1] ?? contentType?.match(/boundary=(?:"([^"]+)"|([^;]+))/)?.[2];
  if (!boundary) throw new Error("Missing multipart boundary");
  const chunks: Buffer[] = [];
  let size = 0;
  for await (const chunk of request) {
    const buffer = Buffer.isBuffer(chunk) ? chunk : Buffer.from(chunk);
    size += buffer.length;
    if (size > maxFileSize * maxFiles) throw new Error("Upload payload is too large");
    chunks.push(buffer);
  }
  const body = Buffer.concat(chunks);
  const delimiter = Buffer.from(`--${boundary}`);
  const files: { buffer: Buffer; originalFilename: string }[] = [];
  let start = body.indexOf(delimiter);
  while (start !== -1) {
    const next = body.indexOf(delimiter, start + delimiter.length);
    if (next === -1) break;
    const part = body.subarray(start + delimiter.length + 2, next - 2);
    const headerEnd = part.indexOf(Buffer.from("\r\n\r\n"));
    if (headerEnd > -1) {
      const headers = part.subarray(0, headerEnd).toString("utf8");
      const filename = headers.match(/filename="([^"]+)"/)?.[1];
      if (filename) files.push({ originalFilename: path.basename(filename), buffer: part.subarray(headerEnd + 4) });
    }
    start = next;
  }
  if (files.length > maxFiles) throw new Error(`Upload supports at most ${maxFiles} files`);
  return files;
}
