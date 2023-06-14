import React, { useState, useEffect } from "react";
import "../Styles/KSEB_form.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { Box, SimpleGrid } from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../serverConfig";

function Ration_notification() {
  const navigate = useNavigate();
  const [notification, setNotification] = useState([]);

  const backToHome = () => {
    navigate("/");
  };

  const location = useLocation();
  console.log(location);
  const regId = location.state;
  console.log(regId.regId);

  useEffect(() => {
    axios
      .post(
        `http://${serverURL}:3001/show-RationShop-notifications`,
        {
          regId: regId.regId,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data.status);
        if (response.data.status === "ok") {
          console.log(response.data.notifications);
          setNotification(response.data.notifications);
        } else {
          navigate("/");
        }
      })

      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  }, []);

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
              {notification.map((item, index) => (
                <Box
                  key={index}
                  bg={index % 2 === 0 ? "#172a3a" : "#7a9e9f"}
                  height="60px"
                  style={{
                    display: "flex",
                    padding: "0px 20px",
                    alignItems: "center",
                  }}
                >
                  <p style={{ color: "var(--textColor)" }}>{item.message}</p>
                </Box>
              ))}
            </SimpleGrid>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default Ration_notification;
