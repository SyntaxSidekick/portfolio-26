import cors from "cors";
import "dotenv/config";
import express, { type ErrorRequestHandler } from "express";
import { MongoServerError, ObjectId, type Sort } from "mongodb";
import { z } from "zod";
import { categories, connectToDatabase, mediaItems, projects, technologies, toObjectId } from "./db";
import { deleteStoredMedia, mediaStaticRoot, readMultipartFiles, storeOriginal } from "./media-storage";
import { errorResponse, serializeDocument, slugify } from "./serialize";
import { projectInputSchema, taxonomyInputSchema, technologyInputSchema } from "./types";

const app = express();
const port = Number(process.env.PORT ?? 4000);

const allowedOrigins = [process.env.ADMIN_ORIGIN ?? "http://localhost:5173", process.env.WEB_ORIGIN ?? "http://localhost:3000"].filter(Boolean);

app.use(
  cors({
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
        return;
      }
      callback(new Error("Origin is not allowed by CORS"));
    },
  }),
);
app.use(express.json());
app.use("/media", express.static(mediaStaticRoot(), { index: false, fallthrough: false }));

app.get("/health", (_request, response) => {
  response.json({ ok: true, service: "portfolio-api" });
});

app.get("/api/projects", async (request, response, next) => {
  try {
    const status = typeof request.query.status === "string" ? request.query.status : undefined;
    const filter = status ? { status } : {};
    const data = await projects().find(filter).sort({ displayOrder: 1, updatedAt: -1 }).toArray();
    response.json({ data: await Promise.all(data.map(serializeProject)) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects/slug/:slug", async (request, response, next) => {
  try {
    const project = await projects().findOne({ slug: request.params.slug });
    if (!project) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    response.json({ data: await serializeProject(project) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/projects/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid project id"));
      return;
    }
    const project = await projects().findOne({ _id });
    if (!project) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    response.json({ data: await serializeProject(project) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/projects", async (request, response, next) => {
  try {
    const input = projectInputSchema.parse(request.body);
    const technologyIds = await resolveSubmittedTechnologyIds(input.technologyIds, input.technologies, new Set());
    const now = new Date().toISOString();
    const result = await projects().insertOne({
      ...cleanProjectInput(input),
      technologyIds,
      slug: input.slug ? slugify(input.slug) : slugify(input.title),
      createdAt: now,
      updatedAt: now,
    });
    const project = await projects().findOne({ _id: result.insertedId });
    response.status(201).json({ data: await serializeProject(project!) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/projects/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid project id"));
      return;
    }
    const current = await projects().findOne({ _id });
    if (!current) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    const input = projectInputSchema.parse(request.body);
    const currentTechnologyIds = getStoredTechnologyIds(current);
    const technologyIds = await resolveSubmittedTechnologyIds(input.technologyIds, input.technologies, new Set(currentTechnologyIds));
    const result = await projects().findOneAndUpdate(
      { _id },
      { $set: { ...cleanProjectInput(input), technologyIds, slug: input.slug ? slugify(input.slug) : slugify(input.title), updatedAt: new Date().toISOString() } },
      { returnDocument: "after" },
    );
    if (!result) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    response.json({ data: await serializeProject(result) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/projects/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid project id"));
      return;
    }
    const input = projectInputSchema.partial().parse(request.body);
    const current = await projects().findOne({ _id });
    if (!current) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    const patch = { ...input } as Record<string, unknown>;
    if (input.technologyIds || input.technologies) {
      patch.technologyIds = await resolveSubmittedTechnologyIds(input.technologyIds ?? [], input.technologies ?? [], new Set(getStoredTechnologyIds(current)));
      delete patch.technologies;
    }
    const result = await projects().findOneAndUpdate({ _id }, { $set: { ...patch, updatedAt: new Date().toISOString() } }, { returnDocument: "after" });
    if (!result) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    response.json({ data: await serializeProject(result) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/projects/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid project id"));
      return;
    }
    const result = await projects().deleteOne({ _id });
    if (!result.deletedCount) {
      response.status(404).json(errorResponse("Project not found"));
      return;
    }
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

app.get("/api/media", async (request, response, next) => {
  try {
    const page = Math.max(1, Number(request.query.page ?? 1));
    const limit = Math.min(100, Math.max(1, Number(request.query.limit ?? 40)));
    const search = typeof request.query.search === "string" ? request.query.search.trim() : "";
    const type = typeof request.query.type === "string" ? request.query.type : "";
    const tag = typeof request.query.tag === "string" ? request.query.tag : "";
    const filter: Record<string, unknown> = {};
    if (search) filter.$or = [{ title: { $regex: search, $options: "i" } }, { filename: { $regex: search, $options: "i" } }, { originalFilename: { $regex: search, $options: "i" } }];
    if (type === "image") filter.mimeType = { $regex: "^image/" };
    if (tag) filter.tags = tag;
    const sort: Sort = request.query.sort === "oldest" ? { createdAt: 1 } : request.query.sort === "name" ? { title: 1 } : request.query.sort === "size" ? { size: -1 } : { createdAt: -1 };
    const [data, total] = await Promise.all([mediaItems().find(filter).sort(sort).skip((page - 1) * limit).limit(limit).toArray(), mediaItems().countDocuments(filter)]);
    response.json({ data: data.map(serializeDocument), pagination: { page, limit, total, pages: Math.ceil(total / limit) } });
  } catch (error) {
    next(error);
  }
});

app.get("/api/media/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid media id"));
      return;
    }
    const item = await mediaItems().findOne({ _id });
    if (!item) {
      response.status(404).json(errorResponse("Media item not found"));
      return;
    }
    response.json({ data: serializeDocument(item) });
  } catch (error) {
    next(error);
  }
});

app.post("/api/media", async (request, response, next) => {
  try {
    if (!request.headers["content-type"]?.includes("multipart/form-data")) {
      response.status(400).json(errorResponse("Expected multipart/form-data upload"));
      return;
    }
    const files = await readMultipartFiles(request, request.headers["content-type"]);
    if (!files.length) {
      response.status(400).json(errorResponse("No files uploaded"));
      return;
    }
    const now = new Date().toISOString();
    const created = [];
    for (const file of files) {
      const stored = await storeOriginal(file);
      const title = file.originalFilename.replace(/\.[^.]+$/, "").replace(/[-_]+/g, " ");
      const result = await mediaItems().insertOne({ ...stored, originalFilename: file.originalFilename, thumbnailUrl: stored.url, mediumUrl: stored.url, largeUrl: stored.url, title, alt: "", caption: "", description: "", tags: [], createdAt: now, updatedAt: now });
      const item = await mediaItems().findOne({ _id: result.insertedId });
      created.push(serializeDocument(item!));
    }
    response.status(201).json({ data: created });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/media/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid media id"));
      return;
    }
    const input = z.object({ title: z.string().trim().optional(), alt: z.string().optional(), caption: z.string().optional(), description: z.string().optional(), tags: z.array(z.string()).optional() }).parse(request.body);
    const result = await mediaItems().findOneAndUpdate({ _id }, { $set: { ...input, updatedAt: new Date().toISOString() } }, { returnDocument: "after" });
    if (!result) {
      response.status(404).json(errorResponse("Media item not found"));
      return;
    }
    response.json({ data: serializeDocument(result) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/media/:id/usage", async (request, response, next) => {
  try {
    response.json({ data: await mediaUsage(request.params.id) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/media/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid media id"));
      return;
    }
    const item = await mediaItems().findOne({ _id });
    if (!item) {
      response.status(404).json(errorResponse("Media item not found"));
      return;
    }
    const usage = await mediaUsage(request.params.id);
    if (usage.length) {
      response.status(409).json({ ...errorResponse("Media item is in use"), usage });
      return;
    }
    await deleteStoredMedia([item.storageKey, item.thumbnailStorageKey, item.mediumStorageKey, item.largeStorageKey].filter(Boolean));
    await mediaItems().deleteOne({ _id });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

function getStoredTechnologyIds(project: Record<string, unknown>) {
  const ids = Array.isArray(project.technologyIds) ? project.technologyIds.filter((id): id is string => typeof id === "string") : [];
  if (ids.length > 0) return ids;
  const legacy = Array.isArray(project.technologies) ? project.technologies : [];
  return legacy.map((technology) => typeof technology === "object" && technology && "id" in technology ? String(technology.id) : "").filter(Boolean);
}

function cleanProjectInput<T extends { technologies?: unknown; technologyIds?: unknown }>(input: T) {
  const { technologies: _technologies, technologyIds: _technologyIds, ...project } = input;
  return project;
}

async function resolveSubmittedTechnologyIds(technologyIds: string[] = [], technologyReferences: { id: string }[] = [], existingIds: Set<string>) {
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

async function technologyUsageCounts() {
  const usage = await projects()
    .aggregate([
      { $unwind: "$technologyIds" },
      { $group: { _id: "$technologyIds", count: { $sum: 1 } } },
    ])
    .toArray();
  return new Map(usage.map((item) => [String(item._id), item.count]));
}

async function serializeProject(project: Record<string, unknown>) {
  const serialized = serializeDocument(project as never) as Record<string, unknown>;
  serialized.projectType = normalizeProjectType(serialized.projectType);
  const ids = getStoredTechnologyIds(serialized);
  const objectIds = ids.map((id) => toObjectId(id)).filter((id): id is ObjectId => Boolean(id));
  const found = objectIds.length > 0 ? await technologies().find({ _id: { $in: objectIds } }).toArray() : [];
  const byId = new Map(found.map((technology) => [technology._id.toString(), serializeDocument(technology)]));
  serialized.technologyIds = ids;
  serialized.technologies = ids.map((id) => byId.get(id)).filter(Boolean).sort((a, b) => ((a as Record<string, number>).displayOrder ?? 0) - ((b as Record<string, number>).displayOrder ?? 0));
  return serialized;
}

function normalizeProjectType(projectType: unknown) {
  if (projectType === "github-project") return "github";
  if (projectType === "design-project") return "design";
  if (projectType === "code-experiment") return "codepen";
  return projectType;
}

async function mediaUsage(id: string) {
  const data = await projects().find({
    $or: [
      { "featuredImage.id": id },
      { "media.featuredImage.id": id },
      { "media.desktopImage.id": id },
      { "media.mobileImage.id": id },
      { "media.cardImage.id": id },
      { "media.gallery.id": id },
      { "overview.media.id": id },
      { "challenge.media.id": id },
      { "solution.media.id": id },
      { "caseStudy.sectionMedia.overview.id": id },
      { "caseStudy.sectionMedia.challenge.id": id },
      { "caseStudy.sectionMedia.solution.id": id },
      { "caseStudy.sectionMedia.highlights.id": id },
    ],
  }).project({ title: 1, slug: 1 }).toArray();
  return data.map((project) => ({ type: "project", id: project._id.toString(), title: project.title, slug: project.slug }));
}

function registerTaxonomyRoutes(path: string, collection: typeof categories, schema: typeof taxonomyInputSchema | typeof technologyInputSchema) {
  app.get(`/api/${path}`, async (_request, response, next) => {
    try {
      const data = await collection().find({}).sort({ name: 1 }).toArray();
      const usage = await projects().aggregate([{ $unwind: `$${path === "technologies" ? "technologies" : "categories"}` }, { $group: { _id: `$${path === "technologies" ? "technologies" : "categories"}.id`, count: { $sum: 1 } } }]).toArray();
      const counts = new Map(usage.map((item) => [item._id, item.count]));
      response.json({ data: data.map((item) => ({ ...serializeDocument(item), usageCount: counts.get(item._id.toString()) ?? 0 })) });
    } catch (error) {
      next(error);
    }
  });

  app.post(`/api/${path}`, async (request, response, next) => {
    try {
      const input = schema.parse(request.body);
      const now = new Date().toISOString();
      const result = await collection().insertOne({ ...input, slug: input.slug ? slugify(input.slug) : slugify(input.name), createdAt: now, updatedAt: now });
      const item = await collection().findOne({ _id: result.insertedId });
      response.status(201).json({ data: serializeDocument(item!) });
    } catch (error) {
      next(error);
    }
  });

  app.put(`/api/${path}/:id`, async (request, response, next) => {
    try {
      const _id = toObjectId(request.params.id);
      if (!_id) {
        response.status(400).json(errorResponse("Invalid id"));
        return;
      }
      const input = schema.parse(request.body);
      const result = await collection().findOneAndUpdate({ _id }, { $set: { ...input, slug: input.slug ? slugify(input.slug) : slugify(input.name), updatedAt: new Date().toISOString() } }, { returnDocument: "after" });
      if (!result) {
        response.status(404).json(errorResponse("Item not found"));
        return;
      }
      response.json({ data: serializeDocument(result) });
    } catch (error) {
      next(error);
    }
  });

  app.delete(`/api/${path}/:id`, async (request, response, next) => {
    try {
      const _id = toObjectId(request.params.id);
      if (!_id) {
        response.status(400).json(errorResponse("Invalid id"));
        return;
      }
      const field = path === "technologies" ? "technologies.id" : "categories.id";
      const inUse = await projects().countDocuments({ [field]: request.params.id });
      if (inUse > 0) {
        response.status(409).json(errorResponse(`Cannot delete item used by ${inUse} project${inUse === 1 ? "" : "s"}`));
        return;
      }
      const result = await collection().deleteOne({ _id });
      if (!result.deletedCount) {
        response.status(404).json(errorResponse("Item not found"));
        return;
      }
      response.status(204).send();
    } catch (error) {
      next(error);
    }
  });
}

registerTaxonomyRoutes("project-categories", categories, taxonomyInputSchema);

app.get("/api/technologies", async (request, response, next) => {
  try {
    const filter: Record<string, unknown> = {};
    if (request.query.active === "true") filter.active = true;
    if (request.query.active === "false") filter.active = false;
    if (typeof request.query.category === "string" && request.query.category) filter.category = request.query.category;
    const data = await technologies().find(filter).sort({ displayOrder: 1, name: 1 }).toArray();
    const counts = await technologyUsageCounts();
    response.json({ data: data.map((item) => ({ ...serializeDocument(item), usageCount: counts.get(item._id.toString()) ?? 0 })) });
  } catch (error) {
    next(error);
  }
});

app.get("/api/technologies/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid technology id"));
      return;
    }
    const item = await technologies().findOne({ _id });
    if (!item) {
      response.status(404).json(errorResponse("Technology not found"));
      return;
    }
    const counts = await technologyUsageCounts();
    response.json({ data: { ...serializeDocument(item), usageCount: counts.get(item._id.toString()) ?? 0 } });
  } catch (error) {
    next(error);
  }
});

app.post("/api/technologies", async (request, response, next) => {
  try {
    const input = technologyInputSchema.required({ key: true }).parse(request.body);
    const now = new Date().toISOString();
    const result = await technologies().insertOne({ ...input, key: slugify(input.key), slug: input.slug ? slugify(input.slug) : slugify(input.name), source: "custom", createdAt: now, updatedAt: now });
    const item = await technologies().findOne({ _id: result.insertedId });
    response.status(201).json({ data: serializeDocument(item!) });
  } catch (error) {
    next(error);
  }
});

app.put("/api/technologies/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid technology id"));
      return;
    }
    const existing = await technologies().findOne({ _id });
    if (!existing) {
      response.status(404).json(errorResponse("Technology not found"));
      return;
    }
    const input = (existing.source === "system" ? technologyInputSchema : technologyInputSchema.required({ key: true })).parse(request.body);
    const result = await technologies().findOneAndUpdate(
      { _id },
      { $set: { ...input, key: existing.source === "system" ? existing.key : slugify(input.key ?? input.name), slug: input.slug ? slugify(input.slug) : slugify(input.name), source: existing.source ?? "custom", updatedAt: new Date().toISOString() } },
      { returnDocument: "after" },
    );
    response.json({ data: serializeDocument(result!) });
  } catch (error) {
    next(error);
  }
});

app.patch("/api/technologies/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid technology id"));
      return;
    }
    const existing = await technologies().findOne({ _id });
    if (!existing) {
      response.status(404).json(errorResponse("Technology not found"));
      return;
    }
    const input = technologyInputSchema.partial().parse(request.body);
    const patch = { ...input, updatedAt: new Date().toISOString() } as Record<string, unknown>;
    if (typeof patch.slug === "string") patch.slug = slugify(patch.slug);
    if (existing.source === "system") delete patch.key;
    if (typeof patch.key === "string") patch.key = slugify(patch.key);
    const result = await technologies().findOneAndUpdate({ _id }, { $set: patch }, { returnDocument: "after" });
    response.json({ data: serializeDocument(result!) });
  } catch (error) {
    next(error);
  }
});

