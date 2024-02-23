import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }
  if (req.method === "GET") {
    const data = (
      await db
        .select({
          subdomain: users.username,
          title: users.blogTitle,
          description: users.blogDescription,
        })
        .from(users)
    ).flat()[0];

    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const { subdomain, title, description } = req.body;

    await db
      .update(users)
      .set({
        username: subdomain,
        blogTitle: title,
        blogDescription: description,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return res.status(200).end();
  }
};

export default handler;
