import React from "react";
import "@mantine/core/styles.css";

import { Box, Button, MantineProvider } from "@mantine/core";
import { customTheme } from "../libraries/mantine/theme/theme";

export default function MantinePage() {
  return (
    <MantineProvider theme={customTheme}>
      <Box p={4}>
        <Button variant="outline" color={"secondary"}>
          Click me
        </Button>
      </Box>
    </MantineProvider>
  );
}
