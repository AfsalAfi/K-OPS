import React from "react";
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
  Select,
} from "@chakra-ui/react";
import { ChakraProvider } from "@chakra-ui/react";
import { serverURL } from "../serverConfig";

function KSEB_enquiry() {
  const navigate = useNavigate();

  const backToHome = () => {
    navigate("/");
  };

  let divisionMail;
  const location = useLocation();
  const email = location.state;
  const regId = location.state.regId;
  divisionMail = email;

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission logic here
    const name = document.getElementById("name").value;
    const contactNumber = document.getElementById("contactNumber").value;
    const briefDescription = document.getElementById("briefDescription").value;
    const enquiryType = document.getElementById("enquiryType").value;
    const email = document.getElementById("email").value;

    console.log("Name:", name);
    console.log("Contact Number:", contactNumber);
    console.log("Brief Description (Enquiry Details):", briefDescription);
    console.log("Enquiry Type:", enquiryType);

    axios
      .post(
        `http://${serverURL}:3001/kseb-enquries`,
        {
          name: name,
          description: briefDescription,
          type: enquiryType,
          ContactNumber: contactNumber,
          // divisionMail: divisionMail.email,
          email: email,
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
            <h1>Enquiries or Complaints</h1>
          </div>
          <img src="../enquiry.svg"></img>
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
                      <FormLabel>Name</FormLabel>
                      <Input
                        id="name"
                        type="text"
                        required
                        placeholder="Enter your name"
                        style={{ color: "#7a9e9f" }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Email Address</FormLabel>
                      <Input
                        id="email"
                        type="email"
                        placeholder="Enter email address"
                        style={{ color: "#7a9e9f" }}
                        required
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Contact Number</FormLabel>
                      <Input
                        id="contactNumber"
                        type="tel"
                        pattern="[0-9]{10}"
                        required
                        placeholder="Enter contact number"
                        style={{ color: "#7a9e9f" }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem colSpan={2}>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Brief Description (Enquiry Details)</FormLabel>
                      <Textarea
                        id="briefDescription"
                        placeholder="Enter your enquiry details"
                        required
                        style={{ color: "#7a9e9f", height: "200px" }}
                      />
                    </FormControl>
                  </GridItem>
                  <GridItem>
                    <FormControl isRequired borderColor="#7a9e9f">
                      <FormLabel>Enquiry Type</FormLabel>
                      <Select id="enquiryType">
                        <option value="office">Related to Office</option>
                        <option value="other">Other</option>
                      </Select>
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

export default KSEB_enquiry;
