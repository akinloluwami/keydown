import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { isURL } from "validator";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== "GET" && req.method !== "PUT") {
    res.status(405).end();
    return;
  }

  const { user } = await validateRequest(req, res);
  if (!user) {
    return res.status(401).end();
  }

  if (req.method === "GET") {
    const data = (
      await db
        .select({
          firstname: users.firstname,
          username: users.username,
          domain: users.customDomain,
        })
        .from(users)
    ).flat()[0];

    return res.status(200).json(data);
  }

  if (req.method === "PUT") {
    const { customDomain } = req.body;

    if (customDomain && !isURL(customDomain)) {
      res.status(400).json({
        message: "Invalid domain",
      });
      return;
    }

    if (customDomain && customDomain.includes("https://" || "http://")) {
      res.status(400).json({
        message: "Domain should not contain 'https://' or 'http://'",
      });
      return;
    }

    try {
      await db.update(users).set({ customDomain }).where(eq(users.id, user.id));

      return res.status(200).json({ message: "Domain settings updated" });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
    }
  }
};
export default handler;
