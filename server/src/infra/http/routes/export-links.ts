import { exportLinks } from "@/app/functions/export-links";
import { unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportLinksRoute: FastifyPluginAsyncZod = async (server) => {
  server.post(
    "/links/exports",
    {
      schema: {
        summary: "Export links",
        tags: ["Links"],
        response: {
          200: z.object({
            reportUrl: z.string(),
          }),
        },
      },
    },
    async (req, res) => {
      const result = await exportLinks();

      const { reportUrl } = unwrapEither(result);

      return res.status(200).send({ reportUrl });
    }
  );
};
