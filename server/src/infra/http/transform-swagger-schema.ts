import { jsonSchemaTransform } from "fastify-type-provider-zod";

type TransformSwaggerSchemaData = Parameters<typeof jsonSchemaTransform>[0];

export function transformSwaggerSchema(data: TransformSwaggerSchemaData) {
  const { schema, url } = jsonSchemaTransform(data);

  return { schema, url };
}
