import React from "react";
import "./addcontent.css";
import UploadMCQs from "../../dashAddContentComponents/uploadmcqs/UploadMCQs";
import UploadLanPDF from "../../dashAddContentComponents/uploadlanpdf/UploadLanPDF";
import { useSelector } from "react-redux";
import UploadCertificateStudents from "../../dashAddContentComponents/uploadCertificateStudents/UploadCertificateStudents";
const AddContent = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  console.log(UUU);
  return (
    <div className="add-content-main-card">
      <h3>Add any content you want</h3>
      <UploadMCQs change="mcq" heading="Add MCQ's" />
      <UploadMCQs change="students" heading="Upload Students" />
      {UUU.role === 2 && (
        <>
          <h3>Add File and Daily Notes</h3>
          <UploadLanPDF />
        </>
      )}
      {UUU.role === 1 && <UploadCertificateStudents />}
    </div>
  );
};

export default AddContent;
