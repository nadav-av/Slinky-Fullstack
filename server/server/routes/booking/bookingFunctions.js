const BookingManager = require("../../services/booking/bookingManager");

async function createBooking(req, res) {
  try {
    const { officeId, bookingPlace, startDate, endDate } = req.body;
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    const returnedBooking = await BookingManager.addBookingOrder(
      officeId,
      bookingPlace,
      newStartDate,
      newEndDate,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(returnedBooking));
    res.end();
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function getAllBookings(req, res) {
  try {
    const listToReturn = await BookingManager.getAllBookings();
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function getBookingsOfUser(req, res) {
  try {
    const listToReturn = await BookingManager.getBookingsOfUser(
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function deleteBooking(req, res) {
  try {
    const listToReturn = await BookingManager.deleteBooking(
      req.body.bookingId,
      req.body.officeId,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function updateBooking(req, res) {
  try {
    const { bookingId, officeId, bookingPlace, startDate, endDate } = req.body;
    const listToReturn = await BookingManager.updateBooking(
      bookingId,
      officeId,
      bookingPlace,
      startDate,
      endDate,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function getBookingByBookingPlace(req, res) {
  try {
    const listToReturn = await BookingManager.getBookingByPlaceArea(
      req.body.bookingPlace
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    _errorHandler(error, res);
  }
}

async function getBookingByDateAndPlace(req, res) {
  try {
    const { officeId, bookingPlace, startDate, endDate } = req.body;
    const newStartDate = new Date(startDate);
    const newEndDate = new Date(endDate);
    const listOfBookings = await BookingManager.getBookingByDateAndPlace(
      officeId,
      bookingPlace,
      newStartDate,
      newEndDate
    );
    const bookedHours = listOfBookings.map((bookingOrder) => {
      return {
        startHour: bookingOrder.startDate.getHours(),
        endHour: bookingOrder.endDate.getHours(),
      };
    });
    res.status(200).send(JSON.stringify(bookedHours));
  } catch (error) {
    _errorHandler(error, res);
  }
}

function _errorHandler(error, res){
  try{
    res.status(error.statusCode).send(JSON.stringify(error.message));
  } catch(error){
    res.status(500).send(JSON.stringify("Something went wrong"));
  }
}

module.exports = {
  createBooking,
  getAllBookings,
  getBookingsOfUser,
  deleteBooking,
  updateBooking,
  getBookingByBookingPlace,
  getBookingByDateAndPlace,
};
