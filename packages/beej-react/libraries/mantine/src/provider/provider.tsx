import "@mantine/core/styles.css";
import { PropsWithChildren } from "react";

import { MantineProvider } from "@mantine/core";
import { customTheme } from "../theme/theme";

export function Provider({ children }: PropsWithChildren) {
  return <MantineProvider theme={customTheme}>{children}</MantineProvider>;
}
