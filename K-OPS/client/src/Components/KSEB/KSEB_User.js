import React, { useState } from "react";
import "../../Styles/KSEB_User.css";
import { TiChevronLeftOutline, TiChevronRightOutline } from "react-icons/ti";
import { IoIosArrowBack } from "react-icons/io";
import { ChakraProvider, Box, SimpleGrid } from "@chakra-ui/react";
// import notificationSvg from "../notification.svg";

const CARDS = 5;
const MAX_VISIBILITY = 3;

const Card = ({ title, content }) => (
  <div className="card">
    <h2>{title}</h2>
    <p>{content}</p>
  </div>
);

const Carousel = ({ children }) => {
  const [active, setActive] = useState(0);
  const count = React.Children.count(children);

  return (
    <div
      style={{
        display: "flex",
        width: "100%",
        minHeight: "75vh",
        justifyContent: "center",
        // flexDirection: "column",
        alignItems: "center",
        gap: "15rem",
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
            color: "var(--textColor)",
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
          <button className="nav left" onClick={() => setActive((i) => i - 1)}>
            <TiChevronLeftOutline />
          </button>
        )}
        {React.Children.map(children, (child, i) => (
          <div
            className="card-container"
            style={{
              "--active": i === active ? 1 : 0,
              "--offset": (active - i) / 3,
              "--direction": Math.sign(active - i),
              "--abs-offset": Math.abs(active - i) / 3,
              "pointer-events": active === i ? "auto" : "none",
              opacity: Math.abs(active - i) >= MAX_VISIBILITY ? "0" : "1",
              display: Math.abs(active - i) > MAX_VISIBILITY ? "none" : "block",
            }}
          >
            {child}
          </div>
        ))}
        {active < count - 1 && (
          <button className="nav right" onClick={() => setActive((i) => i + 1)}>
            <TiChevronRightOutline />
          </button>
        )}
      </div>
    </div>
  );
};

function KSEB_User() {
  const [notification, setNotification] = useState([
    { message: "Dummy notification 1" },
    { message: "Dummy notification 2" },
    { message: "Dummy notification 3" },
  ]);
  const [newNotification, setNewNotification] = useState("");

  const addNotification = () => {
    if (newNotification.trim() !== "") {
      const updatedNotifications = [
        { message: newNotification },
        ...notification,
      ];
      setNotification(updatedNotifications);
      setNewNotification("");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "50px 0px 0px 0px",
      }}
    >
      <h1
        style={{
          color: "var(--textColor)",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        Kerala State Electricity Board Limited{" "}
        <span style={{ color: "var(--secondaryColor)" }}>(KSEB)</span>
      </h1>

      <Carousel>
        {[...new Array(CARDS)].map((_, i) => (
          <Card
            key={i}
            title={"Card " + (i + 1)}
            content="Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
          />
        ))}
      </Carousel>
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
