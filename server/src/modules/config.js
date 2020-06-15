const env = require('dotenv').config({path: __dirname + '/../../.env'});

module.exports = env.parsed;
