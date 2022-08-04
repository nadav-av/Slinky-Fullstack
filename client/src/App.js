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
import FoodOrder from "./Pages/FoodOrder/FoodOrder";
import OfficePage from "./Pages/OfficePage/OfficePage";
<<<<<<< HEAD
import StatisticsPage from "./Pages/StatisticsPage/statistics";
=======
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
import CalendarForm from "./Components/Calendar/CalendarForm"; /*************************** */

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    userClient.getUser().then((res) => {
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
            <Route path="/orderfood" element={<FoodOrder />} />
            <Route path="/book" element={<OfficePage />} />
<<<<<<< HEAD
            <Route path="/statistics" element = { <StatisticsPage/>}/>
=======
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
            <Route path="/calendar" element={<CalendarForm />} /> 
          </Routes>
        </div>
      </div>
    </React.Fragment>
  );
};

export default App;
