export default class bookingClient {
    static async getAvailableStartHours(officeId,bookingPlace,startDate,endDate) {
        let availableHours = new Array(24);
        for (let i=0; i<24; i++) { 
            availableHours[i] = i;
        }

        const takenHours = await this.getTakenHours(officeId,bookingPlace,startDate,endDate);
        if (takenHours.length !== 0){
          takenHours.forEach(element => {
            const diff = element.endHour - element.startHour;
            const index = availableHours.indexOf(element.startHour);
            if (index !== -1) {availableHours.splice(index,diff)};
        })};   
        console.log("availableHours is : ", availableHours);
        return availableHours;
      }

      static async getTakenHours(officeId,bookingPlace,startDate,endDate) {
        const userJWTToken = localStorage.getItem('x-auth-token');
        const response = await fetch('http://localhost:3042/booking/get-all-booking-by-date-and-place', {
            method: 'POST',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token':  userJWTToken},
            body: JSON.stringify({ officeId: officeId, bookingPlace: bookingPlace, startDate: startDate, endDate: endDate })
          });
        
        const takenHours = await response.json();
        console.log(takenHours);
        return takenHours;
      }

      static async addBooking(officeId,bookingPlace,startDate,endDate,startHour,endHour) {
        const userJWTToken = localStorage.getItem('x-auth-token');
        const response = await fetch('http://localhost:3042/booking/create-booking', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-auth-token':  userJWTToken},
          body: JSON.stringify({ officeId: officeId, bookingPlace: bookingPlace, startDate: startDate, endDate: endDate})
        });
        return response.ok;
     }
}