import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import React from "react";

const Settings = () => {
  return (
    <DashboardLayout>
      <SettingsLinks />
      <div className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10">
        <div className="">
          <p className="text-lg mb-2">Blog name</p>
          <div className="flex items-center border border-dashed border-that-grey text-xl pl-3 py-3">
            <input
              type="text"
              className="bg-transparent outline-none text-right  placeholder:text-that-grey font-semibold"
              placeholder="username"
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
          />
          <p className="font-normal mt-1 text-that-grey-1">
            The blog title will replace your name on blog pages.
          </p>
        </div>
        <div className="">
          <p className="text-lg mb-2">Tagline</p>
          <textarea
            className="w-full bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="tagline"
          />
          <p className="font-normal mt-1 text-that-grey-1">About your blog.</p>
        </div>
        <button className="bg-white text-black py-3 font-semibold text-xl w-fit px-10">
          save changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default Settings;
