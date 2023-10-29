import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  }
]);
