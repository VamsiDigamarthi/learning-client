import React, { useEffect, useState } from "react";
import "./uploadmcqs.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { APIS } from "../../../core/apiurl";
import { errorMsgApi, succesMsgApi } from "../../../core/tost";
const UploadMCQs = ({ change, heading }) => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);

  // use Effect
  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      setExcelData(data);
      // console.log(data);
    }
  }, [excelFile]);

  const handleFile = (e) => {
    let fileTypes = [
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      "text/csv",
    ];
    let selectedFile = e.target.files[0];
    if (selectedFile) {
      if (selectedFile && fileTypes.includes(selectedFile.type)) {
        let reader = new FileReader();
        reader.readAsArrayBuffer(selectedFile);
        reader.onload = (e) => {
          setExcelFile(e.target.result);
        };
      } else {
        setExcelFile(null);
      }
    }
  };

  const onHandleBulkUpload = () => {
    if (change === "mcq") {
      APIS.post("/super/mcqBulkUpload", excelData)
        .then((res) => {
          console.log(res.data);
          // succesMsgApi(res?.data?.message);
          setExcelData([]);
        })
        .catch((e) => {
          console.log(e);
          // errorMsgApi(e?.response?.data?.message);
        });
    } else {
      APIS.post("/super/bulk/Students", excelData)
        .then((res) => {
          console.log(res.data);
          succesMsgApi(res?.data?.message);
          setExcelData([]);
        })
        .catch((e) => {
          console.log(e);
          errorMsgApi(e?.response?.data?.message);
        });
    }
  };

  return (
    <div className="mcq-card">
      <h3>{heading}</h3>
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
      <div className="mcq-input-btn-card">
        <input
          className="custom-file-upload"
          accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
          type="file"
          onChange={handleFile}
        />
        <button
          style={{
            cursor: excelData.length === 0 && "not-allowed",
          }}
          disabled={excelData?.length === 0}
          onClick={onHandleBulkUpload}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadMCQs;
