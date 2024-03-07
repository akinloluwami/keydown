import { Editor } from "@/components/Editor";
import DashboardLayout from "@/layouts/Dashboard";
import { LuPlus } from "react-icons/lu";

const Write = () => {
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
        <button className="text-left text-that-grey-1 font-medium hover:bg-white/20 transition-colors px-1 w-fit flex items-center gap-x-2">
          <LuPlus /> Add cover image
        </button>
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
