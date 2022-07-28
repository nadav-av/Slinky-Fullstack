import {
  USER_EXISTS,
  INVALID_PASSWORD,
  USER_NOT_FOUND,
  SERVER_ERROR,
  INVALID_TOKEN,
} from "./Consts";

class UserClient {
  constructor() {
    this.url = "http://localhost:3042";
  }

  async login(userName, password) {
    console.log(userName, password);

    const response = await fetch(`${this.url}/user/login`, {
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
    const response = await fetch(`${this.url}/user/register`, {
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

  async getUserBookings() {
    const response = await fetch(`${this.url}/booking/get-bookings-of-user`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "x-auth-token": localStorage.getItem("x-auth-token"),
      },
    });
    if (response.status === 200) {
      const res = await response.json();
      return res;
    }
    if (response.status === 400) {
      return INVALID_TOKEN;
    }
  }
}

export default new UserClient();
