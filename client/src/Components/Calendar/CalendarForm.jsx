import React,{ useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
//import interactionPlugin from "@fullcalendar/interaction";
//import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";
import "./calendarForm.css";
import bookingClient from "../../Services/bookingClient";

const CalendarForm = () => {
    const [bookingsByDate,setBookingsByDate] = useState([]);

    const getDayEvents =async (date) => {
        const dayEvents = await bookingClient.getDayBookings(date);
        console.log('calendar form '+JSON.stringify(dayEvents))
        setBookingsByDate (dayEvents)
    };

    const pharseToFullCalendarView = (array) => { //mock
        return array;
    }

    return (
        <div className="calendar-container">
        <div className="calendar-glass">
        <div className="calendar-form">
            
            <FullCalendar
                headerToolbar={{
                    start: 'prev,next', 
                    center: 'title',
                    end: 'today'
                  }}
                plugins={[timeGridPlugin]}
                initialView= 'timeGridDay'
                height={'80%'}
                allDaySlot={false}
                events={pharseToFullCalendarView(bookingsByDate)}
                datesSet={ function() {
                    getDayEvents(this.getDate())
                    }}
          />
        </div>
        </div>
        </div>
    );
};

export default CalendarForm;