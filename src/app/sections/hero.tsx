import React from "react";
import Image from "next/image";

const Hero = () => {
  return (
    <div
      className="relative w-full h-[680px] flex justify-center items-center text-white"
      id="home"
    >
      <div className="absolute inset-0">
        <Image
          src="/assets/hero.jpg"
          alt="Background Image"
          className="object-cover object-center w-full h-full brightness-[0.85]"
          width={0}
          height={0}
          layout="fill"
        />
      </div>
      <div className="absolute m-auto border-white border-2 rounded-[30px] max-w-[480px] text-center p-8 py-4">
        <h1 className="text-3xl font-bold text-white mb-4 font-Merriweather">
          Welcome to Corpus Christi Anglican Church
        </h1>
        <p className="font-inter">
          Experience the love of God and the warmth of community at Corpus
          Christi Anglican Church. Join us for worship, fellowship, and
          spiritual growth.
        </p>
        <button className="bg-white text-black py-2 px-4 rounded mt-4">
          See our latest sermon
        </button>
      </div>
    </div>
  );
};
export default Hero;
