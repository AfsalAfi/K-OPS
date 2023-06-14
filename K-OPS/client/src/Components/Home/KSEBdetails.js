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

function KSEBdetails() {
  const [isDivision, setIsDivision] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedDivision, setSelectedDivision] = useState("");
  const [selectedDivisionCollection, setSelectedDivisionCollection] =
    useState("");
  const [divisions, setDivisions] = useState([]);
  const navigate = useNavigate();

  const goToReport = () => {
    navigate("/KSEB/report", {
      state: { regId: selectedDivisionCollection.regId },
    });
  };

  const goToEnquiry = () => {
    navigate("/KSEB/enquiry", {
      state: {
        email: selectedDivisionCollection.email,
        regId: selectedDivisionCollection.regId,
      },
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
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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
        <img src="../KSEB.svg" alt="KSEB Logo" />
      </div>
      <div className="contents_KSEB">
        <h1>Kerala State Electricity Board Limited (KSEB)</h1>
        <p>
          Explore our services, report failures, make inquiries or complaints,
          and stay updated with our notifications. Together, let's power a
          brighter future for Kerala.
        </p>
        {/* District selection */}
        <ChakraProvider>
          <Select
            placeholder="Select District"
            value={selectedDistrict}
            onChange={(e) => setDistrict(e.target.value)}
            mb={4}
            color="var(--tertiaryColor)"
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
              color="var(--tertiaryColor)"
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
        {isDivision && (
          <div className="buttons_KESB">
            <h2 onClick={goToReport}>
              <span>-</span>Report Failures
            </h2>
            <h2 onClick={goToEnquiry}>
              <span>-</span>Enquiries or Complaints
            </h2>
            <h2 onClick={goToNotification}>
              <span>-</span>Notifications
            </h2>

            <p style={{ marginTop: "15px" }}>
              Name: {selectedDivisionCollection.officer}
            </p>
            <p>Contact Number : {selectedDivisionCollection.contact}</p>
            <p>Email : {selectedDivisionCollection.email}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default KSEBdetails;
