import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, makeRight } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { getOriginUrl } from "./get-origin-url";
import { eq } from "drizzle-orm";

describe("get origin link", () => {
  beforeEach(async () => {
    await db.delete(schema.links);
  });

  it("should be able to get a origin url", async () => {
    const originUrl = "https://example.com";
    const shortUrl = "example-get-origin-url";

    const customShortUrl = `brev.ly/${shortUrl}`;

    await db.insert(schema.links).values({
      originUrl,
      shortUrl: customShortUrl,
      qtdAccess: 0,
    });

    const sut = await getOriginUrl(customShortUrl);

    expect(sut).toEqual(makeRight({ originUrl: "https://example.com" }));
  });

  it("should not be able to get a link with an not existis", async () => {
    const sut = await getOriginUrl("example");

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Link not found");
  });

  it("should increment the access count when getting the origin URL", async () => {
    const originUrl = "https://example.com";
    const shortUrl = "example-increment-access";

    const customShortUrl = `brev.ly/${shortUrl}`;

    await db.insert(schema.links).values({
      originUrl,
      shortUrl: customShortUrl,
      qtdAccess: 0,
    });
    const [initialLink] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, customShortUrl));

    expect(initialLink.qtdAccess).toBe(0);

    const sut = await getOriginUrl(customShortUrl);

    const [updatedLink] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, customShortUrl));

    expect(updatedLink.qtdAccess).toBe(1);
  });
});
