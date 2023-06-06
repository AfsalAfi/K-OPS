import React, { useState, useEffect } from "react";
import "../Styles/KSEB_form.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../serverConfig";

function KSEB_notification() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };


  let divisionMail
  const location = useLocation();
  const regId = location.state;
  divisionMail = regId;


  useEffect(() => {
    axios
      .post(`http://${serverURL}:3001/show-kseb-notifications`, {}, {})
      .then(function (response) {
        if (response.status === "ok") {
        }
      })

      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const dummyData = [
    { id: 1, content: "Notification 1" },
    { id: 2, content: "Notification 2" },
    { id: 4, content: "Notification 4" },
    { id: 5, content: "Notification 5" },
    { id: 6, content: "Notification 6" },
    { id: 7, content: "Notification 7" },
    { id: 8, content: "Notification 8" },
    { id: 9, content: "Notification 9" },
    { id: 10, content: "Notification 10" },

    // Add more objects as needed
  ];

  return (
    <div className="container_KESB_report">
      <div className="inside_container_KESB_report">
        <div className="img_report">
          <div className="h1_KSEB_report">
            <h2
              style={{
                display: "flex",
                alignItems: "center",
                cursor: "pointer",
              }}
              onClick={backToHome}
            >
              <span>
                <IoIosArrowBack />
              </span>
              back
            </h2>
            <h1>Notifications</h1>
          </div>
          <img src="../notification.svg" alt="Notification" />
        </div>
        <div className="form_report">
          <ChakraProvider>
            <SimpleGrid columns={1} spacing={5}>
              {dummyData.map((item, index) => (
                <Box
                  key={item.id}
                  bg={index % 2 === 0 ? "#172a3a" : "#7a9e9f"}
                  height="60px"
                  style={{
                    display: "flex",
                    padding: "0px 20px",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: "var(--textColor)" }}>{item.content}</p>
                </Box>
              ))}
            </SimpleGrid>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default KSEB_notification;
