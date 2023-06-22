import { useRef } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import "../Styles/NavBar.css";

function Navbar() {
  const navRef = useRef();

  const scrollToElement = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  };

  const showNavbar = () => {
    navRef.current.classList.toggle("responsive_nav");
  };

  return (
    <header>
      <h3>K-OPS</h3>
      <nav ref={navRef}>
        <a href="/#">Home</a>
        <a href="#kseb-page" onClick={scrollToElement}>
          KSEB
        </a>
        <a href="#hospital-page" onClick={scrollToElement}>
          Hospital
        </a>
        <a href="#ration-shop-page" onClick={scrollToElement}>
          Ration Shop
        </a>
        <a href="#about_us-page" onClick={scrollToElement}>
          About Us
        </a>
        <button className="nav-btn nav-close-btn" onClick={showNavbar}>
          <FaTimes />
        </button>
      </nav>
      <button className="nav-btn" onClick={showNavbar}>
        <FaBars />
      </button>
    </header>
  );
}

export default Navbar;
