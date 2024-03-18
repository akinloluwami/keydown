import { db, posts } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { randomBytes } from "crypto";
import { and, desc, eq, not } from "drizzle-orm";
import { generateId } from "lucia";
import { NextApiRequest, NextApiResponse } from "next";

const generateSlug = (str: string) => {
  return str
    .toLowerCase()
    .replace(/[^a-z0-9\s-]+/g, "")
    .trim()
    .replace(/\s+/g, "-");
};

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "POST" && req.method !== "GET")
    return res.status(405).end();

  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const _posts = await db
      .select({
        id: posts.id,
        title: posts.title,
        slug: posts.slug,
        status: posts.status,
        createdAt: posts.createdAt,
      })
      .from(posts)
      .where(eq(posts.userId, user.id))
      .orderBy(desc(posts.createdAt));

    res.status(200).json(_posts);
  }

  if (req.method === "POST") {
    const { title, content, coverImage, status, postId } = req.body as {
      title: string;
      content: string;
      coverImage: string;
      status: "draft" | "published";
      postId: string;
    };

    if (status === "published" && !content) {
      return res.status(400).json({ message: "Post content is required" });
    }

    if (postId) {
      const postExist = await db
        .select({ id: posts.id })
        .from(posts)
        .where(and(eq(posts.id, postId), eq(posts.userId, user.id)));

      if (postExist.length === 0) {
        return res.status(404).json({ message: "Post not found" });
      }
    }

    let slug = generateSlug(title);

    const findSlug = await db
      .select({ slug: posts.slug })
      .from(posts)
      .where(and(eq(posts.slug, slug), not(eq(posts.id, postId))));

    if (findSlug.length > 0) {
      slug = `${slug}-${randomBytes(2).toString("hex")}`;
    }

    try {
      if (postId) {
        const post = await db
          .update(posts)
          .set({
            content,
            title,
            slug,
            coverImage,
            updatedAt: new Date(),
            publishDate: status === "published" ? new Date() : null,
            status,
          })
          .where(eq(posts.id, postId))
          .returning({
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
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
            updatedAt: new Date(),
            publishDate: null,
          })
          .returning({
            id: posts.id,
            title: posts.title,
            slug: posts.slug,
          });
        res
          .status(201)
          .json({ message: "Post created successfully", post: post[0] });
      }
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};

export default handler;
