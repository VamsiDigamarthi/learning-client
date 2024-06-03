import React from "react";
import "./timeshow.css";
import { IoBookOutline } from "react-icons/io5";
const TimeShow = () => {
  return (
    <div className="dash-board-statistics">
      <div className="time-filter-card">
        <h3>Statistics</h3>
        <select>
          <option>By Hour</option>
          <option>By Min</option>
        </select>
      </div>
      <div className="time-main-card">
        <div className="time-first">
          <div className="time-main-first-card">
            <span>
              <IoBookOutline size={25} />
            </span>
            <div>
              <span>Total Hours</span>
              <h3>102H 45m</h3>
            </div>
          </div>
          <div className="time-main-first-card">
            <span>
              <IoBookOutline size={25} />
            </span>
            <div>
              <span>Total Hours</span>
              <h3>102H 45m</h3>
            </div>
          </div>
        </div>
        <div className="time-scrore-circle">
          <span>Status</span>
          <h3>Passed</h3>
        </div>
        <div className="time-first">
          <div className="time-main-first-card">
            <span>
              <IoBookOutline size={25} />
            </span>
            <div>
              <span>Completed Hours</span>
              <h3>80H 45m</h3>
            </div>
          </div>
          <div className="time-main-first-card">
            <span>
              <IoBookOutline size={25} />
            </span>
            <div>
              <span>Completed Hours</span>
              <h3>80H 45m</h3>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeShow;
