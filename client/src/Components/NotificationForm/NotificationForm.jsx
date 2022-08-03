import "./notificationForm.css";
import React, { useState } from "react";

const NotificationForm = ({data}) => {
  console.log(data,"data");
return (
    <>
    <div className="notification-center">
    <h3>User name</h3>
    <h4>{data.madeBy}</h4>
    <br></br>
    <h3>Category</h3>
    <h4> 
    {data.category}
    </h4>  
    <br></br>
    <h3>Content</h3>
    <h5> 
    {data.content}
    </h5>  
      
    </div>
    </>
  );
};
export default NotificationForm;
