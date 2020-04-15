const regionName = process.env.AWS_REGION;
const port = process.env.PORT;
const env = process.env.NODE_ENV;
const domain = process.env.DOMAIN;
const securePort = process.env.SECURE_PORT;

module.exports = {
  securePort,
  regionName,
  domain,
  port,
  env,
};
