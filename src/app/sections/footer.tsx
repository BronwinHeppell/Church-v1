"use client";
import React from "react";
import Image from "next/image";
import Map from "../../shared/components/map";
const Footer = () => {
  const showInMapClicked = () => {
    window.open(
      "https://www.google.com/maps/place/Corpus+Christi+Anglican+Church/@-25.7961862,28.2931054,17z/data=!3m1!4b1!4m6!3m5!1s0x1e955ffb3657c89b:0x84e228c1cd662421!8m2!3d-25.7961862!4d28.2956857!16s%2Fg%2F11cs18f00p?entry=ttu"
    );
  };

  return (
    <footer id="Footer" className="bg-gray-200 text-center p-4 ">
      <div className="container mx-auto flex flex-wrap justify-center items-center">
        <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
          <h5 className="uppercase text-gray-600">Contact Us</h5>
          <p onClick={() => showInMapClicked()}>
            Address: 482 De Bron Rd, Garsfontein, Pretoria, 0042
          </p>
          <p>Phone: (012) 993 5161</p>
          <p>Email:garsfontein.acsa@gmail.com</p>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 p-4 text-center flex flex-col justify-center items-center gap-4">
          <h5 className="uppercase text-gray-600">Donate</h5>
          <div className="flex gap-4">
            <a href="/assets/pdf/Banking_Details.pdf" download>
              <Image
                src="assets/icons/heart.svg"
                alt="Download PDF"
                className=""
                width={40}
                height={40}
              />
            </a>
          </div>
        </div>
        <div className="w-full md:w-1/3 lg:w-1/3 xl:w-1/3 p-4">
          {/* empty div to take up space */}
          <Image
            src="/assets/map_placeholder.png"
            alt="Background Image"
            className=""
            width={500}
            height={200}
          />
          {/* <Map /> */}
        </div>
      </div>
      <hr className="border-gray-400 my-4" />
      <p className="text-center text-gray-600">
        &copy; 2024 Corpus Christi Anglican Church{" "}
      </p>
    </footer>
  );
};
export default Footer;
