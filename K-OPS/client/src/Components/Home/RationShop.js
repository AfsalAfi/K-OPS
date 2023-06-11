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

// const divisions = [
//   { id: 1, name: "Division 1" },
//   { id: 2, name: "Division 2" },
//   { id: 3, name: "Division 3" },
//   // Add more divisions here
// ];

function RationShop() {
  const [isDivision, setIsDivision] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDivisionCollection, setSelectedDivisionCollection] =
    useState("");
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  const goToReport = () => {
    navigate("/KSEB/report", {
      state: { email: selectedDivisionCollection.email },
    });
  };

  const goToEnquiry = () => {
    navigate("/KSEB/enquiry", {
      state: { email: selectedDivisionCollection.email },
    });
  };

  const goToNotification = () => {
    navigate("/KSEB/notification", {
      state: { regId: selectedDivisionCollection.regId },
    });
  };

  const setDivisionForKseb = (event) => {
    const selectedDivision = JSON.parse(event.target.value);
    console.log(selectedDivision);
    console.log(event);
    setSelectedDivision(selectedDivision);
    setSelectedDivisionCollection(selectedDivision);
    setIsDivision(true);
  };

  const setDistrict = (event) => {
    console.log(event);
    setSelectedDistrict(event);
    setIsDivision(!!selectedDivision);
    axios
      .post(
        `http://${serverURL}:3001/list-kseb-divisions`,
        {
          district: event,
        },
        {}
      )
      .then(function (response) {
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

  // useEffect(() => {
  //   setIsDivision(!!selectedDivision);
  //   console.log("Selected District:", selectedDistrict);
  //   console.log("Selected Division:", selectedDivision);
  //   axios
  //     .post(
  //       `http://${serverURL}:3001/list-kseb-divisions`,
  //       {
  //         district: selectedDistrict,
  //       },
  //     )
  //     .then(function (response) {
  //       if (response.status === "ok") {
  //         console.log(response);
  //       }
  //     })

  //     .catch(function (error) {
  //       // handle error
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, [selectedDistrict, selectedDivision]);

  return (
    <div className="container_KSEB">
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
            onChange={(e) => setDistrict(e.target.value)}
            mb={4}
            color="white"
            my="20px"
          >
            {districts.map((district) => (
              <option key={district.id} value={district.name}>
                {district.name}
              </option>
            ))}
          </Select>

          {/* Division selection */}
          {selectedDistrict && (
            <Select
              placeholder="Select Division"
              value={selectedDivision}
              onChange={(e) => setDivisionForKseb(e)}
              mb={4}
              color="white"
            >
              {divisions.map((division) => (
                <option key={division.id} value={JSON.stringify(division)}>
                  {division.division}
                </option>
              ))}
            </Select>
          )}
        </ChakraProvider>

        {/* Options */}
        {isDivision && <div className="buttons_KESB"></div>}
      </div>
    </div>
  );
}

export default RationShop;
