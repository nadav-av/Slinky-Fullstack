const BookingManagerValidator = require("./bookingManagerValidation");
const BookingDatabaseManage = require("./bookingDatabaseManage");
const { createError } = require("../General/errorCreator");
const { isNotNumber } = require('../General/generalValidator');

class BookingManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async addBookingOrder(officeId, bookingPlace, startDate, endDate, userName) {
    if (
      this.bookingManagerValidator.isBookingInformationValid(
        officeId,
        bookingPlace,
        startDate,
        endDate
      ) === false
    ) {
      throw createError("parameters are not good", 400);
    }
    const bookOrder = await this.bookingDatabase.addBooking(
      officeId,
      bookingPlace,
      userName,
      startDate,
      endDate
    );
    return bookOrder;
  }
  async getBookingsOfUser(userName) {
    return await this.bookingDatabase.getBookingsOfUser(userName);
  }
  async getAllBookings() {
    return await this.bookingDatabase.getAllBookings();
  }
  async deleteBooking(bookingId, userName) {
    return await this.bookingDatabase.deleteBooking(
      bookingId,
      userName
    );
  }
  async updateBooking(bookingId, officeId, bookingPlace, startDate, endDate, userName) {
    if (
      this.bookingManagerValidator.isBookingInformationValid(
        officeId, bookingPlace, startDate, endDate
      ) === false || isNotNumber(bookingId) === true
    ) {
      throw createError("parameters are not good", 400);
    }
    await this.bookingDatabase.updateBooking(
      bookingId,
      officeId,
      bookingPlace,
      userName,
      startDate,
      endDate,
      userName
    );
  }
  async getBookingOfOfficeByPlaceArea(officeId, bookingPlace) {
    return await this.bookingDatabase.getBookingOfOfficeByPlaceArea(officeId, bookingPlace);
  }
  async getBookingByDateAndPlace(officeId, bookingPlace, startDate, endDate) {
    return await this.bookingDatabase.getBookingByDateAndPlace(
      officeId,
      bookingPlace,
      startDate,
      endDate
    );
  }
  async getBookingByDate(date) {
    return await this.bookingDatabase.getBookingByDate(
      date,
    );
  }
}

module.exports = new BookingManager();
