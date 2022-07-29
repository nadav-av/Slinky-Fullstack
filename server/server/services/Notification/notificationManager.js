const NotificationManagerValidator = require("./notificationManagerValidation");
const NotificationDatabaseManage = require("./notificationDatabaseManager");

class NotificationManager {
  constructor() {
    this.notificationManagerValidator = new NotificationManagerValidator();
    this.notificationDatabase = new NotificationDatabaseManage();
  }
  async createNotification(officeId, content, category , madeBy) {
    this._validate(officeId, content, madeBy, category);
    const notification = await this.notificationDatabase.createNotification(
        officeId, content, madeBy, category
    );
    return notification;
  }
  async getAllNotification() {
    return await this.notificationDatabase.getAllNotification();
  }
  async deleteNotification(notificationId, officeId, madeBy) {
    return await this.notificationDatabase.deleteNotification(
        notificationId, officeId, madeBy
    );
  }
  async updateNotification(notificationId, content, madeBy, category) {
    this._validate(notificationId, content, madeBy, category);
    await this.notificationDatabase.updateNotification(
        notificationId, madeBy, content
    );
  }
  async deleteAllNotification(){
    await this.notificationDatabase.deleteAllNotification();
  }
  async getAllNotificationOfOfficeId(officeId){
    return await this.notificationDatabase.getAllNotificationOfOfficeId(officeId);
  }
  _validate(officeId, content, madeBy, category){
    if (
        this.NotificationManagerValidator.isNotificationValid(
          officeId, content, madeBy, category
        ) === false
      ) {
        const newError = Error("parameters are not good");
        newError.statusCode = 400;
        throw newError;
      }
  }
}

module.exports = new NotificationManager();
