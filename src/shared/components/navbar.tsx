import Link from "next/link";
import React from "react";
import Image from "next/image";

const Navbar = () => {
  return (
    <nav className="bg-white w-full border-b md:border-0">
      <div className="flex justify-between items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8">
        <div className="flex items-center justify-between md:block">
          <div className="w-100 my-2">
            <Image
              src="/assets/logo.svg"
              alt="Background Image"
              objectFit="contain"
              width={50}
              height={0}
            ></Image>
          </div>
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
          <Link href={"#AboutUs"}>About us</Link>
          <Link href={"#services"}>Services</Link>
          <Link href={"#Events"}>Events</Link>
          <Link href={"#Footer"}>Contact us</Link>
          <Link
            href={"/assets/pdf/Banking_Details.pdf"}
            download
            target="_blank"
          >
            Donate
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