app.delete("/api/technologies/:id", async (request, response, next) => {
  try {
    const _id = toObjectId(request.params.id);
    if (!_id) {
      response.status(400).json(errorResponse("Invalid technology id"));
      return;
    }
    const item = await technologies().findOne({ _id });
    if (!item) {
      response.status(404).json(errorResponse("Technology not found"));
      return;
    }
    if (item.source === "system") {
      response.status(409).json(errorResponse("System technologies cannot be deleted. Deactivate instead."));
      return;
    }
    const inUse = await projects().countDocuments({ technologyIds: request.params.id });
    if (inUse > 0) {
      response.status(409).json(errorResponse(`Cannot delete technology used by ${inUse} project${inUse === 1 ? "" : "s"}`));
      return;
    }
    await technologies().deleteOne({ _id });
    response.status(204).send();
  } catch (error) {
    next(error);
  }
});

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  if (error instanceof z.ZodError) {
    response.status(400).json(errorResponse(error.issues.map((issue) => issue.message).join(", ")));
    return;
  }
  if (error instanceof MongoServerError && error.code === 11000) {
    response.status(409).json(errorResponse("A record with this slug already exists"));
    return;
  }
  console.error(error);
  response.status(500).json(errorResponse(error instanceof Error ? error.message : "Internal server error"));
};

app.use(errorHandler);

connectToDatabase()
  .then(() => {
    app.listen(port, () => {
      console.log(`Portfolio API listening on http://localhost:${port}`);
    });
  })
  .catch((error) => {
    console.error("Failed to connect to MongoDB", error);
    process.exit(1);
  });
