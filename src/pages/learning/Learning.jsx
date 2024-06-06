import React, { useEffect, useState } from "react";
import "./learning.css";
import PDF from "../../components/pdfComponents/pdf/PDF";
import { APIS } from "../../core/apiurl";
import { useSelector } from "react-redux";
import DateWisePreview from "../../components/learningComponents/datewisepreview/DateWisePreview";
const Learning = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  // store student entire data
  const [student, setStudent] = useState(null);
  // store selected language
  const [language, setLanguage] = useState("");
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    APIS.get(`/student/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        setStudent(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);

  const onLanSelectedToGetPdfs = () => {
    if (language !== "") {
      APIS.get(`/super/pdf/${language}`)
        .then((res) => {
          console.log(res.data);
          setPdfs(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    } else {
      alert("Plase selecet language");
    }
  };

  useEffect(() => {
    const fetchPdfs = () => {
      APIS.get(`/super/pdf/${student?.language[0]}`)
        .then((res) => {
          console.log(res.data);
          setPdfs(res.data);
        })
        .catch((e) => {
          console.log(e);
        });
    };
    student && fetchPdfs();
  }, [student]);

  return (
    <div>
      <div className="learning-selected-lan-card">
        <select onChange={(e) => setLanguage(e.target.value)}>
          <option>SELECT LANGUAGE</option>
          {student?.language?.map((each, key) => (
            <option value={each} key={key}>
              {each}
            </option>
          ))}
        </select>
        <button onClick={onLanSelectedToGetPdfs}>Get Noots</button>
      </div>

      <DateWisePreview data={pdfs} />

      {/* <PDF /> */}
    </div>
  );
};

export default Learning;
