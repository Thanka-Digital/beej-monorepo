import { RouterProvider } from "react-router-dom";
import { testRoute } from "./routes.test";

export default function AppTestRouter() {
  return <RouterProvider router={testRoute} />;
}
