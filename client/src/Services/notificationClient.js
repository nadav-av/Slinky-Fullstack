export default class NotificationClient {
    constructor(){
        this.apiNotificationUrl = "http://localhost:3042/notifications/";
    }
    static async getNotificationOfOffice(
      officeId
    ) {
        try{
            const response = await fetch(`${this.apiNotificationUrl}get-all-notifications-by-officeId/${officeId}`);
            const x = await response.json();
            console.log(x);
        } catch(error){
            console.log("need to handle");
        }
    }
  
    // static async getTakenHours(officeId, bookingPlace, startDate, endDate) {
    //   const userJWTToken = localStorage.getItem("x-auth-token");
    //   const response = await fetch(
    //     "http://localhost:3042/booking/get-all-booking-by-date-and-place",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-auth-token": userJWTToken,
    //       },
    //       body: JSON.stringify({
    //         officeId: officeId,
    //         bookingPlace: bookingPlace,
    //         startDate: startDate,
    //         endDate: endDate,
    //       }),
    //     }
    //   );
  
    //   const takenHours = await response.json();
    //   console.log(takenHours);
    //   return takenHours;
    // }
  
    // static async addBooking(
    //   officeId,
    //   bookingPlace,
    //   startDate,
    //   endDate,
    //   startHour,
    //   endHour
    // ) {
    //   const userJWTToken = localStorage.getItem("x-auth-token");
    //   const response = await fetch(
    //     "http://localhost:3042/booking/create-booking",
    //     {
    //       method: "POST",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-auth-token": userJWTToken,
    //       },
    //       body: JSON.stringify({
    //         officeId: officeId,
    //         bookingPlace: bookingPlace,
    //         startDate: startDate,
    //         endDate: endDate,
    //       }),
    //     }
    //   );
    //   return response.ok;
    // }
  
    // static async deleteBooking(bookId, officeId) {
    //   console.log("officeID is : ", officeId);
    //   const userJWTToken = localStorage.getItem("x-auth-token");
    //   const response = await fetch(
    //     "http://localhost:3042/booking/delete-booking",
    //     {
    //       method: "DELETE",
    //       headers: {
    //         "Content-Type": "application/json",
    //         "x-auth-token": userJWTToken,
    //       },
    //       body: JSON.stringify({
    //         bookingId: bookId,
    //         officeId: officeId,
    //       }),
    //     }
    //   );
    //   if (response.status === 200) {
    //     return true;
    //   } else {
    //     return false;
    //   }
    // }
  }
  