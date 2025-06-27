import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, makeRight } from "@/shared/either";
import { beforeAll, describe, expect, it } from "vitest";
import { getOriginUrl } from "./get-origin-url";
import { getLinks } from "./get-links";

describe("get all link", () => {
  beforeAll(async () => {
    await db.delete(schema.links);
  });

  it("should be able to get a origin url", async () => {
    const originUrl = "https://example.com";
    const shortUrl = "example-get-links";

    const customShortUrl = `brev.ly/${shortUrl}`;

    const [newLink] = await db
      .insert(schema.links)
      .values({
        originUrl,
        shortUrl: customShortUrl,
        qtdAccess: 0,
      })
      .returning({
        id: schema.links.id,
        originUrl: schema.links.originUrl,
        shortUrl: schema.links.shortUrl,
        qtdAccess: schema.links.qtdAccess,
        createdAt: schema.links.createdAt,
      });

    const sut = await getLinks();

    expect(sut).toEqual(
      makeRight({
        links: [
          {
            id: newLink.id,
            originUrl: "https://example.com",
            shortUrl: customShortUrl,
            qtdAccess: 0,
            createdAt: newLink.createdAt,
          },
        ],
      })
    );
  });
});
