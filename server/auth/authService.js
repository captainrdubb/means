const { auth } = require('../data');
const { genSaltSync, hashSync } = require('bcryptjs');
const { User } = require('../entities');

const registerUser = async (email, password) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const user = new User(email, hashedPassword, salt);

  const hasEmail = auth.hasEmail(email);

  console.log(hasEmail);

  return auth.saveUser(user);
};

module.exports = {
  registerUser,
};
