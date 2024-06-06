import React from "react";
import "./examnotassignmessage.css";
import { Link } from "react-router-dom";
const ExamsNotAssignMessage = () => {
  return (
    <div className="exam-not-assigned-card">
      <div className="exam-not-assign-inner-card">
        <h1>Exam not assign For You</h1>
        <p>Please wait patiently for writing exam After assinged it</p>
        <span>
          You can writing testing exam to <Link to="/quize">click here</Link>
        </span>
      </div>
    </div>
  );
};

export default ExamsNotAssignMessage;
