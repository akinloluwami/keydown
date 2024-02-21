import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import React, { useState } from "react";
import { SiGithub, SiInstagram, SiThreads, SiTwitter } from "react-icons/si";

const DomainSettings = () => {
  const [domain, setDomain] = useState("");
  return (
    <DashboardLayout>
      <SettingsLinks />
      <div className="w-full font-semibold max-w-[500px] mt-20 flex flex-col gap-y-10">
        <div className="">
          <p className="text-lg mb-2">Custom domain</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="e.g blog.akinkunmi.com, akinkunmi.blog"
            onChange={(e) => setDomain(e.target.value.toLowerCase())}
          />
          <p className="font-normal mt-1 text-that-grey-1">
            Don’t add “www.” or “http://”
          </p>
        </div>

        {domain && (
          <div className="">
            <p className="font-normal mb-1 text-that-grey-1">
              Please point <span className="font-semibold">{domain}</span> to
              Keydown by configuring the following CNAME records.
            </p>
            <div className="w-full border border-dashed border-that-grey pl-3 py-3 placeholder:text-that-grey font-semibold flex items-center gap-x-10">
              <div className="">
                <p className="text-sm text-that-grey-1">Record Type</p>
                <p>CNAME</p>
              </div>
              <div className="">
                <p className="text-sm text-that-grey-1">Host</p>
                <p>{domain}</p>
              </div>
              <div className="">
                <p className="text-sm text-that-grey-1">Value</p>
                <p>xing.keydown.co</p>
              </div>
            </div>
          </div>
        )}

        <button className="bg-white text-black py-3 font-semibold text-xl w-fit px-10">
          Save changes
        </button>
      </div>
    </DashboardLayout>
  );
};

export default DomainSettings;
