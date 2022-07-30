const { Notification } = require("../../storages/models");
const { createNewErrorFromDatabaseError } = require("../General/errorCreator");

class NotificationDatabaseManage {
  getAllNotification = async () => {
    try {
      const data = await Notification.findAll();
      return data;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  createNotification = async (officeId, content, madeBy, category) => {
    try {
      return await Notification.create({
        officeId,
        madeBy,
        content,
        category
      });
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteNotification = async (notificationId, officeId, madeBy) => {
    try {
      const del = await Notification.destroy({
        where: { id: notificationId, officeId, madeBy },
      });
      return del;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteAllNotification = async () => {
    try {
      return await Notification.truncate();
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  updateNotification = async (
    notificationId, madeBy, content
  ) => {
    try {
      return await Notification.update(
        {bookingPlace, madeBy, content},
        { where: { id: notificationId } }
      );
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  getAllNotificationOfOfficeId = async (officeId) => {
    try {
      return await Notification.findAll({ where: { officeId } });
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
}

module.exports = NotificationDatabaseManage;
