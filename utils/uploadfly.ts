import { CreateUploadflyClient } from "@uploadfly/js";

export const uploadfly = new CreateUploadflyClient(
  process.env.NEXT_PUBLIC_UPLOADFLY_API_KEY!
);
