import React, { useEffect } from "react";
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
  useEffect(() => {
    const scrollToElement = () => {
      const operator = localStorage.getItem("operator");

      if (operator === "Hospital") {
        const targetElement = document.querySelector("#Hospital");
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      } else if (operator === "KSEB") {
        const targetElement = document.querySelector("#kseb-page");
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      } else if (operator === "RationShop") {
        const targetElement = document.querySelector("#ration-shop-page");
        targetElement.scrollIntoView({
          behavior: "smooth",
        });
      }
    };

    scrollToElement();
  }, []);

  return (
    <div>
      <Navbar />
      <Container />
      <AboutUs />
      <div id="kseb-page">
        <KSEBdetails />
      </div>
      <div id="Hospital">
        <Hospital />
      </div>
      <div id="ration-shop-page">
        <RationShop />
      </div>
      <Testimonials />
      {/* <Footer /> */}
    </div>
  );
}

export default Home;
