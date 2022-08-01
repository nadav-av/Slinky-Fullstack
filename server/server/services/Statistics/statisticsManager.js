const BookingManagerValidator = require("./bookingManagerValidation");
const BookingDatabaseManage = require("./bookingDatabaseManage");
const { createError } = require("../General/errorCreator");
const { isNotNumber } = require('../General/generalValidator');

class StatisticsManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async mostBookedPlace(officeId, bookingPlace) {
    const allBookings = await this.bookingDatabase.getBookingOfOfficeByPlaceArea(
      officeId,
      bookingPlace,
    );
    allBookings.sort(bookingPlace);
    return this._maxAppearanceOfPlace(bookingPlace);
  }
  _maxAppearanceOfPlace(bookingsArr){
    let counter = 1;
    let max = 0;
    const bookedPlaceArrWithCounter = [];
    const bookedPlaceArrToReturn = [];
    for(let i = 1; i < bookingsArr.length; i++){
        if(bookingsArr[i] != bookingsArr[i-1]){
            if(max <= counter){
                max = counter;
            }
            bookedPlaceArrWithCounter.push({"bookedPlace":bookingsArr[i-1], "counter":counter});
            counter = 0;
        } else{
            counter++;
        }
    }
    if(counter >= max){
        max = counter;
        bookedPlaceArrWithCounter.push({"bookedPlace":bookingsArr[i-1], "counter":counter});
    }
    bookedPlaceArrWithCounter.map(element => {
        if(element.counter === max){
            bookedPlaceArrToReturn.push(element.bookedPlace);
        }
    })
    return bookedPlaceArrToReturn;
  }
}

module.exports = new StatisticsManager();
