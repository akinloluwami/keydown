import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import useSWR from "swr";

const Settings = () => {
  const { data, isLoading } = useSWR("/api/settings", fetcher);

  const [loading, setLoading] = useState(false);
  return (
    <DashboardLayout>
      <SettingsLinks />
      <form
        className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10"
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          try {
            await axios.put(
              "/api/settings",
              Object.fromEntries(
                new FormData(e.target as HTMLFormElement).entries()
              )
            );
            toast.success("Blog setting updated");
          } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="">
          <p className="text-lg mb-2">Blog subdomain</p>
          <div className="flex items-center border border-dashed border-that-grey text-xl pl-3 py-3">
            <input
              type="text"
              className="bg-transparent outline-none text-right  placeholder:text-that-grey font-semibold"
              placeholder="username"
              defaultValue={data?.subdomain}
              name="subdomain"
            />
            <p className="text-xl font-semibold text-that-grey-1">
              .keydown.co
            </p>
          </div>
          <p className="font-normal mt-1 text-that-grey-1">
            Your blogname is your Keydown subdomain. You can also set a custom
            domain in the domain settings.
          </p>
        </div>
        <div className="">
          <p className="text-lg mb-2">Blog title</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="blog title"
            defaultValue={data?.title}
            name="title"
          />
          <p className="font-normal mt-1 text-that-grey-1">
            The blog title will replace your name on blog pages.
          </p>
        </div>
        <div className="">
          <p className="text-lg mb-2">Description</p>
          <textarea
            className="w-full bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="What is your blog about?"
            defaultValue={data?.description}
            name="description"
          />
          <p className="font-normal mt-1 text-that-grey-1">About your blog.</p>
        </div>
        <button className="bg-white text-black py-3 font-semibold text-xl w-full max-w-[200px] flex items-center justify-center">
          {loading ? (
            <CgSpinner className="animate-spin" size={28} />
          ) : (
            "Save changes"
          )}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default Settings;
