import React from "react";
import "../../Styles/Footer.css";

const Footer = () => {
  return (
    <div className="footer">
      <div className="column">
        <h3>About Us</h3>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum
          auctor auctor orci, vel dapibus massa ultrices at.
        </p>
      </div>

      <div className="column">
        <h3>Quick Links</h3>
        <ul>
          <li>
            <a href="#">Home</a>
          </li>
          <li>
            <a href="#">Products</a>
          </li>
          <li>
            <a href="#">Services</a>
          </li>
          <li>
            <a href="#">Contact</a>
          </li>
        </ul>
      </div>

      <div className="column">
        <h3>Contact Info</h3>
        <p>Email: example@example.com</p>
        <p>Phone: 123-456-7890</p>
        <p>Address: 123 Street, City, Country</p>
      </div>

      <div className="column">
        <h3>Follow Us</h3>
        <ul className="social-media">
          <li>
            <a href="#">
              <i className="fab fa-facebook-f"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-twitter"></i>
            </a>
          </li>
          <li>
            <a href="#">
              <i className="fab fa-instagram"></i>
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
