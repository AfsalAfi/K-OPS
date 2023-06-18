import React, { useState } from "react";
import "../Styles/KSEB_form.css";
import { IoIosArrowBack } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Grid,
  GridItem,
  Button,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../serverConfig";

function KSEB_report() {
  const navigate = useNavigate();
  let divisionMail;
  const [formValues, setFormValues] = useState({
    place: "",
    landmark: "",
    postNumber: "",
    complaints: "",
    incidentTime: "",
    contactNumber: "",
    email: "",
    name: "",
  });

  const location = useLocation();
  const regId = location.state.regId;
  const backToHome = () => {
    navigate("/");
  };
  const dateTime = formValues.incidentTime.split("T");
  const date = dateTime[0];
  const time = dateTime[1];
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    console.log("Form Values:", formValues.incidentTime);
    console.log("Date:", date);
    console.log("Time:", time);
    axios
      .post(
        `http://${serverURL}:3001/kseb-report-failures`,

        {
          place: formValues.place,
          landMark: formValues.landmark,
          nearByPostNumber: formValues.postNumber,
          Complaint: formValues.complaints,
          email: formValues.email,
          timeOfHappen: time,
          date: date,
          // add cheyynm name
          name: formValues.name,
          ContactNumber: formValues.contactNumber,
          regId: regId,
        },
        {
          headers: {
            Autherization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormValues((prevValues) => ({
      ...prevValues,
      [name]: value,
    }));
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
            <h1>Report Failures</h1>
          </div>
          <img src="../report.svg"></img>
        </div>
        <div className="form_report">
          <ChakraProvider>
            <Box p={4}>
              <form onSubmit={handleSubmit}>
                <Grid
                  templateColumns="repeat(2, 1fr)"
                  gap={4}
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    flexWrap: "wrap",
                  }}
                >
                  <GridItem colSpan={2}>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Place</FormLabel>
                      <Input
                        type="text"
                        name="place"
                        placeholder="Enter place"
                        value={formValues.place}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Name</FormLabel>
                      <Input
                        type="text"
                        name="name"
                        placeholder="Enter name"
                        value={formValues.name}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Landmark</FormLabel>
                      <Input
                        type="text"
                        name="landmark"
                        placeholder="Enter landmark"
                        value={formValues.landmark}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Nearby Post Number</FormLabel>
                      <Input
                        type="text"
                        name="postNumber"
                        placeholder="Enter post number"
                        value={formValues.postNumber}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Complaints or Issue</FormLabel>
                      <Textarea
                        name="complaints"
                        placeholder="Enter complaints or issue"
                        value={formValues.complaints}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Time of Incident</FormLabel>
                      <Input
                        type="datetime-local"
                        name="incidentTime"
                        value={formValues.incidentTime}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Contact Number</FormLabel>
                      <Input
                        type="tel"
                        name="contactNumber"
                        placeholder="Enter contact number"
                        value={formValues.contactNumber}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Email</FormLabel>
                      <Input
                        type="text"
                        name="email"
                        placeholder="Enter email address"
                        value={formValues.email}
                        onChange={handleChange}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <Button
                      type="submit"
                      colorScheme="blue"
                      bg="#172a3a"
                      width="100%"
                      _hover={{ bg: "#172a3a" }}
                      _active={{ bg: "#172a3a" }}
                      _focus={{ boxShadow: "none" }}
                      color="white"
                    >
                      Submit
                    </Button>
                  </GridItem>
                </Grid>
              </form>
            </Box>
          </ChakraProvider>
        </div>
      </div>
    </div>
  );
}

export default KSEB_report;
