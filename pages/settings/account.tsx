import SettingsLinks from "@/components/SettingsLinks";
import DashboardLayout from "@/layouts/Dashboard";
import React from "react";

const AccountSettings = () => {
  return (
    <DashboardLayout loading={false} title="Account Settings">
      <SettingsLinks />
    </DashboardLayout>
  );
};

export default AccountSettings;
