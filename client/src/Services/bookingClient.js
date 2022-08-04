class bookingClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
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
    return availableHours;
  }

  async getTakenHours(officeId, bookingPlace, startDate, endDate) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch((this.url+"/booking/all-booking-by-date-and-place"),
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
    return takenHours;
  }

  async addBooking(officeId, bookingPlace, startDate, endDate) {
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(this.url+"/booking/",
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
    const userJWTToken = localStorage.getItem("x-auth-token");
    const response = await fetch(this.url+"/booking/",
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
