import React, { useState, useEffect } from "react";
import "./userBookingTable.css";
import userClient from "../../Services/userClient";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Loader } from "monday-ui-react-core";


const UserBookingTable = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    userClient.getUserBookings()
      .then((res) => {
        setUserBookings(res);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); //only for better visualization
      })
      .catch (
        setIsLoading(true)
      );
  }, []);

  const columns = [
    { label: "Start Date", accessor: "start_date" },
    { label: "Start Hour", accessor: "start_hour" },
    { label: "End Hour", accessor: "end_hour" },
    { label: "Reseved Place", accessor: "reserved_place" },
    { label: "Office", accessor: "office" },
    { label: "Delete", accessor: "delete" },
  ];

  if (isLoading) {
    return (
        <Loader size={40} />
    );
  }
  else if (userBookings[0] === undefined) {
    console.log('no bookings');
    return (
      <h2>No orders found</h2>
    );
  }
  else {
    console.log('table');
    return (
    <div className="user-booking-table">
      <>
        <table className="content-table">
          <TableHead columns={columns} />
          <TableBody
            columns={columns}
            tableData={userBookings}
            userBookings={userBookings}
            setUserBookings={setUserBookings}
          />
        </table>
      </>
    </div>
  );
}};

export default UserBookingTable;
