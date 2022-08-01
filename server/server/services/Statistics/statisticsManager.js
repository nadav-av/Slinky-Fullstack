const BookingManagerValidator = require("../booking/bookingManagerValidation");
const BookingDatabaseManage = require("../booking/bookingDatabaseManage");

class StatisticsManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async mostBookedPlace(officeId, bookingPlace) {
    const allBookings =
      await this.bookingDatabase.getBookingOfOfficeByPlaceArea(
        officeId,
        bookingPlace
      );
    allBookings.sort((firstBookedPlace, secondBookedPlace) => {
      const first = firstBookedPlace.bookingPlace;
      const second = secondBookedPlace.bookingPlace;

      if (first < second) {
        return -1;
      }
      if (first > second) {
        return 1;
      }
      return 0;
    });
    console.log("2", allBookings);
    return this._maxAppearanceOfPlace(bookingPlace);
  }

  _maxAppearanceOfPlace(bookingsArr) {
    let counter = 1;
    let max = 0;
    const bookedPlaceArrWithCounter = [];
    const bookedPlaceArrToReturn = [];
    for (let i = 1; i < bookingsArr.length; i++) {
      if (bookingsArr[i] != bookingsArr[i - 1]) {
        if (max <= counter) {
          max = counter;
        }
        bookedPlaceArrWithCounter.push({
          bookedPlace: bookingsArr[i - 1],
          counter: counter,
        });
        counter = 0;
      } else {
        counter++;
      }
    }
    if (counter >= max) {
      max = counter;
      bookedPlaceArrWithCounter.push({
        bookedPlace: bookingsArr[i - 1],
        counter: counter,
      });
    }
    bookedPlaceArrWithCounter.map((element) => {
      if (element.counter === max) {
        bookedPlaceArrToReturn.push(element);
      }
    });
    return bookedPlaceArrToReturn;
  }

  async mostBookedOffice() {
    const allBookings = await this.bookingDatabase.getAllBookings();
    allBookings.sort((first, second) => {
      const first1 = first.officeId;
      const second2 = second.officeId;

      if (first1 > second2) {
        return 1;
      }
      if (first1 < second2) {
        return -1;
      }
      return 0;
    });
    let counter = 1;
    let max = 0;
    const bookedOfficeIdArrWithCounter = [];
    const bookedOfficeIdArrToReturn = [];
    for (let i = 1; i < allBookings.length; i++) {
      if (allBookings[i] != allBookings[i - 1]) {
        if (max <= counter) {
          max = counter;
        }
        bookedOfficeIdArrWithCounter.push({
          officeId: allBookings[i - 1].officeId,
          counter: counter,
        });
        counter = 0;
      } else {
        counter++;
      }
    }
    if (counter >= max) {
      max = counter;
      bookedOfficeIdArrWithCounter.push({
        officeId: allBookings[i - 1].officeId,
        counter: counter,
      });
    }
    bookedOfficeIdArrWithCounter.map((element) => {
      if (element.counter === max) {
        bookedOfficeIdArrToReturn.push(element);
      }
    });
    return bookedOfficeIdArrToReturn;
  }
}

module.exports = new StatisticsManager();
