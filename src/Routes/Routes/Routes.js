import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About/About";
import Appointment from "../../Pages/Appointment/Appointment/Appointment";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import SingUp from "../../Pages/SignUp/SingUp";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SingleServices from "../../Pages/Home/Services/SingleServices";
import WeddingShop from "../../Pages/WeddingShop/WeddingShop/WeddingShop";
import WeddingShopSingleItem from "../../Pages/WeddingShop/WeddingShopSingleItem/WeddingShopSingleItem";
import WeddingShopHome from "../../Pages/WeddingShop/WeddingShopSingleItem/WeddingShopHome";
import NotFound from "../../Pages/About/NotFound/NotFound";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Main></Main>,
    children: [
      {
        path: "/",
        element: <Home></Home>,
      },
      {
        path: "/login",
        element: <Login></Login>,
      },
      {
        path: "/signup",
        element: <SingUp></SingUp>,
      },
      {
        path: "/appointment",
        element: <Appointment></Appointment>,
      },

      {
        path: "details/:_id",
        element: <SingleServices></SingleServices>,
      },
      {
        path: "/about",
        element: <About></About>,
      },
      {
        path: "/weddingShop",
        element: <WeddingShop></WeddingShop>,
      },
      {
        path: "/productDetails/:id",
        element: <WeddingShopHome></WeddingShopHome>,
      },
      {
        path: "*",
        element: <NotFound />,
      },
    ],
  },
  {
    path: "/dashboard",
    element: (
      <PrivateRoute>
        <Dashboard></Dashboard>
      </PrivateRoute>
    ),
  },
]);
export default router;
