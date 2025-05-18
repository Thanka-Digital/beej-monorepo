import React from "react";
import { Box } from "@chakra-ui/react";

import { Button } from "../libraries/chakra/components/ui/button";
import { Provider as ChakraProvider } from "../libraries/chakra/provider/provider";

export default function ChakraPage() {
  return (
    <ChakraProvider>
      <h1>Chakra UI</h1>
      <Box p={4}>
        <Button colorPalette={"brand"}>Click me</Button>
      </Box>
    </ChakraProvider>
  );
}
