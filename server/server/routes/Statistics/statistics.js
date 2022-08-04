const express = require("express");
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const { mostBookedPlace, mostBookedOfficeId, compareTwoDatesOfOffice } = require('./statisticsFunctions');
const statisticsRouter = express.Router();

statisticsRouter.get("/:officeId", mostBookedPlace);
statisticsRouter.get("/", mostBookedOfficeId);
statisticsRouter.get("/compare-days/:officeId/:date1/:date2", compareTwoDatesOfOffice);

module.exports = statisticsRouter;
