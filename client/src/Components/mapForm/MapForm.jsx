import React, { useState } from "react";
import "./mapForm.css";
import GenericModal from "../GenericModal/genericModal";
import BookingForm from "../BookingForm/BookingForm";

const MapForm = (office) => {
  const [officeId, setofficeId] = useState(office.officeId);
  const [officePosition, setOfficePosition] = useState(["c1","c2","c3","c4","c5","c6","c7","c8","o1","o2","o3","o4","o5","o6"]);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookingPlace, setBookingPlace] = useState("c1")
  const getBooking = async (officeId,bookingPlace) => {  
    setBookingPlace(bookingPlace);
    setIsOpenModal(true);
    setofficeId(officeId);
  };

  console.log(officeId);

  return (

    <div>
    {isOpenModal === true ? 
    <GenericModal open ={isOpenModal} onClose ={()=> {setIsOpenModal(false)}} content={
    <BookingForm officeId={officeId} bookingPlace={bookingPlace}/>
    }/>
    :
    <div className="map-center">
      <h1>Choose your seat:</h1>
      <div id="mapBackGround"> 
      {officePosition.map((element) =>       
         <button className="btn" id={element} key={element} onClick={()=> getBooking(officeId,element)}>{element}</button>
      )}
      </div>
      </div>
    }
    </div>
  );
};

export default MapForm;
