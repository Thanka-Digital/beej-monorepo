import { Box, Flex } from "@chakra-ui/react";
import { Button } from "./components/ui/button";
import { Provider } from "./provider/provider";
import { CustomInput } from "./components/custom/custom-input";
import { SiLinkedin } from "react-icons/si";

function App() {
  return (
    <Provider>
      <Box p={4} w="full" h="screen">
        <Flex direction="column" h="full" gap={4}>
          <Button variant="outline" colorPalette={"primary"} w="fit">
            Button
          </Button>
          <CustomInput
            label="Name"
            colorPalette={"accent"}
            startElement={<SiLinkedin />}
          />
        </Flex>
      </Box>
    </Provider>
  );
}

export default App;
