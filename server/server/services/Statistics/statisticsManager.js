const BookingManagerValidator = require("../booking/bookingManagerValidation");
const BookingDatabaseManage = require("../booking/bookingDatabaseManage");

class StatisticsManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async mostBookedPlace(officeId) {
    const allBookings = await this.bookingDatabase.getAllBookings(officeId);
    if(allBookings.length === 0){
        console.log("did??");
        return "There is no bookings yet for this office";
    }
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
    return this._maxAppearanceOfPlace(allBookings);
  }

  _maxAppearanceOfPlace(bookingsArr) {
    let counter = 1;
    const bookedPlaceArrWithCounter = [];
    let i = 1;
    for(i = 1; i < bookingsArr.length; i++){
        if(bookingsArr[i].bookingPlace !== bookingsArr[i-1].bookingPlace){
            bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "booked":counter});
            counter = 1;
        } else{
            counter++;
        }
      }
    if(bookingsArr[i-1].bookingPlace === bookingsArr[i-2].bookingPlace){
        bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "booked":counter});
    }
    return bookedPlaceArrWithCounter;
  }

  async mostBookedOffice() {
    const allBookings = await this.bookingDatabase.getAllBookings();
    if(allBookings.length === 0){
        console.log("did??");
        return "There is no bookings yet for all offices";
    }
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
    const bookedOfficeIdArrWithCounter = [];
    let i = 1;
    for(i; i < allBookings.length; i++){
        if(allBookings[i].officeId !== allBookings[i-1].officeId){
            bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "booked":counter});
            counter = 1;
        } else{
            counter++;
        }
      }
    if (allBookings[i-1].officeId === allBookings[i-2].officeId) {
        bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "booked":counter});
    }
    return bookedOfficeIdArrWithCounter;
  }
}

module.exports = new StatisticsManager();
