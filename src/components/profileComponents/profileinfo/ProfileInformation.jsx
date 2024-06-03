import React from "react";
import "./profileinformation.css";
const ProfileInformation = () => {
  return (
    <div className="profile-single-card">
      <h3>Profile Information</h3>
      <div className="profile-input-box">
        <span>Photo</span>
        <span className="pic-card"></span>
        <form className="profile-infor-form">
          <div className="single-input-label-card">
            <input type="file" />
          </div>
          <div className="single-input-label-card">
            <label>First Name</label>
            <input type="text" />
          </div>
          <div className="single-input-label-card">
            <label>Last Name</label>
            <input type="text" />
          </div>
          <div className="single-input-label-card">
            <label>Email</label>
            <input type="text" />
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfileInformation;
