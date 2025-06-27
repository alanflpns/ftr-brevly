import { Either, makeLeft, makeRight } from "@/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { LinkNotFound } from "../errors/link-not-found";

export async function deleteLink(linkId: string): Promise<Either<Error, null>> {
  const deletedLink = await db
    .delete(schema.links)
    .where(eq(schema.links.id, linkId))
    .returning();

  if (!deletedLink.length) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight(null);
}
