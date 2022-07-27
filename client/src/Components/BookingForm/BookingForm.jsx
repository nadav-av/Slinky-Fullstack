import React, {useState, useEffect} from "react";
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
    officeId=1; //mock
    bookingPlace='c2'; //mock

    const getAvailableHours = async (officeId,bookingPlace,startDate,endDate) => {
      try {
        setAvailableHours(await bookingClient.getAvailableStartHours(officeId,bookingPlace,startDate,endDate));
      } catch (err) {
        console.error('err');
      }
    };

    useEffect(() => {
      getAvailableHours(officeId,bookingPlace,startDate,endDate);
    }, [startDate]);

    const calcAvailableEndHours = () => {
      const endHours=[];
      let i=availableHours.indexOf(startDate.getHours());
      while(i<availableHours.length-1 && availableHours[i]+1===availableHours[i+1])
      {
        endHours.push((availableHours[i]+1));
        i++;
      }
      endHours.push((availableHours[i]+1));
      return endHours;
    };

    useEffect(() => {
      setAvailableEndHours(calcAvailableEndHours()); //need to fix
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

    const convertToDropdownComp = (hoursArray) => {
      return hoursArray.map((value) => {
        const obj={}
        obj.value = value;
        obj.label = numHourToString(value);
        return obj;
      })
    }

    const numHourToString = (value) => {
      return value>9? (value.toString()+":00"):("0"+value.toString()+":00")
    }

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
                      setStartDate(new Date(date));setEndDate(new Date(date));
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
                <Dropdown placeholder="Start Hour" options={convertToDropdownComp(availableHours)} className="dropdown-stories-styles_big-spacing"
                  onOptionSelect={(input) => {setStartHour(input.value); startDate.setHours(input.value); startDate.setMinutes(0); startDate.setSeconds(0);}}
                  onClear={() => {setStartHour(-1);setEndHour(-1)}}
                  />
              </div>
              </div>
            <div className="form-hours">
              <div className="end-hour">
                <Dropdown placeholder="End Hour" options={convertToDropdownComp(availableEndHours)} className="dropdown-stories-styles_big-spacing" 
                  disabled={(startHour === -1)? true:false}
                  onOptionSelect={(input) => {setEndHour(input.value); endDate.setHours(input.value); endDate.setMinutes(0); endDate.setSeconds(0);}}
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


