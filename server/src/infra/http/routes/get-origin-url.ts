import { getOriginUrl } from "@/infra/app/functions/get-origin-url";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const getOriginUrlRoute: FastifyPluginAsyncZod = async (server) => {
  server.get(
    "/links/:shortUrl",
    {
      schema: {
        summary: "Get a link by short URL",
        tags: ["Links"],
        params: z.object({
          shortUrl: z.string().describe("The short URL to retrieve the link"),
        }),
        response: {
          200: z
            .object({ originUrl: z.string() })
            .describe("Link found successfully"),
          400: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, res) => {
      const { shortUrl } = req.params;

      if (!shortUrl) {
        return res.status(400).send({
          message: "Short URL is required",
        });
      }

      const result = await getOriginUrl(shortUrl);

      if (isRight(result)) {
        const { originUrl } = unwrapEither(result);
        return res.status(200).send({
          originUrl: originUrl,
        });
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkNotFound":
          return res.status(404).send({ message: error.message });
      }
    }
  );
};
