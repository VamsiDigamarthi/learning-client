import React from "react";
import "./profilepassword.css";
import { IoMdEye } from "react-icons/io";
import { IoMdEyeOff } from "react-icons/io";
const ProfilePassword = () => {
  return (
    <div className="profile-single-card ">
      <h3>Update Password</h3>
      <div className="profile-input-box">
        <form className="profile-infor-form">
          <div className="single-input-label-card">
            <label>Current Password</label>
            <input type="password" />
            <div className="form-eye-ions">
              <IoMdEyeOff size={20} />
            </div>
          </div>
          <div className="single-input-label-card">
            <label>New Password</label>
            <input type="password" />
            <div className="form-eye-ions">
              <IoMdEyeOff size={20} />
            </div>
          </div>
          <div className="single-input-label-card">
            <label>Confimr Password</label>
            <input type="password" />
            <div className="form-eye-ions">
              <IoMdEyeOff size={20} />
            </div>
          </div>
          <button>Save</button>
        </form>
      </div>
    </div>
  );
};

export default ProfilePassword;
