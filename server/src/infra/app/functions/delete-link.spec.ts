import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { beforeAll, describe, expect, it } from "vitest";
import { createLink } from "./create-link";
import { deleteLink } from "./delete-link";

describe("delete link", () => {
  beforeAll(async () => {
    await db.delete(schema.links).execute();
  });

  it("should be able to delete a link", async () => {
    const shortUrl = "example-delete";

    const linkCreated = await createLink({
      originUrl: "https://example.com",
      shortUrl,
    });

    const sut = await deleteLink(linkCreated.right?.id || "");

    expect(isRight(sut)).toBe(true);
  });

  it("should not be able to delete a link with an not existis", async () => {
    const sut = await deleteLink("123");

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Link not found");
  });
});
