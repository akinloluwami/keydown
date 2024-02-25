import { db, users } from "@/lib/db";
import { validateRequest } from "@/utils/validateRequest";
import { eq } from "drizzle-orm";
import { NextApiRequest, NextApiResponse } from "next";
import { isURL, isLength } from "validator";

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

    if (firstname && !isLength(firstname, { min: 3, max: 50 })) {
      res.status(400).json({
        message: "Firstname must be between 3 and 50 characters",
      });
      return;
    }

    if (website && !isURL(website)) {
      res.status(400).json({
        message: "Website must be a valid URL",
      });
      return;
    }

    if (twitter && !twitter.includes("@")) {
      res.status(400).json({
        message: "Twitter handle must start with @",
      });
      return;
    }

    if (instagram && !instagram.includes("@")) {
      res.status(400).json({
        message: "Instagram handle must start with @",
      });
      return;
    }

    if (github && !isURL(github) && !github.includes("github.com")) {
      res.status(400).json({
        message: "Invalid Github URL",
      });
      return;
    }

    if (threads && !threads.includes("@")) {
      res.status(400).json({
        message: "Threads handle must start with @",
      });
      return;
    }

    try {
      await db
        .update(users)
        .set({
          firstname: firstname,
          website: website.toLowerCase(),
          twitter: twitter.toLowerCase(),
          instagram: instagram.toLowerCase(),
          threads: threads.toLowerCase(),
          github: github.toLowerCase(),
          updatedAt: new Date(),
        })
        .where(eq(users.id, user.id));

      return res.status(200).json({
        message: "Profile updated",
      });
    } catch (error) {
      if (error instanceof Error) console.log(error.message);

      return res.status(500).json({
        message: "Something went wrong",
      });
    }
  }
};

export default handler;
