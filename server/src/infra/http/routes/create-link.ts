import { createLink } from "@/infra/app/functions/create-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const createLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links",
    {
      schema: {
        summary: "Create a new link",
        tags: ["Links"],
        body: z.object({
          originUrl: z.string().url().describe("The URL to be shortened"),
          shortUrl: z.string().describe("Custom short URL"),
        }),
        response: {
          201: z.null().describe("Link created successfully"),
          400: z.object({ message: z.string() }),
        },
      },
    },
    async (req, res) => {
      const { originUrl, shortUrl } = req.body;

      if (!originUrl || !shortUrl) {
        return res.status(400).send({
          message: "Both originUrl and shortUrl are required",
        });
      }

      const result = await createLink({
        originUrl,
        shortUrl,
      });

      if (isRight(result)) {
        return res.status(201).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkAlreadyExists":
          return res.status(400).send({ message: error.message });
        case "InvalidFormat":
          return res.status(400).send({ message: error.message });
      }
    }
  );
};
