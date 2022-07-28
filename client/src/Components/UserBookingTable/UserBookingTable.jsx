import React, { useState, useEffect } from "react";
import "./userBookingTable.css";
import userClient from "../../Services/userClient";

const UserBookingTable = () => {
  useEffect(() => {
    userClient.getUserBookings().then((res) => {
      console.log(res);
    });
  }, []);

  return (
    <div className="user-booking-table">
      <h1>Your Bookings</h1>
      <table>
        <thead>
          <tr>
            <th>Booking ID</th>
            <th>Date</th>
            <th>Time</th>
            <th>Number of Guests</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>1</td>
            <td>12/12/2020</td>
            <td>12:00 PM</td>
            <td>2</td>
            <td>Confirmed</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default UserBookingTable;
