
const moment = require('moment')

// to create middleware for logging
const logger = (req, res, next) => {
    // this logs the protocol and host and url and date and time
    console.log(`${req.protocol}://${req.get('host')}${req.originalUrl}: ${moment().format()}`);
    next();
}

module.exports = logger