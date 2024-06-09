import React from "react";
import "./sideScreen.css";
import { Link, useLocation } from "react-router-dom";
import { LuLayoutDashboard } from "react-icons/lu";
import { SiSololearn } from "react-icons/si";
import { FaBook } from "react-icons/fa";
import { MdOutlineQuiz } from "react-icons/md";
import { RiProgress5Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { IoIosLogOut } from "react-icons/io";
import { logout } from "../../redux/action/AuthAction";
import { PiCertificateThin } from "react-icons/pi";
import { SiPytest } from "react-icons/si";
// import { logout } from "../../action/AuthAction";
const SideScreen = ({ startMainExamNotDisplaySideBar, children }) => {
  const location = useLocation();
  const pathValue = location.pathname;
  const UUU = useSelector((state) => state.authReducer.authData);

  const dispatch = useDispatch();
  const handleLogOut = () => {
    dispatch(logout());
  };
  // console.log(startMainExamNotDisplaySideBar);

  return (
    <div className="home-main">
      {pathValue !== "/registor" &&
        startMainExamNotDisplaySideBar !== true &&
        pathValue !== "/certificate" &&
        pathValue !== "/intership" && (
          <div className="sidebar-left-side">
            <span
              style={{
                color: "#fff",
                fontSize: "20px",
                fontWeight: "bold",
              }}
            >
              NGS
            </span>
            <div className="profile-images">
              <img src="images/profile-pic.png" alt="profile-pic" />
              <h4>{UUU?.firstName}</h4>
            </div>
            {UUU?.role === 1 ? (
              <Link to="/" className="link-card">
                <LuLayoutDashboard />
                <span>DashBoard</span>
              </Link>
            ) : (
              UUU?.role === 2 && (
                <Link to="/" className="link-card">
                  <LuLayoutDashboard />
                  <span>DashBoard</span>
                </Link>
              )
            )}
            {UUU?.role === 3 && (
              <Link to="/learning" className="link-card">
                <SiSololearn />
                <span>Learn & Practies</span>
              </Link>
            )}

            {UUU?.role === 3 && (
              <Link to="/exam" className="link-card">
                <FaBook />
                <span>Exams</span>
              </Link>
            )}

            {UUU?.role === 3 && (
              <Link to="/quize" className="link-card">
                <MdOutlineQuiz />
                <span>Quize</span>
              </Link>
            )}

            {UUU?.role === 3 && (
              <Link to="/certificate" className="link-card">
                <PiCertificateThin />
                <span>certificate</span>
              </Link>
            )}

            {UUU?.role === 3 && (
              <Link to="/intership" className="link-card">
                <SiPytest />
                <span>Intership certificate</span>
              </Link>
            )}

            {UUU?.role === 3 && (
              <Link to="/yourtests" className="link-card">
                <SiPytest />
                <span>Your Test</span>
              </Link>
            )}

            <Link to="/profile" className="link-card">
              <RiProgress5Line />
              <span>Profile</span>
            </Link>

            <button onClick={() => handleLogOut()} className="logout-btn">
              <span>
                <IoIosLogOut size={20} />
              </span>
              Logout
            </button>
          </div>
        )}
      <main className="sidebar-right-side">{children}</main>
    </div>
  );
};

export default SideScreen;
