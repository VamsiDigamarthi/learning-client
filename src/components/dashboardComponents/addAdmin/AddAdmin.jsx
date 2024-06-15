import React, { useState } from "react";
import "./addadmin.css";
import { APIS } from "../../../core/apiurl";
const AddAdmin = () => {
  const [user, setUser] = useState({
    firstName: "",
    lastName: "",
    userName: "",
    email: "",
    role: 2,
    password: "",
  });

  const onUserChanges = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onAddAdmin = (e) => {
    e.preventDefault();
    console.log(user);
    APIS.post("/auth/registor", user)
      .then((res) => {
        setUser({
          firstName: "",
          lastName: "",
          userName: "",
          email: "",
          password: "",
        });
        alert(res?.data?.message);
      })
      .catch((e) => {
        console.log(e?.response?.data?.message);
        alert(e?.response?.data?.message);
      });
  };

  return (
    <div className="add-admin-main-card">
      <form onSubmit={onAddAdmin} className="admin-main-fomr">
        <h3>Add An Admin</h3>
        <input
          onChange={onUserChanges}
          name="firstName"
          value={user.firstName}
          type="text"
          placeholder="First Name"
        />
        <input
          onChange={onUserChanges}
          name="lastName"
          type="text"
          value={user.lastName}
          placeholder="Last Name"
        />
        <input
          onChange={onUserChanges}
          name="userName"
          type="text"
          value={user.userName}
          placeholder="User Name"
        />
        <input
          onChange={onUserChanges}
          name="email"
          type="text"
          value={user.email}
          placeholder="Email"
        />
        <input
          onChange={onUserChanges}
          name="password"
          type="text"
          placeholder="Password"
          value={user.password}
        />
        <button type="submit">Add</button>
      </form>
    </div>
  );
};

export default AddAdmin;
