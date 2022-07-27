import React, { useState } from "react";
import "./mapForm.css";


const MapForm = () => {
  const [officeId, setofficeId] = useState(1);
  const [officePosition, setOfficePosition] = useState(["c1","c2","c3","c4","c5","c6","c7","c8","o1","o2","o3","o4","o5","o6"]);
  const getBooking = async (officeId,bookingPlace) => {  
    console.log(officeId,bookingPlace)  
  };

  return (
    <div className="map-center">
      <h1>map</h1>
      <div id="mapBackGround"> 
      {officePosition.map((element) =>       
         <button className="btn" id={element} key={element} onClick={()=> getBooking(officeId,element)}>{element}</button>
      )}
      </div>
      </div>

  );
};

export default MapForm;
