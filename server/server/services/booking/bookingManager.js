const BookingManagerValidator = require("./bookingManagerValidation");
const BookingDatabaseManage = require("./bookingDatabaseManage");

class BookingManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async addBookingOrder(officeId, bookingPlace, startDate, endDate, userName) {
    if (
      this.bookingManagerValidator.isBookingInformationValid(officeId, bookingPlace, startDate, endDate) === false
    ) {
      const newError = Error("parameters are not good");
      newError.statusCode = 400;
      throw newError;
    }
    const bookOrder = await this.bookingDatabase.addBooking(officeId, bookingPlace, userName, startDate, endDate);
    return bookOrder;
  }
  async getBookingsOfUser(userName) {
    return await this.bookingDatabase.getBookingsOfUser(userName);
  }
  async getAllBookings() {
    return await this.bookingDatabase.getAllBookings();
  }
  async deleteBooking(bookingId, officeId, userName) {
    await this.bookingDatabase.deleteBooking(bookingId, officeId, userName);
  }
  async updateBooking(bookingInformation, userName) {
    if (this.bookingManagerValidator.isBookingInformationValid(bookingInformation) === false) {
        const newError = Error("parameters are not good");
        newError.statusCode = 400;
        throw newError;
    }
    const { bookingId, officeId, bookingPlace, startDate, endDate } = bookingInformation;
    await this.bookingDatabase.updateBooking(bookingId, officeId, bookingPlace, userName, startDate, endDate, userName);
  }
  async getBookingByPlaceArea(bookingPlace){
    return await this.bookingDatabase.getBookingByPlaceArea(bookingPlace);
  }
  async getBookingByDateAndPlace(officeId, bookingPlace, startDate, endDate){
    return await this.bookingDatabase.getBookingByDateAndPlace(officeId, bookingPlace, startDate, endDate);
  }
}

module.exports = new BookingManager();
