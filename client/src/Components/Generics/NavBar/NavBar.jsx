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
            <NavLink to="/" className={"nav-links"}>
              Home
            </NavLink>
          </li>
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
              Booking
            </NavLink>
            <NavLink to="/visualmap" className={"nav-links"}>
              Visual Map
            </NavLink>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
