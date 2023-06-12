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

const PatientTable = ({ doctorData, setDoctorData, setPatientData }) => {
  const decrementCount = (id) => {
    const updatedData = doctorData.map((patient) => {
      if (patient.id === id) {
        return {
          ...patient,
          count: patient.count > 0 ? patient.count - 1 : 0,
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
              <Th fontSize="xl">OP Count</Th>
            </Tr>
          </Thead>
          <Tbody>
            {doctorData.map((doctor) => (
              <Tr key={doctor.id}>
                <Td>{doctor.name}</Td>
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
                    <Input size="sm" value={doctor.count} readOnly />
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => decrementCount(doctor.id)}
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
