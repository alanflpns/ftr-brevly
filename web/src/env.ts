import { z } from "zod";

const envSchema = z.object({
  VITE_FRONTEND_URL: z.coerce.string().url(),
  VITE_BACKEND_URL: z.coerce.string().url(),
});

export const envConfig = envSchema.parse(import.meta.env);
