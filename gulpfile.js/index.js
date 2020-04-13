const Dev = require('./gulpfile').default;
const { prod } = require('./gulpfile');

exports.default = Dev;
exports.prod = prod;
