import React, { useEffect, useState } from "react";
import "./quizesinglequestion.css";
const QuizeSingleQuize = ({
  mcqSpecificLan,
  setMcqCount,
  mcqCount,
  setIdsMCQAttend,
  idsMCQAttend,
  showScoreFun,
}) => {
  // total time
  const [totalTime, setTotalTime] = useState(null);
  const [time, setTime] = useState(null);

  // store users click answers
  const [userAnswer, setUserAnswer] = useState(null);

  // store scoreOfUser
  const [score, setScore] = useState(0);

  // calculate total time based on each mcq second
  useEffect(() => {
    let time = 0;
    mcqSpecificLan?.map((each) => (time += each.DefaultTimeToSolve));
    setTotalTime(time);
    setTime(time);
  }, [mcqSpecificLan]);

  useEffect(() => {
    const timerClre = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          showScoreFun(score);
          clearInterval(timerClre);
          console.log(" ");

          return 0;
        } else {
          return prevTime - 1;
        }
      });
    }, 1000);

    return () => clearInterval(timerClre); // Cleanup the interval on unmount
  }, [totalTime]);

  // Convert total seconds to hours, minutes, and seconds
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;
  const onHandelNextQuestion = () => {
    if (mcqCount < mcqSpecificLan?.length - 1) {
      setMcqCount((pre) => pre + 1);
      if (userAnswer !== null) {
        setIdsMCQAttend([...idsMCQAttend, mcqSpecificLan[mcqCount]]);
        if (userAnswer === mcqSpecificLan[mcqCount]?.CorrectAnswer) {
          setScore((prev) => prev + 1);
        }
        setUserAnswer(null);
      }
    }
  };
  // console.log("empty ", userAnswer);
  // console.log(mcqSpecificLan);
  // console.log(score);

  const onSubmittedAllMcqScoreFun = () => {
    showScoreFun(score);
  };

  return (
    <div className="quize-question-card">
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
        {/* <h3>{timeOfEachQuestion}</h3> */}
      </div>
      <h4>{mcqSpecificLan[mcqCount]?.Question}</h4>
      {mcqSpecificLan[mcqCount]?.asnwers?.map((each, key) => (
        <span
          style={{
            color: userAnswer === each && "red",
          }}
          onClick={() => setUserAnswer(each)}
          key={key}
        >
          {each}
        </span>
      ))}

      <div className="quize-prev-next-card">
        {/* <button>Prev</button> */}
        {mcqCount < mcqSpecificLan?.length - 1 ? (
          <button onClick={onHandelNextQuestion}>Next</button>
        ) : (
          <button onClick={onSubmittedAllMcqScoreFun}>Submit</button>
        )}
      </div>
      {/* {scoreModal && (
        <ScoreShowModal
          score={score}
          mcqSpecificLan={mcqSpecificLan}
          setScoreModal={setScoreModal}
        />
      )} */}
    </div>
  );
};

export default QuizeSingleQuize;
