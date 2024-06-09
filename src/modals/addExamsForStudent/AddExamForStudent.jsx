import React, { useEffect, useState } from "react";
import "./addexamforstudent.css";
import { RxCross1 } from "react-icons/rx";
import { APIS } from "../../core/apiurl";
import { ToastContainer } from "react-toastify";
import { errorMsgApi, succesMsgApi } from "../../core/tost";
const AddExamForStudent = ({
  allStudents,
  setAddExamModalOpen,
  getAllStudentFun, // this is api fuc this fun fetch student data when exam is assigned
}) => {
  //   uniqueLang Store
  const [uniqueLanguage, setUniqueLanguage] = useState([]);

  // store all data data to add exam
  const [storeAllDataToExam, setStoreAllDataToExam] = useState({
    lan: "",
    ids: [],
    dateAndTime: "",
  });

  useEffect(() => {
    const allLanguages = allStudents.reduce(
      (acc, user) => acc.concat(user.language),
      []
    );
    const uniqueLanguagesSet = new Set(allLanguages);
    const uniqueLanguages = [...uniqueLanguagesSet];

    setUniqueLanguage(uniqueLanguages);
  }, []);

  const onSelectLanToAddExamToStudent = (e) => {
    const filterLanStudent = allStudents.filter((each) =>
      each.language.includes(e.target.value)
    );
    let ids = filterLanStudent.map((each) => each._id);
    setStoreAllDataToExam({
      ...storeAllDataToExam,
      lan: e.target.value,
      ids: ids,
    });
  };

  // select date and time
  const selectDateAndTime = (e) => {
    setStoreAllDataToExam({
      ...storeAllDataToExam,
      dateAndTime: e.target.value,
    });
  };

  const onAddExamsToStudentsFun = () => {
    if (storeAllDataToExam?.dateAndTime !== "") {
      APIS.put("/admin/add/exam/student", storeAllDataToExam)
        .then((res) => {
          succesMsgApi(res.data);
          setAddExamModalOpen(false);
          getAllStudentFun();
        })
        .catch((e) => {
          errorMsgApi("Something went wrong please try agint later");
          setAddExamModalOpen(false);
        });
    }
  };

  // console.log(dateAndTime);

  return (
    <div className="all-main-modal-card">
      <ToastContainer
        position="bottom-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
        className="tost-cls"
      />
      <div className="inner-modal-cls">
        <div className="cross-modal-card">
          <span>Add Exams to Students</span>
          <RxCross1 onClick={() => setAddExamModalOpen(false)} />
        </div>
        <div className="select-exams-date-and-time">
          <h3>Select date and time</h3>
          <div className="select-time-card">
            <input onChange={selectDateAndTime} type="datetime-local" />
          </div>
        </div>
        <div className="modal-main-body">
          <select onChange={onSelectLanToAddExamToStudent}>
            <option disabled hidden selected>
              SELECT LANGUAGE
            </option>
            {/* <option value="all">Exam give to all Students</option> */}
            {uniqueLanguage?.map((each, key) => (
              <option key={key} value={each}>
                Exam Give to {each} Students
              </option>
            ))}
          </select>
          <button
            className={`${
              storeAllDataToExam?.dateAndTime === "" ||
              storeAllDataToExam?.lan === ""
                ? "cursor-not"
                : "cursor-allowed"
            }`}
            disabled={
              storeAllDataToExam?.dateAndTime === "" ||
              storeAllDataToExam.lan === ""
            }
            onClick={onAddExamsToStudentsFun}
          >
            Assign Exams
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddExamForStudent;
