import React, {useState, useMemo, useEffect} from "react";
import {Dropdown} from "monday-ui-react-core/";
import "monday-ui-react-core/dist/main.css"
import TextField from '@mui/material/TextField';
import { AdapterDateFns } from '@mui/x-date-pickers/AdapterDateFns';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import "./bookingForm.css";
import bookingClient from "../../Services/bookingClient";

const BookingForm = () => {
    const [startDate, setStartDate] = useState(new Date());
    const [endDate, setEndDate] = useState(new Date());
    const [startHour, setStartHour] = useState(-1);
    const [endHour, setEndHour] = useState(-1);

    let availableHours = [];

    const getAvailableHours = async (date) => {
      try {
        availableHours = await bookingClient.getAvailableHours(date);
        console.log(availableHours);
      } catch (err) {
        console.error('err');
      }
    };

    useEffect(() => {
      getAvailableHours(startDate);
    }, []);
    
    //need to delete (when available hours will load ok to dropdown)
    const options = useMemo(() => 
        [{
            value: 7,
            label: "07:00"
          }, {
            value: 8,
            label: "08:00"
          }, {
            value: 9,
            label: "09:00"
        }]
        , []);

  return (
    <div className="booking-form">
      <div className="booking-form-container">
        <div className="booking-form-header">
          <h1>Book the office</h1>
        </div>
        <div className="booking-form-body">
          <form>
            <div className="form-date">
                <LocalizationProvider dateAdapter={AdapterDateFns}>
                <DatePicker
                    label="Start Date"
                    value={startDate}
                    onChange={(date) => {
                      setStartDate(date);setEndDate(date);
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
              {//need to load it only after get availableHours
              }
                <Dropdown placeholder="Start Hour" options={options} className="dropdown-stories-styles_big-spacing"
                  onOptionSelect={(input) => {setStartHour(input.value)}}
                  onClear={() => {setStartHour(-1);setEndHour(-1)}} //need to clear end-hour dropdown too
                  />
              </div>
              </div>
            <div className="form-hours">
              <div className="end-hour">
              {//need to load it only after get availableHours
              }
                <Dropdown placeholder="End Hour" options={options} className="dropdown-stories-styles_big-spacing" 
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


