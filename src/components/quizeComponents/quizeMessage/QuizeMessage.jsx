import React, { useState } from "react";
import "./quizemessage.css";
const QuizeMessage = ({
  setShowQuize,
  setLanToFilterQuestions,
  lanTofilterQuestions,
}) => {
  const [showErrorMsg, setShowErrorMsg] = useState("");

  const onHandleToNavQuizeMain = () => {
    if (lanTofilterQuestions.length === 0) {
      setShowErrorMsg("Please Select Language");
      return;
    }
    setShowQuize(false);
    setShowErrorMsg("");
  };

  return (
    <div className="quize-start-message">
      <h1>Welcome</h1>
      <p>
        Before Jump into to Real Quize Take this example quize to find out
        <br /> what the quize process and what happend to write the quize
      </p>
      <div className="quize-selecetd-card">
        <h3>Start quize</h3>
        <select onChange={(e) => setLanToFilterQuestions(e.target.value)}>
          <option disabled hidden selected>
            SELECT LANGUAGE
          </option>
          <option>Java</option>
          <option>Python</option>
        </select>
      </div>
      {showErrorMsg.length > 0 && <p id="erro-msg">{showErrorMsg}</p>}
      <button
        // disabled={lanTofilterQuestions.length === 0}
        onClick={onHandleToNavQuizeMain}
      >
        Start
      </button>
    </div>
  );
};

export default QuizeMessage;
