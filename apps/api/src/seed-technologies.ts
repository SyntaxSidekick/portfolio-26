import "dotenv/config";
import { technologyRegistry } from "@portfolio/technology-registry";
import { connectToDatabase, disconnectFromDatabase, technologies } from "./db";

async function seedTechnologies() {
  await connectToDatabase();
  const now = new Date().toISOString();

  let upserted = 0;
  let matched = 0;

  for (const technology of technologyRegistry) {
    const result = await technologies().updateOne(
      { key: technology.key },
      {
        $set: {
          ...technology,
          source: "system",
          updatedAt: now,
        },
        $setOnInsert: {
          createdAt: now,
        },
      },
      { upsert: true },
    );

    upserted += result.upsertedCount;
    matched += result.matchedCount;
  }

  console.log(`Seeded ${technologyRegistry.length} technologies (${upserted} inserted, ${matched} updated).`);
}

seedTechnologies()
  .catch((error) => {
    console.error("Failed to seed technologies", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await disconnectFromDatabase();
  });
