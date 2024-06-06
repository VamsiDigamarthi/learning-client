import React, { useEffect, useState } from "react";
import "./datewisepreview.css";
import { serverUrl } from "../../../core/apiurl";
import { useNavigate } from "react-router-dom";
const DateWisePreview = ({ data }) => {
  const [dateWisePreview, setDateWisePreview] = useState({});
  const navigate = useNavigate();
  const groupByDate = (data) => {
    return data?.reduce((acc, item) => {
      const date = new Date(item.date).toDateString(); // Convert date to a readable format
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(item);
      return acc;
    }, {});
  };

  useEffect(() => {
    const groupedData = groupByDate(data);
    setDateWisePreview(groupedData);
  }, [data]);

  const onShowPdf = (item) => {
    console.log(item);
    const queryString = new URLSearchParams(item).toString();
    window.open(`/pdf?${queryString}`, "_blank");
  };

  return (
    <div className="preview-images-main-card">
      {Object.keys(dateWisePreview)?.map((date) => (
        <div className="single-date-wise-preview" key={date}>
          <h3>{date}</h3>
          <div className="single-date-wise-preview-images-card">
            {dateWisePreview[date]?.map((item) => (
              <div
                onClick={() => onShowPdf(item)}
                className="single-date-wise-preview-images-card-img"
                key={item._id}
              >
                <img src={`${serverUrl}/${item.previewImg}`} alt={item.title} />
                <h3>{item.title}</h3>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};

export default DateWisePreview;
