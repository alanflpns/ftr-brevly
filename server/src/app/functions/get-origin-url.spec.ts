import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, makeRight } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { getOriginUrl } from "./get-origin-url";
import { eq } from "drizzle-orm";
import { makeLink } from "@/test/factories/make-link";

beforeEach(async () => {
  await db.delete(schema.links);
});

describe("get origin link", () => {
  it("should be able to get a origin url", async () => {
    const newLink = await makeLink();

    const sut = await getOriginUrl(newLink.shortUrl);

    expect(sut).toEqual(makeRight({ originUrl: newLink.originUrl }));
  });

  it("should not be able to get a link with an not existis", async () => {
    const sut = await getOriginUrl("example");

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Link not found");
  });

  it("should increment the access count when getting the origin URL", async () => {
    const shortUrl = "example-increment-access";

    const initialLink = await makeLink({ shortUrl: shortUrl });

    expect(initialLink.qtdAccess).toBe(0);

    await getOriginUrl(shortUrl);

    const [updatedLink] = await db
      .select()
      .from(schema.links)
      .where(eq(schema.links.shortUrl, shortUrl));

    expect(updatedLink.qtdAccess).toBe(1);
  });
});
