import React, { useEffect, useState } from "react";
import "./mapForm.css";
import GenericModal from "../GenericModal/genericModal";
import BookingForm from "../BookingForm/BookingForm";
import { officePositions } from "../../Services/Consts";
import { useSelector, useDispatch } from "react-redux";
import { setBooking } from "../../Redux/Slices/bookingSlice";
// import {setBookingForm} from "../../Redux/Slices/officeSlice";

const MapForm = (office) => {
  const dispatch = useDispatch();
  const [officeId, setofficeId] = useState(office.officeId || 1);
  // const [isOpenModal, setIsOpenModal] = useState(false);
  // const [bookingPlace, setBookingPlace] = useState("c1")
  const onChoose = useSelector((state) => state.allReducers.office.OnClose);
  const setBookingForm = useSelector((state) => state.allReducers.office.BookingForm);
  const getBooking = async (officeId,bookingPlace) => {  
    // setBookingPlace(bookingPlace);
    // setIsOpenModal(true);
    setofficeId(officeId);
    dispatch(setBooking({officeId:officeId, bookingPlace:bookingPlace}));
    onChoose(false);
    setBookingForm(true);
  };

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
    {/* {isOpenModal === true ? 
    <GenericModal open ={isOpenModal} onClose ={()=> {setIsOpenModal(false)}} content={
      <BookingForm officeId={officeId} bookingPlace={bookingPlace}/>
        }/>
    : */}
      <div className="map-center">
      <h1>Choose your seat:</h1>
        {(officeId === 1)? map1():null}
        {(officeId === 2)? map2():null}
      </div>

    </div>
  );
};

export default MapForm;
