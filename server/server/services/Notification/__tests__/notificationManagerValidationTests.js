const NotificationManagerValidator = require('../notificationManagerValidation');
// officeId:DataTypes.INTEGER,
//     bookingPlace:DataTypes.STRING,
//     userName: DataTypes.STRING,
//     startDate: DataTypes.DATE,
//     endDate: DataTypes.DATE
const notificationManagerValidator = new NotificationManagerValidator();

test('test that check each type paramter,and some validation logic, start date ', () => {
    const officeId = 1;
    const content = "Hello, this test is going to be true";
    const madeBy = "ViktorDabush";
    const category = "Some fake category";
    expect(notificationManagerValidator.isNotificationValid(officeId, content, madeBy, category))
    .toBe(true);
  });