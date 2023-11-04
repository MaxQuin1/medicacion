import { createBrowserRouter } from "react-router-dom";
import Login from "../pages/Login";
import Home from "../pages/Home";
<<<<<<< HEAD
import Medicamento from "../pages/Medicamento";
=======
import Registro from "../pages/Registro";
>>>>>>> master

export const rutas = createBrowserRouter([
  {
    path: "/",
    element: <Login />,
  },
  {
    path: "/registro",
    element: <Registro />,
  },
  {
    path: "/home",
    element: <Home />,
  },
  {
    path: "/medicamento",
    element: <Medicamento/>
  }
]);
