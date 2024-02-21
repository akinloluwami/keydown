import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import React from "react";
import { SiGithub, SiInstagram, SiThreads, SiTwitter } from "react-icons/si";

const MeSettings = () => {
  return (
    <DashboardLayout>
      <SettingsLinks />
      <div className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10">
        <div className="">
          <p className="text-lg mb-2">First name</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="Blog title"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">Website</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="e.g akinkunmi.com"
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
            placeholder="e.g @akinkunmi"
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
            placeholder="e.g @akinkunmi"
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
            placeholder="e.g @akinkunmi"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2 flex items-center gap-x-2">
            GitHub
            <SiGithub className="text-that-grey-1" />
          </p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="e.g @akinkunmi"
          />
        </div>

        <button className="bg-white text-black py-3 font-semibold text-xl w-fit px-10">
          save changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default MeSettings;
