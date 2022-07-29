import React from "react";
import "./userBookings.css";
import UserBookingTable from "../../Components/UserBookingTable/UserBookingTable";

const UserBooking = () => {
  return (
    <div className="user-booking-container">
      <h1> My Bookings </h1>
      <UserBookingTable />
    </div>
  );
};

export default UserBooking;
