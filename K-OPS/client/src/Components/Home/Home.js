import React from "react";
import "../../Styles/Home.css";
import Container from "./Container";
import Navbar from "../NavBar";
import KSEBdetails from "./KSEBdetails";
import Hospital from "./Hospital";
import RationShop from "./RationShop";
import Footer from "./Footer";
import AboutUs from "./AboutUs";
import Testimonials from "./Testimonials/Testimonials";

function Home() {
  return (
    <div>
      <Navbar />
      <Container />
      <AboutUs />
      <KSEBdetails />
      <Hospital />
      <RationShop />
      <Testimonials />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
