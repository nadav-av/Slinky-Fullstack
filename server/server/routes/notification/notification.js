const express = require("express");
const auth = require('../../middleware/auth');
const { createNotification, getAllNotification, getAllNotificationOfOfficeId, deleteNotification, updateNotification } = require('./notificationFunctions');
const notificationRouter = express.Router();

notificationRouter.post("/create-notification", [auth], createNotification);
notificationRouter.get("/get-all-notifications", getAllNotification); 
notificationRouter.get("/get-all-notifications-by-officeId/:officeId", getAllNotificationOfOfficeId); 
notificationRouter.delete("/delete-notification", [auth], deleteNotification);
notificationRouter.post("/update-notification", [auth], updateNotification);

module.exports = notificationRouter;
