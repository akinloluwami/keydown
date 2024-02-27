import Link from "next/link";
import { useRouter } from "next/router";
import React from "react";
import { FaCaretRight } from "react-icons/fa";

const SettingsLinks = () => {
  const pages = [
    { name: "Blog", route: "/settings" },
    { name: "Me", route: "/settings/me" },
    { name: "Domain", route: "/settings/domain" },
    { name: "Account", route: "/settings/account" },
    { name: "Password", route: "/settings/password" },
  ];
  const router = useRouter();
  return (
    <div className="flex items-center justify-between font-semibold gap-x-32 w-full text-lg">
      {pages.map((page, i) => (
        <Link href={page.route} key={i} className="flex items-center">
          {router.pathname === page.route && (
            <span className="mr-2">
              <FaCaretRight />
            </span>
          )}
          {page.name}
        </Link>
      ))}
    </div>
  );
};

export default SettingsLinks;
