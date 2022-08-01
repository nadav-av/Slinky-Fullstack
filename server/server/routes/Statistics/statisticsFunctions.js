const NotificationManager = require("../../services/Notification/notificationManager");
const { errorHandler } = require("../Generals/errorHandler");
const StatisticsManager = require("../../services/Statistics/statisticsManager");

async function mostBookedPlace(req, res) {
  try {
    const { officeId, bookingPlace } = req.params;
    const returnedStatistics = await StatisticsManager.mostBookedPlace(
      officeId,
      bookingPlace
    );
    res.status(200).send(JSON.stringify(returnedStatistics));
    res.end();
  } catch (error) {
    errorHandler(error, res);
  }
}

module.exports = {
    mostBookedPlace,
};
