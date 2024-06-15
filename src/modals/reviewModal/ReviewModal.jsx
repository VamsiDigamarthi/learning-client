import React from "react";
import { RxCross1 } from "react-icons/rx";
import "./reviewmodal.css";
const ReviewModal = () => {
  return (
    <div className="review-modal-main-card">
      <form className="review-form">
        <div className="cross-review-form">
          <span>Review Form</span>
          <RxCross1 />
        </div>
      </form>
    </div>
  );
};

export default ReviewModal;
