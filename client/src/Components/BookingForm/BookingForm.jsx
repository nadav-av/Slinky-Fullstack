import React, { useState, useEffect } from "react";
import { Dropdown } from "monday-ui-react-core/";
import "monday-ui-react-core/dist/main.css";
import TextField from "@mui/material/TextField";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "./bookingForm.css";
import bookingClient from "../../Services/bookingClient";
import { useNavigate } from "react-router-dom";

const BookingForm = ({officeId,bookingPlace}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startHour, setStartHour] = useState(-1);
  const [isStartHour, setIsStartHour] = useState(false);
  const [isEndHour, setIsEndHour] = useState(false);
  const [availableHours, setAvailableHours] = useState([]);
  const [availableEndHours, setAvailableEndHours] = useState([]);
  let navigate = useNavigate();
  console.log(officeId,"officeId");
  console.log(typeof(bookingPlace),"bookingPlace");
  const getAvailableHours = async (
    officeId,
    bookingPlace,
    startDate,
    endDate
  ) => {
    try {
      setAvailableHours(
        await bookingClient.getAvailableStartHours(
          officeId,
          bookingPlace,
          startDate,
          endDate
        )
      );
    } catch (err) {
      console.error("err");
    }
  };

  useEffect(() => {
    getAvailableHours(officeId, bookingPlace, startDate, endDate);
  }, [startDate]);

  const calcAvailableEndHours = () => {
    const endHours = [];
    let i = availableHours.indexOf(startDate.getHours());
    while (
      i < availableHours.length - 1 &&
      availableHours[i] + 1 === availableHours[i + 1]
    ) {
      endHours.push(availableHours[i] + 1);
      i++;
    }
    endHours.push(availableHours[i] + 1);
    return endHours;
  };

  useEffect(() => {
    if (isStartHour && startHour !== -1) {
      setIsEndHour(false);
      const a = calcAvailableEndHours();
      setAvailableEndHours(a);
    }
  }, [isStartHour, startHour]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isStartHour && isEndHour) {
      try {
            await bookingClient.addBooking(
              officeId,
              bookingPlace,
              startDate,
              endDate
            )
          
      } catch {
        console.err("err");
      }
      alert('Booking success!');
      navigate('/mybookings');
    }
    else { alert("Booking Failed. You must enter start date and end date"); }
  };

  const convertToDropdownComp = (hoursArray) => {
    return hoursArray.map((value) => {
      const obj = {};
      obj.value = value.toString();
      obj.label = numHourToString(value);
      return obj;
    });
  };

  const numHourToString = (value) => {
    return value > 9
      ? value.toString() + ":00"
      : "0" + value.toString() + ":00";
  };

  const showStartValue = () => {
    if (startHour === -1) {
       return null;
    }
    return convertToDropdownComp([startHour])[0]
  }

  const showEndValue = () => {
    if (startHour === -1 || !isEndHour) {
       return null;
    }
    return convertToDropdownComp([endDate.getHours()])[0]
  }

  return (
    <div className="bokkingformWrapper">
      <div className="booking-form">
        <div className="booking-form-container">
          <div className="booking-form-header">
            <h1>Book the office</h1>
          </div>
          <div className="booking-form-body">
            <form onSubmit={handleSubmit}>
              <div className="form-date">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                  <DatePicker
                    class="ui-datepicker"
                    label="Date"
                    inputFormat="dd/MM/yyyy"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(new Date(date));
                      setEndDate(new Date(date));
                      setIsStartHour(false);
                      setIsEndHour(false);
                      setStartHour(-1);
                    }}
                    renderInput={(params) => (
                      <TextField size="small" {...params} />
                    )}
                  />
                </LocalizationProvider>
              </div>
              <div className="form-hours">
                <div className="start-hour">
                  <Dropdown
                    placeholder="Start Hour"
                    className="dropdown-stories-styles_big-spacing"
                    size={Dropdown.size.SMALL}
                    options={convertToDropdownComp(availableHours)}
                    value={showStartValue()}
                    onOptionSelect={(input) => {
                      setIsStartHour(true);
                      setStartHour(input.value);
                      startDate.setHours(input.value);
                      startDate.setMinutes(0);
                      startDate.setSeconds(0);
                    }}
                    onClear={() => {
                      setIsStartHour(false);
                      setIsEndHour(false);
                      setStartHour(-1);
                    }}
                  />
                </div>
              </div>
              <div className="form-hours">
                <div className="end-hour">
                  <Dropdown
                    placeholder="End Hour"
                    className="dropdown-stories-styles_big-spacing"
                    size={Dropdown.size.SMALL}
                    options={convertToDropdownComp(availableEndHours)}
                    value={showEndValue()}
                    onOptionSelect={(input) => {
                      setIsEndHour(true);
                      endDate.setHours(input.value);
                      endDate.setMinutes(0);
                      endDate.setSeconds(0);
                    }}
                    onClear={() => {
                      setIsEndHour(-1);
                    }}
                    disabled={isStartHour ? false : true}
                  />
                </div>
              </div>
              <input type="Submit" className="booking-submit" />
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;
