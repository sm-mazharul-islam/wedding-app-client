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
import AllOrderProduct from "../../Pages/Dashboard/Dashboard/DashboardHome/AllOrderProduct";
import CreateAdmin from "../../Pages/Dashboard/Dashboard/DashboardHome/CreateAdmin";
import AddProducts from "../../Pages/Dashboard/Dashboard/DashboardHome/AddProducts";
import DashboardLayout from "../../Layout/DashboardLayout";
import AddReviews from "../../Pages/Dashboard/Dashboard/DashboardHome/AddReviews";
import ViewCart from "../../Pages/Dashboard/Dashboard/DashboardHome/ViewCart/ViewCart";
import AllPackage from "../../Pages/Dashboard/Dashboard/DashboardHome/AllPackage/AllPackage";
import AddPackage from "../../Pages/Dashboard/Dashboard/DashboardHome/AddPackage/AddPackage";
import DashboardHome from "../../Pages/Dashboard/Dashboard/DashboardHome/DashboardHome";

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
        path: "productDetails/:id",
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
    element: <Dashboard />,
    children: [
      {
        index: true, // This makes it the default view for /dashboard
        element: <DashboardHome />,
      },

      {
        path: "allOrderProduct",
        element: <AllOrderProduct />,
      },
      {
        path: "create-admin",
        element: <CreateAdmin />,
      },
      {
        path: "all-packages",
        element: <AllPackage />,
      },
      {
        path: "add-package",
        element: <AddPackage />,
      },
      {
        path: "add-reviews",
        element: <AddReviews />,
      },
      {
        path: "add-products",
        element: <AddProducts />,
      },
      {
        path: "add-cart",
        element: <ViewCart />,
      },
    ],
    // element: (
    //   <PrivateRoute>
    //     <Dashboard></Dashboard>
    //   </PrivateRoute>
    // ),
  },
]);
export default router;
