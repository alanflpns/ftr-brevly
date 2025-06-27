import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { makeRight } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { getLinks } from "./get-links";
import { makeLink } from "@/test/factories/make-link";

beforeEach(async () => {
  await db.delete(schema.links);
});

describe("get all link", () => {
  it("should be able to get a origin url", async () => {
    const newLink = await makeLink();

    const sut = await getLinks();

    expect(sut).toEqual(
      makeRight({
        links: [
          {
            id: newLink.id,
            originUrl: newLink.originUrl,
            shortUrl: newLink.shortUrl,
            qtdAccess: newLink.qtdAccess,
            createdAt: newLink.createdAt,
          },
        ],
      })
    );
  });
});
