import React, { useEffect, useRef, useState } from "react";
import "./exams.css";
import { MdOutlineReviews } from "react-icons/md";
import { APIS } from "../../core/apiurl";
import { useSelector } from "react-redux";
import ExamsNotAssignMessage from "../../components/examsComponents/examsnotassignmessage/ExamsNotAssignMessage";
import BeforeExamTimer from "../../components/examsComponents/beforeExamTimer/BeforeExamTimer";
import MainExam from "../../components/examsComponents/mainExam/MainExam";
import ReviewModal from "../../modals/reviewModal/ReviewModal";
const Exams = ({ setStartMainExamNotDisplaySideBar }) => {
  const contentRef = useRef(null);
  const storeAnswerWithIdsRef = useRef([]);
  const totalMarksWithRef = useRef([]);
  const totalTimeToDbRef = useRef("");
  const timeRef = useRef(null);

  const UUU = useSelector((state) => state.authReducer.authData);

  // this state is showing main exam in this components
  const [showMainExam, setShowMainExam] = useState(false);

  // ---------------------- main - exam states ----------------------------------

  // store all mcs questions
  const [mcqSpecificLan, setMcqSpecificLan] = useState([]);
  const [student, setStudent] = useState({});

  const [totalTime, setTotalTime] = useState(null);
  const [time, setTime] = useState(null);

  // to tell backend storage to how much totla time this exam
  const [totalTimeToDb, setTotalTimeToDb] = useState("");

  // total marks to store backend
  const [totalMarks, setTotalMarks] = useState(0);

  // single question taken
  const [mcqCount, setMcqCount] = useState(0);

  // store users click answers
  const [userAnswer, setUserAnswer] = useState(null);

  // store the ids for change color of right side number if user that question attempted or not like ""green"" color
  const [idsMCQAttend, setIdsMCQAttend] = useState([]);

  // stores answer with mcqIds because right side jump to random question to show there pick up answer
  const [storeAnswerWithIds, setShowAnswerWithIds] = useState([]);

  // store ids user see the question but not attempt any asnwer like ""orange"" color
  const [notAttemptAnswerShowQuestion, setNotAttemptAnswerShowQuestion] =
    useState([]);

  // store topic which topi exam he writen
  const [storeExamTopic, setStoreExamTopic] = useState("");

  // review modal open state
  const [reviewModalOpenState, setReviewModalOpenState] = useState(false);

  // ---------------------- main - exam states ----------------------------------

  // this use effect is get student data but its using after exam completed to fetch score data
  const getStudentFun = () => {
    APIS.get(`/student/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
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

  useEffect(() => {
    const fetchMcq = () => {
      // console.log(student?.examDetails?.[0]?.lan);
      // console.log(storeExamTopic);
      APIS.get(
        `/student/get/Specific/MCQ/lan/${student?.examDetails?.[0]?.lan}/head/${UUU?.head}/topic/${storeExamTopic}`
      )
        .then((res) => {
          // console.log(res.data);
          let totalMarks = 0;
          const shuffled = res.data?.sort(() => 0.5 - Math.random());
          const selected = shuffled.slice(0, 10);
          setMcqSpecificLan(selected);
          selected?.forEach((each) => {
            totalMarks += each.DefaultMarks;
          });
          // console.log(totalMarks);
          // setTotalMarks(totalMarks);
          totalMarksWithRef.current = totalMarks;
        })
        .catch((e) => {
          console.log(e);
        });
    };
    Object.keys(student)?.length > 0 &&
      storeExamTopic?.length > 0 &&
      fetchMcq();
  }, [student, storeExamTopic]);

  // calculate total time based on each mcq second

  useEffect(() => {
    // console.log(mcqSpecificLan?.length);
    const calTime = () => {
      let time = 0;
      // let totalMarks = 0;

      mcqSpecificLan?.forEach((each) => {
        time += each.DefaultTimeToSolve;
        // totalMarks += each.DefaultMarks;
      });
      console.log(totalMarks);
      setTotalTime(time);
      setTime(time);
      // setTotalMarks(totalMarks);

      const hours = Math.floor(time / 3600);
      const minutes = Math.floor((time % 3600) / 60);
      const seconds = time % 60;
      setTotalTimeToDb(`${hours}:${minutes}:${seconds}`);
    };
    mcqSpecificLan?.length > 0 && calTime();
  }, [mcqSpecificLan]);

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

  const hours = Math.floor(time / 3600);
  const minutes = Math.floor((time % 3600) / 60);
  const seconds = time % 60;

  const updateAnswerWithId = (
    id,
    answer,
    correctAnswer,
    defaultMarks,
    question
  ) => {
    setShowAnswerWithIds((prevAnswers) => {
      const idExists = prevAnswers.some((item) => item.id === id);

      if (idExists) {
        return prevAnswers.map((item) =>
          item.id === id
            ? {
                ...item,
                answer,
                correct: correctAnswer === answer ? defaultMarks : 0,
                correctAnswer,
                question,
              }
            : item
        );
      } else {
        return [
          ...prevAnswers,
          {
            id,
            answer,
            correct: correctAnswer === answer ? defaultMarks : 0,
            correctAnswer,
            question,
          },
        ];
      }
    });
  };

  useEffect(() => {
    storeAnswerWithIdsRef.current = storeAnswerWithIds;
    timeRef.current = time;
  }, [storeAnswerWithIds, time]);

  // calculate total score

  // user click the answer button
  const userClickAnsweButton = (answer) => {
    if (answer !== null) {
      // green color state
      console.log(answer);
      setIdsMCQAttend([...idsMCQAttend, mcqSpecificLan[mcqCount]]);

      updateAnswerWithId(
        mcqSpecificLan[mcqCount]?._id,
        answer,
        mcqSpecificLan[mcqCount]?.CorrectAnswer,
        mcqSpecificLan[mcqCount]?.DefaultMarks,
        mcqSpecificLan[mcqCount]?.Question
      );
      setUserAnswer(null);
    } else {
      setNotAttemptAnswerShowQuestion([
        ...notAttemptAnswerShowQuestion,
        mcqSpecificLan[mcqCount],
      ]);
    }
  };

  const onHandelNextQuestion = () => {
    if (mcqCount < mcqSpecificLan?.length - 1) {
      setMcqCount((pre) => pre + 1);
    }
  };

  // use click any random numbers in right side func
  const onRightSideClickAnyRandomNumber = (number) => setMcqCount(number);

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

  // completed exam
  const completedExam = (lastQuestionScore = 0) => {
    // console.log(totalMarks);
    // calculate time difference total time minute to how much time to writing exam
    const totalSeconds1 = parseTimeStringToSeconds(
      `${hours}:${minutes}:${seconds}`
    );
    const totalSeconds2 = parseTimeStringToSeconds(totalTimeToDb);
    const diffInSeconds = totalSeconds2 - totalSeconds1;
    const diffTimeString = formatSecondsToTimeString(diffInSeconds);

    let score = 0;
    storeAnswerWithIdsRef.current.forEach((each) => (score += each.correct));

    let obj = {
      id: UUU?._id,
      lan: student?.examDetails?.[0]?.lan,
      score: score + lastQuestionScore,
      diffTimeString,
      totalTimeToDb: timeRef.current,
      totalMarks: totalMarksWithRef.current,
      completedDetails: storeAnswerWithIdsRef.current,
      storeExamTopic: storeExamTopic,
      // topic: storeExamTopic,
    };

    APIS.patch("/student/update/score", obj)
      .then((res) => {
        console.log(res.data);
        if (document.fullscreenElement) {
          document.exitFullscreen();
        }
        setShowMainExam(false);
        setStartMainExamNotDisplaySideBar(false);
        getStudentFun();
      })
      .catch((e) => {
        console.log(e);
      });
  };

  const onSubmittedAllMcqScoreFun = () => {
    console.log(userAnswer);

    completedExam(
      mcqSpecificLan[mcqCount]?.CorrectAnswer === userAnswer &&
        mcqSpecificLan[mcqCount]?.DefaultMarks
    );
  };

  // ============================ full screen exist =====================

  // console.log(student);

  const onReviewModalFun = () => {
    setReviewModalOpenState(true);
  };

  return (
    <div className="exam-main-card">
      {showMainExam ? (
        <div className="fullscreen-element" ref={contentRef}>
          <MainExam
            setShowMainExam={setShowMainExam}
            setStartMainExamNotDisplaySideBar={
              setStartMainExamNotDisplaySideBar
            }
            lan={student?.examDetails?.[0]?.lan}
            getStudentFun={getStudentFun}
            //
            hours={hours}
            minutes={minutes}
            seconds={seconds}
            mcqCount={mcqCount}
            mcqSpecificLan={mcqSpecificLan}
            setUserAnswer={setUserAnswer} // user set answer
            onHandelNextQuestion={onHandelNextQuestion}
            idsMCQAttend={idsMCQAttend}
            notAttemptAnswerShowQuestion={notAttemptAnswerShowQuestion}
            storeAnswerWithIds={storeAnswerWithIds}
            userAnswer={userAnswer}
            onRightSideClickAnyRandomNumber={onRightSideClickAnyRandomNumber}
            onSubmittedAllMcqScoreFun={onSubmittedAllMcqScoreFun}
            completedExam={completedExam}
            userClickAnsweButton={userClickAnsweButton} // user give answer to take
          />
        </div>
      ) : (
        <>
          {student?.examDetails?.length > 0 ? (
            <div className="exam-assign-text-display-card">
              <h2>Exam is Assigned for your</h2>
              {/* <span>
                Plase wait patintly until completed any exam timming...!
              </span> */}
              {student?.examDetails?.map((each, key) => (
                <div key={key} className="single-lang-exam-timming">
                  <h3>{each?.lan}</h3>
                  <h3>{each?.Topic}</h3>
                  <h3>
                    {each?.scoreDisplay && (
                      <span>
                        score : {each?.score}/{each?.totalMarks}
                      </span>
                    )}
                  </h3>
                  {each?.examComplete ? (
                    <>
                      <h3>Exam is Completed</h3>
                      <span
                        onClick={onReviewModalFun}
                        className="single-lang-exam-timming-review-card"
                      >
                        <MdOutlineReviews size={25} />
                      </span>
                    </>
                  ) : (
                    <BeforeExamTimer
                      topic={each.Topic}
                      lan={each.lan}
                      examTime={new Date(each?.dateAndTime)}
                      setShowMainExam={setShowMainExam} // this is state fun show main exam access full screen
                      setStartMainExamNotDisplaySideBar={
                        setStartMainExamNotDisplaySideBar
                      } // main exam start not display side bar
                      // requestFullScreen={requestFullScreen} //  request full screen mode

                      setStoreExamTopic={setStoreExamTopic}
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
      {/* review modal */}
      {/* {reviewModalOpenState && <ReviewModal />} */}
    </div>
  );
};

export default Exams;
