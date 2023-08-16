const User = require("../models/user");

const usersInDb = async () => {
  const allUsers = await User.find({});
  return allUsers.map(elem => elem.toJSON());
};

module.exports = { usersInDb };
