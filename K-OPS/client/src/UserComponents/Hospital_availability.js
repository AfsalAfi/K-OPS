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

function Hospital_availability() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  const doctors = [
    {
      name: "Dr. John Doe",
      specializedIn: "Cardiology",
      from: "9:00 AM",
      to: "5:00 PM",
    },
    {
      name: "Dr. Jane Smith",
      specializedIn: "Dermatology",
      from: "10:00 AM",
      to: "6:00 PM",
    },
    // Add more dummy data here if needed
  ];
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
            <h1>Availability of Doctors</h1>
          </div>
          <img src="../doctor.svg"></img>
        </div>
        <div className="form_report">
          <ChakraProvider>
            <Table
              variant="outline"
              style={{ border: "1px solid var(--mainColor)" }}
            >
              <Thead style={{ border: "1px solid var(--mainColor)" }}>
                <Tr>
                  <Th>Name</Th>
                  <Th>Specialized In</Th>
                  <Th>From</Th>
                  <Th>To</Th>
                </Tr>
              </Thead>
              <Tbody>
                {doctors.map((doctor, index) => (
                  <Tr key={index}>
                    <Td>{doctor.name}</Td>
                    <Td>{doctor.specializedIn}</Td>
                    <Td>{doctor.from}</Td>
                    <Td>{doctor.to}</Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default Hospital_availability;
