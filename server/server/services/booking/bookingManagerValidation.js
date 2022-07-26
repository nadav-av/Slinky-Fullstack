class BookingManagerValidator{
    constructor(){}
    isBookingInformationValid(officeId, bookingPlace, startDate, endDate){
        if(this._isNotNumber(officeId)) return false;
        if(this._isBookingPlaceNotValid(bookingPlace)) return false;
        if(this._isDateTimeNotValid(startDate)) return false;
        if(this._isDateTimeNotValid(endDate)) return false;
        if(this._isStartDateIsNotBeforeEndDate(startDate, endDate)) return false;
        return true;
    }
    _isInputBlank(str) {
        const isWhiteSpacesOnlyRegex = /^\s*$/;
        return (!str || isWhiteSpacesOnlyRegex.test(str));
    }
    _isNotNumber(value){
        return isNaN(Number(value))
    }
    _isBookingPlaceNotValid(bookingPlace){
        if(bookingPlace[0] !== "c" && bookingPlace[0] !== "o") return true;
        if(this._isNotNumber(bookingPlace.slice(1, bookingPlace.length))) return true;
        return false;
    }
    _isDateTimeNotValid(date){
        if (!(date instanceof Date) || isNaN(date)) return true;
        return false;
    }
    _isStartDateIsNotBeforeEndDate(startDate, endDate){
        return !(startDate < endDate);
    }
}

module.exports = BookingManagerValidator;