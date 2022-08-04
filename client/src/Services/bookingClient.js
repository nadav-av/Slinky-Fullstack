class bookingClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042/booking";
  }

  async getAvailableStartHours(officeId, bookingPlace, startDate, endDate) {
    const officeStartHour = 0;
    const officeEndHour = 24;
    let availableHours = new Array(officeEndHour-officeStartHour);
    for (let i = 0; i < officeEndHour-officeStartHour; i++) {
      availableHours[i] = i+officeStartHour;
    }

    const takenHours = await this.getTakenHours(officeId, bookingPlace, startDate, endDate);
    if (takenHours.length !== 0) {
      takenHours.forEach((element) => {
        const diff = element.endHour - element.startHour;
        const index = availableHours.indexOf(element.startHour);
        if (index !== -1) {
          availableHours.splice(index, diff);
        }
      });
    }
    return availableHours;
  }

  async getTakenHours(officeId, bookingPlace, startDate, endDate) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch((this.url+"/all-booking-by-date-and-place"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userJWTToken,
        },
        body: JSON.stringify({
          officeId: officeId,
          bookingPlace: bookingPlace,
          startDate: startDate,
          endDate: endDate,
        }),
      }
    );

    const takenHours = await response.json();
    console.log(takenHours);
    return takenHours;
  }

  async getDayBookings(date) {
    const response = await fetch((this.url+"/all-booking-by-date"),
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          date: date,
        }),
      }
    );
    const dayBookings = await response.json();
    return dayBookings;
  }

  async addBooking(officeId, bookingPlace, startDate, endDate) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(this.url+"/",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userJWTToken,
        },
        body: JSON.stringify({
          officeId: officeId,
          bookingPlace: bookingPlace,
          startDate: startDate,
          endDate: endDate,
        }),
      }
    );
    return response.ok;
  }

  async deleteBooking(bookId) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(this.url+"/",
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          "x-auth-token": userJWTToken,
        },
        body: JSON.stringify({
          bookingId: bookId,
        }),
      }
    );
    if (response.status === 200) {
      return true;
    } else {
      return false;
    }
  }
}

export default new bookingClient();
