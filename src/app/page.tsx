import React from "react";
import Card from "@/shared/components/card";
import Hero from "./sections/hero";
import Navbar from "@/shared/components/navbar";
import Services from "./sections/services";
import MissionStatement from "./sections/mission-statement";
import AboutUs from "./sections/about";
import Events from "./sections/events";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <Services />

      <MissionStatement />

      <AboutUs />

      <Events />
    </>
  );
};

export default Home;
