import React from "react";
import { RouteObject } from "react-router-dom";

import ChakraPage from "./ChakraPage";
import MantinePage from "./MantinePage";
import TailwindPage from "./TailwindPage";

export const testRoutes: RouteObject[] = [
  {
    path: "/tests/*",
    children: [
      {
        path: "chakra",
        element: <ChakraPage />,
      },
      {
        path: "mantine",
        element: <MantinePage />,
      },
      {
        path: "tailwindcss",
        element: <TailwindPage />,
      },
    ],
  },
];
