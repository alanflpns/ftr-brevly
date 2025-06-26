import { pgTable, text, integer, timestamp } from "drizzle-orm/pg-core";
import { uuidv7 } from "uuidv7";

export const links = pgTable("links", {
  id: text("id")
    .primaryKey()
    .$defaultFn(() => uuidv7()),
  originUrl: text("origin_url").notNull(),
  shortUrl: text("short_url").notNull().unique(),
  qtdAccess: integer("qtd_access").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
