import React, { useEffect, useState } from "react";
import "./uploadcertificatestudents.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import * as XLSX from "xlsx";
import { APIS } from "../../../core/apiurl";
import { errorMsgApi, succesMsgApi } from "../../../core/tost";
const UploadCertificateStudents = () => {
  const [excelFile, setExcelFile] = useState(null);
  const [excelData, setExcelData] = useState([]);

  const convertExcelDate = (excelSerial) => {
    const excelEpoch = new Date(1899, 11, 30); // Excel's epoch date
    const date = new Date(excelEpoch.getTime() + excelSerial * 86400000); // 86400000 is the number of milliseconds in a day

    const day = ("0" + date.getDate()).slice(-2);
    const month = ("0" + (date.getMonth() + 1)).slice(-2);
    const year = date.getFullYear();

    return `${day}-${month}-${year}`;
  };

  // use Effect
  useEffect(() => {
    if (excelFile !== null) {
      const workbook = XLSX.read(excelFile, { type: "buffer" });
      const worksheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[worksheetName];
      const data = XLSX.utils.sheet_to_json(worksheet);
      // Convert date fields
      const convertedData = data.map((row) => ({
        ...row,
        startingDate: convertExcelDate(row.startingDate),
        endingDate: convertExcelDate(row.endingDate),
      }));
      // setExcelData(data);
      setExcelData(convertedData);
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
    // console.log(excelData);
    APIS.post("/super/bulk/certificate/students", excelData)
      .then((res) => {
        console.log(res.data);
        alert(res?.data?.message);
      })
      .catch((e) => {
        console.log(e);
        alert(e?.response?.data?.message);
      });
  };

  return (
    <div className="mcq-card">
      <h3>Upload Certificate Students</h3>
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

export default UploadCertificateStudents;
