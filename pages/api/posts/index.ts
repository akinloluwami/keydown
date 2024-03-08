import { db, posts } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { randomBytes } from "crypto";
import { and, eq, not } from "drizzle-orm";
import { generateId } from "lucia";
import { NextApiRequest, NextApiResponse } from "next";

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

  const { title, content, coverImage, isDraft, postId } = req.body;

  if (!content) {
    res.status(400).json({ message: "Post content is required" });
  }

  let slug = generateSlug(title);

  if (postId) {
    const postExist = await db
      .select({ id: posts.id })
      .from(posts)
      .where(and(eq(posts.id, postId), eq(posts.userId, user.id)));

    if (postExist.length === 0) {
      return res.status(404).json({ message: "Post not found" });
    }
  }

  const existingPost = await db
    .select({ slug: posts.slug, publishDate: posts.publishDate })
    .from(posts)
    .where(and(eq(posts.slug, slug), not(eq(posts.id, postId))));

  if (existingPost.length > 0) {
    slug = `${slug}-${randomBytes(2).toString("hex")}`;
  }

  try {
    if (postId) {
      const post = await db
        .update(posts)
        .set({
          content,
          title: title,
          slug,
          coverImage,
          isDraft,
          updatedAt: new Date(),
          publishDate: isDraft ? null : new Date(),
        })
        .where(eq(posts.id, postId))
        .returning({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          isDraft: posts.isDraft,
        });
      res
        .status(200)
        .json({ message: "Post updated successfully", post: post });
    } else {
      const post = await db
        .insert(posts)
        .values({
          id: generateId(32),
          userId: user.id,
          title: title || "[Untitled]",
          slug,
          content,
          coverImage,
          isDraft,
          updatedAt: new Date(),
          publishDate: null,
        })
        .returning({
          id: posts.id,
          title: posts.title,
          slug: posts.slug,
          isDraft: posts.isDraft,
        });
      res
        .status(201)
        .json({ message: "Post created successfully", post: post[0] });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

export default handler;
