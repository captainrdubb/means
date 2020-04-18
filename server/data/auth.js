const { config } = require('../config');
const MongoClient = require('mongodb').MongoClient;

const collectionName = 'user';
const options = { useNewUrlParser: true, useUnifiedTopology: true };

const getClient = async () => {
  return MongoClient.connect(config.dataUrl, options).catch((err) => {
    throw err;
  });
};

const hasEmail = async (email) => {
  const client = await getClient();

  try {
    const db = client.db(config.dbName);
    const collection = db.collection(collectionName);
    const result = await collection.findOne({ email: email });
    return result !== null;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

const saveUser = async (user) => {
  const client = await getClient();

  try {
    const db = client.db(config.dbName);
    const collection = db.collection(collectionName);
    const { ops } = await collection.insertOne(user);
    const [result] = ops;
    return result;
  } catch (error) {
    throw error;
  } finally {
    await client.close();
  }
};

module.exports = {
  hasEmail,
  saveUser,
};
