import React, { useState } from "react";
import "./langsrocecard.css";
import { BsThreeDotsVertical } from "react-icons/bs";
import { lanImages } from "../../../../data/userscore";
const LangsroceCard = ({ examDetails }) => {
  const [showScoreModal, setShowScoreModal] = useState(false);
  console.log(examDetails);
  return (
    <div
      style={{
        background: lanImages[examDetails?.lan].color,
      }}
      className="lang-scrore-card-main"
    >
      <div className="lang-logo-card">
        <img src={lanImages[examDetails?.lan].img} alt="logo-lan" />
        <BsThreeDotsVertical
          onClick={() => setShowScoreModal(!showScoreModal)}
        />
        {showScoreModal && (
          <div className="show-score-card">
            <span>Show Score</span>
          </div>
        )}
      </div>
      <div className="slider-bar-card">
        <p></p>
        <p
          style={{
            width: examDetails?.totalMarks
              ? `${(examDetails.score / examDetails.totalMarks) * 100}%`
              : "0%",
          }}
        ></p>
      </div>
      {/* {examDetails?.diffTimeString && <h5>Total Time {" "}{examDetails?.diffTimeString}</h5>} */}
      <div className="sider-bar-down-card">
        {examDetails.score >= 0 || examDetails.totalMarks ? (
          <>
            <span>scrore</span>
            <span>
              {examDetails.score}/{examDetails?.totalMarks}
            </span>
          </>
        ) : (
          <></>
        )}
      </div>
    </div>
  );
};

export default LangsroceCard;
