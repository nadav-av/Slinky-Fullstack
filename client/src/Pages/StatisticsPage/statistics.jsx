import React from "react";
import "./statistics.css";
import Statistics from "../../Components/Statistics/statistics";

const StatisticsPage = () => {
  return (
   <div className="notification-container">
     {/* <button className="btn-primary" onClick={() => setModal(true)}> Create Task </button> */}
     <Statistics/>
   </div>
  );
};

export default StatisticsPage;
