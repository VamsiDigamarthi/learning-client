import React, { useEffect, useState } from "react";
import "./scoredisplay.css";
import { RxCross1 } from "react-icons/rx";
import { useSelector } from "react-redux";
import { APIS } from "../../core/apiurl";
const ScoreDisplay = ({
  setScoreDisplayModal,
  allStudents,
  adminSingleMail, // this is store selected instructor mail if login with super admin
}) => {
  const UUU = useSelector((state) => state.authReducer.authData);
  //   uniqueLang Store
  const [uniqueLanguage, setUniqueLanguage] = useState([]);
  const [scoreDisplayStudentsByLan, setScoreDisplayStudentsByLan] = useState({
    instructor: UUU && UUU.role === 2 ? UUU?.email : adminSingleMail,
  });

  useEffect(() => {
    const allLanguages = allStudents.reduce(
      (acc, user) => acc.concat(user.language),
      []
    );
    const uniqueLanguagesSet = new Set(allLanguages);
    const uniqueLanguages = [...uniqueLanguagesSet];
    console.log(uniqueLanguages);
    setUniqueLanguage(uniqueLanguages);
  }, []);

  const onSelectLanToAddExamToStudent = (e) => {
    setScoreDisplayStudentsByLan({
      ...scoreDisplayStudentsByLan,
      lan: e.target.value,
    });
  };

  //   call the api to backed
  const scoreDisplayApi = (e) => {
    e.preventDefault();
    APIS.patch("/admin/score/display/student", scoreDisplayStudentsByLan)
      .then((res) => {
        console.log(res.data);
        setScoreDisplayModal(false);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  console.log(adminSingleMail);

  return (
    <section className="score-display-main-card">
      <section className="score-display-modal-main">
        <section className="model-cross">
          <h3>display score</h3>
          <RxCross1 onClick={() => setScoreDisplayModal(false)} />
        </section>
        {adminSingleMail?.length > 0 ? (
          <form onSubmit={scoreDisplayApi} className="display-score-sec">
            <select onChange={onSelectLanToAddExamToStudent}>
              <option disabled hidden selected>
                SELECT LANGUAGE
              </option>
              {uniqueLanguage?.map((each, key) => (
                <option key={key} value={each}>
                  score display to {each}
                </option>
              ))}
            </select>
            <button type="submit">Submit</button>
          </form>
        ) : (
          <>
            <h3>Please select instructor </h3>
          </>
        )}
      </section>
    </section>
  );
};

export default ScoreDisplay;
