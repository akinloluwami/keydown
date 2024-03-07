import { Editor } from "@/components/Editor";
import DashboardLayout from "@/layouts/Dashboard";
import { uploadfly } from "@/utils/uploadfly";
import { useRef, useState } from "react";
import { CgSpinnerAlt } from "react-icons/cg";
import { LuPlus, LuRepeat2, LuTrash, LuTrash2 } from "react-icons/lu";
import { toast } from "sonner";

const Write = () => {
  const [coverImage, setCoverImage] = useState("");
  const [isUploadingCoverImage, setIsUploadingCoverImage] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);

  return (
    <DashboardLayout title="Write">
      <div className="flex mt-5 flex-col gap-y-5">
        <div className="flex items-center gap-x-5 justify-end">
          <button className="text-that-grey-1 font-semibold text-xl">
            Save Draft
          </button>
          <button className="bg-white text-black py-3 font-semibold text-xl flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity px-10">
            Publish
          </button>
        </div>
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

        <input
          type="text"
          className="bg-transparent border border-dashed border-that-grey text-2xl p-3 placeholder:text-that-grey font-semibold w-full"
          placeholder="Post title here..."
        />

        <Editor />
      </div>
    </DashboardLayout>
  );
};

export default Write;
