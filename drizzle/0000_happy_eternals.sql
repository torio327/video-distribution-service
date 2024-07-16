CREATE TABLE IF NOT EXISTS "user" (
	"id" serial PRIMARY KEY NOT NULL,
	"user_name" text NOT NULL,
	"email" text NOT NULL,
	"password" text NOT NULL
);
