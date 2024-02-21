import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import React from "react";

const PasswordSettings = () => {
  return (
    <DashboardLayout>
      <SettingsLinks />
      <div className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10">
        <div className="">
          <p className="text-lg mb-2">Current password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder=""
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">New password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder=""
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">Repeat new password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder=""
          />
        </div>
        <button className="bg-white text-black py-3 font-semibold text-xl w-fit px-10">
          Update password
        </button>
      </div>
    </DashboardLayout>
  );
};

export default PasswordSettings;
