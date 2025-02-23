"use client";

import { ChakraProvider } from "@chakra-ui/react";
import {
  ColorModeProvider,
  type ColorModeProviderProps,
} from "../components/ui/color-mode";
import customExtendedSystem from "../theme/theme";

export function Provider(props: ColorModeProviderProps) {
  return (
    <ChakraProvider value={customExtendedSystem}>
      <ColorModeProvider {...props} />
    </ChakraProvider>
  );
}
