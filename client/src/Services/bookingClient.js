export default class bookingClient {
    static async getAvailableStartHours(officeId,bookingPlace,startDate,endDate) {
        let availableHours = new Array(24);
        for (let i=0; i<24; i++) { 
            availableHours[i] = {
                value: i, 
                label: i>9? (i.toString()+":00"):("0"+i.toString()+":00"),
            }
        }

        const takenHours = this.getTakenHours(officeId,bookingPlace,startDate,endDate); //[{startHour: 10, endHour: 12},{startHour: 16, endHour: 17}]
        takenHours.forEach((element) => {
            const diff = element.endHour - element.startHour;
            availableHours.splice(element.startHour,diff);
        })
        console.log(availableHours);
        return availableHours;
      }

      static async getTakenHours(officeId,bookingPlace,startDate,endDate) {
        const userJWTToken = localStorage.getItem('x-auth-token');
        const response = await fetch('/get-all-booking-by-date-and-place', {
            method: 'GET',
            headers: { 
                'Content-Type': 'application/json',
                'x-auth-token':  userJWTToken},
            body: JSON.stringify({ officeId: officeId, bookingPlace: bookingPlace, startDate: startDate, endDate: endDate })
          });
        
        const takenHours = await response.json();
        return takenHours;
      }

      static async addBooking(officeId,bookingPlace,startDate,endDate,startHour,endHour) {
        const userJWTToken = localStorage.getItem('x-auth-token');
        const response = await fetch('/create-booking', {
          method: 'POST',
          headers: { 
            'Content-Type': 'application/json',
            'x-auth-token':  userJWTToken},
          body: JSON.stringify({ officeId: officeId, bookingPlace: bookingPlace, startDate: startDate, endDate: endDate,  startHour: startHour, endHour: endHour})
        });
        return response.ok;
     }
}