import { Editor } from "@/components/Editor";
import DashboardLayout from "@/layouts/Dashboard";
import { useEditorContent } from "@/store/useEditorContent";
import { uploadfly } from "@/utils/uploadfly";
import axios from "axios";
import Link from "next/link";
import { useRef, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { LuPlus, LuRepeat2, LuTrash } from "react-icons/lu";
import { toast } from "sonner";
import { IoChevronBack } from "react-icons/io5";

const Write = () => {
  const [coverImage, setCoverImage] = useState("");
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);
  const [title, setTitle] = useState("");
  const { content } = useEditorContent();
  const [isPublishing, setIsPublishing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isPublished, setIsPublished] = useState(false);

  const createPost = async ({ isDraft }: { isDraft?: boolean }) => {
    if (!title) {
      toast.error("Please enter a title");
      return;
    }

    if (!content) {
      toast.error("Please enter some content");
      return;
    }

    setIsPublishing(true);

    try {
      await axios.post("/api/posts/new", {
        title,
        coverImage,
        content,
        isDraft,
      });
      toast.success("Post published");
      setIsPublished(true);
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Something went wrong");
    } finally {
      setIsPublishing(false);
    }
  };

  const publishPost = async () => {
    await createPost({ isDraft: false });
  };

  return (
    <div className="px-5">
      <div className="flex mt-5 flex-col gap-y-5">
        <div className="flex items-center gap-x-5 justify-between lg:px-14 py-3">
          <div className="flex items-center gap-x-5">
            <Link
              href="/dashboard"
              className="text-left text-that-grey-1 font-medium hover:bg-white/20 transition-colors px-1 w-fit flex items-center gap-x-2"
            >
              <IoChevronBack /> Posts
            </Link>
            <p className="text-that-grey-1">New</p>
          </div>
          <div className="flex items-center gap-x-5">
            <button className="text-that-grey-1 font-semibold">
              {isPublished ? "Unpublish" : "Save draft"}
            </button>
            <button
              className="bg-white text-black py-2 font-semibold flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity px-10 gap-x-3"
              disabled={isPublishing}
              onClick={publishPost}
            >
              {isPublished ? (
                <>Update</>
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
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />

          <Editor />
        </div>
      </div>
    </div>
  );
};

export default Write;
