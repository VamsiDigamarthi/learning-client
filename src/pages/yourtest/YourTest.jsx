import React, { useEffect, useState } from "react";
import "./yourtest.css";
import { APIS } from "../../core/apiurl";
import { FaChevronDown } from "react-icons/fa";
import { useSelector } from "react-redux";
import { IoIosArrowUp } from "react-icons/io";

const result = [
  {
    _id: "666198de49acbdcfd4ed244f",
    userId: "666141a841c4be6419453f1e",
    lan: "Python",
    completedDetails: [
      {
        id: "66618f578549e816a099901d",
        answer: "A set of main modules",
        correct: 0,
        correctAnswer: "A folder of python modules",
        question: "Which of these is the definition for packages in Python?",
      },
      {
        id: "66618f578549e816a099901e",
        answer: "9.O",
        correct: 1,
        correctAnswer: "9.O",
        question: "What is output of print(math.pow(3, 2))?",
      },
      {
        id: "66618f578549e816a099901f",
        answer: "tells you the current position within the file",
        correct: 1,
        correctAnswer: "tells you the current position within the file",
        question: "What is the use of tell() method in python",
      },
      {
        id: "66618f578549e816a0999020",
        answer: "All of the above",
        correct: 1,
        correctAnswer: "All of the above",
        question:
          "Which of the following are valid escape sequences in Python?",
      },
      {
        id: "66618f578549e816a0999021",
        answer: "datetime",
        correct: 1,
        correctAnswer: "datetime",
        question:
          "Which of the following modules need to be imported to handle date time computations in Python?",
      },
      {
        id: "66618f578549e816a0999022",
        answer: "All of the above",
        correct: 1,
        correctAnswer: "All of the above",
        question:
          "Which of the following are valid string manipulation functions in Python?",
      },
      {
        id: "66618f578549e816a0999023",
        answer: "Passing -O when running Python.",
        correct: 0,
        correctAnswer: "Assertions cannot be disabled in Python.",
        question: "How can assertions be disabled in Python?",
      },
      {
        id: "66618f578549e816a0999024",
        answer: "strptime()",
        correct: 1,
        correctAnswer: "strptime()",
        question:
          "Which of the following functions converts date to corresponding time in Python?",
      },
    ],
  },
  {
    _id: "666198de49acbdcfd4ed244f",
    userId: "666141a841c4be6419453f1e",
    lan: "Java",
    completedDetails: [
      {
        id: "66618f578549e816a099901d",
        answer: "A set of main modules",
        correct: 0,
        correctAnswer: "A folder of python modules",
        question: "Which of these is the definition for packages in Python?",
      },
      {
        id: "66618f578549e816a099901e",
        answer: "9.O",
        correct: 1,
        correctAnswer: "9.O",
        question: "What is output of print(math.pow(3, 2))?",
      },
      {
        id: "66618f578549e816a099901f",
        answer: "tells you the current position within the file",
        correct: 1,
        correctAnswer: "tells you the current position within the file",
        question: "What is the use of tell() method in python",
      },
      {
        id: "66618f578549e816a0999020",
        answer: "All of the above",
        correct: 1,
        correctAnswer: "All of the above",
        question:
          "Which of the following are valid escape sequences in Python?",
      },
      {
        id: "66618f578549e816a0999021",
        answer: "datetime",
        correct: 1,
        correctAnswer: "datetime",
        question:
          "Which of the following modules need to be imported to handle date time computations in Python?",
      },
      {
        id: "66618f578549e816a0999022",
        answer: "All of the above",
        correct: 1,
        correctAnswer: "All of the above",
        question:
          "Which of the following are valid string manipulation functions in Python?",
      },
      {
        id: "66618f578549e816a0999023",
        answer: "Passing -O when running Python.",
        correct: 0,
        correctAnswer: "Assertions cannot be disabled in Python.",
        question: "How can assertions be disabled in Python?",
      },
      {
        id: "66618f578549e816a0999024",
        answer: "strptime()",
        correct: 1,
        correctAnswer: "strptime()",
        question:
          "Which of the following functions converts date to corresponding time in Python?",
      },
    ],
  },
];

const YourTest = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [tests, setTests] = useState(result);

  const [selectedLan, setSelectedLan] = useState(null);

  useEffect(() => {
    APIS.get(`/student/test/${UUU?._id}`)
      .then((res) => {
        // console.log(res.data);
        // setTests(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  console.log(result);

  const openCloseQA = (language) => {
    if (selectedLan !== language) {
      setSelectedLan(language);
    } else {
      setSelectedLan(null);
    }
  };

  return (
    <div className="your-test-main">
      {tests?.length > 0 ? (
        <>
          {tests?.map((each, key) => (
            <div key={key} className="single-your-test">
              <div
                onClick={() => openCloseQA(each.lan)}
                className="show-lan-and-icon"
              >
                <h3>{each.lan}</h3>
                {each.lan === selectedLan ? (
                  <IoIosArrowUp size={22} />
                ) : (
                  <FaChevronDown />
                )}
              </div>
              {each?.completedDetails?.map((question, key) => (
                <div
                  key={key}
                  className={`q-a-main-card ${
                    each.lan === selectedLan ? "display-show" : "display-none"
                  }`}
                >
                  <h3>Q .. {question.question}</h3>
                  <div className="q-a-answer-card">
                    <h6>{question?.answer}</h6>
                    <h4>{question?.correctAnswer}</h4>
                  </div>
                </div>
              ))}
            </div>
          ))}
        </>
      ) : (
        <div className="q-a-message">
          <h2>Please Write Exam first</h2>
        </div>
      )}
    </div>
  );
};

export default YourTest;
