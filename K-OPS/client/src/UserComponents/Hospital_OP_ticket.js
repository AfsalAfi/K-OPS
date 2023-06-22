import React, { useEffect } from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  Button,
  HStack,
  Input,
} from "@chakra-ui/react";
import { useLocation, useNavigate } from "react-router-dom";
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { IoIosArrowBack } from "react-icons/io";
import { MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { serverURL } from "../serverConfig";

const Hospital_OP_ticket = () => {
  const [data, setData] = useState([]);

  const location = useLocation();
  const regId = location.state.regId;
  console.log(regId);
  const navigate = useNavigate();


  useEffect(() => {
    axios
      .post(
        `http://${serverURL}:3001/available-doctors`,
        { hospital: regId },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log("response nokke");
        console.log(response);
        if (response.data.status === "ok") {
          console.log(response.data.availableDoctors);
          setData(response.data.availableDoctors);
        } else {
          console.log(`${response.data.message}`);
        }
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        // always executed
      });
  }, []);

  const backToHome = () => {
    navigate("/");
  };

  return (
    <ChakraProvider>
      <div
        style={{
          width: "100%",
          height: "100vh",
          background: "var(--mainColorLight)",
          display: "flex",
        }}
      >
        <div
          style={{
            display: "flex",
            // flexDirection: "column",
            alignItems: "center",
            width: "100%",
            height: "100vh",
            justifyContent: "space-evenly",
          }}
        >
          <div style={{
            display: "flex",
            flexDirection: "column",
            gap: "2rem"
          }}>
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
            <Table
              variant="simple"
              colorScheme="blackAlpha"
              style={{ width: "50%" }}
            >
              <Thead>
                <Tr>
                  <Th fontSize="xl">Doctors Name</Th>
                  <Th fontSize="xl">From</Th>
                  <Th fontSize="xl">To</Th>
                  <Th fontSize="xl">OP Count</Th>
                </Tr>
              </Thead>
              <Tbody>
                {data.map((doctor) => (
                  <Tr key={doctor.id}>
                    <Td>{doctor.name}</Td>
                    <Td>{doctor.availableTimeFrom}</Td>
                    <Td>{doctor.availableTimeTo}</Td>

                    <Td>
                      <HStack maxW="320px">
                        <Input size="sm" value={doctor.opTickets} readOnly />
                      </HStack>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </div>
          <div
            className="img_report"
            style={{
              height: "100vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <img src="../doctors.svg"></img>
          </div>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default Hospital_OP_ticket;
