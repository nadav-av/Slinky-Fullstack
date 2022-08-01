const express = require("express");
const auth = require('../../middleware/auth');
const { createNotification, getAllNotifications, getAllNotificationOfOfficeId, deleteNotification, updateNotification } = require('./notificationFunctions');
const notificationRouter = express.Router();

notificationRouter.post("/create-notification", [auth], createNotification);
notificationRouter.get("/get-all-notifications/", getAllNotifications); 
notificationRouter.get("/get-all-notifications/:officeId", getAllNotificationOfOfficeId); 
notificationRouter.delete("/delete-notification", [auth], deleteNotification);
notificationRouter.post("/update-notification", [auth], updateNotification);

module.exports = notificationRouter;
