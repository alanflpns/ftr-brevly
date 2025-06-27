import fastifyCors from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import fastify from "fastify";
import {
  hasZodFastifySchemaValidationErrors,
  serializerCompiler,
  validatorCompiler,
} from "fastify-type-provider-zod";
import { transformSwaggerSchema } from "./transform-swagger-schema";
import { envConfig } from "@/env";
import { createLinkRoute } from "./routes/create-link";
import { deleteLinkRoute } from "./routes/delete-link";
import { getOriginUrlRoute } from "./routes/get-origin-url";
import { getLinksRoute } from "./routes/get-links";
import { exportLinksRoute } from "./routes/export-links";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, req, res) => {
  if (hasZodFastifySchemaValidationErrors(error)) {
    return res.status(400).send({
      message: "Validation error",
      issues: error.validation,
    });
  }

  console.error(error);

  return res.status(500).send({ message: "Internal server error." });
});

server.register(fastifyCors, { origin: "*" });

server.register(fastifyMultipart);
server.register(fastifySwagger, {
  openapi: {
    info: {
      title: "Upload Server",
      version: "1.0.0",
    },
  },
  transform: transformSwaggerSchema,
});

server.register(fastifySwaggerUi, {
  routePrefix: "/docs",
});

server.register(createLinkRoute);
server.register(deleteLinkRoute);
server.register(getOriginUrlRoute);
server.register(getLinksRoute);
server.register(exportLinksRoute);

server.listen({ port: envConfig.PORT, host: "0.0.0.0" }).then(() => {
  console.log("HTTP server running");
});
