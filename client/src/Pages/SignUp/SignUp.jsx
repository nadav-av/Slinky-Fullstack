import React from "react";
import "./signUp.css";
import SignUpForm from "./../../Components/SignUpForm/SignUpForm";

const SignUp = ({ setLoggedIn }) => {
  return (
    <div className="signup-container">
      <SignUpForm setLoggedIn={setLoggedIn} />
    </div>
  );
};

export default SignUp;
