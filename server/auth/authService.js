const { auth } = require('../data');
const { genSaltSync, hashSync } = require('bcryptjs');
const { User } = require('../entities');
const authErrors = require('./errorTypes');


const registerUser = async (email, password) => {
  const salt = genSaltSync(10);
  const hashedPassword = hashSync(password, salt);
  const user = new User(email, hashedPassword, salt);
  if (await auth.hasEmail(email))
    throw {
      type: authErrors.REGISTRATION_ERROR,
      message: 'Email already in use',
    };

  return auth.saveUser(user);
};

module.exports = {
  registerUser,
};
