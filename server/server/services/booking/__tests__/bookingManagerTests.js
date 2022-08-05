const bookingManagerValidator = require('../bookingManagerValidation')
// officeId:DataTypes.INTEGER,
//     bookingPlace:DataTypes.STRING,
//     userName: DataTypes.STRING,
//     startDate: DataTypes.DATE,
//     endDate: DataTypes.DATE
const bookinValidator = new bookingManagerValidator();

test('test that check each type paramter,and some validation logic, start date ', () => {
    expect(bookinValidator.isBookingInformationValid(1,'c1',new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00')))
    .toBe(true);
  });

  test('test that check if plce is not empty string', () => {
    expect(bookinValidator.isBookingPlaceNotValid(1,'c1',new Date('December 17, 1995 03:24:00'), new Date('December 18, 1995 03:24:00')))
    .toBe(true);
  });