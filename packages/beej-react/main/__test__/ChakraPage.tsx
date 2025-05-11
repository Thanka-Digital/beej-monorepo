import { Button } from "../libraries/chakra/components/ui/button";
import { Provider as ChakraProvider } from "../libraries/chakra/provider/provider";
import { Box } from "@chakra-ui/react";

export default function ChakraPage() {
  return (
    <ChakraProvider>
      <Box p={4}>
        <Button variant="outline" colorPalette={"primary"}>
          Click me
        </Button>
      </Box>
    </ChakraProvider>
  );
}
