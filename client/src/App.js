import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./Pages/Login/Login";
import Navbar from "./Components/Generics/NavBar/NavBar";
import BookingForm from "./Components/BookingForm/BookingForm";
import NotFound from "./Pages/NotFound/NotFound";
import "./App.css";
import SignUp from "./Pages/SignUp/SignUp";
import VisualMap from "./Pages/visualMap/VisualMap";
import UserBooking from "./Pages/UserBookings/UserBookings";

const App = () => {
  return (
    <React.Fragment>
      <div className="App">
        <Navbar />
        <div className="contaier">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route path="/visualmap" element={<VisualMap />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/booking" element={<BookingForm />} />
            <Route path="/mybookings" element={<UserBooking />} />
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
