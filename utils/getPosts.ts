import { db, posts } from "@/lib/db";
import { and, desc, eq } from "drizzle-orm";
import { getUser } from "./getUser";

// interface Props {
//   title: string;
//   slug: string;
//   content: string;
//   coverImage: string;
//   publishedDate: string;
// }

export const getPosts = async (username: string) => {
  const user = await getUser(username);

  const _posts = await db
    .select({
      title: posts.title,
      slug: posts.slug,
      content: posts.content,
      coverImage: posts.coverImage,
      publishedDate: posts.publishDate,
    })
    .from(posts)
    .where(and(eq(posts.userId, user?.id!), eq(posts.status, "published")))
    .orderBy(desc(posts.publishDate));

  if (!_posts || _posts.length === 0) {
    return [];
  }

  return _posts;
};
