import React from "react";
import { Box, Avatar, Text, ChakraProvider } from "@chakra-ui/react";

function TestimonialCard({ name, designation, testimonial }) {
  return (
    <ChakraProvider>
      <Box
        maxW="sm"
        borderWidth="1px"
        borderRadius="lg"
        overflow="hidden"
        p={4}
        boxShadow="md"
        style={{ borderColor: "var(--secondaryColor)" }}
      >
        <Avatar name={name} size="lg" mb={4} />
        <Text fontWeight="bold" fontSize="xl" mb={2}>
          {name}
        </Text>
        <Text style={{ color: "var(--secondaryColor)" }} fontSize="lg" mb={4}>
          {designation}
        </Text>
        <Text style={{ color: "var(--textColor)" }} fontSize="md">
          {testimonial}
        </Text>
      </Box>
    </ChakraProvider>
  );
}

export default TestimonialCard;
