import "./notificationForm.css";
import React, { useState } from "react";

const NotificationForm = ({data}) => {
  
return (
    <>
    <div className="notification-center">
      <h1>{data.userName}</h1>
        <h2> 
        {data.content}
        </h2>  
        <h2> 
        {data.category}
        </h2>  
    </div>
    </>
  );
};
export default NotificationForm;
