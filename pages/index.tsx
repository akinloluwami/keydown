import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const Home = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center gap-y-10">
        <h1 className="text-center font-bold text-7xl max-w-[500px] mx-auto">
          What will you write today?
        </h1>
        <div className="flex items-center gap-x-4 text-xl font-medium">
          <Link
            href="/signup"
            className="text-black bg-white px-10 py-2 flex items-center justify-center"
          >
            Signup
          </Link>
          <Link href="/login" className="">
            Login
          </Link>
        </div>
      </div>
      <div className="border-t border-dashed border-that-grey px-10 py-5">
        <Link href="/cool" className="text-that-grey font-semibold">
          cool
        </Link>
      </div>
    </div>
  );
};

export default Home;
