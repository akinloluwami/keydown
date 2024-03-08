import { db, posts, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { randomBytes } from "crypto";
import { eq } from "drizzle-orm";
import { generateId } from "lucia";
import { NextApiRequest, NextApiResponse } from "next";
import { isURL } from "validator";

const generateSlug = (str: string) => {
  const slug = str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, "")
    .trim()
    .replace(/\s+/g, "-");
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("-")
    .toLowerCase();
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

  let slug = generateSlug(title);

  const existingPost = await db
    .select({ slug: posts.slug })
    .from(posts)
    .where(eq(posts.slug, slug));

  if (existingPost.length > 0) {
    slug = `${slug}-${randomBytes(2).toString("hex")}`;
  }

  try {
    await db.insert(posts).values({
      id: generateId(32),
      userId: user.id,
      title,
      slug,
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
