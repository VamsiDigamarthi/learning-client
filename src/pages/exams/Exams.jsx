import React, { useEffect, useState } from "react";
import "./exams.css";
import { APIS } from "../../core/apiurl";
import { useSelector } from "react-redux";
import ExamsNotAssignMessage from "../../components/examsComponents/examsnotassignmessage/ExamsNotAssignMessage";
import BeforeExamTimer from "../../components/examsComponents/beforeExamTimer/BeforeExamTimer";
const Exams = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  

  // console.log(UUU);

  const [student, setStudent] = useState(null);
  // this use effect is get student data but its using after exam completed to fetch score data
  useEffect(() => {
    APIS.get(`/student/${UUU?._id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  console.log(student);
  return (
    <div className="exam-main-card">
      {UUU?.examDetails?.length > 0 ? (
        <div className="exam-assign-text-display-card">
          <h2>Exam is Assigned for your</h2>
          <span>Plase wait patintly until completed any exam timming...!</span>
          {student?.examDetails?.map((each, key) => (
            <div key={key} className="single-lang-exam-timming">
              <h3>{each?.lan}</h3>
              <h3>
                {each?.scoreDisplay && (
                  <span>
                    score : {each?.score}/{each?.totalMarks}
                  </span>
                )}
              </h3>
              {each?.examComplete ? (
                <h3>Exam is Completed</h3>
              ) : (
                <BeforeExamTimer
                  lan={each.lan}
                  examTime={new Date(each?.dateAndTime)}
                />
              )}
            </div>
          ))}
        </div>
      ) : (
        <ExamsNotAssignMessage />
      )}
    </div>
  );
};

export default Exams;
