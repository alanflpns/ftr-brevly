CREATE TABLE "links" (
	"id" text PRIMARY KEY NOT NULL,
	"origin_url" text NOT NULL,
	"short_url" text NOT NULL,
	"qtd_access" numeric NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "links_short_url_unique" UNIQUE("short_url")
);
