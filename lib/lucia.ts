import { Lucia } from "lucia";
import { adapter, users } from "./db";

export const lucia = new Lucia(adapter, {
  sessionCookie: {
    attributes: {
      secure: process.env.NODE_ENV === "production",
    },
  },
  getUserAttributes: (attributes) => {
    return {
      username: attributes.username,
      email: attributes.email,
      firstname: attributes.firstname,
    };
  },
});

declare module "lucia" {
  interface Register {
    Lucia: typeof lucia;
    DatabaseUserAttributes: typeof users.$inferSelect;
  }
}
