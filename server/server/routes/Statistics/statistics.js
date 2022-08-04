const express = require("express");
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const { mostBookedPlace, mostBookedOfficeId, compareTwoDatesOfOffice } = require('./statisticsFunctions');
const statisticsRouter = express.Router();

statisticsRouter.get("/:officeId", mostBookedPlace);
statisticsRouter.get("/", mostBookedOfficeId);
statisticsRouter.get("/compare-days/:officeId/:date1/:date2", compareTwoDatesOfOffice);
// statisticsRouter.delete("/delete-notification", [auth], deleteNotification);
// statisticsRouter.post("/update-notification", [auth], updateNotification);

module.exports = statisticsRouter;
