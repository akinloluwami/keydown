import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";
import useSWR from "swr";

const DomainSettings = () => {
  const { data, isLoading } = useSWR("/api/settings/domain", fetcher);

  const [domain, setDomain] = useState(data?.domain);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (data) {
      setDomain(data.domain);
    }
  }, [data]);

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
              "/api/settings/domain",
              Object.fromEntries(
                new FormData(e.target as HTMLFormElement).entries()
              )
            );
            toast.success("Domain setting updated");
          } catch (error: any) {
            toast.error(error.response.data.message || "Something went wrong");
          } finally {
            setLoading(false);
          }
        }}
      >
        <div className="">
          <p className="text-lg mb-2">Custom domain</p>
          <input
            type="text"
            className="bg-transparent w-full border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="e.g blog.akinkunmi.com, akinkunmi.blog"
            defaultValue={data?.domain}
            name="customDomain"
            onChange={(e) => setDomain(e.target.value)}
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.toLowerCase();
            }}
          />
          <p className="font-normal mt-1 text-that-grey-1">
            Don’t add “www.” or “http://”
          </p>
        </div>

        {domain && (
          <div className="">
            <p className="font-normal mb-1 text-that-grey-1">
              Please point{" "}
              <span className="font-semibold">{domain || data?.domain}</span> to
              Keydown by configuring the following CNAME records.
            </p>
            <div className="w-full border border-dashed border-that-grey pl-3 py-3 placeholder:text-that-grey font-semibold flex items-center gap-x-10">
              <div className="">
                <p className="text-sm text-that-grey-1">Record Type</p>
                <p>CNAME</p>
              </div>
              <div className="">
                <p className="text-sm text-that-grey-1">Host</p>
                <p>{domain || data?.domain}</p>
              </div>
              <div className="">
                <p className="text-sm text-that-grey-1">Value</p>
                <p>{data?.username}.keydown.co</p>
              </div>
            </div>
          </div>
        )}

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

export default DomainSettings;
