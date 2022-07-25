const { User } = require("../storages/models");

class UserManager {
  async getUser(username) {
    return await User.findOne({
      where: {
        userName: username,
      },
    });
  }

  async createUser(
    userName,
    password,
    firstName,
    lastName,
    email,
    company,
    isAdmin
  ) {
    return await User.create({
      userName,
      password,
      firstName,
      lastName,
      email,
      company,
      isAdmin,
    });
  }

  async updateUser(userName, password, firstName, lastName, email, company) {
    return await User.update(
      {
        userName,
        password,
        firstName,
        lastName,
        email,
        company,
      },
      {
        where: {
          userName,
        },
      }
    );
  }

  async deleteUser(userName) {
    return await User.destroy({
      where: {
        userName,
      },
    });
  }
}

module.exports = new UserManager();
