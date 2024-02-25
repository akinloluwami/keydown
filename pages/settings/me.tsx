import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { SiGithub, SiInstagram, SiThreads, SiTwitter } from "react-icons/si";
import { toast } from "sonner";
import useSWR from "swr";

const MeSettings = () => {
  const { data: user, isLoading } = useSWR("/api/settings/me", fetcher);

  const [loading, setLoading] = useState(false);

  const exampleUsername = `e.g @${user?.firstname.toLowerCase()}`;
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
              "/api/settings/me",
              Object.fromEntries(
                new FormData(e.target as HTMLFormElement).entries()
              )
            );
            toast.success("Profile setting updated");
          } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="">
          <p className="text-lg mb-2">First name</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={user?.firstname}
            defaultValue={user?.firstname}
            name="firstname"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">Website</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={`e.g ${user?.firstname.toLowerCase()}.com`}
            defaultValue={user?.website}
            name="website"
          />
          <p className="font-normal mt-1 text-that-grey-1">
            If you have a personal site on the web other than your Keydown blog,
            we’ll link to it.
          </p>
        </div>

        <div className="">
          <p className="text-lg mb-2 flex items-center gap-x-2">
            Twitter
            <SiTwitter className="text-that-grey-1" />
          </p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={exampleUsername}
            defaultValue={user?.twitter}
            name="twitter"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2 flex items-center gap-x-2">
            Instagram
            <SiInstagram className="text-that-grey-1" />
          </p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={exampleUsername}
            defaultValue={user?.instagram}
            name="instagram"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2 flex items-center gap-x-2">
            Threads
            <SiThreads className="text-that-grey-1" />
          </p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={exampleUsername}
            defaultValue={user?.threads}
            name="threads"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2 flex items-center gap-x-2">
            GitHub URL
            <SiGithub className="text-that-grey-1" />
          </p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder={`e.g github.com/${user?.firstname.toLowerCase()}`}
            defaultValue={user?.github}
            name="github"
          />
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

export default MeSettings;
