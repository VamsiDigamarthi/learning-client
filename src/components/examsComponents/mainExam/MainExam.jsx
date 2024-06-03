import React, { useEffect, useRef, useState } from "react";
import "./mainexam.css";
import { useSelector } from "react-redux";
import { APIS } from "../../../core/apiurl";
import { useLocation, useNavigate } from "react-router-dom";
const MainExam = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const navigate = useNavigate();
  const location = useLocation();
  const data = location.state;

  // store all mcs questions
  const [mcqSpecificLan, setMcqSpecificLan] = useState([]);

  // show score modal
  // const [scoreModal, setScoreModal] = useState(false);

  const [mcqCount, setMcqCount] = useState(0);

  // total time
  const [totalTime, setTotalTime] = useState(null);
  const [time, setTime] = useState(null);

  // store users click answers
  const [userAnswer, setUserAnswer] = useState(null);

  // store the ids for change color of right side number if user that question attempted or not like ""green"" color
  const [idsMCQAttend, setIdsMCQAttend] = useState([]);

  // store ids user see the question but not attempt any asnwer like ""orange"" color
  const [notAttemptAnswerShowQuestion, setNotAttemptAnswerShowQuestion] =
    useState([]);

  // stores answer with mcqIds because right side jump to random question to show there pick up answer
  const [storeAnswerWithIds, setShowAnswerWithIds] = useState([]);

  // to tell backend storage to how much totla time this exam
  const [totalTimeToDb, setTotalTimeToDb] = useState("");

  // total marks
  const [totalMarks, setTotalMarks] = useState(0);

  // ================================= full screen  =======================
  // ================================= full screen end =====================

  useEffect(() => {
    APIS.get(`/student/get/Specific/MCQ/lan/${data?.lan}/head/${UUU?.head}`)
      .then((res) => {
        setMcqSpecificLan(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  // calculate total time based on each mcq second
  useEffect(() => {
    let time = 0;
    let totalMarks = 0;

    mcqSpecificLan?.forEach((each) => {
      time += each.DefaultTimeToSolve;
      totalMarks += each.DefaultMarks;
    });

    setTotalTime(time);
    setTime(time);
    setTotalMarks(totalMarks);

    const hours = Math.floor(time / 3600);
    const minutes = Math.floor((time % 3600) / 60);
    const seconds = time % 60;
    setTotalTimeToDb(`${hours}:${minutes}:${seconds}`);
  }, [mcqSpecificLan]);
  // console.log(mcqSpecificLan);
  useEffect(() => {
    const timerClre = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 0) {
          clearInterval(timerClre);
          console.log("time out");
          // setScoreModal(true);
          completedExam();
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

  const updateAnswerWithId = (id, answer, correctAnswer, defaultMarks) => {
    setShowAnswerWithIds((prevAnswers) => {
      const idExists = prevAnswers.some((item) => item.id === id);

      if (idExists) {
        return prevAnswers.map((item) =>
          item.id === id
            ? {
                ...item,
                answer,
                correct: correctAnswer === answer ? defaultMarks : 0,
              }
            : item
        );
      } else {
        return [
          ...prevAnswers,
          { id, answer, correct: correctAnswer === answer ? defaultMarks : 0 },
        ];
      }
    });
  };

  const onHandelNextQuestion = () => {
    if (mcqCount < mcqSpecificLan?.length - 1) {
      setMcqCount((pre) => pre + 1);
      if (userAnswer !== null) {
        // green color state
        console.log(userAnswer);
        setIdsMCQAttend([...idsMCQAttend, mcqSpecificLan[mcqCount]]);

        updateAnswerWithId(
          mcqSpecificLan[mcqCount]?._id,
          userAnswer,
          mcqSpecificLan[mcqCount]?.CorrectAnswer,
          mcqSpecificLan[mcqCount]?.DefaultMarks
        );
        setUserAnswer(null);
      } else {
        setNotAttemptAnswerShowQuestion([
          ...notAttemptAnswerShowQuestion,
          mcqSpecificLan[mcqCount],
        ]);
      }
    }
  };

  // to calculate total time taken to student writing an exam
  function parseTimeStringToSeconds(timeString) {
    const [hours, minutes, seconds] = timeString.split(":").map(Number);
    return hours * 3600 + minutes * 60 + seconds;
  }

  // Function to format seconds into HH:MM:SS format
  function formatSecondsToTimeString(totalSeconds) {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    const pad = (num) => String(num).padStart(2, "0"); // Pad with leading zeros if needed

    return `${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
  }
  const onSubmittedAllMcqScoreFun = () => {
    console.log(userAnswer);

    completedExam(
      mcqSpecificLan[mcqCount]?.CorrectAnswer === userAnswer &&
        mcqSpecificLan[mcqCount]?.DefaultMarks
    );
  };

  const completedExam = (lastQuestionScore = 0) => {
    // calculate time difference total time minute to how much time to writing exam
    const totalSeconds1 = parseTimeStringToSeconds(
      `${hours}:${minutes}:${seconds}`
    );
    const totalSeconds2 = parseTimeStringToSeconds(totalTimeToDb);
    const diffInSeconds = totalSeconds2 - totalSeconds1;
    const diffTimeString = formatSecondsToTimeString(diffInSeconds);

    // calculate score
    let score = 0;
    console.log(storeAnswerWithIds);
    storeAnswerWithIds.forEach((each) => (score += each.correct));
    console.log(score);
    let obj = {
      id: UUU?._id,
      lan: data?.lan,
      score: score + lastQuestionScore,
      diffTimeString,
      totalTimeToDb,
      totalMarks,
    };

    if (data?.lan !== undefined) {
      APIS.patch("/student/update/score", obj)
        .then((res) => {
          // console.log(res.data);
          navigate("/exam");
        })
        .catch((e) => {
          console.log(e);
        });
    }
  };

  // check is  single digit or not function
  const onCheckIssingleDigitOrNot = (digit) => {
    if (digit >= 0 && digit < 10) {
      return `0${digit}`;
    } else {
      return `${digit}`;
    }
  };

  // use click any random numbers in right side func
  const onRightSideClickAnyRandomNumber = (number) => setMcqCount(number);

  const pre = () => {
    let filter = storeAnswerWithIds.filter(
      (each) => each.id === mcqSpecificLan[mcqCount]._id
    );
    return filter[0]?.answer;
  };

  return (
    <div  className="main-exam-card">
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
              onClick={() => setUserAnswer(each)}
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
