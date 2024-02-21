import Header from "@/components/Header";
import Link from "next/link";
import React from "react";

const Signup = () => {
  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-6xl font-bold ">Signup</h1>
        <form className="flex flex-col gap-y-4 mt-10 w-full max-w-[500px]">
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="Email"
          />
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="First name"
          />
          <input
            type="password"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="Password"
          />
          <div className="flex items-center border border-dashed border-that-grey text-xl pl-3 py-3">
            <input
              type="text"
              className="bg-transparent outline-none text-right  placeholder:text-that-grey font-semibold"
              placeholder="username"
            />
            <p className="text-xl font-semibold">.keydown.co</p>
          </div>
          <button className="bg-white text-black py-3 font-semibold text-xl">
            Signup
          </button>
        </form>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Signup;
