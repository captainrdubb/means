const { auth } = require('../data');
const { genSaltSync, hashSync } = require('bcryptjs');
const { User } = require('../entities');

const registerUser = async (email, password) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const user = new User(email, hashedPassword, salt);

  return new Promise((resolve, reject) => {
    auth.saveUser(user, resolve, reject);
  });
};

module.exports = {
  registerUser,
};
