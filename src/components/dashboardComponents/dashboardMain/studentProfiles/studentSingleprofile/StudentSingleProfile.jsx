import React from "react";
import "./studentsingleprofile.css";
const StudentSingleProfile = ({
  selectedStudentOnLeft, // left side student click data stored
  leftStudentSingleStudentClickToFetchStudent, // left side student click state  function
  student, // each student
}) => {


  return (
    <div
      className={`single-profile-card-main ${
        student._id === selectedStudentOnLeft._id && "selected-student-color"
      }`}
      onClick={() => leftStudentSingleStudentClickToFetchStudent(student)}
    >
      <div>
        <img
          style={{
            background: student.color,
          }}
          src={student.img ? student.img : "images/dummy-profile.png"}
          alt=""
          className="single-profile-img-card"
        />
        <div>
          <h4>{student.firstName?.slice(0, 15)}</h4>
          <span>{student.language[0]}</span>
        </div>
      </div>
      <span className={student?.examDetails?.[0]?.examComplete ? 'exam-completed':'exam-not-completed' }>
        {student?.examDetails?.[0]?.examComplete
          ? "Exam Completed"
          : "Exam Not Writing"}
      </span>
    </div>
  );
};

export default StudentSingleProfile;
