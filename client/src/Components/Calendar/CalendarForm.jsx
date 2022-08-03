import React,{ useState } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
//import interactionPlugin from "@fullcalendar/interaction";
//import "@fullcalendar/core/main.css";
import "@fullcalendar/daygrid/main.css";
//import "@fullcalendar/timegrid/main.css";
import "./calendarForm.css";
import { previousDay } from "date-fns/esm";


const CalendarForm = () => {
    const [bookingsByDate,setBookingsByDate] = useState([]);

    const getDayEvents = (/*date*/) => { //mock
        console.log('in get day events');
        setBookingsByDate ([
            {
                title  : 'event1',
                date    : new Date()
            },
            {
                title  : 'event2',
                start  : new Date(),
                /*end    : '2022-03-08T06:30:00',*/
            },
        ])
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
                    start: 'today', 
                    center: 'title',
                    end: 'prev,next'
                  }}
                plugins={[timeGridPlugin]}
                initialView= 'timeGridDay'
                height={'80%'}
                allDaySlot={false}
                events={pharseToFullCalendarView(bookingsByDate)}
                datesSet={ function() {
                    getDayEvents()
                    }}
          />
        </div>
        </div>
        </div>
    );
};

export default CalendarForm;

/*
FullCalendar
                plugins={[ dayGridPlugin ]}
                initialView="dayGridMonth"
            />

            ref={this.calendarComponentRef}
            weekends={this.state.calendarWeekends}
            events={this.state.calendarEvents}
            dateClick={this.handleDateClick}
            */