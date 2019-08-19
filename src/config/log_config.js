let bunyan = require('bunyan'),
    bunyanFormate = require('bunyan-format'),
    formatOut = bunyanFormate({
        color: 'true',
        outputMode: 'short',
        levelInString: false
    });
require('dotenv').config()
    // const path = require('path');

// const LOG_PATH = path.join(__dirname, 'logger.json');

const LOG_PATH = process.env.LOG_PATH
const LOGGER_CONFIG = {
    name: 'BUG_AUTOMATION',
    streams: [{
            level: 'debug',
            stream: formatOut, // log INFO and above to stdout
        },
        {
            level: 'info',
            path: LOG_PATH
        }
    ]
}

var log = bunyan.createLogger(LOGGER_CONFIG);

module.exports = log