import { getLinks } from "@/app/functions/get-links";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links",
    {
      schema: {
        summary: "Get all links",
        tags: ["Links"],
        response: {
          200: z.object({
            links: z.array(
              z.object({
                id: z.string(),
                originUrl: z.string().url(),
                shortUrl: z.string(),
                qtdAccess: z.number(),
                createdAt: z.date(),
              })
            ),
          }),
        },
      },
    },
    async (req, res) => {
      const result = await getLinks();

      if (isRight(result)) {
        const { links } = unwrapEither(result);
        return res.status(200).send({
          links,
        });
      }
    }
  );
};
