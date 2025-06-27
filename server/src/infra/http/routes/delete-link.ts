import { deleteLink } from "@/infra/app/functions/delete-link";
import { isRight, unwrapEither } from "@/shared/either";
import { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteLinkRoute: FastifyPluginAsyncZod = async (server) => {
  server.delete(
    "/links/:id",
    {
      schema: {
        summary: "Delete a new link",
        tags: ["Links"],
        params: z.object({
          id: z.string().describe("The ID of the link to be deleted"),
        }),
        response: {
          204: z.null().describe("Link deleted successfully"),
          400: z.object({ message: z.string() }),
          404: z.object({ message: z.string() }),
        },
      },
    },
    async (req, res) => {
      const { id } = req.params;

      if (!id) {
        return res.status(400).send({
          message: "Link ID is required",
        });
      }

      const result = await deleteLink(id);

      if (isRight(result)) {
        return res.status(204).send();
      }

      const error = unwrapEither(result);

      switch (error.constructor.name) {
        case "LinkNotFound":
          return res.status(404).send({ message: error.message });
      }
    }
  );
};
