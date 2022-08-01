const { errorHandler } = require("../Generals/errorHandler");
const StatisticsManager = require("../../services/Statistics/statisticsManager");

async function mostBookedPlace(req, res) {
  try {
    const { officeId } = req.params;
    const returnedStatistics = await StatisticsManager.mostBookedPlace(
      officeId
    );
    res.status(200).send(JSON.stringify(returnedStatistics));
    res.end();
  } catch (error) {
    errorHandler(error, res);
  }
}

async function mostBookedOfficeId(req, res){
    try {
        const returnedStatistics = await StatisticsManager.mostBookedOffice();
        res.status(200).send(JSON.stringify(returnedStatistics));
        res.end();
      } catch (error) {
        errorHandler(error, res);
      }
}

module.exports = {
    mostBookedPlace,
    mostBookedOfficeId
};
