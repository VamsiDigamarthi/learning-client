import React, { useEffect, useState } from "react";
import "./beforeexamtimer.css";
import { useNavigate } from "react-router-dom";
const BeforeExamTimer = ({ examTime, lan }) => {
  const [timeDifference, setTimeDifference] = useState(
    getTimeDifference(examTime)
  );
  const navigate = useNavigate();
  const [examStartBtnShow, setExamStartBtnShow] = useState(false);

  // Function to calculate time difference
  function getTimeDifference(examTime) {
    const now = new Date();
    return examTime - now;
  }
  let hours = Math.floor(timeDifference / (1000 * 60 * 60));
  let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  useEffect(() => {
    const timerInterval = setInterval(() => {
      setTimeDifference(getTimeDifference(examTime));
    }, 1000);
    if (getTimeDifference(examTime) <= 0) {
      console.log("exam time up");
      setExamStartBtnShow(true);
      clearInterval(timerInterval);
      return;
    }

    return () => {
      clearInterval(timerInterval); // Clean-up: Stop the interval
    };
  }, [examTime]);
  // exam start btn click to navigate to main exam page
  const onStartExamBtnClickFun = () => {
    navigate("/main-exam", { state: { lan }, replace: true });
    // navigate("/main-exam", { replace: true });
  };

  return (
    <>
      {examStartBtnShow ? (
        <button
          onClick={onStartExamBtnClickFun}
          className="time-completed-exam-start-card"
        >
          Start Exam
        </button>
      ) : (
        <>
          {hours} hours {minutes} minutes {seconds} seconds
        </>
      )}
    </>
  );
};

export default BeforeExamTimer;
