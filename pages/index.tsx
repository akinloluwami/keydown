import Header from "@/components/Header";
import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import axios from "axios";

interface Post {
  id: number;
  title: string;
  content: string;
}

interface User {
  username: string;
  posts: Post[];
}

interface HomeProps {
  user: User | null;
}

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

export async function getServerSideProps(context: any) {
  const {
    req: { headers },
  } = context;

  console.log("================================================");
  console.log(headers);
  console.log("================================================");

  return { props: { user: null } };

  // if (headers.referer !== "http://keydown.local/") {
  //   const subdomain = headers.referer
  //     .replace(/(https?:\/\/)?(www\.)?/, "")
  //     .replace(/\/$/, "")
  //     .split(".")[0];

  //   if (subdomain !== "www") {
  //     try {
  //       const response = await axios.get(
  //         `http://keydown.local/api/${subdomain}`
  //       );
  //       const userData: User = response.data;

  //       return {
  //         props: { user: userData },
  //       };
  //     } catch (error) {
  //       return {
  //         props: { user: null },
  //       };
  //     }
  //   }
  // } else {
  //   return {
  //     props: { user: null },
  //   };
  // }
}
