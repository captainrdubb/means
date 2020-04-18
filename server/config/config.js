const path = require('path');

const regionName = process.env.AWS_REGION;
const port = process.env.PORT;
const env = process.env.NODE_ENV;
const domain = process.env.DOMAIN;
const securePort = process.env.SECURE_PORT;
const dataUrl = process.env.DATA_URL;
const dbName = process.env.DB_NAME;
const publicFolder = path.join(path.dirname(__dirname), 'public');

module.exports = {
  dbName,
  dataUrl,
  publicFolder,
  securePort,
  regionName,
  domain,
  port,
  env,
};
