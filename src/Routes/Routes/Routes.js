import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import About from "../../Pages/About/About/About";
import Dashboard from "../../Pages/Dashboard/Dashboard/Dashboard";
import Home from "../../Pages/Home/Home/Home";
import Login from "../../Pages/Login/Login";
import PrivateRoute from "../PrivateRoute/PrivateRoute";
import SingleServices from "../../Pages/Home/Services/SingleServices";
import WeddingShop from "../../Pages/WeddingShop/WeddingShop/WeddingShop";
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
import Gallery from "../../Pages/Gallery/Gallery";
import EventCoordination from "../../Pages/EventCoordination/EventCoordination";
import SignUp from "../../Pages/SignUp/SignUp";
import ManageUser from "../../Pages/Dashboard/Dashboard/DashboardHome/ManageUser/ManageUser";
import ManageWeddingShop from "../../Pages/Dashboard/Dashboard/DashboardHome/ManageWeddingShop/ManageWeddingShop";
import ManageReviews from "../../Pages/Dashboard/Dashboard/DashboardHome/ManageReviews/ManageReviews";
import FindYourMatch from "../../Pages/FindYourMatch/FindYourMatch";
import FindYourMatchDetail from "../../Pages/FindYourMatch/FindYourMatchDetail";
import UnlockBiodata from "../../Pages/Dashboard/Dashboard/DashboardHome/UnlockBiodata/UnlockBiodata";
import AdminPremiumControl from "../../Pages/Dashboard/Dashboard/DashboardHome/AdminPremiumControl/AdminPremiumControl";
import ManageBiodatas from "../../Pages/Dashboard/Dashboard/DashboardHome/ManageBiodatas/ManageBiodatas";
import AdminCreateBiodata from "../../Pages/Dashboard/Dashboard/DashboardHome/AdminCreateBiodata/AdminCreateBiodata";
import MyBooking from "../../Pages/Dashboard/Dashboard/DashboardHome/MyBooking/MyBooking";
import AllBooking from "../../Pages/Dashboard/Dashboard/DashboardHome/AllBooking/AllBooking";

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
        element: <SignUp></SignUp>,
      },
      {
        path: "/gallery",
        element: <Gallery></Gallery>,
      },
      {
        path: "/findYourMatch",
        element: <FindYourMatch />,
      },
      {
        path: "/findYourMatch/:id",
        element: <FindYourMatchDetail />,
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
        path: "/eventCoordination",
        element: <EventCoordination></EventCoordination>,
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
    element: (
      <PrivateRoute>
        <Dashboard />
      </PrivateRoute>
    ),
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
        path: "premium-control",
        element: <AdminPremiumControl />,
      },
      {
        path: "manage-review",
        element: <ManageReviews />,
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
        path: "manage-biodatas",
        element: <ManageBiodatas />,
      },
      {
        path: "create-biodatas",
        element: <AdminCreateBiodata />,
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
      {
        path: "manage-user",
        element: <ManageUser />,
      },
      {
        path: "manage-shop",
        element: <ManageWeddingShop />,
      },
      {
        path: "my-booking",
        element: <MyBooking />,
      },
      {
        path: "all-booking",
        element: <AllBooking />,
      },
      {
        path: "unlock-biodata",
        element: <UnlockBiodata />,
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
