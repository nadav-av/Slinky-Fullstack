const express = require("express");
const auth = require('../../middleware/auth');
const { createBooking, getAllBookings, getBookingsOfUser, deleteBooking, updateBooking, getBookingOfOfficeByPlaceArea, getBookingByDateAndPlace } = require('./bookingFunctions');
const bookingRouter = express.Router();

bookingRouter.post("/create-booking", [auth], createBooking);
bookingRouter.get("/all-booking", getAllBookings);
bookingRouter.get("/bookings-of-user", [auth], getBookingsOfUser);
bookingRouter.delete("/delete-booking", [auth], deleteBooking);
bookingRouter.post("/update-booking", [auth], updateBooking);
bookingRouter.post("/booking-by-bookingPlace", getBookingOfOfficeByPlaceArea);
bookingRouter.post(
  "/all-booking-by-date-and-place",
  getBookingByDateAndPlace
);
module.exports = bookingRouter;
