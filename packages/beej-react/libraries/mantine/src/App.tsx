import { Box, Button } from "@mantine/core";
import { Provider } from "./provider/provider";

function App() {
  return (
    <Provider>
      <Box p={4}>
        <Button color="primary" variant="outline">
          This is button
        </Button>
      </Box>
    </Provider>
  );
}

export default App;
