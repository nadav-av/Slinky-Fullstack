const express = require("express");
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const { mostBookedPlace, mostBookedOfficeId } = require('./statisticsFunctions');
const statisticsRouter = express.Router();

statisticsRouter.get("/:officeId/:bookingPlace", [auth, admin], mostBookedPlace);
statisticsRouter.get("/", mostBookedOfficeId); 
// statisticsRouter.delete("/delete-notification", [auth], deleteNotification);
// statisticsRouter.post("/update-notification", [auth], updateNotification);

module.exports = statisticsRouter;
