import "dotenv/config";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";
import { connectToDatabase, disconnectFromDatabase, projects } from "./db";
import { mediaPublicBaseUrl, mediaStorageRoot, mediaUrl } from "./media-storage";

type ProjectImageRef = {
  url?: string;
  thumbnailUrl?: string;
};

type ProjectDoc = {
  _id: { toString(): string };
  title?: string;
  media?: {
    cardImage?: ProjectImageRef;
    featuredImage?: ProjectImageRef;
  };
  featuredImage?: ProjectImageRef;
};

const THUMB_WIDTH = 320;
const THUMB_HEIGHT = 188;
const THUMB_QUALITY = 82;

function slug(value: string) {
  return value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "project";
}

function relativeMediaPathFromUrl(url: string) {
  try {
    const parsed = new URL(url);
    const mediaBasePath = new URL(mediaPublicBaseUrl).pathname.replace(/\/$/, "");
    if (parsed.pathname.startsWith(`${mediaBasePath}/`)) {
      return decodeURIComponent(parsed.pathname.slice(mediaBasePath.length + 1));
    }
  } catch {
    if (url.startsWith("/media/")) {
      return url.slice("/media/".length);
    }
  }
  return undefined;
}

async function loadImageBuffer(url: string) {
  const relativePath = relativeMediaPathFromUrl(url);
  if (relativePath) {
    const absolutePath = path.join(mediaStorageRoot(), relativePath);
    return readFile(absolutePath);
  }

  if (url.startsWith("http://") || url.startsWith("https://")) {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Could not fetch image (${response.status})`);
    }
    return Buffer.from(await response.arrayBuffer());
  }

  throw new Error("Unsupported image URL");
}

function pickImageSource(project: ProjectDoc) {
  if (project.media?.cardImage?.url) {
    return {
      sourceUrl: project.media.cardImage.url,
      existingThumb: project.media.cardImage.thumbnailUrl,
      targetField: "media.cardImage.thumbnailUrl",
    } as const;
  }
  if (project.media?.featuredImage?.url) {
    return {
      sourceUrl: project.media.featuredImage.url,
      existingThumb: project.media.featuredImage.thumbnailUrl,
      targetField: "media.featuredImage.thumbnailUrl",
    } as const;
  }
  if (project.featuredImage?.url) {
    return {
      sourceUrl: project.featuredImage.url,
      existingThumb: project.featuredImage.thumbnailUrl,
      targetField: "featuredImage.thumbnailUrl",
    } as const;
  }
  return undefined;
}

async function generateCardThumbnails() {
  await connectToDatabase();

  const force = process.argv.includes("--force");
  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");

  let checked = 0;
  let updated = 0;
  let skipped = 0;
  let failed = 0;

  const cursor = projects().find({}, {
    projection: {
      title: 1,
      featuredImage: 1,
      "media.cardImage": 1,
      "media.featuredImage": 1,
    },
  });

  for await (const rawProject of cursor) {
    const project = rawProject as unknown as ProjectDoc;
    checked += 1;

    const selected = pickImageSource(project);
    if (!selected?.sourceUrl) {
      skipped += 1;
      continue;
    }

    if (selected.existingThumb && !force) {
      skipped += 1;
      continue;
    }

    const projectId = project._id.toString();

    try {
      const sourceBuffer = await loadImageBuffer(selected.sourceUrl);
      const thumbnailBuffer = await sharp(sourceBuffer)
        .rotate()
        .resize({
          width: THUMB_WIDTH,
          height: THUMB_HEIGHT,
          fit: "cover",
          position: "attention",
          withoutEnlargement: true,
        })
        .webp({ quality: THUMB_QUALITY })
        .toBuffer();

      const fileStem = `${slug(project.title ?? "project")}-${projectId.slice(-8)}`;
      const relativePath = path.posix.join("generated", "thumbnails", "cards", year, month, `${fileStem}.webp`);
      const absolutePath = path.join(mediaStorageRoot(), relativePath);

      await mkdir(path.dirname(absolutePath), { recursive: true });
      await writeFile(absolutePath, thumbnailBuffer);

      const thumbnailStorageKey = `media/${relativePath}`;
      const thumbnailUrl = mediaUrl(thumbnailStorageKey);

      await projects().updateOne(
        { _id: rawProject._id },
        {
          $set: {
            [selected.targetField]: thumbnailUrl,
            updatedAt: new Date().toISOString(),
          },
        },
      );

      updated += 1;
    } catch (error) {
      failed += 1;
      console.error(`Failed for ${project.title ?? projectId}:`, error instanceof Error ? error.message : error);
    }
  }

  console.log(`Checked ${checked} projects.`);
  console.log(`Updated ${updated} projects with card thumbnails.`);
  console.log(`Skipped ${skipped} projects.`);
  console.log(`Failed ${failed} projects.`);
}

generateCardThumbnails()
  .catch((error) => {
    console.error("Card thumbnail migration failed", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });
