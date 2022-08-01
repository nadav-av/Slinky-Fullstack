import React, { useState, useEffect } from "react";
import "./userBookingTable.css";
import userClient from "../../Services/userClient";
import TableHead from "./TableHead";
import TableBody from "./TableBody";

const UserBookingTable = () => {
  const [userBookings, setUserBookings] = useState([]);

  useEffect(() => {
    userClient.getUserBookings().then((res) => {
      setUserBookings(res);
    });
  }, []);

  const columns = [
    { label: "Start Date", accessor: "start_date" },
    { label: "Start Hour", accessor: "start_hour" },
    { label: "End Hour", accessor: "end_hour" },
    { label: "Reseved Place", accessor: "reserved_place" },
    { label: "Office", accessor: "office" },
    { label: "Delete", accessor: "delete" },
  ];

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
};

export default UserBookingTable;
