CREATE TABLE "stems" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"track_id" uuid NOT NULL,
	"name" varchar(255) NOT NULL,
	"color" varchar(7) DEFAULT '#3b82f6' NOT NULL,
	"frequency" real DEFAULT 440 NOT NULL,
	"waveform" varchar(20) DEFAULT 'sine' NOT NULL,
	"file_url" text,
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "tracks" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"artist" varchar(255) NOT NULL,
	"artwork" text DEFAULT '' NOT NULL,
	"price" numeric(10, 2) DEFAULT '0' NOT NULL,
	"description" text DEFAULT '' NOT NULL,
	"bpm" integer DEFAULT 120 NOT NULL,
	"key" varchar(10) DEFAULT 'C' NOT NULL,
	"genre" varchar(100) DEFAULT '' NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "stems" ADD CONSTRAINT "stems_track_id_tracks_id_fk" FOREIGN KEY ("track_id") REFERENCES "public"."tracks"("id") ON DELETE cascade ON UPDATE no action;