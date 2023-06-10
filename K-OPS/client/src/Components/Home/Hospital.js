import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Select, Button } from "@chakra-ui/react";
import "../../Styles/Hospital.css";
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

function Hospital() {
  const [isHospital, setIsHospital] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("Select Hospital");
  const [selectedHostelCollection, setSelectedHostelCollection] =
    useState("Select Hospital");
  const [hopitalsList, setHopitalsList] = useState([]);
  const navigate = useNavigate();

  const goToHospitalEnquiry = () => {
    navigate("/hospital/enquiry", {
      state: { email: selectedHostelCollection.email },
    });
  };

  const goToAvailability = () => {
    navigate("/hospital/availability", {
      state: { hospital: selectedHostelCollection.regId },
    });
  };

  const goToMedical = () => {
    navigate("/hospital/medical-facility", {
      state: { regId: selectedHostelCollection.regId },
    });
  };

  const goToOP = () => {
    navigate("/hospital/OP-ticket", {
      // state: { regId: selectedDivisionCollection.regId },
    });
  };

  const setSelectedHospital = (e) => {
    const selectedHospitalCollection = JSON.parse(e.target.value);
    console.log(selectedHospitalCollection);
    setSelectedHostel(selectedHospitalCollection.name);
    setSelectedHostelCollection(selectedHospitalCollection);
    setIsHospital(true);
  };

  const setDistrict = (event) => {
    console.log(event);
    setSelectedDistrict(event);
    setSelectedHostel("Select Hospital");
    setIsHospital(!!isHospital);
    axios
      .post(
        `http://${serverURL}:3001/list-hospitals`,
        {
          district: event,
        },
        {}
      )
      .then(function (response) {
        console.log(response);
        if (response.data.status === "ok") {
          console.log("response");
          console.log(response.data.result);
          setHopitalsList(response.data.result);
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
  //       `http://${serverURL}:3001/list-hospital-divisions`,
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
    <div className="container_hospital">
      <div className="contents_hospital">
        <h1>Hospital</h1>
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
            color="var(--mainColor)"
            my="20px"
            borderColor="var(--mainColor)"
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
              placeholder={selectedHostel}
              value={selectedHostel}
              onChange={(e) => setSelectedHospital(e)}
              mb={4}
              color="var(--mainColor)"
              borderColor="var(--mainColor)"
            >
              {hopitalsList.map((hospital, index) => (
                <option key={index} value={JSON.stringify(hospital)}>
                  {hospital.name}
                </option>
              ))}
            </Select>
          )}
        </ChakraProvider>

        {/* Options */}
        {isHospital && (
          <div className="buttons_hospital">
            <h2 onClick={goToHospitalEnquiry}>
              <span>-</span>Hospital Enquiry
            </h2>
            <h2 onClick={goToAvailability}>
              <span>-</span>Availability of Doctors
            </h2>
            <h2 onClick={goToMedical}>
              <span>-</span>Medical Facility
            </h2>
            <h2 onClick={goToOP}>
              <span>-</span>OP ticket status
            </h2>
            {/* 
            <p style={{ marginTop: "15px" }}>
              Name: {selectedDivisionCollection.officer}
            </p>
            <p>Contact Number : {selectedDivisionCollection.contact}</p>
            <p>Email : {selectedDivisionCollection.email}</p> */}
          </div>
        )}
      </div>
      <div className="image_section_hospital">
        <img src="../hospital.svg" alt="hospital Logo" />
      </div>
    </div>
  );
}

export default Hospital;
