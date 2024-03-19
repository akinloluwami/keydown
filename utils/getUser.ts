import { db, users } from "@/lib/db";
import { eq } from "drizzle-orm";

interface User {
  id: string;
  username: string;
}

export const getUser = async (username: string): Promise<User | null> => {
  const user = (
    await db
      .select({
        id: users.id,
        username: users.username,
      })
      .from(users)
      .where(eq(users.username, username))
  ).flat()[0];

  if (!user) return null;

  return user;
};
