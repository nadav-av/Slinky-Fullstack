const labels = ["c1","c2","c3","c4","c5","c6","c7","c8","o1","o2","o3","o4","o5","o6"];
class statisticsClient {
    constructor() {
      this.url = process.env.REACT_APP_SERVER_URL || "http://localhost:3042";
    }
    async getChairsStatistics(officeId){
        const labelColumn = "bookingPlace";
        const dataColumn = "booked";
        const dataSetLabel = "Chairs"
        const response = await fetch(`http://localhost:3042/statistics/${officeId}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseAsJson = await response.json();
        return this._getInformation(responseAsJson, dataSetLabel);
    }
    async getOfficesStatistics(){
        const labelColumn = "officeId";
        const dataColumn = "booked";
        const dataSetLabel = "Offices"
        const response = await fetch(`http://localhost:3042/statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseAsJson = await response.json();
        const data = {
            labels: [1, 2],
    datasets: [
      {
        label: dataSetLabel,
        data: responseAsJson.map((data) => data.booked),
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
}
return data;
    }
    async compareTwoDatesOfOffice(officeId, date1, date2){
        const response = await fetch(`http://localhost:3042/statistics/compare-days/${officeId}/${date1}/${date2}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        })
        const responseAsJson = await response.json();
        const dataForDataset1 = this._createDataForDatasetsOfChairs(responseAsJson.firstDate);
        const dataForDataset2 = this._createDataForDatasetsOfChairs(responseAsJson.secondDate);
            const data = {
                labels: labels,
        datasets: [
          {
            label: date1,
            data: dataForDataset1,
            fill: true,
            backgroundColor: "rgba(75,20,20,0.2)",
            borderColor: "rgba(75,192,192,1)",
          },
          {
            label: date2,
            data: dataForDataset2,
            fill: true,
            backgroundColor: "#742774",
          },
        ],
    }
    return data;
            }
    _createDataForDatasetsOfChairs(dataArr){
        const objectToReturn = {
            "c1":0,"c2":0,"c3":0,"c4":0,"c5":0,"c6":0,"c7":0,"c8":0,"o1":0,"o2":0,"o3":0,"o4":0,"o5":0,"o6":0
        };
        dataArr.filter((element) => {
            objectToReturn[element.bookingPlace] = element.booked;
        })
        console.log("object", Object.keys(objectToReturn).length);
        const newObjectToReturn = [];
        Object.keys(objectToReturn).forEach(function(key){
            newObjectToReturn.push(objectToReturn[key]);
        })
        return newObjectToReturn;
    }
    async _getInformation(responseAsJson, dataSetLabel){
        if(Array.isArray(responseAsJson)){
            const datasetsAfter = this._createDataForDatasetsOfChairs(responseAsJson);
        const data = {
            labels: labels,
    datasets: [
      {
        label: dataSetLabel,
        data: datasetsAfter,
        fill: true,
        backgroundColor: "rgba(75,192,192,0.2)",
        borderColor: "rgba(75,192,192,1)",
        borderWidth: 2,
      },
    ],
}
return data;
        } else{
            return [];
        }
    }
  }
  
  export default new statisticsClient();
  