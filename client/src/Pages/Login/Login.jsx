import React from "react";
import LoginForm from "./../../Components/LoginForm/LoginForm";
import "./login.css";

const Login = ({ setLoggedIn }) => {
  return (
    <div className="login-container">
      <LoginForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default Login;
