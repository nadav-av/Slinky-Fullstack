import React from "react";
import "./userBookings.css";
import UserBookingTable from "../../Components/UserBookingTable/UserBookingTable";

const UserBooking = () => {
  return (
    <div className="user-booking-container">
      <UserBookingTable />
    </div>
  );
};

export default UserBooking;
