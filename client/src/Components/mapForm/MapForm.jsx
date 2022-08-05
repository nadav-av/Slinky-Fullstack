import React, { useState } from "react";
import "./mapForm.css";
import GenericModal from "../GenericModal/genericModal";
import BookingForm from "../BookingForm/BookingForm";
import { officePositions } from "../../Services/Consts";

const MapForm = (office) => {
  const [officeId, setofficeId] = useState(office.officeId || 1);
  const [isOpenModal, setIsOpenModal] = useState(false);
  const [bookingPlace, setBookingPlace] = useState("c1")
  const getBooking = async (officeId,bookingPlace) => {  
    setBookingPlace(bookingPlace);
    setIsOpenModal(true);
    setofficeId(officeId);
  };

  console.log(officeId);
  const map1 = () => {
    const officePosition = officePositions["1"];
    return (
    <div id="mapBackGround"> 
      {officePosition.map((element) =>       
         <button className="btn-map" id={element} key={element} onClick={()=> getBooking(officeId,element)}>{element}</button>
      )}
      </div>
    )
  }

  const map2 = () => {
    console.log('map2')
    const officePosition = officePositions["2"];
    return (
      <div id="map2">
        {officePosition.map((element) =>       
         <button className="btn-map" id={element} key={element} onClick={()=> getBooking(officeId,element)}>{element}</button>
        )}
      </div> 
      //null /****************/
    )
  }

  return (

    <div className="map-modal">
    {isOpenModal === true ? 
    <GenericModal open ={isOpenModal} onClose ={()=> {setIsOpenModal(false)}} content={
      <BookingForm officeId={officeId} bookingPlace={bookingPlace}/>
        }/>
    :
      <div className="map-center">
      <h1>Choose your seat:</h1>
        {(officeId === 1)? map1():null}
        {(officeId === 2)? map2():null}
      </div>

    }
    </div>
  );
};

export default MapForm;
