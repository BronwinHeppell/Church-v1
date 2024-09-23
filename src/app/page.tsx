import React from "react";
import Card from "@/shared/components/card";
import Hero from "./sections/hero";
import Navbar from "@/shared/components/navbar";
import Services from "./sections/services";
import MissionStatement from "./sections/mission-statement";
import AboutUs from "./sections/about";
import Events from "./sections/events";
import Footer from "./sections/footer";
import { FAQ } from "./sections/faq";

const Home: React.FC = () => {
  return (
    <>
      <Navbar />

      <Hero />

      <main className="max-w-4xl mx-auto px-10">
        <Services />

        <MissionStatement />

        <AboutUs />

        <Events />

        <FAQ />
      </main>

      <Footer />
    </>
  );
};

export default Home;
