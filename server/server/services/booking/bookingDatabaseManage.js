const { Booking } = require("../../storages/models");
const { Op } = require("sequelize");
const { createNewErrorFromDatabaseError } = require("../General/errorCreator");

class BookingDatabaseManage {
  getAllBookings = async (officeId = null) => {
    try {
      let data;
      if(officeId === null){
        data = await Booking.findAll();
      } else {
        data = await Booking.findAll({where:{officeId}});
      }
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getBookingsOfUser = async (userName) => {
    try {
      const data = await Booking.findAll({ where: { userName } });
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  addBooking = async (officeId, bookingPlace, userName, startDate, endDate) => {
    try {
      return await Booking.create({
        officeId,
        bookingPlace,
        userName,
        startDate,
        endDate,
      });
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteBooking = async (bookingId, userName) => {
    try {
      const del = await Booking.destroy({
        where: { id: bookingId, userName },
      });
      return del;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteAllBookings = async () => {
    try {
      return await Booking.truncate();
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  updateBooking = async (
    bookingId,
    officeId,
    bookingPlace,
    userName,
    startDate,
    endDate
  ) => {
    try {
      return await Booking.update(
        { officeId, bookingPlace, userName, startDate, endDate },
        { where: { id: bookingId } }
      );
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getBookingByDateAndPlace = async (
    officeId,
    bookingPlace,
    startDate,
    endDate
  ) => {
    try {
      const startDateLimit = new Date(
        startDate.getFullYear(),
        startDate.getMonth(),
        startDate.getDate(),
        0,
        0,
        0,
        0
      );
      const endDateLimist = new Date(
        endDate.getFullYear(),
        endDate.getMonth(),
        endDate.getDate() + 1,
        0,
        0,
        0,
        0
      );
      const bookingByChairAndDate = Booking.findAll({
        where: {
          officeId,
          bookingPlace,
          startDate: { [Op.gt]: startDateLimit },
          endDate: { [Op.lt]: endDateLimist },
        },
      });
      return bookingByChairAndDate;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
<<<<<<< HEAD
  getBookingByDateAndOfficeId = async(officeId, date) => {
=======
  getBookingByDate = async (date) => {
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
    try {
      const startDateLimit = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate(),
<<<<<<< HEAD
        0,
        0,
        0,
        0
=======
        0,0,0,0
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
      );
      const endDateLimist = new Date(
        date.getFullYear(),
        date.getMonth(),
        date.getDate() + 1,
<<<<<<< HEAD
        0,
        0,
        0,
        0
      );
      const bookingByDateAndOfficeId = Booking.findAll({
        where: {
          officeId,
=======
        0,0,0,0
      );
      const bookingByDate = Booking.findAll({
        where: {
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
          startDate: { [Op.gt]: startDateLimit },
          endDate: { [Op.lt]: endDateLimist },
        },
      });
<<<<<<< HEAD
      return bookingByDateAndOfficeId;
    } catch(error){
      throw createNewErrorFromDatabaseError(error);
    }
  }
=======
      return bookingByDate;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
>>>>>>> 4d35cb75b9e96e8b97c4b0f466710413da7c03e0
}

module.exports = BookingDatabaseManage;
