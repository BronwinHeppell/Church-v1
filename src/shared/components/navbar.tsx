import Link from "next/link";
import React from "react";
const Navbar = () => {
  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="flex justify-between items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between py-3 md:py-5 md:block">
          <Link href="/">
            <h1 className="text-xl font-bold text-gray-700">Corpus Christi</h1>
          </Link>
          <div className="md:hidden">
            <button
              className="text-gray-700 outline-none p-2 rounded-md focus:border-gray-400 focus:border"
              // onClick={() => setState(!state)}
            >
              {/* <Menu /> */}
            </button>
          </div>
        </div>
        <div className="space-x-4">
          <Link href={""}>About us</Link>
          <Link href={""}>Services</Link>
          <Link href={""}>Events</Link>
          <Link href={""}>Contact us</Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
