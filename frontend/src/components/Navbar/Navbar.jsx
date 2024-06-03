import React, { useContext, useState } from "react";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { AuthContext } from "../AuthContext/AuthContext";
import { USER_TYPE_ADMIN } from "../../utils/constant";

const Navbar = () => {
  const { token, setToken, userData } = useContext(AuthContext);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
    navigate("/login");
    setToken(null);
  };
  const admin = userData?.user_type === USER_TYPE_ADMIN;
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <div className="text-center text-1xl font-bold mx-4">
          <a href="/" className="inline-block">
            Lunch Management
          </a>
        </div>
      </div>
      {admin ? (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 mx-2">
            {token ? (
              <>
                <Link to={"/"} className="mx-2 btn btn-ghost lg:mx-0">
                  Home
                </Link>
                <Link to={"/dashboard"} className="mx-2 btn btn-ghost lg:mx-0">
                  Admin
                </Link>
                {/* <Link to={"/employee"} className="mx-2 btn btn-ghost lg:mx-0">
                Employee
              </Link> */}
              </>
            ) : (
              <>
                <Link to={"/login"} className="mx-2 btn btn-ghost lg:mx-0">
                  Login
                </Link>
                <Link to={"/register"} className="mx-2 btn btn-ghost lg:mx-0">
                  Register
                </Link>
              </>
            )}
            {/* for without backend showing the navbar if backend connected it can be remove  */}
          </ul>
        </div>
      ) : (
        <div className="navbar-center hidden lg:flex">
          <ul className="menu menu-horizontal px-1 mx-2">
            {token ? (
              <>
                <Link to={"/"} className="mx-2 btn btn-ghost lg:mx-0">
                  Home
                </Link>
                {/* <Link to={"/dashboard"} className="mx-2 btn btn-ghost lg:mx-0">
                Admin
              </Link> */}
                <Link to={"/employee"} className="mx-2 btn btn-ghost lg:mx-0">
                  Employee
                </Link>
              </>
            ) : (
              <>
                <Link to={"/login"} className="mx-2 btn btn-ghost lg:mx-0">
                  Login
                </Link>
                <Link to={"/register"} className="mx-2 btn btn-ghost lg:mx-0">
                  Register
                </Link>
              </>
            )}
            {/* for without backend showing the navbar if backend connected it can be remove  */}
          </ul>
        </div>
      )}
      <div className="navbar-end">
        <div className="dropdown relative">
          {token && (
            <>
              <button
                onClick={toggleDropdown}
                className="btn btn-ghost mx-4 lg:mx-0"
              >
                Profile
              </button>
            </>
          )}
          {isDropdownOpen && (
            <ul className="dropdown-content absolute right-0 mt-2 w-48 bg-base-100 rounded-md shadow-lg">
              <li>
                <button className="block w-full text-left px-4 py-2">
                  {userData?.username}
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="block w-full text-left px-4 py-2"
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
