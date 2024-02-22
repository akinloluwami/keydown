import { db, users } from "@/lib/db";
import { lucia } from "@/lib/lucia";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import type { NextApiRequest, NextApiResponse } from "next";
import { Argon2id } from "oslo/password";
import validator from "validator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(404).end();
    return;
  }
  const body: null | Partial<{
    username: string;
    password: string;
    email: string;
    firstname: string;
  }> = req.body;

  const username = body?.username;
  const password = body?.password;
  const email = body?.email;
  const firstname = body?.firstname;

  if (!username) {
    res.status(400).json({ message: "Username is required" });
    return;
  }

  if (!password) {
    res.status(400).json({ message: "Password is required" });
    return;
  }

  if (!email) {
    res.status(400).json({ message: "Email is required" });
    return;
  }

  if (!firstname) {
    res.status(400).json({ message: "Firstname is required" });
    return;
  }

  if (!validator.isEmail(email)) {
    res.status(400).json({ message: "Email is invalid" });
    return;
  }

  if (firstname.length < 2) {
    res
      .status(400)
      .json({ message: "Firstname must be at least 2 characters" });
    return;
  }

  if (validator.isNumeric(username)) {
    res.status(400).json({
      message:
        "Username must start be alphanumeric when starting with a number",
    });
    return;
  }

  if (password.length < 8) {
    res.status(400).json({ message: "Password must be at least 8 characters" });
    return;
  }

  if (password.length > 256) {
    res
      .status(400)
      .json({ message: "Password must be less than 256 characters" });
    return;
  }

  const usernameRegex = /^[a-zA-Z0-9]+$/;
  if (!validator.blacklist(username, " ").match(usernameRegex)) {
    res.status(400).json({ message: "Username must be alphanumeric" });
    return;
  }

  if (username.length < 3) {
    res.status(400).json({ message: "Username must be at least 3 characters" });
    return;
  }

  if (username.length > 25) {
    res
      .status(400)
      .json({ message: "Username must be less than 25 characters" });
    return;
  }

  const existingUser = await db
    .select()
    .from(users)
    .where(eq(users.username, username));

  if (existingUser.flat().length > 0) {
    res.status(400).json({ message: "Username is taken" });
    return;
  }

  const existingUserEmail = await db
    .select()
    .from(users)
    .where(eq(users.email, email));

  if (existingUserEmail.flat().length > 0) {
    res
      .status(400)
      .json({ message: "Email is associated with an existing account" });
    return;
  }

  const hashedPassword = await new Argon2id().hash(password);

  try {
    type NewUser = typeof users.$inferInsert;
    const insertUser = async (user: NewUser) => {
      return db.insert(users).values(user);
    };
    const newUser: NewUser = {
      id: generateId(32),
      email,
      firstname,
      username,
      password: hashedPassword,
    };
    await insertUser(newUser);

    const session = await lucia.createSession(newUser.id!, {});
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
