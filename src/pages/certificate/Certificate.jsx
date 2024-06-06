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
  const [user, setUser] = useState("");
  const navigate = useNavigate();
  const getProfile = () => {
    APIS.get(`/auth/profile/${UUU?._id}`)
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
    const capture = document.querySelector(".certificate-main-card");
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

  return (
    <div className="certificate-main-page">
      {user?.downloadCertificate ? (
        <div className="after-down-load-certificate-card">
          <h1>You are already download the certificate</h1>
        </div>
      ) : (
        <>
          <div className="download-certificate">
            <button onClick={() => downloadPdf()}>Download certificate</button>
          </div>
          <div className="certificate-main-card">
            {/*  */}
            <div className="top-left-card"></div>
            <div className="top-top-card"></div>
            <div className="left-bottom-card"></div>
            <div className="left-bottom-second-card"></div>
            {/*  */}
            <div className="top-right-first-card"></div>
            <div className="top-right-second-card"></div>
            <div className="right-bottom-first-card"></div>
            <div className="bottom-right-card"></div>
            {/*  */}
            {/* orange card */}
            <div className="top-right-color-first-card"></div>
            <div className="top-right-color-second-card"></div>
            <div className="left-bottom-color-first-card"></div>
            <div className="left-bottom-color-second-card"></div>
            {/* orange cards */}
            <h4 className="stand-it-win">"Stand it. You win"</h4>
            <div className="nuhvin-main-heading">
              <h1>Nuhvin Global Services Private Limited</h1>
            </div>
            <div className="address-card">
              <p>
                614, Jayabheri Silicon Tower, Hi-Tech City Road, Kothaguda,
                Hyderabad-500084 (Telangana).
              </p>
            </div>
            <div className="cin-card">
              <p>(CIN : U62013TS2024PTC183165)</p>
            </div>
            {/* congratulation card */}
            {/* congratulation end card */}
            <div className="proud-card">
              <h5>Thi certificate is proudly presented to</h5>
            </div>
            <div className="main-name">
              <h1>
                {user?.firstName}
                &nbsp;&nbsp;&nbsp; {user?.lastName}
              </h1>
            </div>
            <div className="full-stack-card">
              <p>
                Has completed <span>Full stack {user.language?.[0]}</span>{" "}
                Course between <span>May 09, 2024</span> to{" "}
                <span>Jun 10, 2024.</span>
              </p>
            </div>
            <div className="demonstration">
              <p>
                You have demonstated exceptional dedication and commitment to
                your studies.
              </p>
            </div>
            <div className="dedication">
              <p>Your dedication and perseverance turned reward</p>
            </div>
            <div className="we-hope">
              <p>
                We hope that this achievement will open up new opportunities for
                you.
              </p>
            </div>
            <div className="we-take">
              <p>
                We take this chance to express our gratitude and wish him/her
                the best of luck in the future.
              </p>
            </div>
            <div className="left-side-author-card">
              <hr />
              <h5>Trainer Signatory</h5>
            </div>
            {/* sptam */}
            <div className="right-side-author-card">
              <hr />
              <h5>Authorized Signatory</h5>
            </div>
            {/* hexogona */}
            <RiHexagonLine size={90} className="first-hexo" />
            <MdHexagon size={90} className="second-hexo" />
            <MdCircle size={40} className="first-cicle" />
            <RiHexagonLine size={90} className="third-hexo" />
            <RiHexagonLine size={60} className="fouth-hexo" />
            <RiHexagonLine size={90} className="five-hexo" />
            <MdHexagon size={90} className="six-hexo" />
            <MdHexagon size={90} className="right-first-hexo" />
            <MdCircle size={60} className="second-cicle" />
            <MdCircle size={40} className="third-cicle" />
            <RiHexagonLine size={60} className="seven-hexo" />
          </div>
        </>
      )}
    </div>
  );
};

export default Certificate;
