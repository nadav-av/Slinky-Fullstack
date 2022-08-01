import {
  USER_EXISTS,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
  SERVER_ERROR,
  INVALID_TOKEN,
} from "./Consts";

class UserClient {
  constructor() {
    this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
  }

  async login(userName, password) {
    const response = await fetch(`${this.url}/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ userName, password }),
    });
    if (response.status === 200) {
      //get x-auth-token from response
      const res = await response.json();
      localStorage.setItem("x-auth-token", res.token);
      return res.user.userName;
    } else if (response.status === 401) {
      return INVALID_PASSWORD;
    } else if (response.status === 404) {
      return USER_NOT_FOUND;
    }
  }

  async register(user) {
    console.log("register");
    const response = await fetch(`${this.url}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: user.userName,
        password: user.password,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        company: user.company,
        isAdmin: user.isAdmin,
      }),
    });
    if (response.status === 200) {
      const res = await response.json();
      localStorage.setItem("x-auth-token", res.token);
      return true; //Temporary - need to implement a login after register and pass to landing page
    } else if (response.status === 400) {
      return USER_EXISTS;
    }
    if (response.status === 500) {
      return SERVER_ERROR;
    }
  }

  async checkIfUserLoggedIn() {
    const response = await fetch(`${this.url}/users/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res.userName;
    }
    if (response.status === 400 || response.status === 401) {
      return INVALID_TOKEN;
    }
  }

  async getUserBookings() {
    const response = await fetch(`${this.url}/booking/get-bookings-of-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    console.log(response);
    if (response.status === 200) {
      const res = await response.json();
      const parsedRes = this.parseUserBookings(res);
      return parsedRes;
    }
    if (response.status === 400) {
      return INVALID_TOKEN;
    }
  }

  parseDate = (date) => {
    const parsedDate = new Date(date);
    return `${parsedDate.getDate()}/${
      parsedDate.getMonth() + 1
    }/${parsedDate.getFullYear()}`;
  };

  parseTimeInDate = (date) => {
    const parsedDate = new Date(date);
    let hours = parsedDate.getHours();
    let minutes = parsedDate.getMinutes();
    if (hours < 10) {
      hours = "0" + hours;
    }
    if (minutes < 10) {
      minutes = "0" + minutes;
    }
    return `${hours}:${minutes}`;
  };

  parseUserBookings = (bookings) => {
    const parsedBookings = [];
    bookings.forEach((booking) => {
      booking.startDate = new Date(booking.startDate);
      booking.endDate = new Date(booking.endDate);
      console.log(booking);
      const parsedBooking = {
        id: booking.id,
        office: booking.officeId,
        reserved_place: booking.bookingPlace,
        start_date: this.parseDate(booking.startDate),
        start_hour: this.parseTimeInDate(booking.startDate),
        end_date: this.parseDate(booking.endDate),
        end_hour: this.parseTimeInDate(booking.endDate),
      };
      parsedBookings.push(parsedBooking);
    });
    return parsedBookings;
  };
}

export default new UserClient();
