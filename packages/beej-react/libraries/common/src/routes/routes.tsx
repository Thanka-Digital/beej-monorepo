import { createBrowserRouter, type RouteObject } from "react-router-dom";
import LandingPage from "../pages/public/LandingPage";

// Routes in application
const routes: RouteObject[] = [
  {
    path: "/",
    element: <LandingPage />,
  },
];

export const route = createBrowserRouter(routes);
