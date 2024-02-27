import DashboardLayout from "@/layouts/Dashboard";
import React from "react";

const Write = () => {
  return (
    <DashboardLayout title="Write">
      <div className="flex mt-5">
        <div className="flex justify-between items-center w-full">
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-3xl p-3 placeholder:text-that-grey font-semibold w-[50%]"
            placeholder="Post title here..."
          />
          <div className="flex items-center gap-x-5">
            <button className="text-that-grey-1 font-semibold text-xl">
              Save Draft
            </button>
            <button className="bg-white text-black py-3 font-semibold text-xl flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity px-10">
              Publish
            </button>
          </div>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Write;
