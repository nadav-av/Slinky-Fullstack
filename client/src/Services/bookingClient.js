export default class bookingClient {
    static async getAvailableHours(date) {
        let availableHours = new Array(24);
        for (let i=0; i<24; i++) {
            availableHours[i] = {
                value: i,
                label: i>9? (i.toString()+":00"):("0"+i.toString()+":00"),
                //isAvailable: true
            }
        }
        /*availableHours =
            availableHours.map((element,index) => {
                const data = {};
                console.log(index);
                data.value = index;
                data.label = (index) => {return index>9? (index.toString()+":00"):("0"+index.toString()+":00")} ;
                data.isAvailable = true;
                console.log(data);
                return data;
            });*/
        return availableHours;
      }
}