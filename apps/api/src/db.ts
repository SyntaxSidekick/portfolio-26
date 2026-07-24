import { MongoClient, type Collection, type Db, ObjectId } from "mongodb";

let client: MongoClient | undefined;
let database: Db | undefined;

export async function connectToDatabase() {
  const uri = process.env.MONGODB_URI;
  if (!uri) {
    throw new Error("MONGODB_URI is required");
  }

  if (!client) {
    client = new MongoClient(uri);
    await client.connect();
    database = client.db();
    await Promise.all([
      projects().createIndex({ slug: 1 }, { unique: true }),
      categories().createIndex({ slug: 1 }, { unique: true }),
      technologies().createIndex({ slug: 1 }, { unique: true }),
      technologies().createIndex({ key: 1 }, { unique: true, sparse: true }),
      mediaItems().createIndex({ storageKey: 1 }, { unique: true }),
    ]);
  }

  return database!;
}

export async function disconnectFromDatabase() {
  await client?.close();
  client = undefined;
  database = undefined;
}

export function projects(): Collection {
  if (!database) throw new Error("Database is not connected");
  return database.collection("projects");
}

export function categories(): Collection {
  if (!database) throw new Error("Database is not connected");
  return database.collection("projectCategories");
}

export function technologies(): Collection {
  if (!database) throw new Error("Database is not connected");
  return database.collection("technologies");
}

export function mediaItems(): Collection {
  if (!database) throw new Error("Database is not connected");
  return database.collection("mediaItems");
}

export function toObjectId(id: string) {
  return ObjectId.isValid(id) ? new ObjectId(id) : undefined;
}
