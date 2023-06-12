import React, { useState, useEffect } from "react";
import "../../Styles/KSEB_form.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../../serverConfig";

function Notification_Hopital() {
  const navigate = useNavigate();
  //   const [notification, setNotification] = useState([]);

  //   const backToHome = () => {
  //     navigate("/");
  //   };

  //   const location = useLocation();
  //   console.log(location);
  //   const regId = location.state;
  //   console.log(regId.regId);

  useEffect(() => {
    // axios
    //   .post(`http://${serverURL}:3001/show-kseb-notifications`, {
    //     regId: regId.regId,
    //   })
    //   .then(function (response) {
    //     if (response.data.status === "ok") {
    //       console.log(response.data.result);
    //       setNotification(response.data.result);
    //     } else {
    //       navigate("/");
    //     }
    //   })
    //   .catch(function (error) {
    //     // handle error
    //   })
    //   .finally(function () {
    //     // always executed
    //   });
  }, []);

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

    console.log("Notification content:", newNotification);

    axios
      .post(
        `http://${serverURL}:3001/admin/ration-shop/push-notifications`,
        { message: newNotification },
        {}
      )
      .then(function (response) {})

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };

  return (
    <div className="inside_container_KESB_report">
      <div
        className="img_report"
        style={{ gap: "3rem", display: "flex", alignItems: "center" }}
      >
        <div
          className="h1_KSEB_report"
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <h1>Notification</h1>
        </div>
        <img src="../notification.svg"></img>
      </div>
      <div className="form_report">
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
                  index % 2 === 0 ? "var(--mainColor)" : "var(--secondaryColor)"
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
  );
}

export default Notification_Hopital;
