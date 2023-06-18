import React from "react";
import "../../Styles/Home.css";
import Container from "./Container";
import Navbar from "../NavBar";
import KSEBdetails from "./KSEBdetails";
import Hospital from "./Hospital";
import RationShop from "./RationShop";
import Footer from "./Footer";

function Home() {
  return (
    <div>
      <Navbar />
      <Container />
      <KSEBdetails />
      <Hospital />
      <RationShop />
    </div>
  );
}

export default Home;
