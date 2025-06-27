import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { isLeft, isRight } from "@/shared/either";
import { beforeEach, describe, expect, it } from "vitest";
import { deleteLink } from "./delete-link";
import { makeLink } from "@/test/factories/make-link";

beforeEach(async () => {
  await db.delete(schema.links);
});

describe("delete link", () => {
  it("should be able to delete a link", async () => {
    const linkCreated = await makeLink();

    const sut = await deleteLink(linkCreated.id);

    expect(isRight(sut)).toBe(true);
  });

  it("should not be able to delete a link with an not existis", async () => {
    const sut = await deleteLink("123");

    expect(isLeft(sut)).toBe(true);
    expect(sut.left?.message).toBe("Link not found");
  });
});
