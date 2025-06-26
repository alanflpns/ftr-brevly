import { envConfig } from "@/env";
import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import { schema } from "./schemas";

export const pg = postgres(envConfig.DATABASE_URL);
export const db = drizzle(pg, { schema });
