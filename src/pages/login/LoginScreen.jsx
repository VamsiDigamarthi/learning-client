import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
// import Cookies from "js-cookie";
import "./loginScreen.css";
import { LogIns } from "../../redux/action/AuthAction";
// import { LogIns } from "../../action/AuthAction";
// import { APIS } from "../../core/apiurl";
const LoginScreen = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onHandleInputs = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };

  const onSubmittedLogin = (e) => {
    e.preventDefault();
    // APIS.post("/auth/login", user)
    //   .then((res) => {
    //     console.log(res.data);
    //     // Cookies.set("jwt_token", jwtTkoken, {
    //     //   expires: 30,
    //     //   path: "/",
    //     // });
    //   })
    //   .catch((e) => {
    //     console.log(e);
    //   });
    dispatch(LogIns(user, navigate));
  };
  return (
    <div className="login-screen-main-card">
      <div className="login-second-main-card">
        <div className="login-second-card-first">
          <h3>
            Learn & Upgrade Your Skills on with
            <br /> Nuhvin's Drive Test
          </h3>
        </div>
        <form onSubmit={onSubmittedLogin} className="login-input-card">
          <h3>Login To Your Account</h3>
          <div className="input-card">
            <label>Email</label>
            <input
              name="email"
              value={user.email}
              onChange={onHandleInputs}
              type="text"
            />
          </div>
          <div className="input-card">
            <label>Password</label>
            <input
              name="password"
              value={user.password}
              onChange={onHandleInputs}
              type="text"
            />
          </div>
          <div className="login-check-box">
            <div>
              <input type="checkbox" />
              <span>Remember Me</span>
            </div>
            <div>
              <span>Forgot Password</span>
            </div>
          </div>
          <button type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default LoginScreen;
