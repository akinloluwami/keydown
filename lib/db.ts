import { DrizzlePostgreSQLAdapter } from "@lucia-auth/adapter-drizzle";
import pg from "pg";
import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
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

export const db = drizzle(pool, {
  schema: {
    users,
  },
});

export const adapter = new DrizzlePostgreSQLAdapter(db, sessions, users);
