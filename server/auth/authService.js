const { auth } = require('../data');
const { genSaltSync, hashSync } = require('bcryptjs');
const { User } = require('../entities');

const register = async (email, password) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const user = new User(email, hashedPassword, salt);

  return new Promise((res, rej) => {
    auth.saveUser(user, res, rej);
  });
};
