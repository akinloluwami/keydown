import Link from "next/link";
import React from "react";

const Header = () => {
  return (
    <div className="border-b border-dashed border-that-grey px-10 py-5">
      <Link href="/" className="font-bold text-lg">
        keydown
      </Link>
    </div>
  );
};

export default Header;
