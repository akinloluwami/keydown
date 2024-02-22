import { db, users } from "@/lib/db";
import { lucia } from "@/lib/lucia";
import { eq } from "drizzle-orm";
import type { NextApiRequest, NextApiResponse } from "next";
import { Argon2id } from "oslo/password";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }
  const body: null | Partial<{
    username: string;
    password: string;
  }> = req.body;

  const username = body?.username;
  const password = body?.password;

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  try {
    const user = (
      await db
        .select()
        .from(users)
        .where(eq(users.username, username.toLowerCase()))
    ).flat()[0];

    if (!user) {
      res.status(400).json({ message: "Username or password is incorrect" });
      return;
    }

    const validPassword = await new Argon2id().verify(user.password, password);
    if (!validPassword) {
      res.status(400).json({
        error: "Username or password is incorrect",
      });
      return;
    }

    const session = await lucia.createSession(user.id, {});
    res
      .appendHeader(
        "Set-Cookie",
        lucia.createSessionCookie(session.id).serialize()
      )
      .status(200)
      .end();
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};
export default handler;
