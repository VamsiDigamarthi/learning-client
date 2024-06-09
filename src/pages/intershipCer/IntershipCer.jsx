import React, { useEffect, useState } from "react";
import "./intershipcer.css";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { APIS } from "../../core/apiurl";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
const IntershipCer = () => {
  const UUU = useSelector((state) => state.authReducer.authData);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [user, setUser] = useState("");
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
    const capture = document.querySelector(".main-intership-cer");
    html2canvas(capture).then((canvas) => {
      const imgData = canvas.toDataURL("img/png");
      const doc = new jsPDF("p", "mm", "a4");

      const componentWidth = doc.internal.pageSize.getWidth();
      const componentHeight = doc.internal.pageSize.getHeight();
      doc.addImage(imgData, "PNG", 0, 0, componentWidth, componentHeight);

      doc.save(`${user.firstName}certificate.pdf`);
    });

    APIS.patch(`/auth/user/donwload/intership/${UUU?._id}`)
      .then((res) => {
        console.log(res.data);
        navigate(-1);
      })
      .catch((e) => console.log(e));
  };

  return (
    <div className="intership-main-card">
      {user?.downloadIntershipe ? (
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
            </section>
            <button onClick={() => downloadPdf()}>Download certificate</button>
          </div>
          <div className="main-intership-cer">
            <div className="hrs-main-card">
              <div className="hr-with-name">
                <hr />
                <h4>INTER ID :- {user?.certificate?.internId}</h4>
              </div>
              <hr />
              <div className="hr-with-name">
                <h4>DATE :- {user?.certificate?.endingDate}</h4>
                <hr />
              </div>
            </div>
            <h1>Certificate</h1>
            <h3>TO WHOM IT MAY CONCERN</h3>
            <h2>
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
            </h2>
            <p className="center-text">{user?.certificate?.["MATTER-1"]}</p>
            <p className="center-text">{user?.certificate?.["MATTER-2"]}</p>
            <p className="we-wish">{user?.certificate?.["MATTER-3"]}</p>
            <p className="we-wish">Thanks and Regards.</p>
            <div className="auth-sign-card">
              <div>
                <img src="images/without-logo-removebg-preview.png" alt="" />
                <p className="auth-sign">Authorized Signatory</p>
              </div>
              <div className="inter-ngs-logo">
                <img src="images/ngs-logo-removebg-preview.png" alt="" />
              </div>
            </div>

            <div className="nsg-logo-inter">
              <img src="images/only-ngs.png" alt="" />
              <h5>STAND IT. YOU WIN</h5>
            </div>
            <div className="hrs-main-card">
              <div className="hr-with-name">
                <hr />
                <h6 className="company-inter-name">
                  NUHVIN GLOBAL SERVICE PRIVATE LIMITED
                </h6>
              </div>
              <hr />
              <div className="hr-with-name">
                <h5>www.nuhvin.com</h5>
                <hr />
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default IntershipCer;
