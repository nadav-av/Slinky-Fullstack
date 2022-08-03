class bookingClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042/booking";
  }

  async getAvailableStartHours(officeId, bookingPlace, startDate, endDate) {
    let availableHours = new Array(24);
    for (let i = 0; i < 24; i++) {
      availableHours[i] = i;
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
    console.log("availableHours is : ", availableHours);
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

  async deleteBooking(bookId, officeId) {
    console.log("officeID is : ", officeId);
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
          officeId: officeId,
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
