const bunyan = require('bunyan');
const settings = require('./settings');

const logger = bunyan.createLogger({name: settings.APP_NAME});

module.exports = logger;
