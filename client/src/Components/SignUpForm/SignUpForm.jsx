import React, { useState } from "react";
import userClient from "../../Services/userClient";
import { USER_EXISTS } from "../../Services/Consts";
import { useNavigate } from "react-router-dom";
import "./signUpForm.css";
const emailValidator = require("email-validator");

const SignUpForm = ({ setLoggedIn }) => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [company, setCompany] = useState("");
  let navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isDataValid = isUserDataValid(
      firstName,
      lastName,
      email,
      password,
      username,
      company
    );
    if (isDataValid) {
      const newUser = {
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
        userName: username,
        company: company,
        isAdmin: true,
      };
      const res = await userClient.register(newUser);
      if (res !== USER_EXISTS) {
        setLoggedIn(true);
        navigate("/");
      } else {
        alert(res); //when redux -> toggle error message in res to preset at top of page
      }
    }
  };

  const isUserDataValid = (
    firstName,
    lastName,
    email,
    password,
    username,
    company
  ) => {
    if (firstName.length < 3) {
      alert("First name must be at least 3 characters");
      return false; //when redux is implemented, toggle error message to preset at top of page
    }
    if (lastName.length < 3) {
      alert("Last name must be at least 3 characters");
      return false; //when redux is implemented, toggle error message to preset at top of page
    }
    if (!emailValidator.validate(email)) {
      alert("Email is not valid");
      return false; //when redux is implemented, toggle error message to preset at top of page
    }
    if (password.length < 5) {
      alert("Password must be at least 5 characters");
      return false; //when redux is implemented, toggle error message to preset at top of page
    }
    if (username.length < 5) {
      alert("Username must be at least 5 characters");
      return false; //when redux is implemented, toggle error message to preset at top of page
    } else {
      console.log("VALID");
      return true;
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
