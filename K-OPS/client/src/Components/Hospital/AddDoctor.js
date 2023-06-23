import React, { useEffect, useState } from "react";
import "../../Styles/KSEB_form.css";
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
  Button,
} from "@chakra-ui/react";

import { serverURL } from "../../serverConfig.js";

function AddDoctor() {
  //   const navigate = useNavigate();
  //   const [doctorsList, setDoctorsList] = useState([]);

  //   const backToHome = () => {
  //     navigate("/");
  //   };

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
  //   const location = useLocation();
  //   const hospital = location.state.hospital;
  //   console.log(hospital);

  useEffect(() => {
    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/available-doctors`,
        {},
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
          setDoctorsList(response.data.availableDoctors);
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

  const [doctorsList, setDoctorsList] = useState([{}]);

  const [newDoctorData, setNewDoctorData] = useState({
    name: "",
    specialization: "",
    availableTimeFrom: "",
    availableTimeTo: "",
  });
  const [isAddingDoctor, setIsAddingDoctor] = useState(false);

  const addDoctor = () => {
    setIsAddingDoctor(true);
  };

  const handleChange = (field, value) => {
    setNewDoctorData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSubmit = () => {
    const newDoctor = { ...newDoctorData };

    // Check for empty fields
    if (
      newDoctor.name === "" ||
      newDoctor.specialization === "" ||
      newDoctor.availableTimeFrom === "" ||
      newDoctor.availableTimeTo === ""
    ) {
      alert("Please fill in all the fields");
      return;
    }

    const updatedDoctorsList = [...doctorsList, newDoctor];
    setDoctorsList(updatedDoctorsList);
    setIsAddingDoctor(false);
    setNewDoctorData({
      name: "",
      specialization: "",
      availableTimeFrom: "",
      availableTimeTo: "",
    });
    console.log("Updated Doctors List:", updatedDoctorsList);
    console.log("Newly Added Doctor:", newDoctor.name);
    console.log("Newly Added Doctor:", newDoctor.specialization);

    console.log("Newly Added Doctor:", newDoctor.availableTimeFrom);

    console.log("Newly Added Doctor:", newDoctor.availableTimeTo);
    console.log("Newly Added Doctor:", newDoctor.doctor_id);

    axios
      .post(
        `http://${serverURL}:3001/admin/hospital/add-newDoctor`,
        {
          name: newDoctor.name,
          specialization: newDoctor.specialization,
          availableTimeFrom: newDoctor.availableTimeFrom,
          availableTimeTo: newDoctor.availableTimeTo,
          doctor_id: newDoctor.doctor_id,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then(function (response) {
        console.log(response);
      })

      .catch(function (error) {
        console.log(error);
      })
      .finally(function () {
        console.log("ethi");
      });
  };

  const isFormValid =
    newDoctorData.name &&
    newDoctorData.specialization &&
    newDoctorData.availableTimeFrom &&
    newDoctorData.doctor_id &&
    newDoctorData.availableTimeTo;

  return (
    <div className="inside_container_KESB_report">
      <div>
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
                <Th>Doctor Id</Th>
              </Tr>
            </Thead>
            <Tbody>
              {doctorsList.map((doctor, index) => (
                <Tr key={index}>
                  <Td>{doctor.name}</Td>
                  <Td>{doctor.specialization}</Td>
                  <Td>{doctor.availableTimeFrom}</Td>
                  <Td>{doctor.availableTimeTo}</Td>
                  <Td>{doctor.doctor_id}</Td>
                </Tr>
              ))}
              {isAddingDoctor && (
                <Tr>
                  <Td>
                    <input
                      type="text"
                      placeholder="Dr.Name"
                      value={newDoctorData.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                      style={{ background: "transparent" }}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      placeholder="MBBS"
                      value={newDoctorData.specialization}
                      onChange={(e) =>
                        handleChange("specialization", e.target.value)
                      }
                      style={{ background: "transparent" }}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      placeholder="10:00AM"
                      value={newDoctorData.availableTimeFrom}
                      onChange={(e) =>
                        handleChange("availableTimeFrom", e.target.value)
                      }
                      style={{ background: "transparent" }}
                    />
                  </Td>
                  <Td>
                    <input
                      type="text"
                      placeholder="04:00PM"
                      value={newDoctorData.availableTimeTo}
                      onChange={(e) =>
                        handleChange("availableTimeTo", e.target.value)
                      }
                      style={{ background: "transparent" }}
                    />
                  </Td>

                  <Td>
                    <input
                      type="text"
                      placeholder="DOC123"
                      value={newDoctorData.doctor_id}
                      onChange={(e) =>
                        handleChange("doctor_id", e.target.value)
                      }
                      style={{ background: "transparent" }}
                    />
                  </Td>
                  <Td>
                    <Button onClick={handleSubmit} disabled={!isFormValid}>
                      Submit
                    </Button>
                  </Td>
                </Tr>
              )}
            </Tbody>
          </Table>
          {!isAddingDoctor && <Button onClick={addDoctor}>Add Doctor +</Button>}
        </ChakraProvider>
      </div>
      <div
        className="img_report"
        style={{ gap: "3rem", display: "flex", alignItems: "center" }}
      >
        <div
          className="h1_KSEB_report"
          style={{ display: "flex", alignItems: "center", width: "100%" }}
        >
          <h1>Create Doctors</h1>
        </div>
        <img src="../doctor.svg"></img>
      </div>
    </div>
  );
}

export default AddDoctor;
