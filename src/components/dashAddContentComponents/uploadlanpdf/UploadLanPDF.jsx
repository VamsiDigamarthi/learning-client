import React, { useEffect, useState } from "react";
import "./uploadlanpdf.css";
import { APIS } from "../../../core/apiurl";
import { useSelector } from "react-redux";
import { errorMsgApi, succesMsgApi } from "../../../core/tost";
const UploadLanPDF = () => {
  const UUU = useSelector((state) => state.authReducer.authData);

  const [allStudents, setAllStudents] = useState([]);

  const [uniqueLanguage, setUniqueLanguage] = useState([]);

  const [previewImg, setPreviewImg] = useState("");

  const [selectLan, setSelectLan] = useState({
    lan: "",
    file: "",
    date: new Date(),
    title: "",
    preview: "",
  });

  const [showErrorMsgToUploadPdf, setShowErrorMsgToUploadPdf] = useState({});

  //get all students
  const getAllStudentFun = () => {
    APIS.get(`/admin/fetch/Students/${UUU?.email}`)
      .then((res) => {
        // console.log(res.data);
        setAllStudents(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getAllStudentFun();
  }, []);

  useEffect(() => {
    const allLanguages = allStudents?.reduce(
      (acc, user) => acc.concat(user.language),
      []
    );
    const uniqueLanguagesSet = new Set(allLanguages);
    const uniqueLanguages = [...uniqueLanguagesSet];
    setUniqueLanguage(uniqueLanguages);
    // setSelectLan({ ...selectLan, lan: uniqueLanguages[0] });
  }, [allStudents]);

  const handleFile = (e) => {
    const file = e.target.files[0];
    if (file && file.type === "application/pdf") {
      setSelectLan({ ...selectLan, file: file });
    } else {
      alert("Please select a PDF file.");
      e.target.value = null; // Clear the input
    }
  };

  const onHandleSelectPreviewImage = (e) => {
    const previewImg = e.target.files[0];
    if (previewImg) {
      setSelectLan({ ...selectLan, preview: previewImg });
      const previewUrl = URL.createObjectURL(previewImg);
      setPreviewImg(previewUrl);
    }
  };

  // console.log(selectLan);

  const validate = (values) => {
    const errors = {};

    if (!values.lan) {
      errors.lan = "Language is required!";
    }

    if (!values.file) {
      errors.file = "PDF file  is required!";
    }

    if (!values.title) {
      errors.title = "Please Give me any title is required!";
    }

    if (!values.preview) {
      errors.preview = "Preview Image is required!";
    }

    setShowErrorMsgToUploadPdf(errors);
    return Object.keys(errors).length === 0;
  };

  const onHandleBulkUpload = () => {
    if (validate(selectLan)) {
      const formData = new FormData();
      formData.append("file", selectLan.file);
      formData.append("lan", selectLan.lan);
      formData.append("date", selectLan.date);
      formData.append("title", selectLan.title);
      formData.append("previewImg", selectLan.preview);
      //
      APIS.post("/super/upload/pdfs", formData)
        .then((res) => {
          console.log(res.data);
          succesMsgApi(res?.data?.message);
        })
        .catch((e) => {
          console.log(e);
          errorMsgApi(e?.response?.data?.message);
        });
    } else {
      console.log("all are failed");
    }
  };

  return (
    <section className="upload-pdf-main">
      <section className="upload-pdf-first-card">
        <section>
          {showErrorMsgToUploadPdf.title && (
            <p>{showErrorMsgToUploadPdf.title}</p>
          )}
          <input
            onChange={(e) =>
              setSelectLan({ ...selectLan, title: e.target.value })
            }
            placeholder="Enter Title"
            type="text"
          />
        </section>
        <div>
          {showErrorMsgToUploadPdf.lan && <p>{showErrorMsgToUploadPdf.lan}</p>}
          <select
            onChange={(e) =>
              setSelectLan({ ...selectLan, lan: e.target.value })
            }
          >
            <option>SELECT LAN</option>
            {uniqueLanguage?.map((each, key) => (
              <option value={each} key={key}>
                {each}
              </option>
            ))}
          </select>
        </div>
      </section>
      <section className="upload-pdf-second-card">
        <div>
          {showErrorMsgToUploadPdf.preview && (
            <p>{showErrorMsgToUploadPdf.preview}</p>
          )}
          <div className="mcq-input-btn-card">
            <input
              className="custom-file-upload"
              accept="image/*"
              type="file"
              onChange={onHandleSelectPreviewImage}
            />
          </div>
          {previewImg.length > 0 && <img src={previewImg} alt="preview" />}
        </div>
        <div>
          {showErrorMsgToUploadPdf.file && (
            <p>{showErrorMsgToUploadPdf.file}</p>
          )}
          <div className="mcq-input-btn-card">
            <input
              className="custom-file-upload"
              accept="application/pdf"
              type="file"
              onChange={handleFile}
            />
            <button onClick={onHandleBulkUpload}>Submit</button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default UploadLanPDF;
