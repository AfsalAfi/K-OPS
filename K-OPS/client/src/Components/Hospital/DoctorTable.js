import React, { useEffect } from "react";
import {
  ChakraProvider,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  HStack,
  Button,
  Input,
} from "@chakra-ui/react";
import { AddIcon } from "@chakra-ui/icons";

const DoctorTable = ({ patientData, setPatientData }) => {
  const incrementCount = (id) => {
    const updatedData = patientData.map((doctor) => {
      if (doctor.id === id) {
        return {
          ...doctor,
          count: doctor.count + 1,
        };
      }
      return doctor;
    });
    setPatientData(updatedData);
  };

  return (
    <ChakraProvider>
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "space-evenly",
        }}
      >
        <div
          className="img_report"
          style={{ gap: "3rem", display: "flex", alignItems: "center" }}
        >
          <div
            className="h1_KSEB_report"
            style={{ display: "flex", alignItems: "center", width: "100%" }}
          >
            <h1>For Hospital</h1>
          </div>
          <img src="../hospital2.svg"></img>
        </div>
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
            {patientData.map((doctor) => (
              <Tr key={doctor.id}>
                <Td>{doctor.name}</Td>
                <Td>{doctor.name}</Td>
                <Td>{doctor.name}</Td>
                <Td>
                  <HStack maxW="320px">
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      onClick={() => incrementCount(doctor.id)}
                    >
                      +
                    </Button>
                    <Input size="sm" value={doctor.count} readOnly />
                    <Button
                      variant="outline"
                      colorScheme="teal"
                      size="sm"
                      isDisabled
                    >
                      -
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </div>
    </ChakraProvider>
  );
};

export default DoctorTable;
