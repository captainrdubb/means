const { loginRepository } = require('../data');

const login = (email, password) => {
  const loginUser = loginRepository.getUser(email);
};
