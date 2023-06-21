import React from "react";
import TestimonialCard from "./TestiMonialsCard";
import "../../../Styles/Testimonials.css";

function Testimonials() {
  const testimonials = [
    {
      id: 1,
      name: "John Doe",
      designation: "CEO, ABC Company",
      testimonial:
        "I have been using this platform for a while now, and it has truly simplified my life. The easy access to hospital details, ration shop information, and KSEB updates has saved me a lot of time and effort. Highly recommended!",
    },
    {
      id: 2,
      name: "Jane Smith",
      designation: "Freelancer",
      testimonial:
        "As an educator, having quick access to hospital information and reliable updates from KSEB has been invaluable. This platform has helped me stay organized and focus on my work, knowing that I can easily find the resources I need.",
    },
    {
      id: 3,
      name: "David Williams",
      designation: "Homeowner",
      testimonial:
        "Managing my electricity needs has never been easier. Thanks to this platform, I can quickly access KSEB details, make payments, and stay informed about any outages or maintenance work. It has simplified my interactions with the electrical board.",
    },
    {
      id: 4,
      name: "Sarah Johnson",
      designation: "Teacher",
      testimonial:
        "I am impressed with the convenience provided by this platform. Finding nearby ration shops and getting accurate information about their operating hours and available products is a game-changer. It has made my grocery shopping much more efficient.",
    },
    {
      id: 5,
      name: "Michael Brown",
      designation: "Business Owner",
      testimonial:
        "This platform has transformed the way I run my business. With seamless access to hospital details, I can ensure the well-being of my employees and quickly find medical assistance when needed. It has become an essential tool for managing my operations effectively.",
    },
  ];

  return (
    <div className="container_testimonials">
      <section id="testimonials" className="contents_testimonials">
        <h1>What Our Users Say</h1>
        <div className="testimonial-cards">
          {testimonials.map((testimonial) => (
            <TestimonialCard
              key={testimonial.id}
              name={testimonial.name}
              designation={testimonial.designation}
              testimonial={testimonial.testimonial}
            />
          ))}
        </div>
      </section>
    </div>
  );
}

export default Testimonials;
