import { Either, makeLeft, makeRight } from "@/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { LinkNotFound } from "../errors/link-not-found";

export async function getOriginUrl(
  shortUrl: string
): Promise<Either<Error, { originUrl: string }>> {
  const [link] = await db
    .select({
      originUrl: schema.links.originUrl,
      qtdAccess: schema.links.qtdAccess,
    })
    .from(schema.links)
    .where(eq(schema.links.shortUrl, shortUrl));

  if (!link) {
    return makeLeft(new LinkNotFound());
  }

  await db
    .update(schema.links)
    .set({ qtdAccess: link.qtdAccess + 1 })
    .where(eq(schema.links.shortUrl, shortUrl));

  return makeRight({ originUrl: link.originUrl });
}
