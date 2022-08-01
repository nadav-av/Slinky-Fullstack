import React, { useState, useEffect } from "react";
import "./userBookingTable.css";
import userClient from "../../Services/userClient";
import TableHead from "./TableHead";
import TableBody from "./TableBody";
import { Loader } from "monday-ui-react-core";
import noBooksPhoto from "../../images/no-result-search-icon.jpg";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import PropTypes from "prop-types";
import Typography from "@mui/material/Typography";

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

const UserBookingTable = () => {
  const [userBookings, setUserBookings] = useState([]);
  const [userFutureBookings, setUserFutureBookings] = useState([]);
  const [userPastBookings, setUserPastBookings] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [value, setValue] = React.useState(0);

  TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
  };

  useEffect(() => {
    userClient
      .getUserBookings()
      .then((res) => {
        setUserBookings(res);
        const FutureBookings = [];
        const PastBookings = [];
        res.forEach((element) => {
          if (new Date(element.startDate) > Date.now()) {
            FutureBookings.push(element);
          } else {
            PastBookings.push(element);
          }
        });
        setUserFutureBookings(FutureBookings);
        setUserPastBookings(PastBookings);
        setTimeout(() => {
          setIsLoading(false);
        }, 500); //only for better visualization
      })
      .catch(setIsLoading(true));
  }, []);

  const pastColumns = [
    { label: "Start Date", accessor: "start_date" },
    { label: "Start Hour", accessor: "start_hour" },
    { label: "End Hour", accessor: "end_hour" },
    { label: "Reseved Place", accessor: "reserved_place" },
    { label: "Office", accessor: "office" },
  ];
  const deleteCol = { label: "Delete", accessor: "delete" };
  const futureColumns = [...pastColumns, deleteCol];

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const showNoBookings = () => {
    return (
      <>
        <div className="img-div">
          <img src={noBooksPhoto} className="img-not-found" alt="no-bookings" />
        </div>
        <h2>You don't have orders yet</h2>
      </>
    );
  };

  if (isLoading) {
    return <Loader size={40} />;
  } else {
    return (
      <div className="user-booking-table">
        <>
          <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
            <Tabs value={value} onChange={handleChange}>
              <Tab label="Future Orders" />
              <Tab label="Past Orders" />
            </Tabs>
          </Box>
          <TabPanel value={value} index={0}>
            {userFutureBookings.length > 0 ? (
              <table className="content-table">
                <TableHead columns={futureColumns} />
                <TableBody
                  columns={futureColumns}
                  tableData={userFutureBookings}
                  userBookings={userFutureBookings}
                  setUserBookings={setUserFutureBookings}
                />
              </table>
            ) : (
              showNoBookings()
            )}
          </TabPanel>
          <TabPanel value={value} index={1}>
            {userPastBookings.length > 0 ? (
              <table className="content-table">
                <TableHead columns={pastColumns} />
                <TableBody
                  columns={pastColumns}
                  tableData={userPastBookings}
                  userBookings={userPastBookings}
                  setUserBookings={setUserPastBookings}
                />
              </table>
            ) : (
              showNoBookings()
            )}
          </TabPanel>
        </>
      </div>
    );
  }
};

export default UserBookingTable;
