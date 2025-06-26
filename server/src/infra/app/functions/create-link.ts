import { Either, makeLeft, makeRight } from "@/shared/either";
import { z } from "zod";
import { LinkAlreadyExists } from "../errors/link-already-exists";
import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { InvalidFormat } from "../errors/invalid-format";
import { validateSlug } from "@/helpers/validate-slug";

const createLinkInput = z.object({
  originUrl: z.string(),
  shortUrl: z.string(),
});

type createLinkInput = z.input<typeof createLinkInput>;

export async function createLink(
  input: createLinkInput
): Promise<Either<LinkAlreadyExists, null>> {
  const { originUrl, shortUrl } = createLinkInput.parse(input);

  const customShortUrl = `brev.ly/${shortUrl}`;

  const existingLink = await db
    .select()
    .from(schema.links)
    .where(eq(schema.links.shortUrl, customShortUrl));

  if (existingLink.length > 0) {
    return makeLeft(new LinkAlreadyExists());
  }

  if (!validateSlug(shortUrl)) {
    return makeLeft(new InvalidFormat());
  }

  await db.insert(schema.links).values({
    originUrl,
    shortUrl: customShortUrl,
    qtdAccess: 0,
  });

  return makeRight(null);
}
