import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "./pdf.css";
import pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.min";
import { APIS, serverUrl } from "../../../core/apiurl";
import { useLocation } from "react-router-dom";

function PDF() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);

  const data = {
    lan: params.get("lan"),
    title: params.get("title"),
    previewImg: params.get("previewImg"),
    date: params.get("date"),
    pdf: params.get("image"),
  };

  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);

  let p = `${serverUrl}/${data?.pdf}`;
  return (
    <div className="pdf-div">
      <p className="page-number-card">
        Page {pageNumber} of {numPages}
      </p>
      <Document file={p} onLoadSuccess={onDocumentLoadSuccess}>
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((page) => {
            return (
              <Page
                pageNumber={page}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={window.innerWidth * 0.8}
              />
            );
          })}
      </Document>
    </div>
  );
}
export default PDF;
