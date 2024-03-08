import { db, posts } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { and, eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET") {
    res.status(405).end();
    return;
  }

  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }

  const { id } = req.query as { id: string };

  if (!id) {
    return res.status(400).end();
  }

  const post = await db
    .select()
    .from(posts)
    .where(and(eq(posts.userId, user.id), eq(posts.id, id)));

  if (!post) {
    return res.status(404).end();
  }

  return res.status(200).json(post);
};

export default handler;
