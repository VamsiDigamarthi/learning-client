import React, { useEffect, useState } from "react";
import { RiHexagonLine } from "react-icons/ri";
import { MdHexagon } from "react-icons/md";
import { MdCircle } from "react-icons/md";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import "./certificate.css";
import { useSelector } from "react-redux";
import { APIS } from "../../core/apiurl";
import { useNavigate } from "react-router-dom";
const Certificate = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
  const [traineName, setTraineName] = useState("");
  const navigate = useNavigate();
  const getProfile = () => {
    APIS.get(`/student/student/get/certificate/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        setUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  };

  useEffect(() => {
    getProfile();
  }, []);

  const downloadPdf = () => {
    const capture = document.querySelector(".certificate-main-card-oii");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("l", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save(`${user.firstName}certificate.pdf`);
    });

    APIS.patch(`/auth/user/download-certificate/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((e) => console.log(e));
  };

  console.log(user);

  useEffect(() => {
    const changeTraineName = () => {
      if (user.certificate?.trainerName === "P. NITHISH KUMAR") {
        setTraineName("images/nithish-removebg-preview.png");
      } else if (user.certificate?.trainerName === "CH. SAI") {
        setTraineName("images/sai-removebg-preview.png");
      } else if (user.certificate?.trainerName === "G. SIVA PARVATHI") {
        setTraineName("images/siva_parvathi-removebg-preview.png");
      } else if (user.certificate?.trainerName === "S.CHARAN") {
        setTraineName("images/charan-removebg-preview.png");
      } else if (user.certificate?.trainerName === "SEELAM DHARANI") {
        setTraineName("images/dharani-removebg-preview.png");
      } else if (user.certificate?.trainerName === "K MURALI") {
        setTraineName("images/murali-removebg-preview.pngg");
      }
      console.log(user.certificate?.trainerName);
    };
    Object.keys(user)?.length > 0 && changeTraineName();
  }, [user]);

  return (
    <div className="certificate-main-page">
      {user?.downloadCertificate ? (
        <div className="after-down-load-certificate-card">
          <h1>You are already download the certificate</h1>
        </div>
      ) : (
        <>
          <div className="certificate-message">
            <h2>
              Please check your name if in case any incorrect your first name
              and last name in the certificate
            </h2>
            <h5>Change Your first name and last name below</h5>
            <span>
              You can download certificate only once please make sure check all
              details correctly{" "}
            </span>
          </div>
          <div className="download-certificate">
            <section>
              <input
                onChange={(e) => setFirstName(e.target.value)}
                type="text"
                placeholder="first name"
              />
              <input
                onChange={(e) => setLastName(e.target.value)}
                type="text"
                placeholder="last name"
              />
              {/* <button>Submit</button> */}
            </section>
            <button onClick={() => downloadPdf()}>Download certificate</button>
          </div>
          <div className="certificate-main-card-oii">
            <img src="images/certificate.svg" alt="certi" />
            <span className="Student-Name-On-Certificate">
              {firstName?.length > 0
                ? firstName?.[0]?.toUpperCase() +
                  firstName?.slice(1)?.toLowerCase()
                : user?.firstName?.[0]?.toUpperCase() +
                  user?.firstName?.slice(1)?.toLowerCase()}
              &nbsp;
              {lastName?.length > 0
                ? lastName?.[0]?.toUpperCase() +
                  lastName?.slice(1)?.toLowerCase()
                : user?.lastName?.[0]?.toUpperCase() +
                  user?.lastName?.slice(1)?.toLowerCase()}
            </span>
            <span className="Course-On-Certificate">
              {user?.certificate?.ccurseName}
            </span>
            <span className="From-Date-On-Certificate">
              {user?.certificate?.startingDate}
            </span>
            <span className="To-Date-On-Certificate">
              {user?.certificate?.endingDate}
            </span>
            <div className="traine-sign">
              <img src={traineName} alt="trainee" />
            </div>
            <div className="authorized-sign">
              <img
                src="images/pavan_sai-removebg-preview.png"
                alt="authorizes"
              />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Certificate;
