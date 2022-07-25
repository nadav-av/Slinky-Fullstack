import React from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Slinky
          <i className="fa-solid fa-chart-simple"></i>
        </NavLink>

        <ul className="nav-menu">
          <li className="nav-item">
            <NavLink to="/login" className={"nav-links"}>
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/signup" className={"nav-links"}>
              SignUp
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink to="/booking" className={"nav-links"}>
              booking
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
