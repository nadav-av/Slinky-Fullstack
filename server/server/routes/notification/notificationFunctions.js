const NotificationManager = require("../../services/Notification/notificationManager");

async function createNotification(req, res) {
  try {
    const { officeId, content, category } = req.body;
    const returnedNotification = await NotificationManager.createNotification(
      officeId,
      content,
      category,
      req.tokenData.userName
    );
    res.status(200).send(JSON.stringify(returnedNotification));
    res.end();
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

async function getAllNotification(req, res) {
    try {
      const listToReturn = await NotificationManager.getAllNotification(req.params.officeId);
      console.log(listToReturn);
      res.status(200).send(JSON.stringify(listToReturn));
    } catch (error) {
      res.status(error.statusCode).send(JSON.stringify(error.message));
    }
  }

async function getAllNotificationOfOfficeId(req, res) {
  try {
    const listToReturn = await NotificationManager.getAllNotificationOfOfficeId(req.params.officeId);
    console.log(listToReturn);
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
      req.tokenData.userName,
      req.body.category
    );
    res.status(200).send(JSON.stringify(listToReturn));
  } catch (error) {
    res.status(error.statusCode).send(JSON.stringify(error.message));
  }
}

module.exports = {
    createNotification,
    getAllNotification,
    getAllNotificationOfOfficeId,
    deleteNotification,
    updateNotification,
};
