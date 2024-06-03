import React from "react";
import { FaRegBell } from "react-icons/fa";
import "./dashboardheader.css";
const DashBordHeader = ({ setShowDownCount }) => {
  return (
    <div className="dash-board-header-card">
      <div className="dashboard-header-first-card">
        <span onClick={() => setShowDownCount(0)}>Dashboard</span>
        <span onClick={() => setShowDownCount(1)}>Add Content</span>
        <span onClick={() => setShowDownCount(2)}>Courses</span>
        <span onClick={() => setShowDownCount(3)}>Settings</span>
      </div>
      <div className="dashboard-header-second-card">
        <input type="text" placeholder="search something" />
        <span>
          <FaRegBell />
        </span>
      </div>
    </div>
  );
};

export default DashBordHeader;
