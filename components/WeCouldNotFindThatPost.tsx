import Link from "next/link";
import React from "react";
import { IoChevronBack } from "react-icons/io5";
import { TbMoodSadDizzy } from "react-icons/tb";

const WeCouldNotFindThatPost = () => {
  return (
    <div className="flex items-center justify-center flex-col min-h-screen gap-y-5">
      <TbMoodSadDizzy size={100} color="#666" />
      <h3 className="text-2xl font-medium text-center">
        Sorry, we couldn't find that post.
      </h3>
      <Link
        href="/dashboard"
        className="text-xl text-that-grey-1 font-medium hover:bg-white/20 transition-colors px-1 w-fit flex items-center gap-x-2"
      >
        <IoChevronBack /> Posts
      </Link>
    </div>
  );
};

export default WeCouldNotFindThatPost;
