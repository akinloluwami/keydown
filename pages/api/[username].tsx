import { getPosts } from "@/utils/getPosts";
import { getUser } from "@/utils/getUser";
import type { NextApiRequest, NextApiResponse } from "next";

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "GET") {
    const username = req.query.username as string;

    const user = await getUser(username);

    if (!user) {
      res.status(404).end();
      return;
    }

    const posts = await getPosts(username);

    res.send({ user, posts });
  } else {
    res.status(405).end();
  }
};

export default handler;
