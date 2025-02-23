import { RouterProvider } from "react-router-dom";

import { route } from "./routes";

export default function AppRouter() {
  return <RouterProvider router={route} />;
}
