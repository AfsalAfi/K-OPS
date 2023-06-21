import React, { useState } from "react";
import {
  ChakraProvider,
  Box,
  Center,
  Heading,
  Text,
  Button,
  Image,
} from "@chakra-ui/react";
import "../../Styles/AboutUs.css";

function AboutUs() {
  const [showMore, setShowMore] = useState(false);

  const handleToggleContent = () => {
    setShowMore(!showMore);
  };

  return (
    <ChakraProvider>
      <Box className="container_about_us" id="about_us-page">
        <Center style={{ gap: "6rem" }}>
          <Box className="image_section_about_us" mr={6}>
            <Image src="../../aboutus.svg" alt="About Us Image" width={350} />
          </Box>
          <Box className="contents_about_us">
            <Heading as="h1" fontSize={["40px", "50px", "60px"]} mb={4}>
              About Us
            </Heading>
            {showMore ? (
              <>
                <Text mb={4}>
                  Welcome to our platform, where we strive to simplify your
                  lifestyle by providing a wide range of accessible services
                  tailored to meet your everyday needs. Our goal is to make your
                  life hassle-free and more convenient, allowing you to focus on
                  what truly matters.
                </Text>
                <Text mb={4}>
                  With our platform, you can easily access hospital details,
                  find nearby ration shops, and stay updated with the latest
                  information from KSEB (Kerala State Electricity Board).
                  Whether you need medical assistance, grocery shopping
                  convenience, or electricity-related updates, we've got you
                  covered.
                </Text>
                <Text mb={4}>
                  Our user-friendly interface and reliable data ensure that you
                  have a seamless experience while navigating through our
                  services. We are dedicated to providing you with accurate
                  information, timely updates, and a hassle-free journey towards
                  meeting your everyday needs.
                </Text>

                <button
                  //   colorScheme="blue"
                  className="button_aboutus"
                  onClick={handleToggleContent}
                >
                  Read Less
                </button>
              </>
            ) : (
              <>
                <Text mb={4}>
                  Welcome to our platform, where we strive to simplify your
                  lifestyle by providing a wide range of accessible services
                  tailored to meet your everyday needs. Our goal is to make your
                  life hassle-free and more convenient, allowing you to focus on
                  what truly matters.
                </Text>
                <button
                  className="button_aboutus"
                  onClick={handleToggleContent}
                  mb={4}
                >
                  Read More
                </button>
              </>
            )}
          </Box>
        </Center>
      </Box>
    </ChakraProvider>
  );
}

export default AboutUs;
