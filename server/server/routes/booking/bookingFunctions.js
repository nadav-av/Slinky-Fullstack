const BookingManager = require("../../services/booking/bookingManager");

async function createBooking(req, res){
    try{
        const { officeId, bookingPlace, startDate, endDate } = req.body;
        const newStartDate = new Date(startDate);
        const newEndDate = new Date(endDate);
        const returnedBooking = await BookingManager.addBookingOrder(officeId, bookingPlace, newStartDate, newEndDate, req.tokenData.userName);
        res.status(200).send(JSON.stringify(returnedBooking));
        res.end();
    } catch(error){
        res.status(error.statusCode).send(JSON.stringify(error.message));
    }
}

async function getAllBookings(req, res) {
  try {
    const listToReturn = await BookingManager.getAllBookings();
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function getBookingsOfUser(req, res) {
  console.log("req.tokenData.userName is : ", req.tokenData.userName);
  try {
    const listToReturn = await BookingManager.getBookingsOfUser(
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    console.log("Error is : ", error);
    res.status(error.statusCode).send(JSON.stringify(error.message));
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
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function updateBooking(req, res) {
  try {
    const listToReturn = await BookingManager.updateBooking(
      req.body.bookingInformation,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function getBookingByBookingPlace(req, res) {
  try {
    const listToReturn = await BookingManager.getBookingByPlaceArea(
      req.body.bookingPlace
    );
    console.log(listToReturn);
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
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
    console.log("bookedHours is : ", bookedHours);
    res.status(200).send(JSON.stringify(bookedHours));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
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
