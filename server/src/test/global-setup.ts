import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { beforeEach } from "node:test";

beforeEach(async () => {
  console.log("Cleaning database before tests...");
  await db.delete(schema.links);
});
