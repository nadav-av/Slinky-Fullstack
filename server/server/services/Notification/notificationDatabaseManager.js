const { Notification } = require("../../storages/models");
const { createNewErrorFromDatabaseError } = require("../General/errorCreator");

class NotificationDatabaseManage {
  getAllNotification = async () => {
    console.log('in getAllNotification 3');

    try {
      const data = await Notification.findAll();

      return data;

    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  createNotification = async (officeId, content, madeBy, category) => {
    try {
            const notification = await Notification.create({
                officeId,
                madeBy,
                content,
                category
              });
            return notification;
    } catch (error) {
      throw createNewErrorFromDatabaseError(error);
    }
  };
  deleteNotification = async (notificationId, madeBy) => {
    console.log('in db man', notificationId);
    try {
      const del = await Notification.destroy({
        where: { id: notificationId, madeBy },
      });
      console.log("IWAS DELETED:",del);
      return del;
    } catch (error) {
      console.log("THERE WAS ERROR =====> ",error);
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
