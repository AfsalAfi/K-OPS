import React from "react";
import "../../Styles/Home.css";
import Container from "./Container";
import Navbar from "../NavBar";
import KSEBdetails from "./KSEBdetails";
import Hospital from "./Hospital";

function Home() {
  return (
    <div>
      <Navbar />
      <Container />
      <KSEBdetails />
      <Hospital />
    </div>
  );
}

export default Home;
