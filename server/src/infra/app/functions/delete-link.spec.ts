import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { deleteLink } from "./delete-link";

describe("delete link", () => {
  beforeEach(async () => {
    await db.delete(schema.links);
  });

  it("should be able to delete a link", async () => {
    const shortUrl = "example-delete";

    const customShortUrl = `brev.ly/${shortUrl}`;

    const [linkCreated] = await db
      .insert(schema.links)
      .values({
        originUrl: "https://example.com",
        shortUrl: customShortUrl,
        qtdAccess: 0,
      })
      .returning({
        id: schema.links.id,
      });

    const sut = await deleteLink(linkCreated.id);

    expect(isRight(sut)).toBe(true);
  });

  it("should not be able to delete a link with an not existis", async () => {
    const sut = await deleteLink("123");

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Link not found");
  });
});
