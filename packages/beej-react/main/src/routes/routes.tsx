import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LandingPage from "@/pages/public/LandingPage";
import { testRoutes } from "../../__test__/routes.test";

// Routes in application
const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
  ...testRoutes,
];

export const route = createBrowserRouter(routes);
