import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { eq } from "drizzle-orm";
import { beforeAll, describe, expect, it } from "vitest";
import { createLink } from "./create-link";

describe("create link", () => {
  beforeAll(async () => {
    await db.delete(schema.links).execute();
  });

  it("should be able to create a link", async () => {
    const shortUrl = "example";

    const sut = await createLink({
      originUrl: "https://example.com",
      shortUrl,
    });

    expect(isRight(sut)).toBe(true);

    const customShortUrl = `brev.ly/${shortUrl}`;

    const result = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, customShortUrl));

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
    expect(sut.left?.message).toBe("Link with this short URL already exists");
  });

  it("should not be able to create a link with an invalid format", async () => {
    const sut = await createLink({
      originUrl: "https://example.com",
      shortUrl: "invalid slug",
    });

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Invalid link format");
  });
});
