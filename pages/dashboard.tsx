import DashboardLayout from "@/layouts/Dashboard";
import { fetcher } from "@/lib/fetcher";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { RiEditBoxLine } from "react-icons/ri";
import useSWR from "swr";

const Dashboard = () => {
  interface PostProps {
    id: string;
    title: string;
    status: "draft" | "published";
    slug: string;
    createdAt: string;
    updatedAt: string;
  }

  const { data: posts, isLoading } = useSWR<PostProps[]>("/api/posts", fetcher);

  const status: {
    [key: string]: {
      class: string;
      label: string;
    };
  } = {
    draft: {
      class: "border-orange-200 text-orange-300",
      label: "Draft",
    },
    published: {
      class: "border-purple-200 text-purple-300",
      label: "Published",
    },
  };

  return (
    <DashboardLayout title="Dashboard" loading={isLoading}>
      <div className="">
        <div className="flex items-center justify-between mb-7">
          <h2 className="text-3xl font-medium mb-4">Posts</h2>
          <Link
            href="/write"
            className="bg-white text-black py-2 font-semibold flex px-10"
          >
            Create Post
          </Link>
        </div>
        <>
          {posts?.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-[60vh]">
              <h1 className="text-center font-bold text-7xl max-w-[500px] mx-auto">
                What will you write today?
              </h1>
              <Link
                href="/write"
                className="text-black bg-white font-medium mt-7 px-10 py-2 flex items-center justify-center"
              >
                Create first post
              </Link>
            </div>
          ) : (
            <div className="flex gap-y-5 flex-col">
              {posts?.map((post) => (
                <Link
                  href={`/write?id=${post.id}`}
                  key={post.id}
                  className="flex items-center justify-between border border-dashed border-that-grey py-2 px-4"
                >
                  <div className="flex flex-col gap-y-2">
                    <h2 className="font-medium text-xl">{post.title}</h2>
                    <p
                      className={`text-sm ${
                        status[post.status].class
                      } w-fit text-xs uppercase border border-dashed px-5 py-1`}
                    >
                      {post.status}
                    </p>
                  </div>
                  <RiEditBoxLine size={25} />
                </Link>
              ))}
            </div>
          )}
        </>
      </div>
    </DashboardLayout>
  );
};

export default Dashboard;
