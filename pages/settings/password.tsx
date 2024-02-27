import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import axios from "axios";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

const PasswordSettings = () => {
  const [loading, setLoading] = useState(false);

  return (
    <DashboardLayout title="Password Settings">
      <SettingsLinks />
      <form
        className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10"
        onSubmit={async (e) => {
          setLoading(true);
          e.preventDefault();
          try {
            await axios.put(
              "/api/settings/password",
              Object.fromEntries(
                new FormData(e.target as HTMLFormElement).entries()
              )
            );
            toast.success("Password updated successfully");
          } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="">
          <p className="text-lg mb-2">Current password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="********************"
            name="password"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">New password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="********************"
            name="newPassword"
          />
        </div>
        <div className="">
          <p className="text-lg mb-2">Repeat new password</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="********************"
            name="confirmPassword"
          />
        </div>
        <button className="bg-white text-black py-3 font-semibold text-xl w-full max-w-[200px] flex items-center justify-center">
          {loading ? (
            <CgSpinner className="animate-spin" size={28} />
          ) : (
            "Change password"
          )}
        </button>
      </form>
    </DashboardLayout>
  );
};

export default PasswordSettings;
