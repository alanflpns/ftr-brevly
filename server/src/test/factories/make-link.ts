import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { fakerPT_BR as faker } from "@faker-js/faker";
import type { InferInsertModel } from "drizzle-orm";

export async function makeLink(
  overrides?: Partial<InferInsertModel<typeof schema.links>>
) {
  const shortUrl = faker.string.alphanumeric(6).toLowerCase();

  const result = await db
    .insert(schema.links)
    .values({
      originUrl: "https://example.com",
      shortUrl: shortUrl,
      qtdAccess: 0,
      ...overrides,
    })
    .returning();

  return result[0];
}
