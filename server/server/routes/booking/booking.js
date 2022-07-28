const express = require("express");
const auth = require("../../middleware/auth");
const {
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  deleteBooking,
  updateBooking,
  getBookingByBookingPlace,
  getBookingByDateAndPlace,
} = require("./bookingFunctions");
const bookingRouter = express.Router();

bookingRouter.post("/create-booking", [auth], createBooking);
bookingRouter.get("/get-all-booking", getAllBookings);
bookingRouter.get("/get-bookings-of-user", [auth], getBookingsOfUser);
bookingRouter.delete("/delete-booking", [auth], deleteBooking);
bookingRouter.post("/update-booking", [auth], updateBooking);
bookingRouter.get("/get-booking-by-bookingPlace", getBookingByBookingPlace); //probably will be remove
bookingRouter.post(
  "/get-all-booking-by-date-and-place",
  getBookingByDateAndPlace
);
module.exports = bookingRouter;
