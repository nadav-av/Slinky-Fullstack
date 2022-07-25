import React, {useState, useMemo, useEffect} from "react";
import {Dropdown} from "monday-ui-react-core/";
import "monday-ui-react-core/dist/main.css"
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./bookingForm.css";
import bookingClient from "../../Services/bookingClient";

const BookingForm = (officeId,bookingPlace) => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startHour, setStartHour] = useState(-1);
    const [endHour, setEndHour] = useState(-1);
    const [availableHours, setAvailableHours] = useState([]);
    const [availableEndHours, setAvailableEndHours] = useState([]);
    officeId=1;
    bookingPlace='c2';

    const getAvailableHours = async (officeId,bookingPlace,startDate,endDate) => {
      try {
        setAvailableHours(await bookingClient.getAvailableStartHours(officeId,bookingPlace,startDate,endDate));
      } catch (err) {
        console.error('err');
      }
    };

    useEffect(() => {
      getAvailableHours(officeId,bookingPlace,startDate,endDate);
      console.log(startDate);
    }, [startDate]);


    useEffect(() => {
      setAvailableEndHours(availableHours);
    }, [startHour]);

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await bookingClient.addBooking(officeId,bookingPlace,startDate,endDate,startHour,endHour);
      }
      catch {
        console.err('err');
      }
    };
  

  return (
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
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);setEndDate(date);
                      setStartHour(-1);setEndHour(-1)
                    }}
                    renderInput={(params) => <TextField {...params} />}
                />
                </LocalizationProvider>
            </div>
            {/*
            <div className="form-date">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                    <DatePicker
                        label="End Date"
                        value={endDate}
                        onChange={(date) => {
                            if (date>=startDate) {
                                setEndDate(date)};
                        }}
                        renderInput={(params) => <TextField {...params} />}
                    />
                </LocalizationProvider>
            </div>*/}
            <div className="form-hours">
              <div className="start-hour"> 
                <Dropdown placeholder="Start Hour" options={availableHours} className="dropdown-stories-styles_big-spacing"
                  onOptionSelect={(input) => {setStartHour(input.value)}}
                  onClear={() => {setStartHour(-1);setEndHour(-1)}}
                  />
              </div>
              </div>
            <div className="form-hours">
              <div className="end-hour">
                <Dropdown placeholder="End Hour" options={availableEndHours} className="dropdown-stories-styles_big-spacing" 
                  disabled={(startHour === -1)? true:false}
                  onOptionSelect={(input) => {setEndHour(input.value)}}
                  onOptionRemove={() => {setEndHour(-1)}}
                />
              </div>
            </div>
            <input type="Submit" className="booking-submit"/>
          </form>
        </div>
      </div>
    </div>
  );
};

export default BookingForm;


