import React, { useState } from "react";
import { Navigate, NavLink } from "react-router-dom";
import "./navBar.css";

function NavBar({ loggedIn }) {
  const [click, setClick] = useState(false);

  const handleClick = () => setClick(!click);

  const handleLogout = () => {
    localStorage.removeItem("x-auth-token");
    handleClick();
    window.location.reload();
    Navigate("/");
  };

  const showForUnLoggedUser = () => {
    return (
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
      </ul>
    );
  };

  const showForLoggedUser = () => {
    return (
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
            to="/Book"
            className={({ isActive }) =>
              "nav-links" + (isActive ? " activated" : "")
            }
            onClick={handleClick}
          >
            Book
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
            Notifications
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

        <li className="nav-item">
          <NavLink
            to="/orderfood"
            className={({ isActive }) =>
              "nav-links" + (isActive ? " activated" : "")
            }
            onClick={handleClick}
          >
            Order Food  
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink
            to="/"
            className={({ isActive }) =>
              "nav-links" + (isActive ? " activated" : "")
            }
            onClick={handleLogout}
          >
            LogOut
          </NavLink>
        </li>
      </ul>
    );
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">
          Slinky
          <i className="fa-solid fa-house-laptop"></i>
        </NavLink>
        {loggedIn ? showForLoggedUser() : showForUnLoggedUser()}

        <div className="nav-icon" onClick={handleClick}>
          <i className={click ? "fas fa-times" : "fas fa-bars"}></i>
        </div>
      </div>
    </nav>
  );
}

export default NavBar;

/*
<li className="nav-item">
          <NavLink
            to="/visualmap"
            className={({ isActive }) =>
              "nav-links" + (isActive ? " activated" : "")
            }
            onClick={handleClick}
          >
            Book
          </NavLink>
        </li>
        */
