const AWS = require('aws-sdk');
const { v4 } = require('uuid');
const { config } = require('../config');

const db = new AWS.DynamoDB.DocumentClient({
  apiVersion: '2012-08-10',
  endpoint: new AWS.Endpoint(config.dataUrl),
});

const hasEmail = async (email) => {
  return new Promise((resolve, reject) => {
    const params = {
      TableName: 'user',
      Key: {
        email: email,
      },
      AttributesToGet: ['user_id'],
    };

    db.get(params, (err, data) => {
      if (err) {
        reject(err);
      } else {
        console.log(data);
        resolve(data.item !== null);
      }
    });
  });
};

const saveUser = async (user) => {
  return new Promise((resolve, reject) => {
    const userId = v4();
    const params = {
      TableName: 'user',
      Item: {
        user_id: userId,
        email: user.email,
        salt: user.salt,
        password: user.password,
      },
    };

    db.put(params, (err, data) => {
      if (err) reject(err);
      resolve({ userId, ...user });
    });
  });
};

module.exports = {
  hasEmail,
  saveUser,
};
