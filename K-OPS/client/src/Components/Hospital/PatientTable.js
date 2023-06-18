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
import { AddIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { MinusIcon } from "@chakra-ui/icons";
import axios from "axios";
import { serverURL } from "../../serverConfig";

const PatientTable = ({ doctorData, setDoctorData, setPatientData }) => {
  const decrementCount = (id) => {
    const updatedData = doctorData.map((patient) => {
      console.log(patient);
      if (patient.doctor_id === id) {
        axios
          .post(
            `http://${serverURL}:3001/admin/hospital/op-ticket-decrementing`,
            {
              doctor_id: patient.doctor_id,
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
              window.location.reload();
            }
          })

          .catch(function (error) {
            console.log(error);
          })
          .finally(function () {
            console.log("ethi");
          });
        return {
          ...patient,
          opTickets: patient.opTickets - 1,
        };
      }
      return patient;
    });
    setDoctorData(updatedData);
  };

  useEffect(() => {
    setPatientData(doctorData);
  }, [doctorData, setPatientData]);

  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
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
            {doctorData.map((doctor) => (
              <Tr key={doctor.id}>
                <Td>{doctor.name}</Td>
                <Td>{doctor.availableTimeFrom}</Td>
                <Td>{doctor.availableTimeTo}</Td>

                <Td>
                  <HStack maxW="320px">
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      isDisabled
                    >
                      +
                    </Button>
                    <Input size="sm" value={doctor.opTickets} readOnly />
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => decrementCount(doctor.doctor_id)}
                    >
                      -
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
        <div
          className="img_report"
          style={{ gap: "3rem", display: "flex", alignItems: "center" }}
        >
          <div
            className="h1_KSEB_report"
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <h1>For Doctors</h1>
          </div>
          <img src="../doctors.svg"></img>
        </div>
      </div>
    </ChakraProvider>
  );
};

export default PatientTable;
