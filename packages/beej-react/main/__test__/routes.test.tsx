import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LandingPage from "@/pages/public/LandingPage";
import ChakraPage from "./ChakraPage";
import MantinePage from "./MantinePage";
import TailwindPage from "./TailwindPage";

// Routes in application
const testRoutes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
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

export const testRoute = createBrowserRouter(testRoutes);
