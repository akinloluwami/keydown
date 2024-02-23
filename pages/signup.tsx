import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { CgSpinner } from "react-icons/cg";
import { toast } from "sonner";

const Signup = () => {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="h-screen flex flex-col justify-between">
      <Header />
      <div className="flex flex-col items-center justify-center gap-y-2">
        <h1 className="text-6xl font-bold ">Signup</h1>
        <form
          className="flex flex-col gap-y-4 mt-10 w-full max-w-[500px]"
          action="/api/signup"
          method="POST"
          onSubmit={async (e) => {
            setIsLoading(true);
            e.preventDefault();
            const formElement = e.target as HTMLFormElement;
            const response = await fetch(formElement.action, {
              method: formElement.method,
              body: JSON.stringify(
                Object.fromEntries(new FormData(formElement).entries())
              ),
              headers: {
                "Content-Type": "application/json",
              },
            });
            setIsLoading(false);
            if (response.ok) {
              router.push("/dashboard");
              toast.success("Signup successful");
            } else {
              const data = await response.json();
              toast.error(data.message);
            }
          }}
        >
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="Email"
            name="email"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value = input.value.toLowerCase();
            }}
          />
          <input
            type="text"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="First name"
            name="firstname"
            onInput={(e) => {
              const input = e.target as HTMLInputElement;
              input.value =
                input.value.charAt(0).toUpperCase() +
                input.value.slice(1).toLowerCase();
            }}
          />
          <input
            type="password"
            className="bg-transparent border border-dashed border-that-grey text-xl pl-3 py-3 placeholder:text-that-grey font-semibold"
            placeholder="Password"
            name="password"
          />
          <div className="flex items-center border border-dashed border-that-grey text-xl pl-3 py-3">
            <input
              type="text"
              className="bg-transparent outline-none text-right  placeholder:text-that-grey font-semibold"
              placeholder="username"
              name="username"
              onInput={(e) => {
                const input = e.target as HTMLInputElement;
                input.value = input.value.toLowerCase();
              }}
            />
            <p className="text-xl font-semibold">.keydown.co</p>
          </div>
          <button
            className="bg-white text-black py-3 font-semibold text-xl flex items-center justify-center disabled:opacity-60 disabled:cursor-not-allowed transition-opacity"
            disabled={isLoading}
          >
            {isLoading ? (
              <CgSpinner className="animate-spin" size={28} />
            ) : (
              "Signup"
            )}
          </button>
        </form>
      </div>
      <div className=""></div>
    </div>
  );
};

export default Signup;
