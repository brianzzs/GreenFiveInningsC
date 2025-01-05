import React from "react";
import { Box, Text } from "@chakra-ui/react";

interface FooterComponentProps {
  isLoading: boolean;
}

const FooterComponent: React.FC<FooterComponentProps> = ({ isLoading }) => {
  if (isLoading) {
    return null;
  }

  return (
    <Box
      as="footer"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bg="#182223"
      color="white"
      position="fixed"
      bottom={0}
      width="100%"
      height="50px"
    >
      <Text textAlign="center" fontSize="sm">
        Five Innings Friend - Copyright 2023 - All Rights Reserved - Made by
        Brian Zanoni
      </Text>
    </Box>
  );
};

export default FooterComponent;
