import React, { useEffect, useState } from "react";
import { INVALID_TOKEN } from "./Services/Consts";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Generics/NavBar/NavBar";
import BookingForm from "./Components/BookingForm/BookingForm";
import NotFound from "./Pages/NotFound/NotFound";
import "./App.css";
import SignUp from "./Pages/SignUp/SignUp";
import VisualMap from "./Pages/visualMap/VisualMap";
import UserBooking from "./Pages/UserBookings/UserBookings";
import HomePage from "./Pages/HomePage/HomePage";
import Notification from "./Pages/NotificationPage/Notification";
import userClient from "./Services/userClient";
import OfficeForm from "./Components/OfficeForm/OfficeForm"; /**************************************/
const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    userClient.checkIfUserLoggedIn().then((res) => {
      if (res === INVALID_TOKEN) {
        setIsLoggedIn(false);
      } else {
        setIsLoggedIn(true);
      }
    });
  });

  return (
    <React.Fragment>
      <div className="App">
        <div className="contaier">
          <Navbar loggedIn={isLoggedIn} />
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route
              path="/signup"
              element={<SignUp setLoggedIn={setIsLoggedIn} />}
            />
            <Route
              path="/login"
              element={<Login setLoggedIn={setIsLoggedIn} />}
            />
            <Route path="/visualmap" element={<VisualMap />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/notification" element={<Notification />} />
            <Route path="/mybookings" element={<UserBooking />} />
            <Route path="/officeForm" element={<OfficeForm />} />
          </Routes>
        </div>
        {console.log(process.env.REACT_APP_SERVER_URL)}
      </div>
    </React.Fragment>
  );
};

export default App;
