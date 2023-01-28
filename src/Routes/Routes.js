import { createBrowserRouter } from "react-router-dom";
import Main from "../Layout/Main";
import Billing from "../Pages/Billing/Billing";
import ErrorPage from "../Pages/ErrorPage/ErrorPage";
import Home from "../Pages/Home/Home";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Main />,
    errorElement: <ErrorPage />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/home", element: <Home /> },
      { path: "/billing", element: <Billing /> },
    ],
  },
]);
