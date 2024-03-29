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


function Hospital() {
  const [isHospital, setIsHospital] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState("");
  const [selectedHostel, setSelectedHostel] = useState("Select Hospital");
  const [selectedHostelCollection, setSelectedHostelCollection] =
    useState("Select Hospital");
  const [hopitalsList, setHopitalsList] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("operator") === "Hospital") {
      if (localStorage.getItem("district") != null) {
        setDistrict(localStorage.getItem("district"))
      }
      if (localStorage.getItem("Hospital") != (null || "null")) {
        setSelectedHospital(localStorage.getItem("Hospital"))
      }
    }
  }, []);


  const goToHospitalEnquiry = () => {
    navigate("/hospital/enquiry", {
      state: { regId: selectedHostelCollection.regId },
    });
  };

  const goToAvailability = () => {
    navigate("/hospital/availability", {
      state: { hospital: selectedHostelCollection.regId },
    });
  };

  const goToMedical = () => {
    navigate("/hospital/medical-facility", {
      state: {
        regId: selectedHostelCollection.regId,
        equipments: selectedHostelCollection.equipments,
        facilities: selectedHostelCollection.facilities,
      },
    });
  };

  const goToOP = () => {
    navigate("/hospital/OP-ticket", {
      state: { regId: selectedHostelCollection.regId },
    });
  };

  const setSelectedHospital = (e) => {
    const selectedHospitalCollection = JSON.parse(e);
    console.log(selectedHospitalCollection);
    localStorage.setItem("Hospital", e);
    setSelectedHostel(selectedHospitalCollection.name);
    setSelectedHostelCollection(selectedHospitalCollection);
    setIsHospital(true);
  };

  const setDistrict = (event) => {
    console.log(event);
    setSelectedDistrict(event);
    setSelectedHostel("Select Hospital");
    setIsHospital(false);
    axios
      .post(
        `http://${serverURL}:3001/list-hospitals`,
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

  function assignDistrict(e) {
    setSelectedHostel("Select Hospital")
    localStorage.setItem("RationShop", "null");
    localStorage.setItem("KSEB", "null");
    localStorage.setItem("Hospital", "null");
    localStorage.setItem("operator", "Hospital");
    setSelectedDistrict(e);
    setSelectedHostel("Select Hospital");
    setIsHospital(false);
    axios
      .post(
        `http://${serverURL}:3001/list-hospitals`,
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
        console.log(response);
        if (response.data.status === "ok") {
          console.log("response");
          console.log(response.data.result);
          setHopitalsList(response.data.result);
        }
      })
    localStorage.setItem("district", e);
  }

  return (
    <div className="container_hospital" id="hospital-page">
      <div className="contents_hospital">
        <h1>Hospital</h1>
        <p>
          Explore our services, report failures, make enquiries or complaints,
          and stay updated with our notifications. Together, let's power a
          brighter future for Kerala.
        </p>
        {/* District selection */}
        <ChakraProvider>
          <Select
            placeholder="Select District"
            value={selectedDistrict}
            onChange={(e) => assignDistrict(e.target.value)}
            mb={4}
            color="var(--mainColorLight)"
            my="20px"
            borderColor="var(--mainColorLight)"
          >
            {districts.map((district) => (
              <option key={district.id} value={district.name} style={{ color: "var(--mainColor)" }}>
                {district.name}
              </option>
            ))}
          </Select>

          {/* Division selection */}
          {selectedDistrict && (
            <Select
              placeholder={selectedHostel}
              value={selectedHostel}
              onChange={(e) => setSelectedHospital(e.target.value)}
              mb={4}
              color="var(--mainColorLight)"
              borderColor="var(--mainColorLight)"
            >
              {hopitalsList.map((hospital, index) => (
                <option key={index} value={JSON.stringify(hospital)} style={{ color: "var(--mainColor)" }}>
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
