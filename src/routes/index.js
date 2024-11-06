import { createBrowserRouter, RouterProvider } from "react-router-dom";
import LayoutWrapper from "../components/Layout";
import Home from "./Home";
import UserProfile from "./UserProfile";
import Login from "./Login";
import Signup from "./Signup";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { isUserLoggedIn } from "../store/userSlice";
import MyJobs from "./myJobs/index";
import CreateJob from "./createJob";
import AppliedJob from "./appliedJobs/index";
import UserList from "./userList";
import CompanyList from "./companyList";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LayoutWrapper />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/my-jobs",
        element: <MyJobs />,
      },
      {
        path: "/profile",
        element: <UserProfile />,
      },
      {
        path: "/CreateJob",
        element: <CreateJob />,
      },
      {
        path: "/login",
        element: <Login />,
      },
      {
        path: "/signup",
        element: <Signup />,
      },
      {
        path: "/appliedJobs",
        element: <AppliedJob />,
      },
      {
        path: "/user-list",
        element: <UserList />,
      },
      {
        path: "/company-list",
        element: <CompanyList />,
      },
    ],
  },
]);

const Routes = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const user = localStorage.getItem("user");
    console.log("🚀 ~ useEffect ~ user:", user);
    dispatch(isUserLoggedIn(JSON.parse(user)));
  }, [dispatch]);

  return <RouterProvider router={router} />;
};

export default Routes;
