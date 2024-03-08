import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import pg from "pg";
import { boolean, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { drizzle } from "drizzle-orm/node-postgres";

const pool = new pg.Pool({
  connectionString: process.env.DATABASE_URL,
});

export const users = pgTable("users", {
  id: text("id").primaryKey(),
  email: text("email").unique().notNull(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  firstname: text("firstname").notNull(),
  blogTitle: text("blog_title").notNull(),
  blogDescription: text("blog_description"),
  profilePicture: text("profile_picture"),
  bio: text("bio"),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  customDomain: text("custom_domain"),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  website: text("website"),
  twitter: text("twitter"),
  instagram: text("instagram"),
  threads: text("threads"),
  github: text("github"),
});

export const sessions = pgTable("sessions", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  expiresAt: timestamp("expires_at", {
    withTimezone: true,
    mode: "date",
  }).notNull(),
});

export const posts = pgTable("posts", {
  id: text("id").primaryKey(),
  userId: text("user_id")
    .notNull()
    .references(() => users.id),
  title: text("title").notNull(),
  slug: text("slug").notNull(),
  content: text("content"),
  isDraft: boolean("is_draft").default(true),
  createdAt: timestamp("created_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  updatedAt: timestamp("updated_at", {
    withTimezone: true,
    mode: "date",
  })
    .notNull()
    .defaultNow(),
  publishDate: timestamp("publish_date", {
    withTimezone: true,
    mode: "date",
  }),
  coverImage: text("cover_image"),
});

export const db = drizzle(pool, {
  schema: {
    users,
  },
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
