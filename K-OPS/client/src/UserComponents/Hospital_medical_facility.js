import React from "react";
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

  let divisionMail;
  const location = useLocation();
  const email = location.state;
  divisionMail = email;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const name = event.target.name.value;
    const contactNumber = event.target.contactNumber.value;
    const email = event.target.email.value;
    const briefDescription = event.target.briefDescription.value;
    const enquiryType = event.target.enquiryType.value;

    console.log("Name:", name);
    console.log("Contact Number:", contactNumber);
    console.log("Email:", email);
    console.log("Brief Description:", briefDescription);
    console.log("Enquiry Type:", enquiryType);

    axios
      .post(
        `http://${serverURL}:3001/kseb-enquries`,
        {
          name: name,
          description: briefDescription,
          type: enquiryType,
          ContactNumber: contactNumber,
          divisionMail: divisionMail.email,
        },
        {}
      )
      .then(function (response) {
        if (response.data.status === "ok") {
          navigate("/");
        } else {
          alert(`${response.data.message}`);
        }
      })

      .catch(function (error) {
        // handle error
      })
      .finally(function () {
        // always executed
      });
  };
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
                <Tr>
                  <Td>General Wards</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>Rooms</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>Laboratory</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>Wound Dressing</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>Ambulance</Td>
                  <Td>Available</Td>
                </Tr>
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
                <Tr>
                  <Td>Ventilators</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>X-ray</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>MRI</Td>
                  <Td>Available</Td>
                </Tr>
                <Tr>
                  <Td>CT-scan</Td>
                  <Td>Available</Td>
                </Tr>
              </Tbody>
            </Table>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default Hospital_medical_facility;
