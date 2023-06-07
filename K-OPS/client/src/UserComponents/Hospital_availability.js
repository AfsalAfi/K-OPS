import React, { useEffect, useState } from "react";
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
  const [doctorsList, setDoctorsList] = useState([]);

  const backToHome = () => {
    navigate("/");
  };

  // const doctors = [
  //   {
  //     name: "Dr. John Doe",
  //     specializedIn: "Cardiology",
  //     from: "9:00 AM",
  //     to: "5:00 PM",
  //   },
  //   {
  //     name: "Dr. Jane Smith",
  //     specializedIn: "Dermatology",
  //     from: "10:00 AM",
  //     to: "6:00 PM",
  //   },
  //   // Add more dummy data here if needed
  // ];
  const location = useLocation();
  const hospital = location.state.hospital;
  console.log(hospital);

  useEffect(() => {
    axios
      .post(
        `http://${serverURL}:3001/available-doctors`,
        {
          hospital: hospital
        },
      )
      .then((response) => {
        console.log("response nokke");
        console.log(response);
        if (response.data.status === "ok") {
          console.log(response.data.availableDoctors);
          setDoctorsList(response.data.availableDoctors)
        } else {
          alert(`${response.data.message}`);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

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
                {doctorsList.map((doctor, index) => (
                  <Tr key={index}>
                    <Td>{doctor.name}</Td>
                    <Td>{doctor.specialization}</Td>
                    <Td>{doctor.availableTimeFrom}</Td>
                    <Td>{doctor.availableTimeTo}</Td>
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
