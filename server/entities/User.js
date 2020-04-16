function User(email, password, salt) {
  return {
    email,
    password,
    salt,
  };
}

exports.User = User;
