import React from "react";
import "./profile.css";
import ProfileInformation from "../../components/profileComponents/profileinfo/ProfileInformation";
import ProfilePassword from "../../components/profileComponents/profilePassword/ProfilePassword";
const Profile = () => {
  return (
    <div className="profile-main-card">
      <h1>Profile</h1>
      <ProfileInformation />
      <ProfilePassword />
    </div>
  );
};

export default Profile;
