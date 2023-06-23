import React, { useState, useEffect } from "react";
import "../../Styles/KSEB_User.css";
import { useNavigate } from "react-router-dom";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import {
  Input,
  Button,
  ChakraProvider,
  Box,
  SimpleGrid,
} from "@chakra-ui/react";
import axios from "axios";
import { serverURL } from "../../serverConfig";

const MAX_VISIBILITY = 1;

function Card() {
  const [reply, setReply] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log(reply);
    setReply("");
  };

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Reply here.."
        value={reply}
        onChange={handleChange}
      />
      <br />
      <input
        type="submit"
        value="Send"
        style={{ backgroundColor: "white", color: "black" }}
      />
    </form>
  );
}

// const Card = ({ title, content }) => (
//   <div className="card">
//     <h2>{title}</h2>
//     <p>{content}</p>
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         placeholder="Reply here.."
//         value={reply}
//         onChange={handleChange}
//       />
//       <br />
//       <input type="submit" value="Send" style={{ backgroundColor: 'white', color: 'black' }} />
//     </form>
//   </div>
// );

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
        `http://${serverURL}:3001/admin/kseb/list-enquiry`,
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

  const [reply, setReply] = useState("");

  const handleSubmit = (event, id, email) => {
    event.preventDefault();
    console.log(id);
    console.log(email);
    console.log(reply);

    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/reply-for-enquiry-and-report`,
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
      });
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
          justifyContent: "space-evenly",
          // flexDirection: "column",
          alignItems: "center",
          // gap: "15rem",
          background: "var(--mainColorLight)",
          borderBottomLeftRadius: "60% 10%",
          borderBottomRightRadius: "60% 10%",
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

        <div className="carousel carousel_enquiry">
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
                    <div>Contact Number: {enquiry.ContactNumber}</div>
                    <div>Description: {enquiry.description}</div>
                    <div>Email: {enquiry.emailAddress}</div>
                    <div>Name: {enquiry.name}</div>
                    <div>Type: {enquiry.type}</div>
                  </div>
                  <form
                    onSubmit={(e) =>
                      handleSubmit(e, enquiry._id, enquiry.emailAddress)
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      padding: "0px 10px",
                      color: "grey",
                    }}
                  >
                    <ChakraProvider>
                      <Input
                        type="text"
                        placeholder="Reply here.."
                        value={reply}
                        onChange={handleChange}
                        marginBottom="10px"
                        background="#EDF2F7"
                      />
                      <Button type="submit" value="Send">
                        Send
                      </Button>
                    </ChakraProvider>
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

const Carousel2 = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);
  const { cards, setCards } = useCards();
  const { cardsFailure, setCardsFailure } = useCards();

  const [listFailures, setListFailures] = useState([]);

  const [reply, setReply] = useState("");

  const handleSubmit = (event, id, email) => {
    event.preventDefault();
    console.log(id);
    console.log(email);
    console.log(reply);

    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/reply-for-enquiry-and-report`,
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
      });
  };

  const handleChange = (event) => {
    setReply(event.target.value);
  };

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/list-failures`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "ok") {
          console.log(response.data.failureList);
          // CARDS = ;
          setListFailures(response.data.failureList);
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
    <div>
      <div
        style={{
          display: "flex",
          width: "100%",
          minHeight: "75vh",
          justifyContent: "space-evenly",
          // flexDirection: "column",
          alignItems: "center",
          // gap: "15rem",
        }}
      >
        <div className="carousel carousel_failures">
          {active > 0 && (
            <button
              className="nav left"
              onClick={() => setActive((i) => i - 1)}
            >
              <TiChevronLeftOutline />
            </button>
          )}
          <div className="card">
            {listFailures.map((failures, i) => (
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
                  key={failures._id}
                >
                  {failures.Complaints}
                  <div style={{ padding: "2rem" }}>
                    <div>ContactNumber: {failures.ContactNumber}</div>
                    <div>Complaint: {failures.Complaint}</div>
                    <div>EmailAddress: {failures.emailAddress}</div>
                    <div>Name: {failures.name}</div>
                    <div>Place: {failures.place}</div>
                    <div>Post: {failures.nearByPostNumber}</div>
                    <div>TimeOfHappen: {failures.timeOfHappen}</div>
                  </div>
                  <form
                    onSubmit={(e) =>
                      handleSubmit(e, failures._id, failures.emailAddress)
                    }
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      cursor: "pointer",
                      padding: "0px 10px",
                      color: "grey",
                    }}
                  >
                    <ChakraProvider>
                      <Input
                        type="text"
                        className="placeholder-white"
                        placeholder="Reply here.."
                        value={reply}
                        onChange={handleChange}
                        marginBottom="10px"
                        background="var(--mainColor)"
                      />

                      <Button
                        type="submit"
                        value="Send"
                        background="var(--mainColor)"
                        color="var(--mainColorLight)"
                      >
                        Send
                      </Button>
                    </ChakraProvider>
                  </form>
                </div>
              </div>
            ))}
          </div>
          {active < count - 1 && (
            <button
              className="nav right"
              onClick={() => setActive((i) => i + 1)}
            >
              <TiChevronRightOutline />
            </button>
          )}
        </div>
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
              color: "var(--textColor)",
              marginBottom: "50px",
              fontSize: "40px",
              fontWeight: "500",
            }}
          >
            Failures
          </h1>
          <img src="../solve.svg" alt="KSEB Logo" />
        </div>
      </div>
    </div>
  );
};

function KSEB_User() {
  const [notification, setNotification] = useState([{}]);
  const [newNotification, setNewNotification] = useState("");

  const { cards, setCards } = useCards();
  const [failureLength, setFailureLength] = useState();

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/list-enquiry`,
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
  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/list-failures`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        if (response.data.status === "ok") {
          console.log(response.data.failureList.length);
          // CARDS = ;
          setFailureLength(response.data.failureList.length);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);
  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/list-notifications`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data);
        if (response.data.status === "ok") {
          setNotification(response.data.notifications);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);

  const addNotification = () => {
    if (newNotification.trim() !== "") {
      const updatedNotifications = [
        { message: newNotification },
        ...notification,
      ];
      setNotification(updatedNotifications);
      setNewNotification("");
    }

    console.log("Notification content:", newNotification);

    axios
      .post(
        `http://${serverURL}:3001/admin/kseb/push-notifications`,
        { message: newNotification },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {})

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/login");
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
      }}
    >
      <div
        style={{
          backgroundColor: "var(--mainColorLight)",
        }}
      >
        <h3
          style={{
            display: "flex",
            flexDirection: "row-reverse",
            cursor: "pointer",
            padding: "25px 50px 0px 0px",
            color: "grey",
          }}
          onClick={backToHome}
        >
          Logout
        </h3>
      </div>
      <h1
        style={{
          color: "var(--mainColor)",
          fontSize: "40px",
          fontWeight: "bold",
          padding: "20px 0px 0px 0px",

          background: "var(--mainColorLight)",
        }}
      >
        Kerala State Electricity Board Limited
        <span style={{ color: "var(--secondaryColor)" }}>(KSEB)</span>
      </h1>

      <Carousel>
        {[...new Array(cards)].map((_, i) => (
          <Card />
        ))}
      </Carousel>

      <Carousel2>
        {[...new Array(failureLength)].map((_, i) => (
          <Card />
        ))}
      </Carousel2>

      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "40vh",
          background: "var(--mainColorLight)",
          borderTopLeftRadius: "60% 20%",
          borderTopRightRadius: "60% 20%",
        }}
      >
        <div className="h1_KSEB_report">
          <h1
            style={{
              color: "var(--mainColor)",
              fontSize: "40px",
              fontWeight: "500",
              marginBottom: "30px",
              marginTop: "50px",
            }}
          >
            Notifications
          </h1>

          {/* <img src={notificationSvg} alt="Notification" /> */}
        </div>
        <div className="form_report" style={{ marginBottom: "60px" }}>
          <ChakraProvider>
            <SimpleGrid columns={1} spacing={5}>
              <Box
                bg="var(--mainColorLight)"
                height="60px"
                style={{
                  display: "flex",
                  alignItems: "center",
                }}
              >
                <input
                  type="text"
                  placeholder="Add a new notification"
                  value={newNotification}
                  onChange={(e) => setNewNotification(e.target.value)}
                  style={{
                    backgroundColor: "var(--mainColor)",
                    border: "none",
                    color: "var(--textColor)",
                    width: "100%",
                    padding: "20px",
                  }}
                />
                <button
                  onClick={addNotification}
                  style={{
                    backgroundColor: "var(--mainColor)",
                    border: "none",
                    color: "var(--textColor)",
                    padding: "20px",
                  }}
                >
                  Add
                </button>
              </Box>
              {notification.map((item, index) => (
                <Box
                  key={index}
                  bg={
                    index % 2 === 0
                      ? "var(--mainColor)"
                      : "var(--secondaryColor)"
                  }
                  color="var(--mainColorLight)"
                  height="60px"
                  style={{
                    display: "flex",
                    padding: "0px 20px",
                    alignItems: "center",
                  }}
                >
                  <p>{item.message}</p>
                </Box>
              ))}
            </SimpleGrid>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}
export default KSEB_User;
