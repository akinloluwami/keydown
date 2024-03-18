import DashboardLayout from "@/layouts/Dashboard";
import { PiCookingPot } from "react-icons/pi";
const Analytics = () => {
  return (
    <DashboardLayout title="Analytics">
      <div className="flex h-[calc(100vh-200px)] text-that-grey-1 items-center flex-col justify-center">
        <PiCookingPot size={100} />
        <h2 className="font-bold text-3xl">Coming soon.</h2>
      </div>
    </DashboardLayout>
  );
};

export default Analytics;
