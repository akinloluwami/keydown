import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
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
};

export default handler;
