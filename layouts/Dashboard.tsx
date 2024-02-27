import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { FormEvent, ReactNode } from "react";
import { CgSpinnerTwo } from "react-icons/cg";
import { FaCaretRight } from "react-icons/fa";

const DashboardLayout = ({
  children,
  loading,
  title,
}: {
  children: ReactNode;
  loading?: boolean;
  title: string;
}) => {
  const pages = [
    { name: "Dashboard", route: "/dashboard" },
    { name: "Write", route: "/write" },
    { name: "Settings", route: "/settings" },
  ];

  const router = useRouter();

  return (
    <>
      <Head>
        <title>{title}</title>
      </Head>
      <div className="flex">
        <div className="flex flex-col text-xl gap-y-7 px-20 py-5 border-r border-dashed border-that-grey w-1/4 h-screen fixed">
          <h3 className="font-bold text-2xl">keydown</h3>
          <div className="flex flex-col text-xl gap-y-12 mt-10">
            {pages.map((page, i) => (
              <Link
                href={page.route}
                key={i}
                className="w-fit flex items-center"
              >
                {router.pathname.split("/")[1] ===
                  page.route.replace("/", "") && (
                  <span className="mr-2">
                    <FaCaretRight />
                  </span>
                )}
                {page.name}
              </Link>
            ))}
            <form
              action="/api/logout"
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
        <div className="pt-5 pb-24 px-20 w-full ml-[25%]">
          {loading ? (
            <div className="flex justify-center items-center h-[calc(100vh-150px)]">
              <CgSpinnerTwo className="animate-spin text-that-grey" size={50} />
            </div>
          ) : (
            children
          )}
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
