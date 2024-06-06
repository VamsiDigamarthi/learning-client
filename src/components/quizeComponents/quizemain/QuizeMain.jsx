import React, { useEffect, useState } from "react";
import "./quizemain.css";
import { useSelector } from "react-redux";
import { APIS } from "../../../core/apiurl";
import QuizeSingleQuize from "../quizeSingleQuestion/QuizeSingleQuize";

const QuizeMain = ({ lanTofilterQuestions }) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // store all mcs questions
  const [mcqSpecificLan, setMcqSpecificLan] = useState([]);

  const [mcqCount, setMcqCount] = useState(0);

  // store the ids for change color of right side number if user that question attempted or not
  const [idsMCQAttend, setIdsMCQAttend] = useState([]);
  // store scoreOfUser
  const [score, setScore] = useState(null);

  // show score modal
  const [scoreModal, setScoreModal] = useState(false);

  useEffect(() => {
    APIS.get(
      `/student/get/Specific/MCQ/lan/${lanTofilterQuestions}/head/${UUU?.head}`
    )
      .then((res) => {
        console.log(res.data);
        setMcqSpecificLan(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, [lanTofilterQuestions]);

  /*
   when user click to right side number if that mcq already attemted not navigate to that mcq 
   if user not attemted that mcq to navigate to that paeticular mcq
  */
  const onRightSideNumberClickToNavThatMCQFun = ({ key, each }) => {
    if (!idsMCQAttend.includes(each)) {
      setMcqCount(key);
    }
  };
  // this fun useage is fetch the score of QuizeSingleQuize component and display the score ui
  const showScoreFun = (score) => {
    setScoreModal(true);
    setScore(score);
  };

  console.log(lanTofilterQuestions);

  return (
    <div className="quize-mcq-main">
      <h1>Quize</h1>
      {scoreModal ? (
        <div className="score-main-body">
          <div className="score-main-body">
            <h1>Completed</h1>
            <p>Your Score is</p>
            <div>
              <span className="score-display">{score}</span>
              <span>out of {mcqSpecificLan?.length}</span>
            </div>
          </div>
        </div>
      ) : (
        <div className="quize-mcq-second-main">
          <QuizeSingleQuize
            mcqSpecificLan={mcqSpecificLan} // send all mcq question for cal len and updated couter
            setMcqCount={setMcqCount} // this is increase the mcq
            mcqCount={mcqCount} // this is current question number
            setIdsMCQAttend={setIdsMCQAttend} // store ids for change color of number at right side
            idsMCQAttend={idsMCQAttend}
            showScoreFun={showScoreFun}
          />

          <div className="quize-question-number-card">
            <span>Questions 1/10</span>
            <div className="quize-round-count-card">
              {mcqSpecificLan?.map((each, key) => (
                <span
                  style={{
                    color: idsMCQAttend.includes(each) && "red",
                    background: mcqCount + 1 === key + 1 && "#fa5041",
                  }}
                  key={key}
                  className="circle-rounded"
                  onClick={() =>
                    onRightSideNumberClickToNavThatMCQFun({ key, each })
                  }
                >
                  {key + 1}
                </span>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default QuizeMain;
