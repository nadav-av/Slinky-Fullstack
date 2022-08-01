import React from "react";
import "./homePage.css";
import Hero from "./hero/Hero";
import Featured from "./featured/Featured";

const HomePage = () => {
  return (
    <div className="home-page-container">
      <Hero />
      <Featured />
    </div>
  );
};

export default HomePage;
