import React, { useEffect, useState } from "react";
import "./mainexam.css";

const MainExam = ({
  hours,
  minutes,
  seconds,
  mcqCount,
  mcqSpecificLan,
  setUserAnswer,
  onHandelNextQuestion,
  idsMCQAttend,
  notAttemptAnswerShowQuestion,
  storeAnswerWithIds,
  userAnswer,
  onRightSideClickAnyRandomNumber,
  onSubmittedAllMcqScoreFun,
  completedExam,
  userClickAnsweButton,
}) => {
  // to calculate total time taken to student writing an exam

  // check is  single digit or not function
  const onCheckIssingleDigitOrNot = (digit) => {
    if (digit >= 0 && digit < 10) {
      return `0${digit}`;
    } else {
      return `${digit}`;
    }
  };

  const pre = () => {
    let filter = storeAnswerWithIds.filter(
      (each) => each.id === mcqSpecificLan[mcqCount]._id
    );
    return filter[0]?.answer;
  };

  // ================================= full screen  =======================

  useEffect(() => {
    const handleFullscreenChange = async () => {
      if (!document.fullscreenElement) {
        console.log("User exited full screen");
        completedExam();
      }
    };

    document.addEventListener("fullscreenchange", handleFullscreenChange);

    return () => {
      document.removeEventListener("fullscreenchange", handleFullscreenChange);
    };
  }, []);

  // ================================= full screen end =====================

  const onAnswerClick = (answer) => {
    userClickAnsweButton(answer);
  };

  return (
    <div className="main-exam-card">
      <div className="main-exam-card-body">
        <div className="main-exam-card-body-left-side">
          <div className="show-diffecalty-level-card">
            <h3
              style={{
                color:
                  mcqSpecificLan[mcqCount]?.Difficulty_Level === "SMALL"
                    ? "green"
                    : mcqSpecificLan[mcqCount]?.Difficulty_Level === "MEDIUM"
                    ? "#d4b311"
                    : "red",
              }}
            >
              {mcqSpecificLan[mcqCount]?.Difficulty_Level}
            </h3>
            <h3>{`${hours}:${minutes}:${seconds}`}</h3>
          </div>
          <h4>
            {mcqCount + 1} {mcqSpecificLan[mcqCount]?.Question}
          </h4>
          {mcqSpecificLan[mcqCount]?.asnwers?.map((each, key) => (
            <span
              style={{
                // color: userAnswer === each && "red",
                fontSize: "18px",
                fontWeight: "bold",
                color:
                  pre() === each ? "#ff5900" : userAnswer === each && "green",
              }}
              onClick={() => onAnswerClick(each)}
              key={key}
            >
              {key === 0 ? "A." : key === 1 ? "B." : key === 2 ? "C." : "D."}{" "}
              {each}
            </span>
          ))}
          <div className="quize-prev-next-card">
            {mcqCount < mcqSpecificLan?.length - 1 ? (
              <button onClick={onHandelNextQuestion}>Save & Next</button>
            ) : (
              <button onClick={onSubmittedAllMcqScoreFun}>Submit</button>
            )}
          </div>
        </div>
        <div className="main-exam-card-body-right-side">
          <span>
            Questions {mcqCount + 1}/{mcqSpecificLan?.length}
          </span>
          <div className="quize-round-count-card">
            {mcqSpecificLan?.map((each, key) => (
              <span
                style={{
                  background: idsMCQAttend.includes(each)
                    ? "green"
                    : mcqCount + 1 === key + 1
                    ? "#de0085"
                    : notAttemptAnswerShowQuestion.includes(each) && "#ff5900",
                }}
                key={key}
                className="circle-rounded"
                onClick={() => onRightSideClickAnyRandomNumber(key)}
              >
                {onCheckIssingleDigitOrNot(key + 1)}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainExam;
