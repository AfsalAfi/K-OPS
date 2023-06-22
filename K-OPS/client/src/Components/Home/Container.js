import React from "react";

function Container() {
  const scrollToElement = (event) => {
    event.preventDefault();
    const targetId = event.target.getAttribute('href');
    const targetElement = document.querySelector(targetId);
    targetElement.scrollIntoView({
      behavior: 'smooth'
    });
  };
  return (
    <div className="container">
      <div className="contents">
        <h1>Improved Services For hassle free life</h1>
        <p>
          Experience a seamless journey to meet your everyday needs with our
          wide range of accessible services, tailored to simplify your
          lifestyle.
        </p>
        <div className="buttons">
          <button class="button1">Learn More</button>
          <button class="button2" href="#about_us-page" onClick={scrollToElement}> About Us</button>
        </div>
      </div>
      <div className="image_section">
        <img src="../home.svg"></img>
      </div>
    </div>
  );
}

export default Container;
