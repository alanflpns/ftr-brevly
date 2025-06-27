import { Either, makeLeft, makeRight } from "@/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { LinkNotFound } from "../errors/link-not-found";

export async function getOriginUrl(
  shortUrl: string
): Promise<Either<Error, { originUrl: string }>> {
  const [link] = await db
    .select({ originUrl: schema.links.originUrl })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl));

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  return makeRight({ originUrl: link.originUrl });
}
