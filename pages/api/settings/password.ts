import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { Argon2id } from "oslo/password";

// PUT /api/password

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "PUT") {
    res.status(404).end();
    return;
  }
  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }

  const { password, newPassword, confirmPassword } = req.body;

  if (!password || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "Missing required fields" });
  }

  if (password.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }

  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }

  const dbUser = (
    await db.select().from(users).where(eq(users.id, user.id))
  ).flat()[0];

  const argon2 = new Argon2id();
  const hashedPassword = await argon2.hash(password);

  if (hashedPassword !== dbUser.password) {
    return res.status(400).json({ message: "Incorrect password" });
  }

  const newHashedPassword = await argon2.hash(newPassword);

  try {
    await db
      .update(users)
      .set({ password: newHashedPassword })
      .where(eq(users.id, user.id));

    res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;
