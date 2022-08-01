import React, { useState } from "react";
import "./loginForm.css";
import userClient from "../../Services/userClient";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginRes, setloginRes] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(username, password);
    const res = await userClient.login(username, password);
    if (res) {
      setloginRes(res);
    }
  };

  return (
    <div className="center login-center">
      <h1>Login</h1>
      <form onSubmit={handleSubmit}>
        <div className="login-txt_field">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label>Username</label>
        </div>
        <div className="login-txt_field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <input className="login-submit" type="submit" />
      </form>
      <div>
        {loginRes && (
          <div>
            <h2>{loginRes}</h2>
          </div>
        )}
      </div>
    </div>
  );
};

export default LoginForm;
