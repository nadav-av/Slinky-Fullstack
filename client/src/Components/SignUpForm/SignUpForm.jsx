import React, { useState } from "react";
import userClient from "../../Services/userClient";
import "./signUpForm.css";

const SignUpForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(firstName, lastName, email, password, username, company);
    const res = await userClient.signUp(
      firstName,
      lastName,
      email,
      password,
      username,
      company,
      true
    );
    if (res) {
      console.log("GOOD");
    }
  };

  return (
    <div className="signup-center">
      <h1>SignUp</h1>
      <form onSubmit={handleSubmit}>
        <div className="txt_field">
          <input
            type="text"
            required
            onChange={(e) => setFirstName(e.target.value)}
          />
          <span></span>
          <label>First name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <span></span>
          <label>Last name</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <span></span>
          <label htmlFor="username">Username</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <span></span>
          <label>Email</label>
        </div>
        <div className="txt_field">
          <input
            type="password"
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <span></span>
          <label>Password</label>
        </div>
        <div className="txt_field">
          <input
            type="text"
            onChange={(e) => setCompany(e.target.value)}
            required
          />
          <span></span>
          <label>Company</label>
        </div>
        <input type="submit" value="Sign Up" />
      </form>
    </div>
  );
};

export default SignUpForm;
