import React, { useEffect, useRef, useState } from "react";
import "./exams.css";
import { APIS } from "../../core/apiurl";
import { useSelector } from "react-redux";
import ExamsNotAssignMessage from "../../components/examsComponents/examsnotassignmessage/ExamsNotAssignMessage";
import BeforeExamTimer from "../../components/examsComponents/beforeExamTimer/BeforeExamTimer";
import MainExam from "../../components/examsComponents/mainExam/MainExam";
const Exams = ({ setStartMainExamNotDisplaySideBar }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const contentRef = useRef(null);
  // this state is showing main exam in this components
  const [showMainExam, setShowMainExam] = useState(false);

  const [student, setStudent] = useState(null);
  // this use effect is get student data but its using after exam completed to fetch score data
  const getStudentFun = () => {
    APIS.get(`/student/${UUU?._id}`)
      .then((res) => {
        setStudent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };
  useEffect(() => {
    getStudentFun();
  }, []);

  // ============================ full screen mode ======================

  // console.log(isFullScreen);

  useEffect(() => {
    const handleFullScreen = async () => {
      const element = contentRef.current;
      if (element) {
        try {
          await element.requestFullscreen();
        } catch (error) {
          console.error("Error entering fullscreen mode:", error.message);
          if (error.name === "NotAllowedError") {
            console.log("User denied fullscreen permission.");
          }
        }
      }
    };
    showMainExam && handleFullScreen();
  }, [showMainExam]);
  // ============================ full screen exist =====================

  return (
    <div className="exam-main-card">
      {showMainExam ? (
        <div className="fullscreen-element" ref={contentRef}>
          <MainExam
            setShowMainExam={setShowMainExam}
            setStartMainExamNotDisplaySideBar={
              setStartMainExamNotDisplaySideBar
            }
            lan={student?.examDetails[0]?.lan}
            getStudentFun={getStudentFun}
          />
        </div>
      ) : (
        <>
          {student?.examDetails?.length > 0 ? (
            <div className="exam-assign-text-display-card">
              <h2>Exam is Assigned for your</h2>
              <span>
                Plase wait patintly until completed any exam timming...!
              </span>
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
                      setShowMainExam={setShowMainExam} // this is state fun show main exam access full screen
                      setStartMainExamNotDisplaySideBar={
                        setStartMainExamNotDisplaySideBar
                      } // main exam start not display side bar
                      // requestFullScreen={requestFullScreen} //  request full screen mode
                    />
                  )}
                </div>
              ))}
            </div>
          ) : (
            <ExamsNotAssignMessage />
          )}
        </>
      )}
    </div>
  );
};

export default Exams;
