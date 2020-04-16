const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const { config } = require('../config');

const db = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint(config.dataUrl),
});

const saveUser = (user, resolve, reject) => {
  const params = {
    TableName: 'user',
    Item: {
      user_id: v4(),
      email: user.email,
      salt: user.salt,
      password: user.password,
    },
  };

  db.put(params, (err, data) => {
    if (err) reject(err);
    resolve(data);
  });
};

module.exports = {
  saveUser,
};
