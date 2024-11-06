import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logOut } from "../../../store/userSlice";
// import { useState } from "react";
import { Button } from "antd";
import "../index.css";
// import { Content } from "antd/es/layout/layout";
const StudentHeader = () => {
  const { user } = useSelector((s) => s.userReducer);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const userCategory = user.category;
  // console.log("category" , user)

  const handleLogOut = () => {
    dispatch(logOut());
    navigate("/login");
   
  }
    return (
      <div className="main-header">
                  <div className="logo-container">
                <img alt="logo" src="download (1).png" className="logo" />
            </div>
        {user ? (
          <div className={`links-container  "active" : ""`}>
            <NavLink
              to="/"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              Home
            </NavLink>
            <NavLink
              to="/appliedJobs"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              applied jobs
            </NavLink>
            <NavLink
              to="/profile"
              className={({ isActive }) => (isActive ? "active-link" : "nav-link")}
            >
              my Profile
            </NavLink>
            <Button onClick={handleLogOut}>Log out</Button>
          </div>
        ) : (
          <div className={`login-signup-button "active" : ""`}>
            <Link to="/login">
              <Button>Login</Button>
            </Link>
            <Link to="/signup">
              <Button type="primary">Signup</Button>
            </Link>
          </div> 
        )
        }
      </div>
    );
  };


export default StudentHeader;
