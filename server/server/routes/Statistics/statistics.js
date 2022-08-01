const express = require("express");
const auth = require('../../middleware/auth');
const admin = require('../../middleware/admin');

const { mostBookedPlace } = require('./notificationFunctions');
const statisticsRouter = express.Router();

statisticsRouter.get("/most-booked-place/:officeId/:bookingPlace", [auth, admin], mostBookedPlace);
statisticsRouter.get("/get-all-notifications-by-officeId/:officeId", getAllNotificationOfOfficeId); 
statisticsRouter.delete("/delete-notification", [auth], deleteNotification);
statisticsRouter.post("/update-notification", [auth], updateNotification);

module.exports = statisticsRouter;
