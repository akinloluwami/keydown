import { Editor } from "@/components/Editor";
import { useEditorContent } from "@/store/useEditorContent";
import { uploadfly } from "@/utils/uploadfly";
import axios from "axios";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { LuPlus, LuRepeat2, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import { IoChevronBack } from "react-icons/io5";
import { useRouter } from "next/router";

const Write = () => {
  const [coverImage, setCoverImage] = useState("");
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [title, setTitle] = useState("");
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPublished, setIsPublished] = useState(false);
  const [postId, setPostId] = useState("");
  const [isSavingDraft, setIsSavingDraft] = useState(false);

  const router = useRouter();

  const { content, setContent } = useEditorContent();

  const createPost = async ({
    content,
    _coverImage,
    status,
  }: {
    content?: string;
    _coverImage?: string;
    status?: "draft" | "published";
  }) => {
    if (!isPublished) {
      setIsSavingDraft(true);
    }

    try {
      const { data } = await axios.post("/api/posts", {
        title,
        coverImage: _coverImage || coverImage,
        content,
        postId,
        status,
      });

      if (!postId) {
        setPostId(data.post.id);
        router.push(`/write?id=${data.post.id}`);
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
      setIsSavingDraft(false);
    }
  };

  const publishPost = async () => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!content || content === "<p></p>") {
      toast.error("Please enter some content");
      return;
    }
    try {
      setIsPublishing(true);
      await createPost({ content, status: "published" });
      toast.success(isPublished ? "Post updated" : "Post published");
      setIsPublished(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    }
  };

  const fetchPost = async (id: string) => {
    try {
      const { data } = await axios.get(`/api/posts/${id}`);
      setTitle(data.title);
      setContent(data.content);
      setCoverImage(data.coverImage);
      setIsPublished(data.status === "published" ? true : false);
      setPostId(id);
    } catch (error) {
      toast.error("Something went wrong");
    }
  };

  useEffect(() => {
    if (router.query.id) {
      const id = router.query.id as string;
      fetchPost(id);
    }
  }, [router]);

  return (
    <div className="px-5 pb-20">
      <div className="flex mt-5 flex-col gap-y-5">
        <div className="flex items-center gap-x-5 justify-between lg:px-14 py-3 sticky top-0 bg-black/20 backdrop-blur-xl z-10">
          <div className="flex items-center gap-x-5">
            <Link
              href="/dashboard"
              className="text-left text-that-grey-1 font-medium hover:bg-white/20 transition-colors px-1 w-fit flex items-center gap-x-2"
            >
              <IoChevronBack /> Posts
            </Link>
            <p className="text-that-grey-1">
              {!postId && !isPublished && "New"}
              {!isPublished && postId && (
                <>{isSavingDraft ? "Saving draft..." : "Draft"}</>
              )}
              {isPublished && <Link href={`/post/${postId}`}>Published</Link>}
            </p>
          </div>
          <div className="flex items-center gap-x-5">
            <button className="text-that-grey-1 font-semibold">
              {isPublished ? "Unpublish" : "Preview"}
            </button>
            <button
              className="bg-white text-black py-2 font-semibold flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity px-10 gap-x-3"
              disabled={isPublishing}
              onClick={publishPost}
            >
              {isPublished ? (
                <>
                  {isPublishing && <CgSpinnerAlt className="animate-spin" />}
                  {isPublishing ? "Updating..." : "Update"}
                </>
              ) : (
                <>
                  {isPublishing && <CgSpinnerAlt className="animate-spin" />}
                  Publish{isPublishing && "ing..."}
                </>
              )}
            </button>
          </div>
        </div>
        <div className="max-w-4xl w-full mx-auto">
          <div className="mb-2">
            <input
              type="file"
              ref={fileInputRef}
              hidden
              onChange={async (e) => {
                const image = e.target.files?.[0];
                if (!image) return;
                if (image.type.split("/")[0] !== "image") {
                  toast.error("Please select an image");
                  return;
                }
                setIsUploadingCoverImage(true);
                setCoverImage("");
                try {
                  const { data } = await uploadfly.upload(image);
                  setCoverImage(data.url);
                  setIsUploadingCoverImage(false);
                  !isPublished &&
                    createPost({
                      _coverImage: data.url,
                    });
                } catch (error) {
                  toast.error("Something went wrong");
                } finally {
                  setIsUploadingCoverImage(false);
                }
              }}
            />
            {isUploadingCoverImage && (
              <div className="flex items-center gap-x-2">
                <CgSpinnerAlt className="animate-spin text-2xl" /> Uploading...
              </div>
            )}

            {coverImage && (
              <div className="w-full h-fit relative group">
                <div className="absolute right-2 top-2 flex items-center gap-x-3 group-hover:opacity-100 opacity-0 transition-opacity bg-black/20 p-2 rounded-md backdrop-blur-xl">
                  <LuRepeat2
                    size={22}
                    className="cursor-pointer"
                    onClick={() => fileInputRef.current?.click()}
                  />
                  <span className="text-that-grey-1">|</span>
                  <LuTrash
                    size={20}
                    className="cursor-pointer"
                    onClick={() => setCoverImage("")}
                  />
                </div>
                <img src={coverImage} className="w-full h-full object-cover" />
              </div>
            )}
            {!coverImage && !isUploadingCoverImage && (
              <button
                className="text-left text-that-grey-1 font-medium hover:bg-white/20 transition-colors px-1 w-fit flex items-center gap-x-2"
                onClick={() => fileInputRef.current?.click()}
              >
                <LuPlus /> Add cover image
              </button>
            )}
          </div>
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-2xl p-3 placeholder:text-that-grey font-semibold w-full"
            placeholder="Post title here..."
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <Editor
            isPostPublished={isPublished}
            autoSave={(content) => createPost({ content })}
            content={content}
          />
        </div>
      </div>
    </div>
  );
};

export default Write;
