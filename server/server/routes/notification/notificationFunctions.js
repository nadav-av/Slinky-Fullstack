const NotificationManager = require("../../services/Notification/notificationManager");

async function createNotification(req, res) {
  try {
    req.params.officeId;
    const { content, category, madeBy } = req.body;
    const returnedNotification = await NotificationManager.addNotification(
      officeId,
      content,
      category,
      madeBy,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(returnedNotification));
    res.end();
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function getAllNotifications(req, res) {
  try {
    const listToReturn = await NotificationManager.getAllNotifications();
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function deleteNotification(req, res) {
  try {
    const listToReturn = await NotificationManager.deleteNotification(
      req.body.notificationId,
      req.body.officeId,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function updateNotification(req, res) {
  try {
    const listToReturn = await NotificationManager.updateNotification(
      req.body.notificationId,
      req.body.content,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

module.exports = {
    createNotification,
    getAllNotifications,
    deleteNotification,
    updateNotification,
};
