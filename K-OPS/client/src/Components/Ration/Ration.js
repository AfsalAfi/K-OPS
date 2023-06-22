import React, { useState, useEffect } from "react";
import "../../Styles/Ration.css";
import axios from "axios";
import { serverURL } from "../../serverConfig";
import {
  ChakraProvider,
  Box,
  SimpleGrid,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";

function Ration() {
  const [notification, setNotification] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [queue, setQueue] = useState("");

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/admin/ration-shop/show-QueueStatus`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data.notifications);
        if (response.data.status === "ok") {
          console.log(response.data.queue);
          setQueue(response.data.queue)
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
        `http://${serverURL}:3001/admin/ration-shop/show-RationShop-notifications`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response.data.notifications);
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

  useEffect(() => {
    // console.log(localStorage.getItem("token"));
    axios
      .post(
        `http://${serverURL}:3001/list-ration-shops`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  }, []);

  const [count, setCount] = useState(0);

  const incrementCount = () => {
    // setCount(count + 1);
    axios
      .post(
        `http://${serverURL}:3001/admin/ration-shop/queue-incrementing`,
        {},
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        if(response.data.status==="ok"){
          setQueue(response.data.queue)
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };

  const decrementCount = () => {
  

      axios
        .post(
          `http://${serverURL}:3001/admin/ration-shop/queue-decrementing`,
          {},
          {
            headers: {
              Autherization: `Bearer ${localStorage.getItem("token")}`,
            },
          }
        )
        .then(function (response) {
          if(response.data.status==="ok"){
            setQueue(response.data.queue)
          }
        })

        .catch(function (error) {
          console.log(error);
        })
        .finally(function () {
          console.log("ethi");
        });
    
  };

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
  const [values, setValues] = useState({
    pachari: "",
    chakkari: "",
    Aatta: "",
    kerosene: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setValues((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e, cardColor) => {
    e.preventDefault();
    console.log(cardColor);
    console.log(values);
    axios
      .post(
        `http://${serverURL}:3001/admin/ration-shop/update-available-stocks`,
        {
          cardColor: cardColor,
          stocks: values,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };
  // const queue = [
  //   {
  //     name: "Queue",
  //   },
  // ];

  return (
    <div>
      <h1
        style={{
          color: "var(--textColor)",
          display: "flex",
          height: "15vh",
          alignItems: "center",
          justifyContent: "center",
          fontSize: "40px",
          fontWeight: "bold",
        }}
      >
        Ration Cards
      </h1>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          width: "100%",
          alignItems: "center",
        }}
      >
        <ChakraProvider>
          <Table
            variant="simple"
            colorScheme="blackAlpha"
            style={{ width: "50%", color: "white" }}
          >
            <Thead>
              {/* <Tr>
                <Th fontSize="xl" color="white">
                  Ration Queue
                </Th>

                <Th fontSize="xl" color="white">
                  Count
                </Th>
              </Tr> */}
            </Thead>
            <Tbody>
              <Tr key={queue}>
              <Td fontSize="xl" color="white">
                  Ration Queue
                </Td>
                <Td>
                  <HStack maxW="320px">
                    <Button
                      variant="outline"
                      colorScheme="white"
                      size="sm"
                      onClick={incrementCount}
                    >
                      +
                    </Button>
                    <Input size="sm" value={queue} readOnly />
                    <Button
                      variant="outline"
                      colorScheme="white"
                      size="sm"
                      onClick={decrementCount}
                    >
                      -
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            </Tbody>
          </Table>
        </ChakraProvider>
      </div>
      <div
        style={{
          minHeight: "70vh",
          width: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: "3rem",
          flexWrap: "wrap",
        }}
      >
        <div className="flip-card">
          {/* Yellow Card */}
          <div className="flip-card-inner">
            <div className="flip-card-front yellow">
              <p className="title">YELLOW CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back yellow">
              <form
                onSubmit={(e) => handleSubmit(e, "yellow")}
                className="form-container"
              >
                <label>
                  Pachari:
                  <input
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    type="text"
                    name="Aatta"
                    value={values.Aatta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Aatta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          {/* Red Card */}
          <div className="flip-card-inner">
            <div className="flip-card-front red">
              <p className="title">RED CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back red">
              <form
                onSubmit={(e) => handleSubmit(e, "red")}
                className="form-container"
              >
                <label>
                  Pachari:
                  <input
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    type="text"
                    name="Aatta"
                    value={values.Aatta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Aatta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          {/* Blue Card */}
          <div className="flip-card-inner">
            <div className="flip-card-front blue">
              <p className="title">BLUE CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back blue">
              <form
                onSubmit={(e) => handleSubmit(e, "blue")}
                className="form-container"
              >
                <label>
                  Pachari:
                  <input
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    type="text"
                    name="Aatta"
                    value={values.Aatta}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Aatta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="white-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
        <div className="flip-card">
          {/* White Card */}
          <div className="flip-card-inner">
            <div className="flip-card-front white">
              <p className="title">WHITE CARD</p> <p>Hover For Details</p>
            </div>
            <div className="flip-card-back white">
              <form
                onSubmit={(e) => handleSubmit(e, "white")}
                className="form-container white_content"
              >
                <label>
                  Pachari:
                  <input
                    type="text"
                    name="pachari"
                    value={values.pachari}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Pachari in kg"
                  />
                </label>
                <br />
                <label>
                  Chakkari:
                  <input
                    type="text"
                    name="chakkari"
                    value={values.chakkari}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Chakkari in kg"
                  />
                </label>
                <br />
                <label>
                  Aatta:
                  <input
                    type="text"
                    name="Aatta"
                    value={values.Aatta}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Aatta in kg"
                  />
                </label>
                <br />
                <label>
                  Kerosene:
                  <input
                    type="text"
                    name="kerosene"
                    value={values.kerosene}
                    onChange={handleChange}
                    className="black-placeholder"
                    placeholder="Enter Kerosene in liters"
                  />
                </label>
                <br />
                <button type="submit" className="submit-button dark_gray">
                  Submit
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
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

export default Ration;
