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
          firstname: users.firstname,
          website: users.website,
          twitter: users.twitter,
          instagram: users.instagram,
          threads: users.threads,
          github: users.github,
        })
        .from(users)
    ).flat()[0];

    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const { firstname, website, twitter, instagram, threads, github } =
      req.body;

    await db
      .update(users)
      .set({
        firstname: firstname,
        website: website,
        twitter: twitter,
        instagram: instagram,
        threads: threads,
        github: github,
        updatedAt: new Date(),
      })
      .where(eq(users.id, user.id));

    return res.status(200).json({
      message: "Blog settings updated successfully",
    });
  }
};

export default handler;
