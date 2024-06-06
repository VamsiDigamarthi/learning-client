import React from "react";
import "./addcontent.css";
import UploadMCQs from "../../dashAddContentComponents/uploadmcqs/UploadMCQs";
import UploadLanPDF from "../../dashAddContentComponents/uploadlanpdf/UploadLanPDF";
const AddContent = () => {
  return (
    <div className="add-content-main-card">
      <h3>Add any content you want</h3>
      <UploadMCQs change="mcq" heading="Add MCQ's" />
      <UploadMCQs change="students" heading="Upload Students" />
      <h3>Add File and Daily Notes</h3>
      <UploadLanPDF />
    </div>
  );
};

export default AddContent;
