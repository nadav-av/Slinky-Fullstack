const BookingManagerValidator = require("../Booking/bookingManagerValidation");
const BookingDatabaseManage = require("../Booking/bookingDatabaseManage");

class StatisticsManager {
  constructor() {
    this.bookingManagerValidator = new BookingManagerValidator();
    this.bookingDatabase = new BookingDatabaseManage();
  }
  async mostBookedPlace(officeId) {
    const allBookings = await this.bookingDatabase.getAllBookings(officeId);
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

  _maxAppearanceOfPlace(bookingsArr){
    let counter = 1;
    let max = 0;
    const bookedPlaceArrWithCounter = [];
    const bookedPlaceArrToReturn = [];
    let i = 1;
    for(i = 1; i < bookingsArr.length; i++){
        if(bookingsArr[i].bookingPlace != bookingsArr[i-1].bookingPlace){
            if(max <= counter){
                max = counter;
            }
            bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "counter":counter});
            counter = 1;
        } else{
            counter++;
        }
    }
    if(counter >= max){
        max = counter;
        bookedPlaceArrWithCounter.push({"bookingPlace":bookingsArr[i-1].bookingPlace, "counter":counter});
    }
    bookedPlaceArrWithCounter.map(element => {
        if(element.counter === max){
            bookedPlaceArrToReturn.push({"bookingPlace":element.bookingPlace, "amount":element.counter});
        }
    })
    return bookedPlaceArrToReturn;
  }

  async mostBookedOffice(){
    const allBookings = await this.bookingDatabase.getAllBookings();
    allBookings.sort((first, second) => {
        const first1 = first.officeId;
        const second2 = second.officeId;
        
        if(first1 > second2){
            return 1;
        }
        if(first1 < second2){
            return -1;
        }
        return 0;
    });
    let counter = 1;
    let max = 0;
    const bookedOfficeIdArrWithCounter = [];
    const bookedOfficeIdArrToReturn = [];
    let i = 1;
    for(i; i < allBookings.length; i++){
        if(allBookings[i].officeId !== allBookings[i-1].officeId){
            if(max <= counter){
                max = counter;
            }
            bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "counter":counter});
            counter = 0;
        } else{
            counter++;
        }
    }
    if(counter >= max){
        max = counter;
        bookedOfficeIdArrWithCounter.push({"officeId":allBookings[i-1].officeId, "counter":counter});
    }
    bookedOfficeIdArrWithCounter.map(element => {
        if(element.counter === max){
            bookedOfficeIdArrToReturn.push(element);
        }
    })
    return bookedOfficeIdArrToReturn;
  }
}

module.exports = new StatisticsManager();
