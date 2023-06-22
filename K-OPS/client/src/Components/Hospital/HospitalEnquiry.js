import React, { useState, useEffect } from "react";
import "../../Styles/KSEB_User.css";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { ChakraProvider, Box, SimpleGrid } from "@chakra-ui/react";
import axios from "axios";
import { serverURL } from "../../serverConfig";

const MAX_VISIBILITY = 1;
const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);
function useCards() {
  const [cards, setCards] = useState();
  return { cards, setCards };
}

const Carousel = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  const { cards, setCards } = useCards();
  const { cardsFailure, setCardsFailure } = useCards();

  const [listEnquiry, setListEnquiry] = useState([{}]);
  const [listFailures, setListFailures] = useState([{}]);

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/list-enquiry`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          console.log(response.data.enquiryList.length);
          // CARDS = ;
          setCards(response.data.enquiryList.length);
          setListEnquiry(response.data.enquiryList);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);

  const [reply, setReply] = useState('');

  const handleSubmit = (event, id, email) => {
    event.preventDefault();
    console.log(id);
    console.log(email);
    console.log(reply);

    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/reply-for-enquiry-and-report`,
        {
          id: id,
          message: reply,
          email: email,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "ok") {
          window.location.reload();
        } else {
          window.location.reload();
        }
      })
      .catch(function (error) {
        console.log(error);
      })
  };



  const handleChange = (event) => {
    setReply(event.target.value);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "75vh",
          justifyContent: "center",
          // flexDirection: "column",
          alignItems: "center",
          gap: "15rem",
          background: "var(--mainColorLight)",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            //   width: "30%",
          }}
        >
          <h1
            style={{
              color: "var(--mainColor)",
              marginBottom: "50px",
              fontSize: "40px",
              fontWeight: "500",
            }}
          >
            Enquiries
          </h1>
          <img src="../solve.svg" alt="KSEB Logo" />
        </div>
        <div className="carousel">
          {active > 0 && (
            <button
              className="nav left"
              style={{ color: "var(--mainColor)" }}
              onClick={() => setActive((i) => i - 1)}
            >
              <TiChevronLeftOutline />
            </button>
          )}
          <div
            className="card"
            style={{
              background: "var(--mainColor)",
              color: "var(--textColor)",
            }}
          >
            {listEnquiry.map((enquiry, i) => (
              <div>
                <div
                  className="card-container"
                  style={{
                    "--active": i === active ? 1 : 0,
                    "--offset": (active - i) / 3,
                    "--direction": Math.sign(active - i),
                    "--abs-offset": Math.abs(active - i) / 3,
                    "pointer-events": active === i ? "auto" : "none",
                    opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
                    display:
                      Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
                    // Add any other custom styles here
                  }}
                  key={enquiry._id}
                >
                  <div style={{ padding: "2rem" }}>
                    <div>ContactNumber: {enquiry.ContactNumber}</div>
                    <div>Description: {enquiry.description}</div>
                    <div>EmailAddress: {enquiry.emailAddress}</div>
                    <div>Name: {enquiry.name}</div>
                    <div>Type: {enquiry.type}</div>
                  </div>
                  <form onSubmit={(e) => handleSubmit(e, enquiry._id, enquiry.emailAddress)} style={{
                    display: "flex",
                    flexDirection: "column",
                    cursor: "pointer",
                    padding: "0px 10px",
                    color: "grey"
                  }}>
                    <input
                      type="text"
                      className="placeholder-white"
                      placeholder="Reply here.."
                      value={reply}
                      onChange={handleChange}
                      style={{
                        borderRadius: '6px',
                        height: '30px',
                        marginBottom: '10px',
                      }} />
                    <input type="submit" value="Send" style={{ backgroundColor: 'white', color: 'black', borderRadius: '6px', height: '30px' }} />
                  </form>
                </div>
              </div>
            ))}
          </div>
          {active < count - 1 && (
            <button
              className="nav right"
              style={{ color: "var(--mainColor)" }}
              onClick={() => setActive((i) => i + 1)}
            >
              <TiChevronRightOutline />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

function HospitalEnquiry() {
  const { cards, setCards } = useCards();

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/list-enquiry`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "ok") {
          console.log(response.data.enquiryList.length);
          // CARDS = ;
          setCards(response.data.enquiryList.length);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);
  return (
    <Carousel>
      {[...new Array(cards)].map((_, i) => (
        <Card />
      ))}
    </Carousel>
  );
}

export default HospitalEnquiry;
