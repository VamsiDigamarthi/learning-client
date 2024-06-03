import { useEffect, useState } from "react";
import { Document, Page } from "react-pdf";
import "./pdf.css";
import pdfjs from "pdfjs-dist/build/pdf";
import "pdfjs-dist/build/pdf.worker.min";
import { APIS, serverUrl } from "../../../core/apiurl";

function PDF(props) {
  const [numPages, setNumPages] = useState();
  const [pageNumber, setPageNumber] = useState(1);

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }
  const [pdfs, setPdfs] = useState([]);

  let lan = "Java";
  useEffect(() => {
    APIS.get(`/super/pdf/${lan}`)
      .then((res) => {
        console.log(res.data);
        setPdfs(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }, []);
  useEffect(() => {
    const preventContextMenu = (event) => {
      event.preventDefault();
    };

    document.addEventListener("contextmenu", preventContextMenu);

    return () => {
      document.removeEventListener("contextmenu", preventContextMenu);
    };
  }, []);
  let p = `${serverUrl}/files/${pdfs[2]?.image}`;
  return (
    <div className="pdf-div">
      <p>
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
