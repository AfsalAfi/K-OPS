import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
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
  const navigate = useNavigate();

  const [notification, setNotification] = useState([]);
  const [newNotification, setNewNotification] = useState("");
  const [queue, setQueue] = useState("");

  const backToHome = () => {
    navigate("/login");
  };

  useEffect(() => {
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
        if (response.data.status === "ok") {
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
        if (response.data.status === "ok") {
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
      .then(function (response) { })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };
  const [valuesYELLOW, setValuesYELLOW] = useState({
    pachari: "",
    chakkari: "",
    Aatta: "",
    kerosene: "",
  });

  const [valuesBLUE, setValuesBLUE] = useState({
    pachari: "",
    chakkari: "",
    Aatta: "",
    kerosene: "",
  });

  const [valuesRED, setValuesRED] = useState({
    pachari: "",
    chakkari: "",
    Aatta: "",
    kerosene: "",
  });

  const [valuesWHITE, setValuesWHITE] = useState({
    pachari: "",
    chakkari: "",
    Aatta: "",
    kerosene: "",
  });

  const handleChangeBLUE = (e) => {
    const { name, value } = e.target;
    setValuesBLUE((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleChangeWHITE = (e) => {
    const { name, value } = e.target;
    setValuesWHITE((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleChangeRED = (e) => {
    const { name, value } = e.target;
    setValuesRED((prevValues) => ({ ...prevValues, [name]: value }));
  };
  const handleChangeYELLOW = (e) => {
    const { name, value } = e.target;
    setValuesYELLOW((prevValues) => ({ ...prevValues, [name]: value }));
  };

  const handleSubmit = (e, cardColor) => {
    e.preventDefault();
    console.log(cardColor);
    console.log(valuesYELLOW);
    console.log(valuesRED);
    console.log(valuesBLUE);
    console.log(valuesWHITE);
    let stockContain
    if (cardColor === "yellow") {
      stockContain = valuesYELLOW
    } else if (cardColor === "red") {
      stockContain = valuesRED
    } else if (cardColor === "white") {
      stockContain = valuesWHITE
    } else if (cardColor === "blue") {
      stockContain = valuesBLUE
    }
    axios
      .post(
        `http://${serverURL}:3001/admin/ration-shop/update-available-stocks`,
        {
          cardColor: cardColor,
          stocks: stockContain,
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

      <h3
        style={{
          display: "flex",
          flexDirection: "row-reverse",
          cursor: "pointer",
          padding: "25px 50px 0px 0px",
          color: "grey"
        }}
        onClick={backToHome}
      >
        Logout
      </h3>
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
                    value={valuesYELLOW.pachari}
                    onChange={handleChangeYELLOW}
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
                    value={valuesYELLOW.chakkari}
                    onChange={handleChangeYELLOW}
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
                    value={valuesYELLOW.Aatta}
                    onChange={handleChangeYELLOW}
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
                    value={valuesYELLOW.kerosene}
                    onChange={handleChangeYELLOW}
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
                    value={valuesRED.pachari}
                    onChange={handleChangeRED}
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
                    value={valuesRED.chakkari}
                    onChange={handleChangeRED}
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
                    value={valuesRED.Aatta}
                    onChange={handleChangeRED}
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
                    value={valuesRED.kerosene}
                    onChange={handleChangeRED}
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
                    value={valuesBLUE.pachari}
                    onChange={handleChangeBLUE}
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
                    value={valuesBLUE.chakkari}
                    onChange={handleChangeBLUE}
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
                    value={valuesBLUE.Aatta}
                    onChange={handleChangeBLUE}
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
                    value={valuesBLUE.kerosene}
                    onChange={handleChangeBLUE}
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
                    value={valuesWHITE.pachari}
                    onChange={handleChangeWHITE}
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
                    value={valuesWHITE.chakkari}
                    onChange={handleChangeWHITE}
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
                    value={valuesWHITE.Aatta}
                    onChange={handleChangeWHITE}
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
                    value={valuesWHITE.kerosene}
                    onChange={handleChangeWHITE}
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
