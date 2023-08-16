import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Button } from "@chakra-ui/react";
import "../../Styles/KSEBdetails.css";
import axios from "axios";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../../serverConfig";

const districts = [
  { id: 1, name: "Alappuzha" },
  { id: 2, name: "Ernakulam" },
  { id: 3, name: "Idukki" },
  { id: 4, name: "Kannur" },
  { id: 5, name: "Kasaragod" },
  { id: 6, name: "Kollam" },
  { id: 7, name: "Kottayam" },
  { id: 8, name: "Kozhikode" },
  { id: 9, name: "Malappuram" },
  { id: 10, name: "Palakkad" },
  { id: 11, name: "Pathanamthitta" },
  { id: 12, name: "Thiruvananthapuram" },
  { id: 13, name: "Thrissur" },
  { id: 14, name: "Wayanad" },
];


function RationShop() {
  const [isDivision, setIsDivision] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("Select Ration Shop");
  const [selectedDivisionCollection, setSelectedDivisionCollection] = useState("");
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    console.log(localStorage.getItem("district"))
    console.log(localStorage.getItem("subDivision"))
    if (localStorage.getItem("operator") === "RationShop") {
      if (localStorage.getItem("district") != null) {
        setDistrict(localStorage.getItem("district"))
      }
      if (localStorage.getItem("RationShop") != (null || "null")) {
        selectDivisionForRationShop(localStorage.getItem("RationShop"))
      }
    }
  }, []);

  const goToStatus = () => {
    navigate("/ration/status", {
      state: { regId: selectedDivisionCollection.regId },
    });
  };

  const goToNotification = () => {
    navigate("/ration/notification", {
      state: { regId: selectedDivisionCollection.regId },
    });
  };

  const setDivisionForRationShop = (event) => {
    const selectedDivision = JSON.parse(event);
    console.log(selectedDivision);
    console.log(event);
    setSelectedDivision(selectedDivision);
    setSelectedDivisionCollection(selectedDivision);
    setIsDivision(true);
  };

  const setDistrict = (event) => {
    console.log(event);
    setSelectedDistrict(event);
    setIsDivision(false);
    axios
      .post(
        `http://${serverURL}:3001/list-ration-shops`,
        {
          district: event,
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
          console.log("response");
          console.log(response.data.result);
          setDivisions(response.data.result);

        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };

  function assignDistrict(e) {
    localStorage.setItem("Hospital", "null");
    localStorage.setItem("KSEB", "null");
    localStorage.setItem("RationShop", "null");
    localStorage.setItem("operator", "RationShop");
    setSelectedDistrict(e);
    setSelectedDivision("Select Ration Shop")
    setIsDivision(false);
    axios
      .post(
        `http://${serverURL}:3001/list-ration-shops`,
        {
          district: e,
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
          console.log("response");
          console.log(response.data.result);
          setDivisions(response.data.result);

        }
      })
    localStorage.setItem("district", e);
  }

  function selectDivisionForRationShop(e) {
    setDivisionForRationShop(e)
    localStorage.setItem("RationShop", e);
  }

  return (
    <>
      <div className="container_KSEB" id="ration-shop-page">
        <div className="image_section_KSEB">
          <img src="../ration.svg" alt="KSEB Logo" />
        </div>
        <div className="contents_KSEB">
          <h1>Ration Shop</h1>
          <p>
            Ensuring food security for all: India's ration shop system provides
            subsidized essential commodities to economically disadvantaged
            sections, promoting equitable access to affordable food.
          </p>
          {/* District selection */}
          <ChakraProvider>
            <Select
              placeholder="Select District"
              value={selectedDistrict}
              onChange={(e) => assignDistrict(e.target.value)}
              mb={4}
              color="var(--mainColor)"
              borderColor="var(--mainColor)"
              my="20px"
            >
              {districts.map((district) => (
                <option
                  key={district.id}
                  value={district.name}
                  style={{ color: "var(--mainColor)" }}
                >
                  {district.name}
                </option>
              ))}
            </Select>

            {/* Division selection */}
            {selectedDistrict && (
              <Select
                placeholder={selectedDivision.RationShopName ? selectedDivision.RationShopName : "Select Ration Shop"}
                value={selectedDivision.RationShopName}
                onChange={(e) => selectDivisionForRationShop(e.target.value)}
                mb={4}
                color="var(--mainColor)"
                borderColor="var(--mainColor)"
              >
                {divisions.map((division) => (
                  <option
                    key={division.id}
                    value={JSON.stringify(division)}
                    color="var(--mainColor)"
                    borderColor="var(--mainColor)"
                  >
                    {division.RationShopName}
                  </option>
                ))}
              </Select>
            )}
          </ChakraProvider>

          {/* Options */}
          {isDivision && (
            <div className="buttons_KESB">
              <div className="buttons_KESB">
                <h2 onClick={goToStatus}>
                  <span>-</span>Ration Status
                </h2>
                <h2 onClick={goToNotification}>
                  <span>-</span>Notifications
                </h2>
                <p>Queue : {selectedDivision.queTraffic}</p>
                <p>Opening Time : 9:00 AM</p>
                <p>Closing Time : 6:00 PM</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default RationShop;
