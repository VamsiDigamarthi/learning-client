import React, { useState } from "react";
import "./dashboradmain.css";
import StudentProfile from "./studentProfiles/studentprofile/StudentProfile";
import LangsroceCard from "./langsrocedisplaycard/LangsroceCard";
const DashboardMain = () => {
  const [selectedStudentOnLeft, setSelectedStudentOnLeft] = useState();
  return (
    <div className="dashboard-main-page">
      <div className="dash-board-first-card">
        <StudentProfile
          selectedStudentOnLeft={selectedStudentOnLeft}
          setSelectedStudentOnLeft={setSelectedStudentOnLeft}
        />
        <div className="student-lag-score-display-card">
          <div className="score-card-parents">
            {selectedStudentOnLeft?.examDetails?.length ? (
              <>
                {selectedStudentOnLeft?.examDetails?.map((each, key) => (
                  <LangsroceCard
                    key={key}
                    scrore={each}
                    examDetails={each}
                  />
                ))}
              </>
            ) : (
              <div className="exam-not-assigned-dashboard">
                <p>This student dont assigned any exam</p>
                <h3>Please assigned any exam</h3>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardMain;
