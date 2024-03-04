import { db, posts, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { isURL } from "validator";

const generateSlug = (str: string) => {
  return str.toLowerCase().replace(" ", "-");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST") {
    res.status(405).end();
    return;
  }

  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }

  const { title, content, coverImage, isDraft } = req.body();

  if (!title) {
    res.status(400).json({ message: "Post title is required" });
    return;
  }

  try {
    await db.insert(posts).values({
      title,
      content,
      slug: generateSlug(title),
    });
  } catch (error) {}
};
