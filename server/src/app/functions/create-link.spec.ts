import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { beforeEach, describe, expect, it } from "vitest";
import { createLink } from "./create-link";

beforeEach(async () => {
  await db.delete(schema.links);
});

describe("create link", () => {
  it("should be able to create a link", async () => {
    const shortUrl = "example";

    const sut = await createLink({
      originUrl: "https://example.com",
      shortUrl,
    });

    expect(isRight(sut)).toBe(true);

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl));

    expect(result).toHaveLength(1);
  });

  it("should not be able to create a link with an existing short URL", async () => {
    const shortUrl = "existing-link";

    await createLink({
      originUrl: "https://example.com",
      shortUrl,
    });

    const sut = await createLink({
      originUrl: "https://another-example.com",
      shortUrl,
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Essa URL encurtada já existe");
  });

  it("should not be able to create a link with an invalid format", async () => {
    const sut = await createLink({
      originUrl: "https://example.com",
      shortUrl: "invalid slug",
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Formato de link inválido");
  });
});
