import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import "./navBar.css";

function NavBar({ loggedIn }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Slinky
          <i className="fa-solid fa-chart-simple"></i>
        </NavLink>

        <ul className={click ? "nav-menu active" : "nav-menu"}>
          <li className="nav-item">
            <NavLink
              to="/"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              Home
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/login"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              Login
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/signup"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              SignUp
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/notification"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              Notification
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/visualmap"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              Bookings
            </NavLink>
          </li>
          <li className="nav-item">
            <NavLink
              to="/mybookings"
              className={({ isActive }) =>
                "nav-links" + (isActive ? " activated" : "")
              }
              onClick={handleClick}
            >
              My Bookings
            </NavLink>
          </li>
        </ul>
        <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;
