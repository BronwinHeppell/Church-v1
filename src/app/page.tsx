import React from "react";
import Card from "@/shared/components/card";
import Hero from "./sections/hero";
import Navbar from "@/shared/components/navbar";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <Hero />
    </>
  );
};

export default Home;
