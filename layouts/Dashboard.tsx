import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, ReactNode } from "react";

const DashboardLayout = ({ children }: { children: ReactNode }) => {
  const pages = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Write", route: "/write" },
    { name: "Settings", route: "/settings" },
  ];

  const router = useRouter();

  return (
    <div className="flex">
      <div className="flex flex-col text-xl gap-y-7 px-20 py-5 border-r border-dashed border-that-grey w-1/4 h-screen fixed">
        <h3 className="font-bold text-2xl">keydown</h3>
        <div className="flex flex-col text-xl gap-y-12 mt-10">
          {pages.map((page, i) => (
            <Link href={page.route} key={i} className="w-fit">
              {router.pathname.split("/")[1] ===
                page.route.replace("/", "") && (
                <span className="mr-2">&gt;</span>
              )}
              {page.name}
            </Link>
          ))}
          <form
            action="/api/auth/logout"
            method="POST"
            onSubmit={async (e: FormEvent<HTMLFormElement>) => {
              e.preventDefault();
              const formElement = e.target as HTMLFormElement;
              await fetch(formElement.action, {
                method: formElement.method,
              });
              router.push("/login");
            }}
          >
            <button className="text-left w-fit">Logout</button>
          </form>
        </div>
      </div>
      <div className="pt-5 pb-24 px-20 w-full ml-[25%]">{children}</div>
    </div>
  );
};

export default DashboardLayout;
