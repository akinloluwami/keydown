import { db, posts, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
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

  const { title, content, coverImage, isDraft } = req.body;

  if (!title) {
    res.status(400).json({ message: "Post title is required" });
    return;
  }

  if (!content) {
    res.status(400).json({ message: "Post content is required" });
  }

  try {
    await db.insert(posts).values({
      id: generateId(32),
      userId: user.id,
      title,
      slug: generateSlug(title),
      content,
      coverImage,
      isDraft,
    });
    res.status(200).json({ message: "Post created successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;
