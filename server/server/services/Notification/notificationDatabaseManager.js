const { Notification } = require("../../storages/models");

class NotificationDatabaseManage {
  getAllNotification = async () => {
    console.log('in getAllNotification 3');

    try {
      const data = await Notification.findAll({where:{officeId:1}});
      console.log('in getAllNotification 3'+ data);

      return data;

    } catch (error) {
      console.log(error);
      // throw error;
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
      throw error;
    }
  };
  deleteNotification = async (notificationId, officeId, madeBy) => {
    try {
      const del = await Notification.destroy({
        where: { id: notificationId, officeId, madeBy },
      });
      return del;
    } catch (error) {
      throw error;
    }
  };
  deleteAllNotification = async () => {
    try {
      return await Notification.truncate();
    } catch (error) {
      throw error;
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
      throw error;
    }
  };
  getAllNotificationOfOfficeId = async (officeId) => {
    try {
      return await Notification.findAll({ where: { officeId } });
    } catch (error) {
      throw error;
    }
  };
}

module.exports = NotificationDatabaseManage;
