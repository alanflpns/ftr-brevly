import { Either, makeRight } from "@/shared/either";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { desc } from "drizzle-orm";

type GetUploadsOutput = {
  links: {
    id: string;
    originUrl: string;
    shortUrl: string;
    qtdAccess: number;
    createdAt: Date;
  }[];
};

export async function getLinks(): Promise<Either<Error, GetUploadsOutput>> {
  const links = await db
    .select({
      id: schema.links.id,
      originUrl: schema.links.originUrl,
      shortUrl: schema.links.shortUrl,
      qtdAccess: schema.links.qtdAccess,
      createdAt: schema.links.createdAt,
    })
    .from(schema.links)
    .orderBy((fields) => {
      return desc(fields.id);
    });

  return makeRight({ links });
}
