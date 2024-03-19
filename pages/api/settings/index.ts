import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import validator from "validator";

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
        .where(eq(users.id, user.id))
    ).flat()[0];

    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const { subdomain, title, description } = req.body;

    if (!subdomain || !title) {
      res.status(400).json({
        message: "Username and blog title are required",
      });
      return;
    }

    if (subdomain.length < 3) {
      res.status(400).json({
        message: "Username must be at least 3 characters long",
      });
      return;
    }

    if (validator.isNumeric(subdomain)) {
      res.status(400).json({
        message:
          "Username must start be alphanumeric when starting with a number",
      });
      return;
    }

    const isSubdomainTaken = await db
      .select()
      .from(users)
      .where(eq(users.username, subdomain))
      .limit(1);

    if (isSubdomainTaken.length > 0) {
      res.status(400).json({
        message: "Username is already taken",
      });
      return;
    }

    await db
      .update(users)
      .set({
        username: subdomain,
        blogTitle: title,
        blogDescription: description,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return res.status(200).json({
      message: "Blog settings updated successfully",
    });
  }
};

export default handler;
