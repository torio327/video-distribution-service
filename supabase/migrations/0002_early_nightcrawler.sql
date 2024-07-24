CREATE TABLE IF NOT EXISTS "note" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"contents" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pack" (
	"id" serial PRIMARY KEY NOT NULL,
	"pack_title" text NOT NULL,
	"thumbnail" text NOT NULL,
	"description" text NOT NULL,
	"user_id" text NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pack_video" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_title" text NOT NULL,
	"description" text NOT NULL,
	"video_src" text NOT NULL,
	"packId" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "videos" (
	"id" serial PRIMARY KEY NOT NULL,
	"video_title" text NOT NULL,
	"thumbnail" text,
	"video_src" text NOT NULL,
	"description" text,
	"packId" integer,
	"user_id" text NOT NULL
);
--> statement-breakpoint
ALTER TABLE "accounts" DROP CONSTRAINT "accounts_user_id_users_id_fk";
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pack" ADD CONSTRAINT "pack_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pack_video" ADD CONSTRAINT "pack_video_packId_pack_id_fk" FOREIGN KEY ("packId") REFERENCES "public"."pack"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "videos" ADD CONSTRAINT "videos_packId_pack_id_fk" FOREIGN KEY ("packId") REFERENCES "public"."pack"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "videos" ADD CONSTRAINT "videos_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "accounts" ADD CONSTRAINT "accounts_user_id_users_id_fk" FOREIGN KEY ("user_id") REFERENCES "auth"."users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
