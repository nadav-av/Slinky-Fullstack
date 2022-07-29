const express = require("express");
const auth = require('../../middleware/auth');
const { createNotification, getAllNotifications, deleteNotification, updateNotification } = require('./notificationFunctions');
const notificationRouter = express.Router();

notificationRouter.post("/create-notification", [auth], createNotification);
notificationRouter.get("/get-all-notifications/:officeId", getAllNotifications); //how to implement officeId?
notificationRouter.delete("/delete-notification", [auth], deleteNotification);
notificationRouter.post("/update-notification", [auth], updateNotification);

module.exports = notificationRouter;
