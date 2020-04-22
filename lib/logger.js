const winston = require('winston');
const LogzioWinstonTransport = require('winston-logzio');

// const logzioWinstonTransport = new LogzioWinstonTransport({
//     level: 'info',
//     name: 'bravia-controller',
//     token: '',
//     host: 'listener-nl.logz.io',
//     type: 'nodejs'
// });

const logger = winston.createLogger({
    level: 'info',
    format: winston.format.json(),
    defaultMeta: { service: 'user-service' },
    transports: [
        new winston.transports.File({ filename: 'bravia-controller.err', level: 'error' }),
        new winston.transports.File({ filename: 'bravia-controller.log' }),
        //logzioWinstonTransport
    ]
});
module.exports = logger;