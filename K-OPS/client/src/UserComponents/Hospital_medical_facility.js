import React, { useEffect } from "react";
import "../Styles/KSEB_form.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
} from "@chakra-ui/react";

import { serverURL } from "../serverConfig";

function Hospital_medical_facility() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const location = useLocation();
  const equipments = location.state.equipments;
  const facilities = location.state.facilities;

  // useEffect(() => {
  //   axios
  //     .post(
  //       `http://${serverURL}:3001/medical-facilities`,
  //       {
  //         regId: regId
  //       })
  //     .then(function (response) {
  //       if (response.data.status === "ok") {
  //         console.log(response.data);
  //       } else {
  //         alert(`${response.data.message}`);
  //       }
  //     })

  //     .catch(function (error) {
  //       // handle error
  //     })
  //     .finally(function () {
  //       // always executed
  //     });
  // }, []);

  // const handleSubmit = (event) => {
  //   event.preventDefault();
  //   // Handle form submission logic here
  //   // const name = event.target.name.value;
  //   // const contactNumber = event.target.contactNumber.value;
  //   // const email = event.target.email.value;
  //   // const briefDescription = event.target.briefDescription.value;
  //   // const enquiryType = event.target.enquiryType.value;

  //   // console.log("Name:", name);
  //   // console.log("Contact Number:", contactNumber);
  //   // console.log("Email:", email);
  //   // console.log("Brief Description:", briefDescription);
  //   // console.log("Enquiry Type:", enquiryType);

  // };
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
            <h1>Medical Facility</h1>
          </div>
          <img src="../medical.svg"></img>
        </div>
        <div className="form_report">
          <ChakraProvider>
            <Table variant="simple">
              <Thead>
                <Tr>
                  <Th colSpan="2">
                    <h2 className="h2">Facility</h2>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {facilities.map((item, index) => {
                  return Object.entries(item).map(([key, value]) => (
                    <Tr key={`${key}-${index}`}>
                      <Td>{key}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ));
                })}
              </Tbody>
            </Table>

            <Table variant="simple" marginTop="2rem">
              <Thead>
                <Tr>
                  <Th colSpan="2">
                    <h2 className="h2">Requirements</h2>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {equipments.map((item, index) => {
                  return Object.entries(item).map(([key, value]) => (
                    <Tr key={`${key}-${index}`}>
                      <Td>{key}</Td>
                      <Td>{value}</Td>
                    </Tr>
                  ));
                })}
              </Tbody>
            </Table>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default Hospital_medical_facility;
