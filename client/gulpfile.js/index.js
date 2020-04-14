const { prod, dev } = require('./gulpfile');
const { path } = require('./gulp-config');
const config = require('./gulp-config');

exports.dev = dev;
exports.prod = prod;
exports.path = path;
exports.config = config;
